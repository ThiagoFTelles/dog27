<template>
  <section class="checkout">
    <p>Boleto</p>
  </section>
</template>

<script>
export default {
  name: "CheckoutBoleto",
  data() {
    return {
      x: "y"
    }
  },
  created() {
    let pedido = {
  "ownId": "pedido_xyz",
  "items": [
    {
      "product": "Box de Seriado - Exterminate!",
      "quantity": 1,
      "detail": "Box de seriado com 8 dvds",
      "price": 7300
    }
  ],
  "customer": {
    "ownId": "cliente_xyz",
    "fullname": "João Silva",
    "email": "joaosilva@email.com"
  }
};

    var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.moip.com.br/v2/orders",
  "method": "POST",
  "headers": {
    'Accept': 'application/json',
        'Content-Type': 'application/json',
    "cache-control": "no-cache",
    "Authorization": "Basic: Q1VDUkgxVkhUQUpHSkZHQzJVWFFNTjAzUVJLT1NER046V041UkRNRUNaTFFDUUIwWlVMVVI1S05KUTZEUlhTT0FJMFNNREJVSg=="
  },
  "data": JSON.stringify(pedido)
}

$.ajax(settings).done(function (response) {
  console.log(response);
});




//     let u = "CUCRH1VHTAJGJFGC2UXQMN03QRKOSDGN";
//     let p = "WN5RDMECZLQCQB0ZULUR5KNJQ6DRXSOAI0SMDBUJ";
//     let auth = u + ":" + p;
//     $.ajax
// ({
//   type: "GET",
//   url: "https://www.example.com",
//   dataType: 'json',
//   headers: {
//     "Authorization", btoa(auth)
//   },
//   data: '{}',
//   success: function (){
//    console.log('boletou')
//   }
// });

  }

};
</script>
<style scoped>
</style> 
 