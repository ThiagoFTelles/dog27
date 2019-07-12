<template>
  <header class="header">
    <BarraEngajamento />
    <section class="container">
      <router-link to="/" class="logo">
        <img
          src="https://cdn6.aptoide.com/imgs/d/2/e/d2efaa3fed8d0750a87bf61e1fb5684f_icon.png?w=55"
          alt="Dog27"
        />
      </router-link>
      <nav>
        <ul class="menu">
          <li>
            <router-link to="/produtos">Produtos</router-link>
          </li>
          <li>
            <router-link to="/estampas">Estampas</router-link>
          </li>
          <li>
            <router-link to="/contato">Fale Conosco</router-link>
          </li>
          <li>
            <router-link to="/blog">Blog</router-link>
          </li>
        </ul>
      </nav>
      <router-link to="/" class="icon">
        <img id="lupa" src="@/assets/search.svg" />
      </router-link>
      <router-link to="/" class="icon">
        <img src="@/assets/person.svg" alt />
      </router-link>
      <router-link to="/" class="icon">
        <img src="@/assets/bag.svg" alt />
      </router-link>
    </section>
  </header>
</template>

<script>
import BarraEngajamento from "@/components/BarraEngajamento.vue";

export default {
  name: "TheHeader",
  components: { BarraEngajamento },
  computed: {
    nome() {
      return this.$store.state.usuario.nome.replace(/ */, "");
      /* .replace(/ 'asterisco'/, ""); Significa que tudo que vier depois do espaço será apagado para evitar nomes muito grandes */
    }
  }
};
</script>

<style scoped>

.container {
  max-width: 950px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  flex-wrap: wrap; /* faz os flex-items ficarem um em cima do outro qndo a tela reduzir e eles colidirem */
}

.header {
  background: #212121;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* faz os flex-items ficarem um em cima do outro qndo a tela reduzir e eles colidirem */
}

a {
  color: #fff;
}

.menu {
  display: flex;
}
li a.router-link-exact-active,
li a:hover {
  background: rgb(75, 75, 75);
  color: #fff;
}

.menu li {
  margin-left: 10px;
}

.menu li a {
  display: block;
  padding: 25px 10px; /* isso aumenta a área de click do botão para ficar maior que apenas o texto */
}

.logo,
.icon {
  padding: 10px 0;
}

.logo img {
  width: 55px;
  filter: saturate(0);
}

.icon img {
  width: 27px;
  height: 27px;
  border: none;
  cursor: pointer;
  box-shadow: none;
}
</style>
