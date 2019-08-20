<template>
  <section class="checkout">
    <p v-if="Brand">Bandeira: {{Brand}}</p>
    <p v-if="!Brand">Aceitamos: Visa, Master e AMEX</p>

    <label for="CardNumber">Número do Cartão</label>
    <input
      type="text"
      v-mask="'####.####.####.####'"
      name="CardNumber"
      id="CardNumber"
      v-model="CardNumber"
    />
    <section v-if="Brand">
      <label for="ExpirationDate">Válido até</label>
      <input
        type="text"
        name="ExpirationDate"
        id="ExpirationDate"
        placeholder="MM/AAAA"
        v-mask="'##/####'"
        v-model="ExpirationDate"
      />
      <label for="SecurityCode">CVV</label>
      <input
        type="text"
        name="SecurityCode"
        id="SecurityCode"
        v-model="SecurityCode"
        v-mask="'###'"
      />
      <label for="Holder">Nome Impresso no Cartão</label>
      <input type="text" name="Holder" id="Holder" v-model="Holder" maxlength="40" />
      <label for="Installments">Parcelas</label>
      <!-- Parcela mínima R$50, pode parcelar em até 4x sem juros -->
      <input type="text" name="Installments" id="Installments" v-model="Installments" />
      <button @click="abrirOrdem">Pagar</button>
    </section>
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

          this.capturarCielo(cobranca);
        });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    requestCielo(method, url, data) {
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader(
          "MerchantId",
          process.env.VUE_APP_MERCHANT_ID_CIELO
        );
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader(
          "MerchantKey",
          process.env.VUE_APP_MERCHANT_KEY_CIELO
        );
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send(data);
      });
    },
    solicitarAutorizacaoCielo(oderPayment) {
      var data = JSON.stringify(oderPayment);

      return this.requestCielo(
        "POST",
        "https://apisandbox.cieloecommerce.cielo.com.br/1/sales",
        data
      ).then(function(e) {
        let resposta = JSON.parse(e.target.response);

        let links = resposta.Payment.Links;
        let objLinkCaptura = links.filter(element => element.Rel === "capture");
        let linkCaptura = objLinkCaptura[0].Href;

        return linkCaptura;
      });
    },
    capturarCielo(oderPayment) {
      this.solicitarAutorizacaoCielo(oderPayment).then(r => {
        console.log("oi :)");
        console.log(r);

        this.requestCielo("PUT", r).then(function(e) {
          let resposta = JSON.parse(e.target.response);

          console.log(e);
          console.log(resposta);
        });
      });
    },

    // solicitarAutorizacaoCielo(oderPayment) {

    //   var data = JSON.stringify(oderPayment);
    //   var xhr = new XMLHttpRequest();

    //   xhr.addEventListener("readystatechange", function() {
    //     if (this.readyState === 4) {
    //       console.log("Link captura:");
    //       let linkCaptura = this.responseText.Links.forEach(element => {
    //         if (element.Rel === "capture") {
    //           return element.Href;
    //         }
    //       });
    //       console.log(linkCaptura);
    //       console.log(this.responseText);
    //       let PaymentId = this.responseText.PaymentId;
    //       console.log("Status:");
    //       console.log(this.responseText);
    //       capturarPagamentoCielo(PaymentId);
    //     }
    //   });

    //   xhr.open(
    //     "POST",
    //     "https://apisandbox.cieloecommerce.cielo.com.br/1/sales"
    //   );
    //   xhr.setRequestHeader(
    //     "MerchantId",
    //     process.env.VUE_APP_MERCHANT_ID_CIELO
    //   );
    //   xhr.setRequestHeader("Content-Type", "application/json");
    //   xhr.setRequestHeader(
    //     "MerchantKey",
    //     process.env.VUE_APP_MERCHANT_KEY_CIELO
    //   );
    //   xhr.setRequestHeader("Accept", "*/*");
    //   xhr.setRequestHeader("Cache-Control", "no-cache");
    //   // xhr.setRequestHeader(
    //   //   "Postman-Token",
    //   //   "e484d2ef-8424-4dd9-b515-3c8776c16fc6,ebbffaa7-8e31-4875-8c7e-233bcf31f837"
    //   // );
    //   xhr.setRequestHeader("cache-control", "no-cache");

    //   xhr.send(data);
    // },
    capturarPagamentoCielo(PaymentId) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          console.log("resposta:");
          console.log(this.responseText);
        }
      });

      xhr.open(
        "PUT",
        `https://apisandbox.cieloecommerce.cielo.com.br/1/sales/${PaymentId}/capture`
      );
      xhr.setRequestHeader("MerchantId", process.env.VUE_APP_MERCHANT_ID_CIELO);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader(
        "MerchantKey",
        process.env.VUE_APP_MERCHANT_KEY_CIELO
      );
      xhr.setRequestHeader("Accept", "*/*");
      xhr.setRequestHeader("Cache-Control", "no-cache");
      // xhr.setRequestHeader(
      //   "Postman-Token",
      //   "e484d2ef-8424-4dd9-b515-3c8776c16fc6,ebbffaa7-8e31-4875-8c7e-233bcf31f837"
      // );
      xhr.setRequestHeader("cache-control", "no-cache");

      xhr.send(data);
    }
  },
  computed: {
    ...mapState(["order"])
  },
  watch: {
    CardNumber() {
      {
        if (this.CardNumber.charAt() == 4) {
          this.Brand = "Visa";
        } else if (this.CardNumber.charAt() == 5) {
          this.Brand = "Master";
        } else if (this.CardNumber.charAt() == 3) {
          this.Brand = "Amex";
        } else {
          this.Brand = "";
        }
      }
    }
  },
  created() {}
};
</script>
<style scoped>
input {
  text-transform: uppercase;
}
</style> 
 