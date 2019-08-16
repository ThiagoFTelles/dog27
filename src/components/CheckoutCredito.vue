<template>
  <section class="checkout">
    {
    "MerchantOrderId": this.order_id,
    "Payment": {
    "Type": "CreditCard",
    "Amount": 15700,
    "Installments": 1,
    "SoftDescriptor": "123456789ABCD",
    "CreditCard": {
    "CardNumber": "4551870000000183",
    "Holder": "Teste Holder",
    "ExpirationDate": "12/2021",
    "SecurityCode": "123",
    "Brand": "Visa"
    }
    }
    }
    <AutorizacaoCieloCredito />
    <p>order: {{this.order.order}}</p>
  </section>
</template>

<script>
import AutorizacaoCieloCredito from "@/components/AutorizacaoCieloCredito.vue";
import { mapState } from "vuex";
import { api } from "@/services.js";

export default {
  name: "CheckoutCredito",
  data() {
    return {
      order_id: null
    };
  },
  components: {
    AutorizacaoCieloCredito
  },
  methods: {
    abrirOrdem() {
      if (this.order) {
        let data = {
          endpoint: "/orders",
          body: this.order.order
        };
        api.postApiWc(data).then(r => {
          this.order_id = r.data.id;
        });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    fecharOrdem(pagamentoStatus) {}
  },
  computed: {
    ...mapState(["order"])
  },
  created() {
    this.abrirOrdem();
  }
};
</script>
<style scoped>
</style> 
 