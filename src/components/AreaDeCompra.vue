<template>
  <section>
    <section v-if="this.isMobile === false" class="desktop">
      <div v-if="variacoesDisponiveis.length" class="area-de-compra-container">
        <div class="area-de-compra-imagens">
          <img :src="estampaEscolhida.fotoClicada" alt="Dog27" class="img-area-de-compra principal" />
          <div
            v-for="imagem in estampaEscolhida.srcFotos"
            :key="imagem.src"
            class="area-de-compra-thumbnail"
          >
            <img
              :src="imagem.src"
              alt="Dog27"
              class="img-area-de-compra"
              @click="destacarFoto(imagem)"
            />
          </div>
        </div>
        <div class="area-de-compra-opcoes">
          <h1 class="banner-titulo">{{produto | uppercase}}</h1>
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
                <p class="label-estampa">Tamanho: {{variacaoEscolhida.tamanho}}</p>

                <div class="tamanho-area">
                  <div class="selecionar-tamanho">
                    <div
                      class="tamanhos-disponiveis"
                      @click="mostrarTamanhos"
                      v-if="!menuTamanhos"
                    >{{variacaoEscolhida.tamanho}}</div>
                    <ul
                      v-else
                      @click="mostrarTamanhos"
                      name="tamanhos-disponiveis"
                      class="tamanhos-disponiveis"
                    >
                      <li
                        v-for="variacao in variacoesDisponiveis"
                        :value="variacao.tamanho"
                        :key="variacao.tamanho"
                        @click="escolherVariacao(variacao)"
                      >{{variacao.tamanho}}</li>
                    </ul>
                  </div>
                  <div class="selecionar-quantidade">
                    <div
                      v-if="quantidadeEscolhida > 0"
                      class="alterar-quantidade"
                      @click="reduzirQuantidadeEscolhida"
                    >-</div>
                    <div v-else class="alterar-quantidade">-</div>
                    <div class="quantidade-escolhida">{{quantidadeEscolhida}}</div>
                    <div class="alterar-quantidade" @click="aumentarQuantidadeEscolhida">+</div>
                  </div>
                </div>
                <div class="finalizar-compra-item">
                  <p
                    v-show="quantidadeEscolhida >0"
                    class="valor-dos-itens"
                  >{{variacaoEscolhida.preco * quantidadeEscolhida | numeroPreco}}</p>
                  <p
                    v-if="this.variacaoEscolhida.estoque <= 0 && this.quantidadeEscolhida==1"
                  >Última unidade!</p>
                  <p v-else-if="this.variacaoEscolhida.estoque <= 0">Estoque esgotado</p>
                  <button
                    v-if="quantidadeEscolhida >0"
                    class="adicionar-ao-carrinho"
                    @click="colocarNoCarrinho(variacaoEscolhida)"
                  >Comprar</button>
                  <button v-else class="adicionar-ao-carrinho" disabled>Adicione produtos</button>
                </div>
              </section>
            </transition>
          </div>
        </div>
      </div>
      <PaginaCarregando v-else />
      <section v-if="mostrarComboArea">
        <div class="combo" v-if="produtoCombo">
          <div class="combo-produtos">
            <div class="combo-produto">
              <img :src="estampaEscolhida.fotoClicada" alt="Dog27" class="img-combo" />
              <h1
                class="combo-banner-titulo"
              >{{produto | uppercase}} PARA CACHORROS {{estampaEscolhida.nome | uppercase}}</h1>

              <p class="label-estampa">Tamanho: {{variacaoEscolhida.tamanho}}</p>
              <div class="tamanho-area-combo">
                <div class="selecionar-tamanho">
                  <div
                    class="tamanhos-disponiveis"
                    @click="mostrarTamanhos"
                    v-if="!menuTamanhos"
                  >{{variacaoEscolhida.tamanho}}</div>
                  <ul
                    v-else
                    @click="mostrarTamanhos"
                    name="tamanhos-disponiveis"
                    class="tamanhos-disponiveis"
                  >
                    <li
                      v-for="variacao in variacoesDisponiveis"
                      :value="variacao.tamanho"
                      :key="variacao.tamanho"
                      @click="escolherVariacao(variacao)"
                    >{{variacao.tamanho}}</li>
                  </ul>
                </div>
                <div class="selecionar-quantidade">
                  <div
                    v-if="quantidadeEscolhida > 0"
                    class="alterar-quantidade"
                    @click="reduzirQuantidadeEscolhida"
                  >-</div>
                  <div v-else class="alterar-quantidade">-</div>
                  <div class="quantidade-escolhida">{{quantidadeEscolhida}}</div>
                  <div class="alterar-quantidade" @click="aumentarQuantidadeEscolhida">+</div>
                </div>
              </div>
            </div>
            <h1 class="banner-titulo">+</h1>
            <div class="combo-produto indicado">
              <img :src="produtoCombo.imgUrl" alt="Dog27" class="img-combo" />
              <h1
                class="combo-banner-titulo"
              >{{nomeDoProdutoCombo}} {{estampaEscolhida.nome | uppercase}}</h1>

              <p class="label-estampa">Tamanho: {{produtoCombo.tamanho}}</p>
              <div class="tamanho-area-combo">
                <div class="selecionar-tamanho">
                  <div class="tamanhos-disponiveis" v-if="!menuTamanhos">{{produtoCombo.tamanho}}</div>
                </div>
                <div class="selecionar-quantidade">
                  <div
                    v-if="quantidadeEscolhida > 0"
                    class="alterar-quantidade"
                    @click="reduzirQuantidadeEscolhida"
                  >-</div>
                  <div v-else class="alterar-quantidade">-</div>
                  <div class="quantidade-escolhida">{{quantidadeEscolhida}}</div>
                  <div class="alterar-quantidade" @click="aumentarQuantidadeEscolhida">+</div>
                </div>
              </div>
            </div>
          </div>
          <div class="combo-conteudo">
            <h1 class="combo-titulo">Aproveite e compre junto</h1>
            <p class="preco-antigo">de {{precoCombo.antigo | numeroPreco}}</p>
            <p class="preco-combo">por {{precoCombo.novo | numeroPreco}}</p>
            <button
              v-if="quantidadeEscolhida >0"
              class="adicionar-ao-carrinho"
              @click="colocarComboNoCarrinho(comboEscolhido)"
            >Comprar</button>
            <button v-else class="adicionar-ao-carrinho" disabled>Adicione produtos</button>
          </div>
        </div>
        <PaginaCarregando v-else />
      </section>
    </section>

    <section v-else class="mobile">
      <div v-if="variacoesDisponiveis.length" class="area-de-compra-container">
        <h1 class="banner-titulo">{{produto | uppercase}}</h1>
        <div class="area-de-compra-imagens">
          <img :src="estampaEscolhida.fotoClicada" alt="Dog27" class="img-area-de-compra principal" />
          <div
            v-for="imagem in estampaEscolhida.srcFotos"
            :key="imagem.src"
            class="area-de-compra-thumbnail"
          >
            <img
              :src="imagem.src"
              alt="Dog27"
              class="img-area-de-compra"
              @click="destacarFoto(imagem)"
            />
          </div>
        </div>
        <div class="area-de-compra-opcoes">
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
                <p class="label-estampa">Tamanho: {{variacaoEscolhida.tamanho}}</p>

                <div class="tamanho-area">
                  <div class="selecionar-tamanho">
                    <div
                      class="tamanhos-disponiveis"
                      @click="mostrarTamanhos"
                      v-if="!menuTamanhos"
                    >{{variacaoEscolhida.tamanho}}</div>
                    <ul
                      v-else
                      @click="mostrarTamanhos"
                      name="tamanhos-disponiveis"
                      class="tamanhos-disponiveis"
                    >
                      <li
                        v-for="variacao in variacoesDisponiveis"
                        :value="variacao.tamanho"
                        :key="variacao.tamanho"
                        @click="escolherVariacao(variacao)"
                      >{{variacao.tamanho}}</li>
                    </ul>
                  </div>
                  <div class="selecionar-quantidade">
                    <div
                      v-if="quantidadeEscolhida > 0"
                      class="alterar-quantidade"
                      @click="reduzirQuantidadeEscolhida"
                    >-</div>
                    <div v-else class="alterar-quantidade">-</div>
                    <div class="quantidade-escolhida">{{quantidadeEscolhida}}</div>
                    <div class="alterar-quantidade" @click="aumentarQuantidadeEscolhida">+</div>
                  </div>
                </div>
                <div class="finalizar-compra-item">
                  <p
                    v-show="quantidadeEscolhida >0"
                    class="valor-dos-itens"
                  >{{variacaoEscolhida.preco * quantidadeEscolhida | numeroPreco}}</p>
                  <p
                    v-if="this.variacaoEscolhida.estoque <= 0 && this.quantidadeEscolhida==1"
                  >Última unidade!</p>
                  <p v-else-if="this.variacaoEscolhida.estoque <= 0">Estoque esgotado</p>
                  <button
                    v-if="quantidadeEscolhida >0"
                    class="adicionar-ao-carrinho"
                    @click="colocarNoCarrinho(variacaoEscolhida)"
                  >Comprar</button>
                  <button v-else class="adicionar-ao-carrinho" disabled>Adicione produtos</button>
                </div>
              </section>
            </transition>
          </div>
        </div>
      </div>
      <PaginaCarregando v-else />
      <section v-if="mostrarComboArea">
        <div class="combo" v-if="produtoCombo">
          <div class="combo-produtos">
            <div class="combo-produto principal">
              <img :src="estampaEscolhida.fotoClicada" alt="Dog27" class="img-combo" />
              <h1
                class="combo-banner-titulo"
              >{{produto | uppercase}} PARA CACHORROS {{estampaEscolhida.nome | uppercase}}</h1>

              <p class="label-estampa">Tamanho: {{variacaoEscolhida.tamanho}}</p>
              <div class="tamanho-area-combo">
                <div class="selecionar-tamanho">
                  <div
                    class="tamanhos-disponiveis"
                    @click="mostrarTamanhos"
                    v-if="!menuTamanhos"
                  >{{variacaoEscolhida.tamanho}}</div>
                  <ul
                    v-else
                    @click="mostrarTamanhos"
                    name="tamanhos-disponiveis"
                    class="tamanhos-disponiveis"
                  >
                    <li
                      v-for="variacao in variacoesDisponiveis"
                      :value="variacao.tamanho"
                      :key="variacao.tamanho"
                      @click="escolherVariacao(variacao)"
                    >{{variacao.tamanho}}</li>
                  </ul>
                </div>
                <div class="selecionar-quantidade">
                  <div
                    v-if="quantidadeEscolhida > 0"
                    class="alterar-quantidade"
                    @click="reduzirQuantidadeEscolhida"
                  >-</div>
                  <div v-else class="alterar-quantidade">-</div>
                  <div class="quantidade-escolhida">{{quantidadeEscolhida}}</div>
                  <div class="alterar-quantidade" @click="aumentarQuantidadeEscolhida">+</div>
                </div>
              </div>
            </div>
            <h1 class="banner-titulo mais">+</h1>
            <div class="combo-produto indicado">
              <img :src="produtoCombo.imgUrl" alt="Dog27" class="img-combo" />
              <h1
                class="combo-banner-titulo"
              >{{nomeDoProdutoCombo}} {{estampaEscolhida.nome | uppercase}}</h1>

              <p class="label-estampa">Tamanho: {{produtoCombo.tamanho}}</p>
              <div class="tamanho-area-combo">
                <div class="selecionar-tamanho">
                  <div class="tamanhos-disponiveis" v-if="!menuTamanhos">{{produtoCombo.tamanho}}</div>
                </div>
                <div class="selecionar-quantidade">
                  <div
                    v-if="quantidadeEscolhida > 0"
                    class="alterar-quantidade"
                    @click="reduzirQuantidadeEscolhida"
                  >-</div>
                  <div v-else class="alterar-quantidade">-</div>
                  <div class="quantidade-escolhida">{{quantidadeEscolhida}}</div>
                  <div class="alterar-quantidade" @click="aumentarQuantidadeEscolhida">+</div>
                </div>
              </div>
            </div>
          </div>
          <div class="combo-conteudo">
            <h1 class="combo-titulo">Aproveite e compre junto</h1>
            <p class="preco-antigo">de {{precoCombo.antigo | numeroPreco}}</p>
            <p class="preco-combo">por {{precoCombo.novo | numeroPreco}}</p>
            <button
              v-if="quantidadeEscolhida >0"
              class="adicionar-ao-carrinho"
              @click="colocarComboNoCarrinho(comboEscolhido)"
            >Comprar</button>
            <button v-else class="adicionar-ao-carrinho" disabled>Adicione produtos</button>
          </div>
        </div>
        <PaginaCarregando v-else />
      </section>
    </section>
  </section>
</template>

<script>
import { api } from "@/services.js";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "AreaDeCompra",
  data() {
    return {
      menuEstampas: false,
      menuTamanhos: false,
      quantidadeEscolhida: 1,
      estampasDisponiveis: [],
      estampaEscolhida: {
        nomeDoProduto: "",
        idProdutoPai: "",
        nome: "",
        srcFotos: [],
        fotoClicada: "",
        urlThumbnail: ""
      },
      variacoesDisponiveis: [],
      variacaoEscolhida: {
        fotoUrl: "",
        estampa: "",
        categoria: "",
        tamanho: "",
        sku: "",
        preco: "",
        precoPromocional: "",
        estoque: null,
        nomeDoProduto: "",
        valorUnitarioCobrado: "",
        peso: "",
        idProdutoPai: "",
        idDaVariacao: "",
        quantidade: 0
      },
      produtoCombo: null,
      nomeDoProdutoCombo: "",
      mostrarComboArea: true,
      quantidadeDaVariacaoSelecionadaNoCarrinho: null
    };
  },
  props: ["produto"],
  computed: {
    ...mapState({
      carrinho: state => state.cart.carrinho,
      estampaRedirecionada: state => state.areaDeCompra.estampaRedirecionada
    }),
    ...mapState(["idCategoriaSelecionada", "idCategoriaCombo"]),
    ...mapGetters(["isMobile"]),
    precoCombo() {
      let precoCombo = {
        antigo: null,
        novo: null
      };

      let valorSemCombo =
        Number(this.variacaoEscolhida.preco) + Number(this.produtoCombo.preco);
      let valorComCombo =
        Number(this.variacaoEscolhida.precoPromocional) +
        Number(this.produtoCombo.precoPromocional);

      precoCombo.antigo = this.quantidadeEscolhida * valorSemCombo;
      precoCombo.novo = this.quantidadeEscolhida * valorComCombo;

      return precoCombo;
    },
    comboEscolhido() {
      let produto_1 = {
        fotoUrl: this.variacaoEscolhida.fotoUrl,
        categoria: this.variacaoEscolhida.categoria,
        estampa: this.variacaoEscolhida.estampa,
        tamanho: this.variacaoEscolhida.tamanho,
        sku: this.variacaoEscolhida.sku,
        preco: this.variacaoEscolhida.preco,
        precoPromocional: this.variacaoEscolhida.precoPromocional,
        estoque: this.variacaoEscolhida.estoque,
        nomeDoProduto: this.variacaoEscolhida.nomeDoProduto,
        valorUnitarioCobrado: this.variacaoEscolhida.precoPromocional,
        peso: this.variacaoEscolhida.peso,
        idProdutoPai: this.variacaoEscolhida.idProdutoPai,
        idDaVariacao: this.variacaoEscolhida.idDaVariacao,
        quantidade: this.variacaoEscolhida.quantidade,
        comboInicial: true,
        comboFinal: false
      };

      let produto_2 = {
        fotoUrl: this.produtoCombo.fotoUrl,
        categoria: this.produtoCombo.categoria,
        estampa: this.produtoCombo.estampa,
        tamanho: this.produtoCombo.tamanho,
        sku: this.produtoCombo.sku,
        preco: this.produtoCombo.preco,
        precoPromocional: this.produtoCombo.precoPromocional,
        estoque: this.produtoCombo.estoque,
        nomeDoProduto:
          this.nomeDoProdutoCombo +
          " " +
          this.estampaEscolhida.nome +
          " " +
          this.produtoCombo.tamanho,
        valorUnitarioCobrado: this.produtoCombo.precoPromocional,
        peso: this.produtoCombo.pesoUnitario,
        idProdutoPai: this.produtoCombo.idProdutoPai,
        idDaVariacao: this.produtoCombo.idDaVariacao,
        quantidade: this.variacaoEscolhida.quantidade,
        comboInicial: false,
        comboFinal: true
      };

      let combo = [produto_1, produto_2];
      return combo;
    }
  },
  methods: {
    ...mapActions([
      "adicionarItemAoCarrinho",
      "switchAreaDeCompra",
      "redirecionarEstampa"
    ]),
    aumentarQuantidadeEscolhida() {
      if (this.variacaoEscolhida.estoque > 0 && this.quantidadeEscolhida < 5) {
        this.quantidadeEscolhida++;
        this.variacaoEscolhida.estoque--;
      }
    },
    reduzirQuantidadeEscolhida() {
      this.quantidadeEscolhida--;
      this.variacaoEscolhida.estoque++;
    },
    getEstampas() {
      this.estampasDisponiveis = [];
      api
        .get(
          `https://marinawave.com.br/api-dog27/wp-json/wc/v3/products?category=${this.idCategoriaSelecionada}&per_page=99&on_sale=true&purchasable=true&stock_status=instock&consumer_key=${process.env.VUE_APP_CONSUMER_KEY}&consumer_secret=${process.env.VUE_APP_CONSUMER_SECRET}`
        )
        .then(response => {
          response.data.forEach(this.estampasDaCategoria);
        })
        .then(() => {
          let primeiraEstampaDisponivel = this.estampaRedirecionada
            ? this.estampaRedirecionada
            : this.estampasDisponiveis.find(function() {
                return true;
              });

          this.estampaEscolhida.nome = primeiraEstampaDisponivel.estampa;
          this.estampaEscolhida.srcFotos = primeiraEstampaDisponivel.srcFotos;
          this.estampaEscolhida.fotoClicada =
            primeiraEstampaDisponivel.srcFotos[0].src;
          this.estampaEscolhida.idProdutoPai =
            primeiraEstampaDisponivel.idProdutoPai;
          this.estampaEscolhida.urlThumbnail =
            primeiraEstampaDisponivel.urlThumbnail;
          this.estampaEscolhida.nomeDoProduto =
            primeiraEstampaDisponivel.nomeDoProduto +
            " " +
            primeiraEstampaDisponivel.estampa;
          this.estampaEscolhida.categoria =
            primeiraEstampaDisponivel.nomeDoProduto;
          this.estampaEscolhida.estampa = primeiraEstampaDisponivel.estampa;

          this.getVariacoes(primeiraEstampaDisponivel.idProdutoPai);
        })
        .then(() => {
          this.redirecionarEstampa(null);
        });
    },
    estampasDaCategoria(item) {
      let atributoDaEstampa = item.attributes.filter(chave => {
        return chave.name === "Estampa";
      });
      let estampa = atributoDaEstampa[0].options[0];

      let fotosDoProduto = item.images;
      let fotosSrc = [];
      fotosDoProduto.forEach(element => {
        fotosSrc.push({ src: element.src });
      });

      let nomeDaCategoria = item.categories[0].name;
      let lastChar = nomeDaCategoria[nomeDaCategoria.length - 1];
      nomeDaCategoria =
        lastChar === "s" ? nomeDaCategoria.slice(0, -1) : nomeDaCategoria;

      this.estampasDisponiveis.push({
        nomeDoProduto: nomeDaCategoria,
        estampa: estampa,
        idProdutoPai: item.id,
        srcFotos: fotosSrc,
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
    destacarFoto(foto) {
      this.estampaEscolhida.fotoClicada = foto.src;
    },
    mostrarEstampas() {
      this.menuEstampas = !this.menuEstampas;
    },
    mostrarTamanhos() {
      this.menuTamanhos = !this.menuTamanhos;
    },
    escolherEstampa(estampa) {
      this.produtoCombo = null;

      this.estampaEscolhida.nome = estampa.estampa;
      this.estampaEscolhida.nomeDoProduto =
        estampa.nomeDoProduto + " " + estampa.estampa;
      this.estampaEscolhida.categoria = estampa.nomeDoProduto;
      this.estampaEscolhida.estampa = estampa.estampa;
      this.estampaEscolhida.idProdutoPai = estampa.idProdutoPai;
      this.estampaEscolhida.urlThumbnail = estampa.urlThumbnail;
      this.estampaEscolhida.srcFotos = estampa.srcFotos;
      this.estampaEscolhida.fotoClicada = estampa.srcFotos[0].src;
      this.getVariacoes(estampa.idProdutoPai);
    },
    getVariacoes(idProdutoPai) {
      api
        .get(
          `${process.env.VUE_APP_SITE_PREFIX}/api-dog27/wp-json/wc/v3/products/${idProdutoPai}/variations?per_page=99&on_sale=true&purchasable=true&stock_status=instock&consumer_key=${process.env.VUE_APP_CONSUMER_KEY}&consumer_secret=${process.env.VUE_APP_CONSUMER_SECRET}`
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
          this.escolherVariacao(primeiraVariacaoDisponivel);
        });
    },
    ajustarEstoqueComCarrinho(produtoNoCarrinho) {
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        let quantidade = this.quantidadeDaVariacaoSelecionadaNoCarrinho;
        if (
          produtoNoCarrinho.idDaVariacao === this.variacaoEscolhida.idDaVariacao
        ) {
          quantidade = quantidade + produtoNoCarrinho.quantidade;
        }
        this.quantidadeDaVariacaoSelecionadaNoCarrinho = quantidade;
      }).catch(function(err) {
        // eslint-disable-next-line
        console.log(err);
      });
    },
    async escolherVariacao(variacao) {
      this.produtoCombo = null;
      this.variacaoEscolhida = {
        fotoUrl: "",
        estampa: "",
        categoria: "",
        tamanho: "",
        sku: "",
        preco: "",
        precoPromocional: "",
        estoque: null,
        nomeDoProduto: "",
        valorUnitarioCobrado: "",
        peso: "",
        idProdutoPai: "",
        idDaVariacao: "",
        quantidade: 0
      };

      this.variacaoEscolhida.categoria = variacao.categoria;
      this.variacaoEscolhida.estampa = variacao.estampa;
      this.variacaoEscolhida.fotoUrl = variacao.fotoUrl;
      this.variacaoEscolhida.tamanho = variacao.tamanho;
      this.variacaoEscolhida.sku = variacao.sku;
      this.variacaoEscolhida.preco = variacao.preco;
      this.variacaoEscolhida.precoPromocional = variacao.precoPromocional;
      this.variacaoEscolhida.nomeDoProduto = this.estampaEscolhida.nomeDoProduto;
      this.variacaoEscolhida.valorUnitarioCobrado = variacao.preco;
      this.variacaoEscolhida.peso = variacao.peso;
      this.variacaoEscolhida.idProdutoPai = this.estampaEscolhida.idProdutoPai;
      this.variacaoEscolhida.idDaVariacao = variacao.id;
      this.variacaoEscolhida.quantidade = this.quantidadeEscolhida;

      this.quantidadeDaVariacaoSelecionadaNoCarrinho = 0;
      let estoqueNoCarrinho = this.carrinho.forEach(
        await this.ajustarEstoqueComCarrinho
      );
      estoqueNoCarrinho = this.quantidadeDaVariacaoSelecionadaNoCarrinho;

      this.variacaoEscolhida.estoque = variacao.estoque - estoqueNoCarrinho;
      if (this.variacaoEscolhida.estoque > 0) {
        this.quantidadeEscolhida = 1;
        this.variacaoEscolhida.estoque =
          this.variacaoEscolhida.estoque - this.quantidadeEscolhida;
        this.getSkuProdutoCombo(this.variacaoEscolhida.sku);
      } else {
        this.quantidadeEscolhida = 0;
      }
    },
    getSkuProdutoCombo(sku) {
      let prefix = sku.slice(0, 2);
      let sufix = sku.slice(2);
      let newPrefix = "";
      let tamanho = sku.slice(-2);
      let newSufix = sufix;

      this.nomeDoProdutoCombo = "";
      this.produtoCombo = null;

      if (prefix == "LE") {
        newPrefix = "HA";
        this.nomeDoProdutoCombo = "PEITORAL PARA CACHORROS ";
      } else {
        newPrefix = "LE";
        this.nomeDoProdutoCombo = "GUIA PARA CACHORROS ";
      }

      // OBS: Guia não tem tamanho M
      if (tamanho == "_M" || tamanho == "_U") {
        newSufix = sufix.slice(0, -2);
        newSufix = newSufix + "_G";
      }
      let skuProdutoCombo = newPrefix + newSufix;

      this.getProdutoCombo(skuProdutoCombo);
    },
    getProdutoCombo(sku) {
      api
        .get(
          `${process.env.VUE_APP_SITE_PREFIX}/api-dog27/wp-json/wc/v3/products/?sku=${sku}&on_sale=true&purchasable=true&stock_status=instock&consumer_key=${process.env.VUE_APP_CONSUMER_KEY}&consumer_secret=${process.env.VUE_APP_CONSUMER_SECRET}`
        )
        .then(response => {
          if (response.data.length === 0) {
            // eslint-disable-next-line
            console.log("nenhum combo encontrado.");
            this.mostrarComboArea = false;
          } else {
            let resposta = response.data[0];

            let produtoCombo = {
              fotoUrl: resposta.images[0].src,
              categoria: resposta.name.replace(/ .*/, ""),
              estampa: this.variacaoEscolhida.estampa,
              imgUrl: resposta.images[0].src,
              nomeDoProduto:
                this.nomeDoProdutoCombo + " " + this.estampaEscolhida.nome,
              tamanho:
                this.variacaoEscolhida.tamanho == "M" ||
                this.variacaoEscolhida.tamanho == "U"
                  ? "G"
                  : this.variacaoEscolhida.tamanho,
              preco: resposta.regular_price,
              precoPromocional: resposta.sale_price,
              idDaVariacao: resposta.id,
              pesoUnitario: resposta.weight,
              sku: resposta.sku,
              estoque: resposta.stock_quantity,
              idProdutoPai: resposta.parent_id
            };

            this.produtoCombo = produtoCombo;
            this.mostrarComboArea = true;
          }
        });
    },
    colocarNoCarrinho(item) {
      const itemDoCarrinho = {
        fotoUrl: item.fotoUrl,
        categoria: item.categoria,
        estampa: item.estampa,
        tamanho: item.tamanho,
        nomeDoProduto: item.nomeDoProduto + " " + item.tamanho,
        valorUnitarioCobrado: item.valorUnitarioCobrado,
        pesoTotal: item.peso * item.quantidade,
        idProdutoPai: item.idProdutoPai,
        idDaVariacao: item.idDaVariacao,
        quantidade: item.quantidade,
        isCombo: false,
        comboInicial: false,
        comboFinal: false
      };
      this.quantidadeEscolhida = 0;
      this.adicionarItemAoCarrinho(itemDoCarrinho);
      this.switchAreaDeCompra(false);
    },
    async colocarComboNoCarrinho(combo) {
      let item = combo[0];

      let itemDoCarrinho = {
        fotoUrl: item.fotoUrl,
        categoria: item.categoria,
        estampa: item.estampa,
        tamanho: item.tamanho,
        nomeDoProduto: item.nomeDoProduto + " " + item.tamanho,
        valorUnitarioCobrado: item.valorUnitarioCobrado,
        pesoTotal: item.peso * item.quantidade,
        idProdutoPai: item.idProdutoPai,
        idDaVariacao: item.idDaVariacao,
        quantidade: item.quantidade,
        isCombo: true,
        comboInicial: item.comboInicial,
        comboFinal: item.comboFinal
      };
      await this.adicionarItemAoCarrinho(itemDoCarrinho);

      item = combo[1];

      itemDoCarrinho = {
        fotoUrl: item.fotoUrl,
        categoria: item.categoria,
        estampa: item.estampa,
        tamanho: item.tamanho,
        nomeDoProduto: item.nomeDoProduto + " " + item.tamanho,
        valorUnitarioCobrado: item.valorUnitarioCobrado,
        pesoTotal: item.peso * item.quantidade,
        idProdutoPai: item.idProdutoPai,
        idDaVariacao: item.idDaVariacao,
        quantidade: item.quantidade,
        isCombo: true,
        comboInicial: item.comboInicial,
        comboFinal: item.comboFinal
      };
      await this.adicionarItemAoCarrinho(itemDoCarrinho);
      this.quantidadeEscolhida = 0;
      this.switchAreaDeCompra(false);
    },
    variacoesDaEstampa(item) {
      let atributoDoTamanho = item.attributes.filter(chave => {
        return chave.name === "Tamanho";
      });
      let tamanho = atributoDoTamanho[0].option;

      this.variacoesDisponiveis.push({
        categoria: this.estampaEscolhida.categoria.replace(/ .*/, ""),
        estampa: this.estampaEscolhida.estampa,
        fotoUrl: item.image.src,
        id: item.id,
        sku: item.sku,
        tamanho: tamanho,
        preco: item.regular_price,
        peso: item.weight,
        precoPromocional: item.sale_price
          ? item.sale_price
          : item.regular_price,
        estoque: item.stock_quantity
      });
    }
  },
  watch: {
    quantidadeEscolhida() {
      this.variacaoEscolhida.quantidade = this.quantidadeEscolhida;
    },
    url() {
      this.getEstampas();
    },
    carrinho() {
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

.combo-banner-titulo {
  margin: 10px;
  font-family: "Fira Sans", sans-serif;
  text-align: center;
  font-size: 1em;
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
  max-height: 300px;
  max-width: 90%;
  margin: 0 auto;
}

.img-combo {
  max-width: 200px;
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

.tamanho-area-combo {
  margin: 0 10px;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0;
  text-align: center;
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

.tamanhos-disponiveis {
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

/* ///////////////////////////// MOBILE ////////////////////////////// */
@media screen and (max-width: 700px) {
  .area-de-compra-container {
    grid-template-columns: 1fr;
    padding-top: 20px;
    height: auto;
  }

  .banner-titulo {
    margin-bottom: 30px;
  }

  .area-de-compra-container div img.principal {
    max-height: 200px;
  }

  .area-de-compra-thumbnail img {
    max-height: 50px;
    margin: 0 10px;
  }

  .area-de-compra-opcoes {
    padding: 0 20px;
  }

  .finalizar-compra-item {
    padding: 20px;
  }

  .combo {
    display: block;
  }

  .combo-produtos {
    height: auto;
    display: grid;
    grid-template:
      "prod_1 soma prod_2" 1fr
      / 1fr 1fr 1fr;
  }

  .combo-produto {
    width: auto;
  }

  .img-combo {
    max-width: 100px;
  }

  .combo .banner-titulo {
    font-size: 2rem;
  }

  .tamanhos-disponiveis {
    padding: 0;
  }

  .principal {
    grid-area: prod_1;
  }

  .mais {
    grid-area: soma;
    font-size: 3rem;
    margin: 0;
  }

  .indicado {
    grid-area: prod_2;
  }

  .combo-titulo {
  }

  .preco-antigo {
  }

  .preco-combo {
  }

  .combo-conteudo .adicionar-ao-carrinho {
  }
}
</style>
