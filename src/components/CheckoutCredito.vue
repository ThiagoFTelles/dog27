<template>
  <section class="checkout">
    inserir aqui os dados do cartão
    <AutorizacaoCieloCredito />
  </section>
</template>

<script>
import AutorizacaoCieloCredito from "@/components/AutorizacaoCieloCredito.vue";

export default {
  name: "CheckoutCredito",
  components: {
    AutorizacaoCieloCredito
  }
};
</script>
<style scoped>
</style> 
 