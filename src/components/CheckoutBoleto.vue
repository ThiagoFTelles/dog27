<template>
  <section class="checkout">
    <p>Aguarde, estamos gerando o seu boleto.</p>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { api } from "@/services.js";

export default {
  name: "CheckoutBoleto",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["esvaziarCarrinho"]),
    abrirOrdem() {
      let data = {
        endpoint: "/orders",
        body: this.order.order
      };
      api.postApiWc(data).then(r => {
        this.redirecionarParaMoip(r);
      });
    },
    redirecionarParaMoip(r) {
      let orderItems = [];

      r.data.line_items.forEach(element => {
        orderItems.push({
          product: element.name,
          quantity: element.quantity,
          detail: element.sku,
          price: element.price > 0 ? element.price * 100 : 1
        });
      });

      let pedido = {
        ownId: r.data.id,
        amount: {
          currency: "BRL",
          subtotals: {
            shipping: Math.floor(Number(r.data.shipping_total) * 100)
          }
        },
        items: orderItems,
        customer: {
          ownId: this.usuario.id,
          fullname: this.usuario.nome,
          email: this.usuario.email,
          birthDate:
            this.usuario.nascimento.substring(6) +
            "-" +
            this.usuario.nascimento.substring(3, 5) +
            "-" +
            this.usuario.nascimento.substring(0, 2),
          taxDocument: {
            type: "CPF",
            number: this.usuario.cpf
          },
          phone: {
            countryCode: "55",
            areaCode: this.usuario.telefone.substring(1, 3),
            number: this.usuario.telefone.substring(5)
          },
          shippingAddress: {
            street: this.usuario.ruaEntrega,
            streetNumber: Number(this.usuario.numeroEntrega),
            complement: this.usuario.complementoEntrega,
            district: this.usuario.bairroEntrega,
            city: this.usuario.cidadeEntrega,
            state: this.usuario.estadoEntrega,
            country: "BRA",
            zipCode: this.usuario.cepEntrega
          }
        }
      };
      var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.moip.com.br/v2/orders",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          Authorization:
            "Basic: Q1VDUkgxVkhUQUpHSkZHQzJVWFFNTjAzUVJLT1NER046V041UkRNRUNaTFFDUUIwWlVMVVI1S05KUTZEUlhTT0FJMFNNREJVSg=="
        },
        data: JSON.stringify(pedido)
      };
      let self = this;
      // eslint-disable-next-line
      $.ajax(settings).done(function(response) {
        self.esvaziarCarrinho();
        self.$router.push({
          name: "BoletoGerado",
          params: { link: response._links.checkout.payBoleto.redirectHref }
        });
        window.open(response._links.checkout.payBoleto.redirectHref);
      });
    }
  },
  computed: {
    ...mapState({
      order: state => state.order,
      usuario: state => state.usuario,
      carrinho: state => state.cart.carrinho
    })
  },
  created() {
    if (!this.order.order) {
      this.$router.push({ name: "checkout" });
    } else {
      this.abrirOrdem();
    }
  }
};
</script>
<style scoped>
p {
  margin: 200px auto;
  text-align: center;
  font-weight: bolder;
  color: #1085f9;
}
</style> 
 