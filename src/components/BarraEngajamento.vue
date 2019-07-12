<template>
  <div class="container-engajamento">
    <div class="preenchimento"></div>
    <div class="texto-engajamento">Faltam apenas R$1000 pra você ganhar uma coleira!</div>
  </div>
</template>

<script>
export default {
  name: "BarraEngajamento"
};
</script>

<style scoped>
.container-engajamento {
  width: 100%;
  height: 30px;
  background: #f7f8fa;
}

.preenchimento {
  width: 35%;
  background: #4bd6ff;
  height: 100%;
}

.texto-engajamento {
  width: 100%;
  position: absolute;
  top: 0;
  text-align: center;
  font-size: 0.9em;
  margin: 3px;
  font-family: "Fira Sans", sans-serif;
  color: #6c6c6c;
  font-weight: 600;
}
</style>
