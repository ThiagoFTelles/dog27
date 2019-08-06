<template>
  <section>
    <div class="area-de-compra-container">
      <div class="area-de-compra-imagens">
        <img
          src="@/assets/detalhes-produto-principal.jpg"
          alt="Dog27"
          class="img-area-de-compra principal"
        />
        <div class="area-de-compra-thumbnail">
          <img src="@/assets/detalhes-produto-thumbnail.jpg" alt="Dog27" class="img-area-de-compra" />
        </div>
        <div class="area-de-compra-thumbnail">
          <img src="@/assets/detalhes-produto-thumbnail.jpg" alt="Dog27" class="img-area-de-compra" />
        </div>
      </div>
      <div class="area-de-compra-opcoes">
        <h1 class="banner-titulo">PEITORAL HÍBRIDO</h1>
        <p class="label-estampa">Escolha a estampa: {{estampaEscolhida.nome}}</p>
        <div class="estampas-opcoes-wrapper" @mouseleave="menuEstampas = false">
          <div class="selecionar-estampas-disponiveis" @click="mostrarEstampas">
            <img :src="estampaEscolhida.urlThumbnail" alt="Dog27" class="estampa-selecionada" />
            <img class="triangle-arrow-down" src="@/assets/triangle-arrow-down.png" alt />
          </div>
          <transition mode="out-in">
            <ul class="estampas-opcoes" @click="mostrarEstampas" v-if="menuEstampas">
              <li
                v-for="(estampa, index) in estampasDisponiveis"
                :key="`estampa-${index}`"
                @click="escolherEstampa(estampa)"
              >
                <img :src="estampa.urlThumbnail" alt="Dog27" class="estampa-opcao" />
              </li>
            </ul>
            <section v-if="!menuEstampas">
              <p class="label-estampa">Tamanho:</p>
              <div class="tamanho-area">
                <div class="selecionar-tamanho">
                  <select name="tamanhos-disponiveis" id="tamanhos-disponiveis">
                    <option value>SELECIONE O TAMANHO</option>
                    <option value="PP">PP</option>
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                  </select>
                </div>
                <div class="selecionar-quantidade">
                  <div
                    v-if="quantidadeEscolhida > 0"
                    class="alterar-quantidade"
                    @click="quantidadeEscolhida--"
                  >-</div>
                  <div v-else class="alterar-quantidade">-</div>
                  <div class="quantidade-escolhida">{{quantidadeEscolhida}}</div>
                  <div class="alterar-quantidade" @click="quantidadeEscolhida++">+</div>
                </div>
              </div>
              <div class="finalizar-compra-item">
                <p
                  v-show="quantidadeEscolhida >0"
                  class="valor-dos-itens"
                >{{variacaoEscolhida.preco * quantidadeEscolhida | numeroPreco}}</p>
                <button v-if="quantidadeEscolhida >0" class="adicionar-ao-carrinho">Comprar</button>
                <button v-else class="adicionar-ao-carrinho" disabled>Adicione produtos</button>
              </div>
            </section>
          </transition>
        </div>
      </div>
    </div>
    <div class="combo">
      <div class="combo-produtos">
        <div class="combo-produto"></div>
        <h1 class="banner-titulo">+</h1>
        <div class="combo-produto"></div>
      </div>
      <div class="combo-conteudo">
        <h1 class="combo-titulo">Aproveite e compre junto</h1>
        <p class="preco-antigo">de R$159</p>
        <p class="preco-combo">por R$140</p>
        <button v-if="quantidadeEscolhida >0" class="adicionar-ao-carrinho">Comprar</button>
        <button v-else class="adicionar-ao-carrinho" disabled>Adicione produtos</button>
      </div>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
import { mapState, mapActions } from "vuex";

export default {
  name: "AreaDeCompra",
  data() {
    return {
      menuEstampas: false,
      quantidadeEscolhida: 1,
      estampasDisponiveis: [],
      estampaEscolhida: {
        nome: "",
        urlThumbnail: "",
        idProdutoPai: ""
      },
      variacoesDisponiveis: [],
      variacaoEscolhida: {
        tamanho: "",
        preco: "",
        precoPromocional: "",
        estoque: null
      }
    };
  },
  computed: {
    ...mapState(["idCategoriaSelecionada"])
  },
  methods: {
    ...mapActions(["getBanner"]),
    getEstampas() {
      api
        .get(
          `https://marinawave.com.br/api-dog27/wp-json/wc/v3/products?category=${this.idCategoriaSelecionada}&per_page=99&on_sale=true&purchasable=true&stock_status=instock&consumer_key=ck_edc3033a3399e37cb273477f2d69b7f1192e7d49&consumer_secret=cs_288b43034883692fe6a025fc646782638b5906f9`
        )
        .then(response => {
          response.data.forEach(this.estampasDaCategoria);
          let primeiraEstampaDisponivel = this.estampasDisponiveis.find(
            function() {
              return true;
            }
          );

          this.estampaEscolhida.nome = primeiraEstampaDisponivel.estampa;
          this.estampaEscolhida.urlThumbnail =
            primeiraEstampaDisponivel.urlThumbnail;

          this.getVariacoes(primeiraEstampaDisponivel.idProdutoPai);
        });
    },
    estampasDaCategoria(item) {
      let atributoDaEstampa = item.attributes.filter(chave => {
        return chave.name === "Estampa";
      });
      let estampa = atributoDaEstampa[0].options[0];
      this.estampasDisponiveis.push({
        estampa: estampa,
        idProdutoPai: item.id,
        urlThumbnail: this.getImgEstampaUrl(estampa)
      });
    },
    estampaDisponivel(item) {
      const isOnSale = item.on_sale;
      const isPurchasable = item.purchasable;
      const estoqueDisponivel = item.stock_status === "instock";
      const quantidadeEmEstoque = item.stock_quantity > 0;

      if (
        isOnSale &&
        isPurchasable &&
        estoqueDisponivel &&
        quantidadeEmEstoque
      ) {
        item.attributes.forEach(this.nomeDaEstampa);
      }
    },
    getImgEstampaUrl(estampa) {
      var estampas = require.context("../assets/estampas/", false, /\.jpg$/);
      return estampas(
        "./Coleira_de_cachorro_" +
          estampa.toLowerCase().replace(/\s/g, "") +
          ".jpg"
      );
    },
    mostrarEstampas() {
      this.menuEstampas = !this.menuEstampas;
    },
    escolherEstampa(estampa) {
      console.log("clicada: " + estampa.estampa + estampa.idProdutoPai);
      this.estampaEscolhida.nome = estampa.estampa;
      this.estampaEscolhida.urlThumbnail = estampa.urlThumbnail;
      this.estampaEscolhida.idProdutoPai = estampa.idProdutoPai;
      this.getVariacoes(estampa.idProdutoPai);
    },
    getVariacoes(idProdutoPai) {
      api
        .get(
          `https://marinawave.com.br/api-dog27/wp-json/wc/v3/products/${idProdutoPai}/variations?per_page=99&on_sale=true&purchasable=true&stock_status=instock&consumer_key=ck_edc3033a3399e37cb273477f2d69b7f1192e7d49&consumer_secret=cs_288b43034883692fe6a025fc646782638b5906f9`
        )
        .then(response => {
          this.variacoesDisponiveis = [];
          response.data.forEach(this.variacoesDaEstampa);
        })
        .then(() => {
          let primeiraVariacaoDisponivel = this.variacoesDisponiveis.find(
            function() {
              return true;
            }
          );
          this.variacaoEscolhida.preco = primeiraVariacaoDisponivel.preco;
          this.variacaoEscolhida.precoPromocional =
            primeiraVariacaoDisponivel.precoPromocional;
          this.variacaoEscolhida.estoque = primeiraVariacaoDisponivel.estoque;
          this.variacaoEscolhida.id = primeiraVariacaoDisponivel.id;
          this.variacaoEscolhida.tamanho = primeiraVariacaoDisponivel.tamanho;
          console.log("variacaoEscolhida = " + this.variacaoEscolhida.id);
          console.log(
            "variacaoEscolhida Estoque = " + this.variacaoEscolhida.estoque
          );
        });
    },
    variacoesDaEstampa(item) {
      console.log(item);
      let atributoDoTamanho = item.attributes.filter(chave => {
        return chave.name === "Tamanho";
      });
      let tamanho = atributoDoTamanho[0].option;

      this.variacoesDisponiveis.push({
        id: item.id,
        tamanho: tamanho,
        preco: item.regular_price,
        precoPromocional: item.sale_price
          ? item.sale_price
          : item.regular_price,
        estoque: item.stock_quantity
      });
    }
  },
  watch: {
    url() {
      this.getEstampas();
    }
  },
  created() {
    this.getEstampas();
  }
};
</script>

<style scoped>
.area-de-compra-container {
  display: grid;
  grid-template-columns: 65% 35%;
  max-width: 1000px;
  padding-top: 80px;
  margin: 0 auto;
  height: 550px;
}

.banner-titulo {
  margin: 10px;
  font-family: "Fira Sans", sans-serif;
  text-align: center;
  font-size: 2em;
  font-style: italic;
  color: black;
}

.area-de-compra-imagens {
  text-align: center;
}

.area-de-compra-opcoes {
  text-align: center;
}

.area-de-compra-thumbnail {
  display: inline-block;
}

.area-de-compra-thumbnail img {
  max-width: 100px;
}

.area-de-compra-container div img.principal {
  width: 450px;
  max-width: 100%;
  margin: 0 auto;
}

.label-estampa {
  color: #3c3939;
  font-family: sans-serif;
  font-weight: 600;
  font-style: italic;
  font-size: 0.8rem;
  text-align: left;
  margin: 8px 3px;
}

.estampas-opcoes-wrapper {
  width: fit-content;
}

.selecionar-estampas-disponiveis {
  display: flex;
  align-items: center;
  height: 50px;
  border: 1px solid #ccc;
  padding: 0 15px;
  text-align: center;
  width: 100%;
  cursor: pointer;
}

.estampa-selecionada {
  max-width: 300px;
  display: inline;
}

.triangle-arrow-down {
  max-width: 20px;
  display: inline;
}

.estampas-opcoes {
  border: 1px solid #ccc;
  background: #fff;
  overflow: overlay;
  height: 250px;
}
.estampa-opcao {
  max-width: 100%;
  display: block;
  padding: 7px 8px;
}

.estampa-opcao:hover {
  background: #e9e8e9;
}

.estampas-opcoes img {
  padding: 10px;
}

.tamanho-area {
  display: flex;
  align-items: center;
  height: 50px;

  padding: 0;
  text-align: center;
  width: 100%;
  justify-content: space-between;
}

.selecionar-tamanho {
  height: 50px;
  display: inherit;
}

.selecionar-quantidade {
  border: 1px solid #ccc;
  height: 50px;
  align-items: center;
  display: flex;
}

.quantidade-escolhida {
  display: inline-block;
  font-style: italic;
  color: #3c3939;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 1rem;
}

.alterar-quantidade {
  display: inline-block;
  cursor: pointer;
  padding: 5px 15px;
  font-style: italic;
  color: #3c3939;
  font-family: sans-serif;
  font-size: 1rem;
}

#tamanhos-disponiveis {
  padding: 0 20px;
  border: 1px solid #ccc;
}

.finalizar-compra-item {
  padding: 50px 0;
}

.valor-dos-itens {
  font-family: sans-serif;
  font-style: italic;
  font-size: 1.3rem;
  margin: 15px 0;
}

.adicionar-ao-carrinho {
  background: #24a9de;
  border: none;
  color: #fff;
  width: 100%;
  height: 40px;
  margin: 0;
  font-weight: 600;
  font-size: 1.3rem;
  font-family: sans-serif;
  cursor: pointer;
}

.adicionar-ao-carrinho:disabled {
  background: rgb(156, 156, 156);
  color: #fff;
}

.combo {
  display: grid;
  display: flex;
  flex-wrap: wrap;
  background: #0e6a8d;
  text-align: center;
}

.combo-produtos {
  display: flex;
  align-items: center;
  height: 350px;
  grid-column: 1/3;
  padding: 20px 0;
  margin: 0 auto;
}

.combo-produto {
  display: inline-block;
  background: #fff;
  width: 300px;
  height: 100%;
  margin: 20px 30px;
}

.combo .banner-titulo {
  color: #fff;
  font-size: 5rem;
  font-style: italic;
}

.combo-conteudo {
  margin: auto;
}

.combo-titulo {
  color: #fff;
  font-family: Fira Sans, Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 3rem;
}

.preco-antigo {
  color: #fff;
  text-decoration: line-through;
  font-size: 1rem;
  font-family: sans-serif;
  padding: 10px;
}

.preco-combo {
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
}

.combo .adicionar-ao-carrinho {
  background: #fff;
  color: #0e6a8d;
  padding: 10px 90px;
  margin: 20px;
  width: auto;
}

.combo-conteudo div {
  color: #fff;
  margin: 30px;
  font-size: 1rem;
  font-weight: 100;
}
</style>
