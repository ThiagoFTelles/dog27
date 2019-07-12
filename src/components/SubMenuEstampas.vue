<template>
  <div class="submenu-container">
    <div class="submenu-titulo-area">
      <h1 class="titulo-submenu-estampas">ESTAMPAS</h1>
    </div>
    <section class="submenu-container-conteudo">
      <div class="arrow">
        <img src="@/assets/arrow-left.svg" alt="Dog27" />
      </div>
      <div class="estampas-conteudo">
        <div class="area-submenu-estampas">
          <div class="imagem-submenu-estampas">
            <img src="@/assets/imagem-submenu-estampa.png" alt="Coleira Estampada Dog27" />
          </div>
          <div class="subtitulo-submenu-estampas">
            <h2 class="submenu-estampa-titulo">Pipoca</h2>
            <div class="btn-submenu-estampas">Comprar >></div>
          </div>
        </div>
        <div class="area-submenu-estampas">
          <div class="imagem-submenu-estampas">
            <img src="@/assets/imagem-submenu-estampa.png" alt="Coleira Estampada Dog27" />
          </div>
          <div class="subtitulo-submenu-estampas">
            <h2 class="submenu-estampa-titulo">Pipoca</h2>
            <div class="btn-submenu-estampas">Comprar >></div>
          </div>
        </div>
        <div class="area-submenu-estampas">
          <div class="imagem-submenu-estampas">
            <img src="@/assets/imagem-submenu-estampa.png" alt="Coleira Estampada Dog27" />
          </div>
          <div class="subtitulo-submenu-estampas">
            <h2 class="submenu-estampa-titulo">Pipoca</h2>
            <div class="btn-submenu-estampas">Comprar >></div>
          </div>
        </div>
        <div class="area-submenu-estampas">
          <div class="imagem-submenu-estampas">
            <img src="@/assets/imagem-submenu-estampa.png" alt="Coleira Estampada Dog27" />
          </div>
          <div class="subtitulo-submenu-estampas">
            <h2 class="submenu-estampa-titulo">Pipoca</h2>
            <div class="btn-submenu-estampas">Comprar >></div>
          </div>
        </div>
      </div>
      <div class="arrow">
        <img src="@/assets/arrow-right.svg" alt="Dog27" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "SubMenuEstampas"
};
</script>

<style scoped>
.submenu-container {
  position: absolute;
  height: 380px;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
  background: #f3f3f3;
  box-shadow: 0 6px 6px rgba(38, 56, 74, 0.4);
}

.submenu-titulo-area {
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  width: 100%;
  padding: 20px 0;
}

.titulo-submenu-estampas {
  grid-column: 2/3;
  width: 100%;
  margin: 10px;
  font-family: "Fira Sans", sans-serif;
  text-align: left;
  font-size: 2em;
  font-style: italic;
  color: black;
}

.arrow img {
  margin: 100% 0;
  padding: 0 10px;
}

.estampas-conteudo {
  grid-column: 2/4;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 40px;
  width: 100%;
  margin: 0 auto;
}

.submenu-container-conteudo {
  display: grid;
  grid-template-columns: 100px 1fr 1fr 100px;
  width: 100%;
  margin: 0 auto;
}

.btn-submenu-estampas {
  margin: 15px;
  cursor: pointer;
  flex: 1;
  color: #00acff;
  font-size: 1rem;
}

.submenu-estampa-titulo {
  margin: 10px;
  font-family: "Fira Sans", sans-serif;
  text-align: center;
  font-size: 2em;
  font-style: italic;
  color: black;
}
</style>
