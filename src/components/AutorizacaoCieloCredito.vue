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
  }
};
</script>

<style scoped>
</style>
