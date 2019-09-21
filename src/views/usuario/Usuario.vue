<template>
  <section class="usuario">
    <nav class="sidenav">
      <ul>
        <li class="editar menu-item">
          <router-link :to="{name: 'usuario'}">Editar Usuário</router-link>
        </li>
        <li class="deslogar menu-item">
          <button @click="deslogar">Deslogar</button>
        </li>
      </ul>
    </nav>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: "Usuario",
  methods: {
    deslogar() {
      this.$store.dispatch("deslogarUsuario");
      this.$router.push("/login");
    }
  },
  created() {
    document.title = "Editar Conta";
  }
};
</script>

<style scoped>
.usuario {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  max-width: 900px;
  margin: 40px auto;
  grid-gap: 30px;
  padding: 20px;
}

@media screen and (max-width: 700px) {
  .usuario {
    grid-template-columns: 1fr;
    margin: 0 auto;
  }
}

.sidenav a,
.sidenav button {
  padding: 10px;
  display: block;
  background: #f4f7fc;
  margin-bottom: 10px;
  border-radius: 4px;
}

.sidenav a {
  margin: 0;
  margin-bottom: 10px;
}

.menu-item {
  display: block;
}

.sidenav button {
  border: none;
  width: 100%;
  font-size: 1.2rem;
  text-align: left;
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  cursor: pointer;
  color: #345;
}

.sidenav a.router-link-exact-active,
.sidenav a:hover,
.sidenav button:hover {
  background: #24a9de;
  color: #fff;
}

@media screen and (max-width: 500px) {
  .editar {
    display: none;
  }

  .deslogar a {
    background: #24a9de;
    color: #fff;
  }
}
</style>
