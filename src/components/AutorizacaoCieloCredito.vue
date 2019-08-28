<template>
  <div class="container">
    <button @click="enviarPagamento()">Pagar</button>
  </div>
</template>

<script>
export default {
  name: "AutorizacaoCieloCredito",
  methods: {
    enviarPagamento(oderPayment) {
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
      xhr.setRequestHeader("MerchantId", process.env.VUE_APP_MERCHANT_ID_CIELO);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader(
        "MerchantKey",
        process.env.VUE_APP_MERCHANT_KEY_CIELO
      );
      xhr.setRequestHeader("Accept", "*/*");
      xhr.setRequestHeader("Cache-Control", "no-cache");

      xhr.send(data);
    }
  }
};
</script>

<style scoped>
</style>
