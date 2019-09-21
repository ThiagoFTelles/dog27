<template>
  <section>
    <SubMenuContato />
  </section>
</template>

<script>
import SubMenuContato from "@/components/SubMenuContato.vue";

export default {
  name: "Contato",
  components: {
    SubMenuContato
  },
  methods: {},
  created() {
    document.title = "Contato";
  }
};
</script>

<style scoped>
</style>
