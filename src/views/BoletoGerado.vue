<template>
  <section class="scroll">
    <iframe class="siteBoleto" :src="link" frameborder="0"></iframe>
  </section>
</template>

<script>
export default {
  name: "BoletoGerado",
  props: ["link"],
  created() {
    document.title = "Boleto dog27";
    if (!this.link) {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped>
.scroll {
  overflow-x: hidden;
}

.siteBoleto {
  width: 110%;
  height: 800px;
}

p {
  margin: auto;
  width: 100%;
  text-align: center;
  padding: 150px 0;
  color: #5bc4e4;
  font-weight: 600;
}
@media screen and (max-width: 470px) {
  .siteBoleto {
    width: 100%;
  }
}
</style>
