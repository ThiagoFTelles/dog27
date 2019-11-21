<template>
  <section>
    <p>Teste area</p>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { mapFields } from "@/helpers.js";
import { getCep } from "@/services.js";
import axios from "axios";
import { api } from "@/services.js";
import { requestCielo } from "@/helpers.js";

export default {
  name: "Teste",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({})
  },
  methods: {
    ...mapActions(["solicitarToken"])
  },
  created() {
    this.solicitarToken();
  }
};
</script>
<style scoped>
</style> 
 