<template>
  <div class="container">
    <button @click="enviarPagamento()">Pagar</button>
  </div>
</template>

<script>
export default {
  name: "AutorizacaoCieloCredito",
  methods: {
    enviarPagamento() {
      var data = JSON.stringify({
        MerchantOrderId: "2014111703",
        Payment: {
          Type: "CreditCard",
          Amount: 15700,
          Installments: 1,
          SoftDescriptor: "123456789ABCD",
          CreditCard: {
            CardNumber: "4551870000000183",
            Holder: "Teste Holder",
            ExpirationDate: "12/2021",
            SecurityCode: "123",
            Brand: "Visa"
          }
        }
      });

      var xhr = new XMLHttpRequest();
      // xhr.withCredentials = true;

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
      // xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.15.2");
      xhr.setRequestHeader("Accept", "*/*");
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.setRequestHeader(
        "Postman-Token",
        "e484d2ef-8424-4dd9-b515-3c8776c16fc6,ebbffaa7-8e31-4875-8c7e-233bcf31f837"
      );
      // xhr.setRequestHeader("Host", "apisandbox.cieloecommerce.cielo.com.br");
      // xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
      // xhr.setRequestHeader("Content-Length", "377");
      // xhr.setRequestHeader("Connection", "keep-alive");
      xhr.setRequestHeader("cache-control", "no-cache");

      xhr.send(data);
    }
  }
};
</script>

<style scoped>
</style>
