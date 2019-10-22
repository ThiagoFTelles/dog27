<template>
  <section class="checkout-container">
    <img src="../assets/footer/icone-logo.svg" alt="Dog-27" class="logo" />
    <div class="main">
      <div class="mainheader">
        <p class="main-titulo">Meu carrinho</p>
      </div>

      <div class="maincontent">
        <p class="topprodutos maincontent-header">Produtos</p>
        <p class="toppreco maincontent-header">Preço</p>
        <p class="topquantidade maincontent-header">Quantidade</p>
        <p class="toptotal maincontent-header">Total</p>

        <div class="itensarea">
          <li v-if="ganhouPresente" class="carrinho_item" key="carrinho-presente">
            <p class="quantidade">- 1 +</p>
            <p class="titulo">{{nomeDoPresente | capitalize}} U</p>
            <img :src="fotoDoPresente" :alt="nomeDoPresente" class="foto" />

            <p class="valorunitarioitem green">{{0 | numeroPreco}}</p>
            <p class="valortotalitem">{{0 | numeroPreco}}</p>
            <button class="carrinho_remover"></button>
          </li>
          <li
            class="carrinho_item"
            v-for="(item, index) in carrinho"
            :key="`carrinho-item${index}`"
          >
            <p class="quantidade">- {{item.quantidade}} +</p>
            <p
              class="titulo"
            >{{item.categoria | capitalize}} para cachorros {{item.estampa | lowercase}} {{item.tamanho | uppercase}}</p>
            <img
              :src="item.fotoUrl"
              :alt="`${item.categoria} para cachorros ${item.estampa}`"
              class="foto"
            />

            <p
              :class="{ green: item.isCombo }"
              class="valorunitarioitem"
            >{{item.valorUnitarioCobrado | numeroPreco}}</p>
            <p class="valortotalitem">{{item.valorUnitarioCobrado * item.quantidade | numeroPreco}}</p>
            <button
              class="carrinho_remover"
              @click="removerItemDoCarrinho({index:index, isCombo:item.isCombo, comboFinal:item.comboFinal, comboInicial:item.comboInicial})"
            >X</button>
          </li>
        </div>

        <div class="totalarea"></div>

        <div class="bottom"></div>
      </div>
    </div>
  </section>
</template>

<script>
import CalcularFrete from "@/components/CalcularFrete.vue";
import ResumoDoPedido from "@/components/ResumoDoPedido.vue";
import { mapState, mapActions } from "vuex";
import { mapFields } from "@/helpers.js";
import { getCep } from "@/services.js";

export default {
  name: "Checkout",
  components: { CalcularFrete, ResumoDoPedido },
  data() {
    return {
      line_items: []
    };
  },
  computed: {
    ...mapState({
      carrinho: state => state.cart.carrinho,
      cupom: state => state.cart.cupom,
      ganhouPresente: state => state.cart.ganhouPresente,
      nomeDoPresente: state => state.cart.nomeDoPresente,
      fotoDoPresente: state => state.cart.fotoDoPresente,
      valorTotalCarrinho: state => state.cart.carrinhoTotal,
      carrinhoTotal: state => state.cart.carrinhoTotal,
      metaMaior: state => state.order.metaMaior,
      usuario: state => state.usuario,
      freteEscolhido: state => state.freteEscolhido,
      presente: state => state.cart.presente,
      login: state => state.login
    }),
    ...mapFields({
      fields: [
        "nome",
        "cpf",
        "nascimento",
        "email",
        "telefone",
        "rua",
        "cep",
        "numero",
        "complemento",
        "bairro",
        "cidade",
        "estado"
      ],
      base: "usuario",
      mutation: "UPDATE_USUARIO"
    }),
    primeiroNome() {
      return this.usuario.nome.replace(/ .*/, "");
    }
  },
  methods: {
    ...mapActions(["setOrder"]),
    newOrder(payment) {
      let shipping_lines = {
        method_id: this.freteEscolhido.nome,
        method_title: this.freteEscolhido.nome,
        total: this.freteEscolhido.valor.toString()
      };

      shipping_lines = [shipping_lines];

      let coupon_lines = { code: this.cupom.code };

      coupon_lines = [coupon_lines];

      let meta_data = [];
      meta_data.push(
        {
          key: "_billing_cpf",
          value: this.usuario.cpf
        },
        {
          key: "_billing_number",
          value: this.usuario.numero
        },
        {
          key: "_billing_neighborhood",
          value: this.usuario.bairro
        },
        {
          key: "_shipping_number",
          value: this.usuario.numeroEntrega
        },
        {
          key: "_shipping_neighborhood",
          value: this.usuario.bairroEntrega
        }
      );

      let order = {
        customer_id: this.usuario.id,
        payment_method: payment.payment_method,
        payment_method_title: payment.payment_method_title,
        set_paid: false,
        billing: {
          first_name: this.usuario.nome,
          last_name: "",
          address_1:
            this.usuario.rua +
            ", Nº: " +
            this.usuario.numero +
            ", " +
            this.usuario.bairro,
          address_2: this.usuario.complemento,
          city: this.usuario.cidade,
          state: this.usuario.estado,
          postcode: this.usuario.cep,
          country: this.usuario.pais,
          email: this.usuario.email,
          phone: this.usuario.telefone
        },
        shipping: {
          first_name: this.usuario.nomeEntrega,
          last_name: "",
          address_1:
            this.usuario.ruaEntrega +
            ", Nº: " +
            this.usuario.numeroEntrega +
            ", " +
            this.usuario.bairroEntrega,
          address_2: this.usuario.complementoEntrega,
          city: this.usuario.cidadeEntrega,
          state: this.usuario.estadoEntrega,
          postcode: this.usuario.cepEntrega,
          country: this.usuario.paisEntrega
        },
        line_items: this.line_items,
        shipping_lines: shipping_lines,
        coupon_lines: this.cupom.code ? coupon_lines : null,
        meta_data: meta_data
      };
      this.setOrder(order);
    },
    setCart() {
      this.$store.state.cart.carrinho.forEach(item => {
        let total = item.valorUnitarioCobrado * item.quantidade;
        let cartItem = {
          product_id: item.idProdutoPai,
          variation_id: item.idDaVariacao,
          quantity: item.quantidade,
          total: total.toString()
        };
        this.line_items.push(cartItem);
      });
      if (this.valorTotalCarrinho >= this.metaMaior) {
        this.line_items.push(this.presente);
      }
    },
    preencherCep() {
      const cep = this.cep.replace(/\D/g, ""); /* pegará apenas dígitos */
      if (cep.length === 8) {
        getCep(cep).then(r => {
          this.rua = r.data.logradouro;
          this.bairro = r.data.bairro;
          this.estado = r.data.uf;
          this.cidade = r.data.localidade;
        });
      }
    }
  },
  created() {
    document.title = "Checkout";
    this.setCart();
  }
};
</script>
<style scoped>
.checkout-container {
  display: grid;
  grid-template:
    ". logo ." 150px
    ". main ." 1fr
    ". . ." 50px /
    1fr 1000px 1fr;
}

.logo {
  grid-area: logo;
  height: 100px;
  margin: auto;
}

.main {
  grid-area: main;
  min-height: 400px;
  display: grid;
  grid-template:
    "mainheader" 50px
    "maincontent" 1fr;
}

.mainheader {
  grid-area: mainheader;
  align-self: center; /* alinhamento vertical */
}

.main-titulo {
  font-family: "Fira Sans", sans-serif;
  font-size: 1.3em;
  font-style: italic;
  color: black;
}

.maincontent {
  grid-area: maincontent;
  background: #f9f9f9;
  padding: 20px;
  display: grid;
  grid-template:
    "topprodutos toppreco topquantidade toptotal ." 35px
    "itensarea itensarea itensarea itensarea itensarea " 1fr
    ". totalarea totalarea totalarea ." 75px
    ". bottom bottom bottom bottom" 50px /
    500px 120px 190px 120px 70px;
}

.maincontent-header {
  font-family: "Fira Sans", sans-serif;
  font-size: 1em;
  font-style: italic;
  color: black;
  margin: auto;
  font-weight: bold;
}

.topprodutos {
  grid-area: topprodutos;
  align-self: center; /* alinhamento vertical */
  padding-left: 10px;
  margin: 0;
}
.toppreco {
  grid-area: toppreco;
  align-self: center; /* alinhamento vertical */
}
.topquantidade {
  grid-area: topquantidade;
  align-self: center; /* alinhamento vertical */
}
.toptotal {
  grid-area: toptotal;
  align-self: center; /* alinhamento vertical */
}

.itensarea {
  grid-area: itensarea;
  align-self: center; /* alinhamento vertical */
}

.totalarea {
  grid-area: totalarea;
  align-self: center; /* alinhamento vertical */
}

.bottom {
  grid-area: bottom;
  align-self: center; /* alinhamento vertical */
}

/* //////////////////  CARRINHO ITEM ////////////////////////// */

.carrinho_item {
  background: white;
  padding: 3px 10px 0 10px;
  margin-top: 10px;
  display: grid;
  grid-template:
    "foto titulo valorunitarioitem quantidade valortotalitem carrinho_remover" 116px /
    100px 400px 120px 190px 120px 70px;
}

.carrinho_remover:focus {
  outline: none;
}

.carrinho_remover {
  cursor: pointer;
  grid-area: carrinho_remover;
  background: none;
  border: none;
  text-align: center;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: bolder;
  font-family: sans-serif, cursive;
  font-style: italic;
}
.titulo,
.tamanho,
.quantidade,
.valorunitarioitem,
.valortotalitem {
  padding-top: 9px;
  font-size: 1.2rem;
  color: #000;
  font-style: italic;
  align-self: center;
  text-align: center;
}

.titulo {
  grid-area: titulo;
  text-align: left;
}

.valorunitarioitem {
  grid-area: valorunitarioitem;
}

.valortotalitem {
  grid-area: valortotalitem;
}

.foto {
  grid-area: foto;
  width: 100px;
  height: 100px;
  align-self: center;
}

.tamanho {
  grid-area: tamanho;
}
.quantidade {
  grid-area: quantidade;
}

/* //////////////////  FIM CARRINHO ITEM ////////////////////////// */

@media screen and (max-width: 700px) {
  .btn {
    width: 100%;
  }
}
</style> 
 