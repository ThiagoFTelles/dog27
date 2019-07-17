<template>
  <section>
    <div class="patinhas">
      <div class="patinha-area">
        <span class="um"></span>
        <span class="dois"></span>
        <span class="tres"></span>
      </div>
      <div class="patinha-area">
        <span class="um"></span>
        <span class="dois"></span>
        <span class="tres"></span>
      </div>
      <div class="patinha-area">
        <span class="um"></span>
        <span class="dois"></span>
        <span class="tres"></span>
      </div>
      <div class="patinha-area">
        <span class="um"></span>
        <span class="dois"></span>
        <span class="tres"></span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PaginaCarregando"
};
</script>

<style scoped>
section {
  text-align: center;
  margin-top: 80px;
}

.patinha-area {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background: #ccc;
  margin: 24px;
  opacity: 0;
  animation: pegada 0.6s infinite alternate;
}

.patinha-area span.um {
  position: absolute;
  top: -18px;
  right: -20px;
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background: #ccc;
  margin: 8px;
}

.patinha-area span.dois {
  position: absolute;
  top: -4px;
  right: -30px;
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background: #ccc;
  margin: 8px;
}

.patinha-area span.tres {
  position: absolute;
  top: 10px;
  right: -20px;
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background: #ccc;
  margin: 8px;
}

.patinhas div:nth-child(odd) {
  top: -48px;
}

.patinhas div:nth-child(1) {
  animation-delay: 0s;
}
.patinhas div:nth-child(2) {
  animation-delay: 0.2s;
}
.patinhas div:nth-child(3) {
  animation-delay: 0.5s;
}
.patinhas div:nth-child(4) {
  animation-delay: 0.7s;
}

@keyframes pegada {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
