<template>
  <section class="checkout">
    <h1>CHECKOUT</h1>
    <h2>Frete:</h2>
    <CalcularFrete />
    <h2>Forma de Pagamento:</h2>
    <p>aqui eu já criei a order com status = pending</p>
    <router-link
      :to="{name: 'checkoutcredito'}"
      class="opcao_de_pagamento"
      @click.native="newOrder({payment_method: 'cielo_credit',
        payment_method_title: 'Cartão de crédito'})"
    >Cartão de Crédito</router-link>
    <router-link
      :to="{name: 'checkoutboleto'}"
      class="opcao_de_pagamento"
      @click.native="newOrder({payment_method: 'woo-moip-official',
        payment_method_title: 'Boleto'})"
    >Boleto</router-link>
  </section>
</template>

<script>
import CalcularFrete from "@/components/CalcularFrete.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Checkout",
  components: { CalcularFrete },
  data() {
    return {
      line_items: []
    };
  },
  computed: {
    ...mapState(["usuario"])
  },
  methods: {
    ...mapActions(["setOrder"]),
    newOrder(payment) {
      let order = {
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
          // email: this.usuario.email,
          email: "atendimento.telles@gmail.com",
          phone: this.usuario.telefone
        },
        shipping: {
          first_name: "John",
          last_name: "",
          address_1: "969 Market",
          address_2: "",
          city: "San Francisco",
          state: "CA",
          postcode: "94103",
          country: "US"
        },
        line_items: this.line_items,
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: "10"
          }
        ]
      };
      console.log(order);
      this.setOrder(order);
    },
    setCart() {
      this.$store.state.cart.carrinho.forEach(item => {
        let cartItem = {
          product_id: item.idProdutoPai,
          variation_id: item.idDaVariacao,
          quantity: item.quantidade,
          total: item.valorUnitarioCobrado
        };
        this.line_items.push(cartItem);
      });
    }
  },
  created() {
    document.title = "Checkout";
    this.setCart();
  }
};
</script>
<style scoped>
</style> 
 