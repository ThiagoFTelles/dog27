<template>
  <div id="app">
    <TheHeader />
    <main id="main">
      <transition mode="out-in">
        <router-view :key="componentKey" />
      </transition>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { api } from "@/services.js";

export default {
  components: {
    TheHeader,
    TheFooter
  },
  data() {
    return {
      componentKey: 1
    };
  },
  created() {
    this.$store.dispatch("deslogarUsuario");
    // if (window.localStorage.token) {
    //   api
    //     .validateToken()
    //     .then(() => {
    //       this.$store.dispatch("getUsuario");
    //     })
    //     .catch(() => {
    //       window.localStorage.removeItem("token");
    //       this.componentKey += 1;
    //       // mudar a key faz o vue re-renderizar o componente.
    //     });
    // }
  }
};
</script>


<style>
* {
  box-sizing: border-box; /* Acumula a borda com o padding dos itens */
}

body,
ul,
li,
p {
  font-size: 1.2rem;
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
}

body,
ul,
li,
h1,
h2,
p {
  padding: 0;
  margin: 0;
}

ul {
  list-style: none;
}

a {
  color: #345;
  text-decoration: none;
}

/* DAQUI PRA CIMA É DOG27 */

body {
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  color: #345;
  background: #f7f8fa;
}

img {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

.invisible {
  visibility: hidden;
}

.green {
  color: green !important;
}

.red {
  color: red !important;
}

.error {
  border: 1px solid red !important;
}

.bg_green {
  background: #31873c !important;
}
.bg_red {
  background: red !important;
}
.bg_blue {
  background: #2195be !important;
}

.radio {
  /* secret sauce to styling radio buttons */
  appearance: none;
  /* Aligning your label text and your radio */
  vertical-align: text-bottom;
  border: 1px solid black;
  border-radius: 100%;
  width: auto;
  padding: 5px;
}
/* Setting the checked styles */
.radio:checked {
  border-color: black;
  border-width: 6px;
  padding: 0;
}

/* radio inner negative circle */
.radio:checked:before {
  content: "";
  height: 0;
  width: 0;
  display: block;
}

.arrow,
.produto-icone {
  cursor: pointer;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: #24a9de;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  box-shadow: 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  border: none;
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  cursor: pointer;
}

.btn:hover {
  background: #65d;
  transform: scale(1.1);
}

.btn-disabled,
.btn-disabled:hover {
  background: #bbc;
  transform: scale(1);
}

#app {
  background: #fff;
  display: flex;
  min-height: 100vh;
  flex-direction: column; /*as partes de dividem de forma vertical */
}

#main {
  flex: 1; /* esta parte irá smepre se expandir */
}

label {
  margin-bottom: 5px;
}

input,
textarea {
  border-radius: 4px;
  border: 1px solid #fff;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  margin-bottom: 15px;
  width: 100%;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #24a9de;
}

.call-to-buy-container {
  position: sticky;
  top: 103px;
  background: white;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}
/* um entra por cima enquanto o outro sai por baixo */
.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.section-form {
  width: 90%;
  margin: 15px auto;
  max-width: 900px;
}

@media screen and (max-width: 700px) {
  #main {
    background: #f7f7f9;
  }

  .call-to-buy-container {
    top: 75px;
  }

  label {
    margin: 15px auto;
    display: block;
  }
}
</style>
