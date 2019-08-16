<template>
  <section class="checkout">
    <form action>
      <label for="Brand">Bandeira</label>
      <input type="text" name="Brand" id="Brand" v-model="Brand" />
      <label for="CardNumber">Número do Cartão</label>
      <input type="text" name="CardNumber" id="CardNumber" v-model="CardNumber" />
      <label for="ExpirationDate">Válido até</label>
      <input type="text" name="ExpirationDate" id="ExpirationDate" v-model="ExpirationDate" />
      <label for="SecurityCode">CVV</label>
      <input type="text" name="SecurityCode" id="SecurityCode" v-model="SecurityCode" />
      <label for="Holder">Nome Impresso no Cartão</label>
      <input type="text" name="Holder" id="Holder" v-model="Holder" />
      <label for="Installments">Parcelas</label>
      <!-- Parcela mínima R$50, pode parcelar em até 4x sem juros -->
      <input type="text" name="Installments" id="Installments" v-model="Installments" />
    </form>
    <button @click="abrirOrdem">Pagar</button>
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
      Installments: 1,
      CardNumber: "",
      Holder: "",
      ExpirationDate: "",
      SecurityCode: "",
      Brand: ""
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
          let cobranca = {
            MerchantOrderId: r.data.id,
            Payment: {
              Type: "CreditCard",
              Amount: Number(r.data.total),
              Installments: this.Installments,
              SoftDescriptor: "DOG27-" + r.data.id,
              CreditCard: {
                CardNumber: this.CardNumber,
                Holder: this.Holder,
                ExpirationDate: this.ExpirationDate,
                SecurityCode: this.SecurityCode,
                Brand: this.Brand
              }
            }
          };

          this.solicitarAutorizacaoCielo(cobranca);
        });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    solicitarAutorizacaoCielo(oderPayment) {
      var data = JSON.stringify(oderPayment);
      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      });

      xhr.open(
        "POST",
        "https://apisandbox.cieloecommerce.cielo.com.br/1/sales"
      );
      xhr.setRequestHeader(
        "MerchantId",
        "48bc5fbd-3265-4acc-95a9-d93666cce6ad"
      );
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader(
        "MerchantKey",
        "ZIJXQQJDLILCUVGBKIBQRAIXXKZLUSCSDTATLENT"
      );
      xhr.setRequestHeader("Accept", "*/*");
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.setRequestHeader(
        "Postman-Token",
        "e484d2ef-8424-4dd9-b515-3c8776c16fc6,ebbffaa7-8e31-4875-8c7e-233bcf31f837"
      );
      xhr.setRequestHeader("cache-control", "no-cache");

      xhr.send(data);
    }
  },
  computed: {
    ...mapState(["order"])
  },
  created() {}
};
</script>
<style scoped>
</style> 
 