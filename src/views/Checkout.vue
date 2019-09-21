<template>
  <section class="checkout section-form">
    <h1 class="titulo">CHECKOUT</h1>
    <p class="deslogado" v-if="!login">
      Faça o
      <router-link :to="{name: 'login'}" class="link green">
        <b>&nbsp;login&nbsp;</b>
      </router-link>&nbsp;para continuar.
    </p>
    <p class="boas-vindas" v-else>Olá {{primeiroNome | capitalize}}!</p>
    <span :style="{visibility: login ? 'visible' : 'hidden'}">
      <h2>Dados de Faturamento</h2>
      <label for="name">Nome</label>
      <input type="text" name="name" id="name" v-model="nome" maxlength="40" />
      <label for="phone">Telefone</label>
      <input
        type="text"
        name="phone"
        id="phone"
        v-model="telefone"
        v-mask="['(##) ####-####', '(##) #-####-####']"
      />
      <label for="email">e-mail</label>
      <input type="text" name="email" id="email" v-model="email" />
      <label for="postcode">CEP</label>
      <input
        type="text"
        name="postcode"
        id="postcode"
        v-model="cep"
        @keyup="preencherCep"
        v-mask="'#####-###'"
      />
      <label for="address_1">RUA</label>
      <input type="text" name="address_1" id="address_1" v-model="rua" />
      <label for="numero">Número</label>
      <input type="text" name="numero" id="numero" v-model="numero" />
      <label for="complemento">Complemento</label>
      <input type="text" name="complemento" id="complemento" v-model="complemento" />
      <label for="address_2">Bairro</label>
      <input type="text" name="address_2" id="address_2" v-model="bairro" />
      <label for="city">Cidade</label>
      <input type="text" name="city" id="city" v-model="cidade" />
      <label for="state">Estado</label>
      <input type="text" name="state" id="state" v-model="estado" />

      <CalcularFrete class="area-entrega" />
      <ResumoDoPedido />
      <section class="pagar" v-if="freteEscolhido.nome">
        <h2>Forma de Pagamento:</h2>
        <router-link
          :to="{name: 'checkoutcredito'}"
          class="opcao_de_pagamento btn"
          @click.native="newOrder({payment_method: 'cielo_credit',
        payment_method_title: 'Cartão de crédito'})"
        >Cartão de Crédito</router-link>
        <!-- <router-link
        :to="{name: 'checkoutboleto'}"
        class="opcao_de_pagamento"
        @click.native="newOrder({payment_method: 'woo-moip-official',
        payment_method_title: 'Boleto'})"
        >Boleto</router-link>-->
      </section>
    </span>
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
      valorTotalCarrinho: state => state.cart.carrinhoTotal,
      metaMaior: state => state.order.metaMaior,
      usuario: state => state.usuario,
      freteEscolhido: state => state.freteEscolhido,
      presente: state => state.cart.presente,
      login: state => state.login
    }),
    ...mapFields({
      fields: [
        "nome",
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
            ", Comp.: " +
            this.usuario.complemento,
          address_2: this.usuario.bairro,
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
            ", Comp.: " +
            this.usuario.complementoEntrega,
          address_2: this.usuario.bairroEntrega,
          city: this.usuario.cidadeEntrega,
          state: this.usuario.estadoEntrega,
          postcode: this.usuario.cepEntrega,
          country: this.usuario.paisEntrega
        },
        line_items: this.line_items,
        shipping_lines: shipping_lines
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
.link {
  border: 1px solid green;
  border-radius: 20px;
  padding: 3px;
}

.titulo {
  text-align: center;
  margin-bottom: 10px;
  font-size: 2.5rem;
}

.area-entrega {
  margin-top: 50px;
}

h2 {
  margin: 15px 0;
}

input {
  text-transform: uppercase;
}

.opcao_de_pagamento {
  width: fit-content;
}

.boas-vindas {
  text-align: center;
}

.pagar {
  margin-top: 50px;
}
@media screen and (max-width: 700px) {
  .btn {
    width: 100%;
  }
}
</style> 
 