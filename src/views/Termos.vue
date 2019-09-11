<template>
  <section class="termos">
    <h1>Termos e Políticas</h1>
  </section>
</template>

<script>
export default {
  name: "Termos",
  data() {
    return {};
  },
  created() {
    document.title = "Termos dog27";
  }
};
</script>
<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #24a9de;
}

form {
  display: grid; /* Deixar um item em baixo do outro */
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.perdeu {
  text-align: center;
  margin: 20px auto 0 auto;
}

.perdeu a:hover {
  color: #24a9de;
  text-decoration: underline;
}
</style> 
 