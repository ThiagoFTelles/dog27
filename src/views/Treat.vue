<template>
  <section>
    <transition mode="out-in">
      <section class="call-to-buy-container">
        <div class="call-to-buy" v-if="!mostrarAreaDeCompra" key="header-compra">
          <div>
            <p>Treats</p>
          </div>
          <div>
            <p class="medidas" @click="scrollMeTo('sabores')">Sabores</p>
            <button @click="vaiComprar">Comprar</button>
          </div>
        </div>
      </section>
    </transition>
    <transition mode="out-in">
      <AreaDeCompraTreats
        :produto="categoriaNome"
        v-show="mostrarAreaDeCompra"
        key="area-de-compra"
      ></AreaDeCompraTreats>
    </transition>
    <div class="peitoral-container">
      <div class="texto-box treats-header">
        <div class="width-limit big">
          <img
            src="@/assets/treat/pagina-de-petisco-02.png"
            alt="Petisco para cahorro dog27"
            class="img-header left"
          />
          <div class="header-text">
            <h1 class="saiba-mais-titulo cursive">Treats</h1>
            <p
              class="saiba-mais-paragrafo"
            >Petiscos saudáveis, 100% naturais, livre de corantes e com conservantes naturais.</p>
          </div>
          <img
            src="@/assets/treat/pagina-de-petisco-03.png"
            alt="Petisco para cahorro dog27"
            class="img-header right"
          />
        </div>
      </div>
      <div class="width-limit">
        <img
          src="@/assets/treat/pagina-de-petisco-todos-os-sabores.jpg"
          alt="Petisco para cahorro dog27"
          class="peitoral-detalhe"
        />
        <div class="texto-box">
          <h1 class="saiba-mais-titulo">O TAMANHO PERFEITO!</h1>
          <div class="tamanho-area">
            <div class="imagem-do-tamanho">
              <img
                src="@/assets/treat/pagina-de-petisco-calm-todos-os-tamanhos.jpg"
                alt="Petisco para cahorro dog27"
                class
              />
            </div>
            <div class="textos-do-tamanho">
              <h1 class="saiba-mais-subtitulo">150G OU 40G?</h1>
              <p
                class="saiba-mais-paragrafo maior"
              >O tamanho ideal para sua aventura. Seja para levar para um passseio rapido, um treinamento ou para dar de sobremesa após as refeições. O tamanho pequeno vem equipado com o sistema de abertura facil, para auxiliar o manuseio em casa ou na rua. Já o Grande, conta com ziplock, para abrir, pegar um petisquinho e fechar de novo. Dessa forma, seu dog sempre tera um petisco crocante e fresquinho.</p>
            </div>
          </div>
        </div>
        <div class="texto-box">
          <h1 class="saiba-mais-titulo">COMPOSIÇÃO</h1>
          <div class="tamanho-area">
            <div class="sabor">
              <div class="textos-da-composicao left">
                <h1 class="saiba-mais-subtitulo">TREATS CAMOMILA E PASSIFLORA</h1>
                <p
                  class="saiba-mais-paragrafo maior"
                >Composição Básica: Farinha de trigo, arroz quebrado, grão de trigo, farinha de peru, óleo de frango, hidrolisado de fígado suíno, açúcar cristal, cloreto de sódio (sal comum), bicarbonato de sódio, camomila (Matricaria recutita L. – 0,1%), passiflora (Passiflora incarnata L. - 0,1%), antioxidante natural (tocoferol e essência de alecrim), propionato de cálcio.</p>
              </div>
              <div class="imagem-da-composicao right">
                <img
                  src="@/assets/treat/Petisco-para-cachorro-dog27-calm.jpg"
                  alt="Petisco para cahorro dog27"
                  class
                />
              </div>
            </div>
            <div class="sabor">
              <div class="imagem-da-composicao right">
                <img
                  src="@/assets/treat/Petisco-para-cachorro-dog27-dental.jpg"
                  alt="Petisco para cahorro dog27"
                  class
                />
              </div>
              <div class="textos-da-composicao left">
                <h1 class="saiba-mais-subtitulo">TREATS HORTELÃ E EUCALIPTO</h1>
                <p
                  class="saiba-mais-paragrafo maior"
                >Composição Básica: Farinha de trigo, arroz quebrado, grão de trigo, farinha de peru, óleo de frango, hidrolisado de fígado suíno, cloreto de sódio (sal comum), bicarbonato de sódio, hortelã (Mentha piperita – 1%), óleo de eucalipto (0,1%), antioxidante natural (tocoferol e essência de alecrim), propionato de cálcio.</p>
              </div>
            </div>
            <div class="sabor">
              <div class="textos-da-composicao left">
                <h1 class="saiba-mais-subtitulo">TREATS SALMÃO E LINHAÇA</h1>
                <p
                  class="saiba-mais-paragrafo maior"
                >Composição Básica: Farinha de trigo, arroz quebrado, grão de trigo, farinha de peru, óleo de frango, hidrolisado de fígado suíno, farinha de salmão (1%), semente de linhaça (1%), açúcar cristal, cloreto de sódio (sal comum), bicarbonato de sódio, antioxidante natural (tocoferol e essência de alecrim), propionato de cálcio.</p>
              </div>
              <div class="imagem-da-composicao right">
                <img
                  src="@/assets/treat/Petisco-para-cachorro-dog27-dermato.jpg"
                  alt="Petisco para cahorro dog27"
                  class
                />
              </div>
            </div>
            <div class="sabor">
              <div class="imagem-da-composicao right">
                <img
                  src="@/assets/treat/Petisco-para-cachorro-dog27-digestivo.jpg"
                  alt="Petisco para cahorro dog27"
                  class
                />
              </div>
              <div class="textos-da-composicao left">
                <h1 class="saiba-mais-subtitulo">TREATS MAÇÃ E CÚRCUMA</h1>
                <p
                  class="saiba-mais-paragrafo maior"
                >Farinha de trigo, arroz quebrado, grão de trigo, farinha de peru, óleo de frango, hidrolisado de fígado suíno, açúcar cristal, cloreto de sódio (sal comum), bicarbonato de sódio, maçã desidratada (0,3%), prebiótico (mannan-oligossacarídeos – 0,2%), cúrcuma (Curcuma longa L. - 0,1%), antioxidante natural (tocoferol e essência de alecrim), propionato de cálcio.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
import AreaDeCompraTreats from "@/components/AreaDeCompraTreats.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Treat",
  props: { comprar: Boolean },
  components: { AreaDeCompraTreats },
  data() {
    return {
      produtos: null,
      produto: null,
      categoriaNome: "Treats",
      estampa: null,
      tamanho: null,
      estoque: null,
      categoriaId: 56,
      idCategoriaCombo: 56
    };
  },
  methods: {
    ...mapActions(["selecionarCategoria", "switchAreaDeCompra"]),
    vaiComprar() {
      this.switchAreaDeCompra(true);
      this.scrollBehavior();
    },
    getProdutos() {
      var page = 1;
      var url = `/products/${this.categoriaId}/variations?page=${page}&stock_status=instock&status=publish&orderby=slug`;
      api.getApiWc(url).then(r => {
        const paginas = 3; //Number(r.headers["x-wp-totalpages"]);
        var i;
        for (i = 2; i <= paginas; i++) {
          page = i;
          url = `/products/${this.categoriaId}/variations?page=${page}&stock_status=instock&status=publish&orderby=slug`;
        }
        this.produtos = r.data;
        r.data.forEach(this.getProduto);
        r.data.forEach(this.ProdutoEstoque);
        r.data.forEach(this.ProdutoNome);
      });
    },
    ProdutoNome(item, index) {
      if (index === 0) {
        item.attributes.forEach(
          (
            item //Quando eu uso aerofunction ele não usa o "this." dentro do contexto da function e sim no contexto do elemento pai, assim consigo acessar o "this.produto".
          ) => {
            if (item.name === "Produto") {
              this.produto = item.option;
              document.title = item.option;
            }
          }
        );
      }
    },
    getProduto(item) {
      item.attributes.forEach(this.ProdutoEstampa);
      item.attributes.forEach(this.ProdutoTamanho);
    },
    ProdutoEstampa(item) {
      if (item.name === "Estampa") {
        this.estampa = item.option;
      }
    },
    ProdutoTamanho(item) {
      if (item.name === "Tamanho") {
        this.tamanho = item.option;
      }
    },
    ProdutoEstoque(item) {
      this.estoque = item.stock_quantity;
    },
    scrollBehavior() {
      return window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  computed: {
    ...mapState({
      mostrarAreaDeCompra: state => state.areaDeCompra.mostrarAreaDeCompra
    }),
    ...mapState(["idCategoriaSelecionada"])
  },
  created() {
    let categorias = {
      categoriaId: this.categoriaId,
      categoriaComboId: this.idCategoriaCombo
    };
    this.selecionarCategoria(categorias);

    if (this.comprar === true || true == true) {
      //aqui a barra de compras sempre estará ativada
      this.vaiComprar();
    } else if (this.comprar === false && this.mostrarAreaDeCompra === true) {
      this.switchAreaDeCompra(false);
    }
  },
  watch: {
    mostrarAreaDeCompra() {
      this.scrollBehavior();
    }
  }
};
</script>

<style scoped>
section {
  background: #fff;
}

.call-to-buy {
  max-width: 950px;
  width: 100%;
  padding: 7px 3px;
  border-bottom: 1px solid #ccc;
  box-shadow: 0px 2px 1px -2px rgba(30, 60, 90, 0.1);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.call-to-buy div p {
  display: inline-block;
  font-size: 1rem;
  color: #2f2c2c;
}

.call-to-buy div button {
  margin-left: 20px;
  background: #239dce;
  background-image: linear-gradient(rgba(255, 255, 255, 0.2) 10%, #239dce);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 5px 20px;
  font-weight: 600;
  cursor: pointer;
}

.medidas {
  cursor: pointer;
}

.texto-box {
  margin-bottom: 50px;
}

.treats-header {
  background: #0045af;
  padding-bottom: 15px;
}

.width-limit {
  max-width: 930px;
  margin: 0 auto;
  padding: 15px;
}

.width-limit.big {
  max-width: 1200px;
  margin: 0 auto;
}

.treats-header .width-limit {
  position: relative;
}

.treats-header h1 {
  color: white;
}

.treats-header p {
  width: 380px;
  margin: 0 auto;
  color: white;
}
.treats-header .header-text {
  width: 450px;
  margin: 0 auto;
}

.img-header {
  max-height: 330px;
  position: absolute;
  top: 0;
}

.img-header.left {
  left: 0;
}
.img-header.right {
  right: 0;
}

.imagem-do-tamanho {
  max-width: 450px;
  display: inline-block;
}

.textos-do-tamanho {
  display: inline-block;
  max-width: 450px;
}

.sabor {
  display: flex;
}

.imagem-da-composicao,
.textos-da-composicao {
  display: block;
  flex-basis: 50%;
}

.saiba-mais-titulo {
  padding-top: 50px;
  font-family: "Fira Sans", sans-serif;
  text-align: center;
  font-size: 3em;
  font-style: italic;
  color: black;
  margin: 0 auto;
}

.cursive {
  font-family: "Shadows Into Light Two", cursive;
  font-size: 6em;
  padding-top: 5px;
}

.saiba-mais-subtitulo {
  font-family: "Fira Sans", sans-serif;
  text-align: center;
  font-size: 2em;
  font-style: italic;
  color: black;
  margin: 0 auto;
  padding-top: 100px;
  padding-bottom: 50px;
}

.saiba-mais-paragrafo {
  font-family: "Fira Sans", sans-serif;
  color: black;
  text-align: center;

  font-weight: 200;
}

.saiba-mais-paragrafo .maior {
  font-size: 1.4rem;
}

img {
  margin: 0 auto;
}

.peitoral-demonstracao {
  max-width: 800px;
  height: auto;
  padding: 50px;
}

.peitoral-estampa {
  margin: 0;
  width: 100%;
}

.peitoral-tamanhos-container {
  text-align: center;
}

.peitoral-tamanhos {
  display: inline-block;
}

.design-info-container {
  text-align: center;
  padding: 20px;
}

.design-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  display: inline-block;
}

.design-info.left {
  justify-items: end;
}

.design-info.right {
  justify-items: start;
}

.design-info-chunk {
  display: grid;
  grid-template-columns: 55px 1fr;
  margin-bottom: 10px;
}

.design-info-chunk span {
  border: 2px solid black;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 5px;
}

.design-info-chunk span img {
  /* height: 20px; */
  vertical-align: middle;
  display: inline;
}

.design-info-chunk p {
  margin: auto 20px;
  text-align: left;
  font-size: 1.1rem;
}
.comprar-agora {
  display: grid;
  grid-template-rows: 175px 1fr 1fr;
  background: url("../assets/coleira/pagina de coleiras-05.jpg") no-repeat
    center center;
  width: 600px;
  height: 400px;
  margin: auto;
  text-align: center;
}

.comprar-agora h2 {
  font-size: 1.5rem;
  grid-row-start: 2;
  color: #fff;
}

.btn-vazado {
  grid-row-start: 3;
}

.btn-vazado button {
  background: none;
  padding: 8px 15px;
  border: 3px solid #fff;
  color: #fff;
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  .peitoral-demonstracao {
    max-width: 100%;
  }
  .saiba-mais-subtitulo {
    padding-top: 20px;
  }
  .peitoral-estampa {
    margin-bottom: 50px;
  }
  .comprar-agora {
    width: auto;
  }

  .img-header {
    height: 90%;
    max-width: 30%;
  }

  .cursive {
    font-size: 3em;
  }

  .treats-header .header-text {
    width: 100%;
  }
  .treats-header p {
    width: 200px;
    font-size: 0.9rem;
  }

  .sabor {
    flex-flow: column nowrap;
  }

  .left {
    order: 2;
  }
}
</style>
