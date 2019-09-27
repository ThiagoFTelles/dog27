<template>
  <section class="zoom_container" v-if="zoom">
    <section class="modal" @click.self="fecharModal">
      <div class="modal_container" @click.self="fecharModal">
        <div class="modal_img">
          <slot></slot>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "ZoomModal",
  data() {
    return {
      zoom: true
    };
  },
  methods: {
    fecharModal() {
      this.$emit("fechar", true);
    }
  }
};
</script>

<style scoped>
.modal::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 80px;
}

.modal_container {
  padding-top: 50px;
  position: relative;
  z-index: 98;
  animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate3D(50px, 0, 0);
    /* translate3d(Eixo X, Y, Z) */
  }

  to {
    opacity: 1;
    transform: translate3D(0px, 0, 0);
    /* translate3d(Eixo X, Y, Z) */
  }
}

.modal_fechar {
  border-radius: 50%;
  border: 2px solid black;
  width: 40px;
  height: 40px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1rem;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  background: #fff;
}

.modal_img {
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.2);
}

.modal_img img {
  position: relative;
  max-width: 100vw;
  max-height: 100vh;
  display: block;
}

.modal_btn {
  margin-top: 80px;
  background: #000;
  cursor: pointer;
  color: #fff;
  border: none;
  font-size: 1rem;
  padding: 10px 25px;
  font-family: "Noto Serif";
}

.modal_btn.esgotado {
  background: #808080;
}

.modal_btn:active {
  background: #808080;
}

@media screen and (max-width: 700px) {
}
</style>
