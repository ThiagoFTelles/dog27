<template>
  <div class="submenu-container">
    <div class="submenu-mensagem">
      <p>Alguma coisa está escrita aqui.</p>
    </div>
    <div class="arrow">
      <img src="@/assets/arrow-left.svg" alt="Dog27" />
    </div>
    <div class="produtos-icones">
      <div class="produto-icone">
        <img src="@/assets/imagem-submenu.png" alt="Coleiras dog27" />
        <P class="submenu-produto-legenda">Coleiras</P>
      </div>
      <div class="produto-icone">
        <img src="@/assets/imagem-submenu.png" alt="Peitorais dog27" />
        <P class="submenu-produto-legenda">Peitorais</P>
      </div>
      <div class="produto-icone">
        <img src="@/assets/imagem-submenu.png" alt="Cintos dog27" />
        <P class="submenu-produto-legenda">Cintos</P>
      </div>
      <div class="produto-icone">
        <img src="@/assets/imagem-submenu.png" alt="Guias dog27" />
        <P class="submenu-produto-legenda">Guias</P>
      </div>
      <div class="produto-icone">
        <img src="@/assets/imagem-submenu.png" alt="Comedouros dog27" />
        <P class="submenu-produto-legenda">Comedouros</P>
      </div>
      <div class="produto-icone">
        <img src="@/assets/imagem-submenu.png" alt="Gravatas dog27" />
        <P class="submenu-produto-legenda">Gravatas</P>
      </div>
      <div class="produto-icone">
        <img src="@/assets/imagem-submenu.png" alt="Tapete Higiênico dog27" />
        <P class="submenu-produto-legenda">Tapete Higiênico</P>
      </div>
    </div>
    <div class="arrow">
      <img src="@/assets/arrow-right.svg" alt="Dog27" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SubMenuProdutos"
};
</script>

<style scoped>
.submenu-container {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
  background: #f3f3f3;
  box-shadow: 0 6px 6px rgba(38, 56, 74, 0.4);
}

.submenu-mensagem {
  display: block;
  margin-bottom: 10px;
  background: #e6eaeb;
  text-align: center;
  align-items: center;
  top: -42%;
  width: 100%;
}

.submenu-mensagem p {
  font-size: 0.8em;
  padding: 5px 0;
  color: #00acff;
}

.produtos-icones {
  overflow: hidden;
  display: flex;
  flex: 1 0 80px;
  margin: 0 10px;
}

.produto-icone {
  display: flex;
  flex: 1 0 200px;
  margin: 0 10px;
  flex-wrap: wrap;
}

.produto-icone img {
  max-width: 100%;
  margin: 0 auto;
}

.submenu-produto-legenda {
  width: 100%;
  font-size: 0.8em;
  text-align: center;
  font-weight: 600;
  color: black;
  margin: 7px 0;
}
</style>
