<template>
  <section class="checkout-container">
    <img src="../assets/footer/icone-logo.svg" alt="Dog-27" class="logo" />
    <div class="main" v-if="!finalizar">
      <div class="mainheader">
        <p class="main-titulo">Meu carrinho</p>
      </div>

      <div class="maincontent">
        <p class="topprodutos maincontent-header">Produtos</p>
        <p class="toppreco maincontent-header">Preço</p>
        <p class="topquantidade maincontent-header">Quantidade</p>
        <p class="toptotal maincontent-header">Total</p>

        <div class="itensarea">
          <div v-if="ganhouPresente" class="carrinho_item" key="carrinho-presente">
            <p class="quantidade">1</p>
            <p class="titulo">{{nomeDoPresente | capitalize}} U</p>
            <img :src="fotoDoPresente" :alt="nomeDoPresente" class="foto" />

            <p class="valorunitarioitem green">{{0 | numeroPreco}}</p>
            <p class="valortotalitem">{{0 | numeroPreco}}</p>
            <button class="carrinho_remover"></button>
          </div>
          <div
            class="carrinho_item"
            v-for="(item, index) in carrinho"
            :key="`carrinho-item${index}`"
          >
            <p class="quantidade">{{item.quantidade}}</p>
            <p
              class="titulo"
            >{{item.categoria | capitalize}} para cachorros {{item.estampa | lowercase}} {{item.tamanho | uppercase}}</p>
            <img
              :src="item.fotoUrl"
              :alt="`${item.categoria} para cachorros ${item.estampa}`"
              class="foto"
            />

            <p
              :class="{ green: item.isCombo }"
              class="valorunitarioitem"
            >{{item.valorUnitarioCobrado | numeroPreco}}</p>
            <p class="valortotalitem">{{item.valorUnitarioCobrado * item.quantidade | numeroPreco}}</p>
            <button
              class="carrinho_remover"
              @click="removerItemDoCarrinho({index:index, isCombo:item.isCombo, comboFinal:item.comboFinal, comboInicial:item.comboInicial})"
            >X</button>
          </div>
        </div>

        <div class="totalarea">
          <div class="cupom">
            <section class="cupom-vazio" v-if="!desconto.valor && alterarCupom">
              <div v-if="carregandoCupom" class="carregando-area">aguarde...</div>
              <p class="label">Cupom de desconto:</p>
              <input
                class="input-cupom"
                type="text"
                v-model="couponCode"
                :class="{error: cupomInvalido}"
              />
              <button
                :class="{bg_green: this.couponCode.length >= 1}"
                :disabled="this.couponCode.length < 1"
                class="btn-cupom"
                @click="buscarCupom()"
              >ok</button>
            </section>
            <section v-else class="cupom-aplicado">
              <p class="label">Cupom de desconto:</p>
              <section>
                <p class="label-black">{{cupom.code | uppercase}}</p>
                <p class="trocar-cupom" @click="trocarCupom">X</p>
              </section>
            </section>
          </div>
          <div class="frete" v-if="!pac.mostrar && !sedex.mostrar">
            <section class="frete-vazio">
              <div v-if="calculandoFrete" class="carregando-area">calculando...</div>
              <p class="label">Digite o CEP</p>
              <input
                class="input-frete"
                :class="{error: freteErrado}"
                type="text"
                name="postcodeEntrega"
                id="postcodeEntrega"
                v-model="cepEntrega"
                @keyup="preencherCepEntrega"
                v-mask="'#####-###'"
              />
              <button
                class="btn-frete"
                :class="{bg_green: this.cepEntrega.length === 9}"
                :disabled="this.cepEntrega.length < 9"
                @click="calcularPrecoPrazo"
              >ok</button>
            </section>
          </div>
          <div class="frete frete-selecionado" v-else>
            <label v-if="pac.mostrar" class="pac_tag" for="pac">PAC: {{pac.prazo}} d.u.</label>
            <label v-if="pac.mostrar" class="label_pac" for="pac">
              <input
                v-if="pac.mostrar"
                class="radio input_pac"
                type="radio"
                name="opcaoDeFrete"
                id="pac"
                @click="selecionarFrete('pac')"
              />
              <p v-if="pac.mostrar" class="valor_frete valor_pac">{{pac.valor | numeroPreco}}</p>
            </label>
            <label v-if="sedex.mostrar" class="sedex_tag" for="sedex">Sedex: {{sedex.prazo}} d.u.</label>
            <label v-if="sedex.mostrar" class="label_sedex" for="sedex">
              <input
                v-if="sedex.mostrar"
                class="radio input_sedex"
                type="radio"
                name="opcaoDeFrete"
                id="sedex"
                @click="selecionarFrete('sedex')"
                checked="checked"
              />
              <p v-if="sedex.mostrar" class="valor_frete valor_sedex">{{sedex.valor | numeroPreco}}</p>
            </label>
            <p class="mudar_cep" @click="resetarFrete();">Mudar o cep</p>
          </div>
          <div class="total">
            <div v-if="desconto.valor" class="descontotexto label-black">DESCONTO</div>
            <div
              v-if="desconto.valor"
              class="descontovalor red"
            >- {{String(desconto.valor).replace(".", ",") }}</div>
            <div class="totaltexto label-black">Total</div>
            <div class="totalvalor">{{carrinhoTotalComDesconto+freteEscolhido.valor | numeroPreco}}</div>
          </div>
        </div>

        <div class="bottom">
          <router-link class="continuarcomprando" tag="div" :to="{name:'home'}">
            <p>Continuar comprando</p>
          </router-link>
          <div
            class="fecharcompra"
            :class="{bg_green: this.habilitarBtn}"
            @click="habilitarBtn ? finalizar = true : null"
          >
            <p>Fechar compra</p>
          </div>
        </div>
      </div>
    </div>
    <div class="finalizar" v-else></div>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { mapFields } from "@/helpers.js";
import { getCep } from "@/services.js";
import axios from "axios";

export default {
  name: "Checkout",
  components: {},
  data() {
    return {
      finalizar: false,
      line_items: [],
      alterarCupom: true,
      cupomInvalido: false,
      couponCode: "",
      carregandoCupom: false,
      pac: {
        valor: null,
        prazo: null,
        mostrar: false
      },
      sedex: {
        valor: null,
        prazo: null,
        mostrar: false
      },
      calculandoFrete: false,
      freteErrado: false,
      tempoDePostagem: 2 //dias úteis
    };
  },
  computed: {
    ...mapState({
      carrinho: state => state.cart.carrinho,
      cupom: state => state.cart.cupom,
      ganhouPresente: state => state.cart.ganhouPresente,
      nomeDoPresente: state => state.cart.nomeDoPresente,
      fotoDoPresente: state => state.cart.fotoDoPresente,
      valorTotalCarrinho: state => state.cart.carrinhoTotal,
      carrinhoTotal: state => state.cart.carrinhoTotal,
      metaMaior: state => state.order.metaMaior,
      usuario: state => state.usuario,
      freteEscolhido: state => state.freteEscolhido,
      presente: state => state.cart.presente,
      login: state => state.login
    }),
    ...mapGetters(["desconto", "carrinhoTotalComDesconto"]),
    ...mapFields({
      fields: [
        "nome",
        "cpf",
        "nascimento",
        "email",
        "telefone",
        "rua",
        "cep",
        "numero",
        "complemento",
        "bairro",
        "cidade",
        "estado",
        "nomeEntrega",
        "telefoneEntrega",
        "emailEntrega",
        "ruaEntrega",
        "cepEntrega",
        "numeroEntrega",
        "complementoEntrega",
        "bairroEntrega",
        "cidadeEntrega",
        "estadoEntrega"
      ],
      base: "usuario",
      mutation: "UPDATE_USUARIO"
    }),
    primeiroNome() {
      return this.usuario.nome.replace(/ .*/, "");
    },
    habilitarBtn() {
      if (this.freteEscolhido.valor > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    couponCode() {
      this.cupomInvalido = false;
    },
    cepEntrega() {
      this.pac.mostrar = false;
      this.sedex.mostrar = false;
      this.resetarFrete();
    },
    carrinho() {
      this.checkCart();
    }
  },
  methods: {
    ...mapActions([
      "setOrder",
      "deleteCupom",
      "getCupom",
      "removerItemDoCarrinho",
      "atualizarCarrinhoTotal",
      "checarLocalStorage",
      "escolherFrete"
    ]),
    checkCart() {
      let quantidade = this.carrinho.length;
      if (quantidade === 0) {
        this.$router.push({ name: "home" });
      }
      this.pac.mostrar = false;
      this.sedex.mostrar = false;
      this.resetarFrete();
    },

    trocarCupom() {
      this.deleteCupom();
      this.alterarCupom = true;
    },
    buscarCupom() {
      this.cupomInvalido = false;
      this.carregandoCupom = true;
      this.getCupom(this.couponCode).then(r => {
        if (r) {
          this.cupomInvalido = false;
          this.alterarCupom = false;
          this.carregandoCupom = false;
        } else {
          this.cupomInvalido = true;
          this.carregandoCupom = false;
        }
      });
    },
    preencherCepEntrega() {
      const cep = this.cepEntrega.replace(
        /\D/g,
        ""
      ); /* pegará apenas dígitos */
      if (cep.length >= 8) {
        getCep(cep).then(r => {
          this.ruaEntrega = r.data.logradouro;
          this.bairroEntrega = r.data.bairro;
          this.estadoEntrega = r.data.uf;
          this.cidadeEntrega = r.data.localidade;
        });
      }
    },
    calcularPrecoPrazo() {
      this.calculandoFrete = true;
      // Changes XML to JSON
      function xmlToJson(xml) {
        // Create the return object
        var obj = {};

        if (xml.nodeType == 1) {
          // element
          // do attributes
          if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
          }
        } else if (xml.nodeType == 3) {
          // text
          obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
          for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof obj[nodeName] == "undefined") {
              obj[nodeName] = xmlToJson(item);
            } else {
              if (typeof obj[nodeName].push == "undefined") {
                var old = obj[nodeName];
                obj[nodeName] = [];
                obj[nodeName].push(old);
              }
              obj[nodeName].push(xmlToJson(item));
            }
          }
        }
        return obj;
      }

      // Documentação: http://m.correios.com.br/solucoes-empresariais/comercio-eletronico/palestras-correios-1/pdf/ManualdeImplementacaodoCalculoRemotodePrecosePrazos.pdf

      let nCdEmpresa = `${process.env.VUE_APP_CORREIOS_NCD_EMRPESA}`;
      let sDsSenha = `${process.env.VUE_APP_CORREIOS_SDS_SENHA}`;
      let nCdServico = "04596,04553"; //PAC 04596, SEDEX 04553

      let cepOrigem = "29163165";
      let cepDestino = this.cepEntrega.replace(/\D/g, "");
      let nVlPeso = this.calcularPesoDaCaixa();
      let nCdFormato = 1; //int
      let nVlComprimento = this.quantidadeDeCaixas === 1 ? 27 : 46; //decimal
      let nVlAltura = this.quantidadeDeCaixas === 1 ? 9 : 9; //decimal
      let nVlLargura = this.quantidadeDeCaixas === 1 ? 18 : 28; //decimal
      let nVlDiametro = this.quantidadeDeCaixas === 1 ? 32.44 : 53.85; //decimal
      let sCdMaoPropria = "N";
      let nVlValorDeclarado = this.valorTotalCarrinho; //decimal
      let sCdAvisoRecebimento = "N";

      let url = `${process.env.VUE_APP_SITE_PREFIX}/miniproxy.php?http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=${nCdEmpresa}&sDsSenha=${sDsSenha}&nCdServico=${nCdServico}&sCepOrigem=${cepOrigem}&sCepDestino=${cepDestino}&nVlPeso=${nVlPeso}&nCdFormato=${nCdFormato}&nVlComprimento=${nVlComprimento}&nVlAltura=${nVlAltura}&nVlLargura=${nVlLargura}&nVlDiametro=${nVlDiametro}&sCdMaoPropria=${sCdMaoPropria}&nVlValorDeclarado=${nVlValorDeclarado}&sCdAvisoRecebimento=${sCdAvisoRecebimento}`;

      axios
        .get(url)
        .then(res => {
          const resposta = res.data;

          var xmlString =
            process.env.VUE_APP_NODE_ENV === "test"
              ? // eslint-disable-next-line
                $(resposta).find("cResultado").prevObject[11].innerHTML
              : resposta; //res.data;

          var parser = new DOMParser();
          var xml = parser.parseFromString(xmlString, "text/xml");
          var obj = xmlToJson(xml);

          let valorPac =
            process.env.VUE_APP_NODE_ENV === "test"
              ? obj.servicos.cservico[0].valor["#text"]
              : obj.cResultado.Servicos.cServico[0].Valor["#text"];
          let prazoPac =
            process.env.VUE_APP_NODE_ENV === "test"
              ? Number(obj.servicos.cservico[0].prazoentrega["#text"])
              : Number(
                  obj.cResultado.Servicos.cServico[0].PrazoEntrega["#text"]
                );

          let valorSedex =
            process.env.VUE_APP_NODE_ENV === "test"
              ? obj.servicos.cservico[1].valor["#text"]
              : obj.cResultado.Servicos.cServico[1].Valor["#text"];
          let prazoSedex =
            process.env.VUE_APP_NODE_ENV === "test"
              ? Number(obj.servicos.cservico[1].prazoentrega["#text"])
              : Number(
                  obj.cResultado.Servicos.cServico[1].PrazoEntrega["#text"]
                );

          this.pac.mostrar = false;
          this.sedex.mostrar = false;
          this.freteErrado = false;

          this.freteGratis
            ? this.mostrarValoresDeFreteGratis(
                valorPac,
                valorSedex,
                prazoPac,
                prazoSedex
              )
            : this.mostrarValoresDeFrete(
                valorPac,
                valorSedex,
                prazoPac,
                prazoSedex
              );
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
        });
    },
    mostrarValoresDeFrete(valorPac, valorSedex, prazoPac, prazoSedex) {
      valorPac !== "0,00"
        ? ((this.pac.valor = Number(valorPac.replace(",", "."))),
          (this.pac.mostrar = true))
        : 100;
      this.pac.prazo = prazoPac !== 0 ? prazoPac + this.tempoDePostagem : 100;

      valorSedex !== "0,00"
        ? ((this.sedex.valor = Number(valorSedex.replace(",", "."))),
          (this.sedex.mostrar = true))
        : 10;
      this.sedex.prazo =
        prazoSedex !== 0 ? prazoSedex + this.tempoDePostagem : 100;

      this.verificaSeFreteEstaErrado();
    },
    mostrarValoresDeFreteGratis(valorPac, valorSedex, prazoPac, prazoSedex) {
      valorSedex !== "0,00"
        ? ((this.sedex.valor = Number(valorSedex.replace(",", "."))),
          (this.sedex.mostrar = true))
        : "10";
      this.sedex.prazo =
        prazoSedex !== 0 ? prazoSedex + this.tempoDePostagem : 100;

      valorPac !== "0,00"
        ? ((this.pac.valor = 0.0), (this.pac.mostrar = true))
        : ((this.pac.mostrar = false), (this.sedex.valor = 0.0));
      this.pac.prazo = prazoPac !== 0 ? prazoPac + this.tempoDePostagem : 100;

      this.verificaSeFreteEstaErrado();
    },
    verificaSeFreteEstaErrado() {
      if (
        (this.pac.mostrar == false && this.sedex.mostrar == false) ||
        this.usuario.estadoEntrega === undefined
      ) {
        this.resetarFrete();
        this.freteErrado = true;
      } else {
        this.selecionarFrete("sedex");
      }
      this.calculandoFrete = false;
    },
    calcularPesoDaCaixa() {
      let pesoTotalDoPedido = 0;
      this.carrinho.forEach(item => {
        let pesoDoItem = Number(item.pesoTotal);
        pesoTotalDoPedido += pesoDoItem;
      });

      return pesoTotalDoPedido;
    },
    igualarDados() {
      this.nomeEntrega = this.usuario.nome;
      this.telefoneEntrega = this.usuario.telefone;
      this.emailEntrega = this.usuario.email;
      this.ruaEntrega = this.usuario.rua;
      this.cepEntrega = this.usuario.cep;
      this.numeroEntrega = this.usuario.numero;
      this.complementoEntrega = this.usuario.complemento;
      this.bairroEntrega = this.usuario.bairro;
      this.cidadeEntrega = this.usuario.cidade;
      this.estadoEntrega = this.usuario.estado;
    },
    selecionarFrete(tipoDeFrete) {
      let freteEscolhido = {
        nome: "",
        valor: ""
      };

      if (tipoDeFrete === "pac") {
        freteEscolhido.nome = "pac";
        freteEscolhido.valor = this.pac.valor;
        this.escolherFrete(freteEscolhido);
      } else if (tipoDeFrete === "sedex") {
        freteEscolhido.nome = "sedex";
        freteEscolhido.valor = this.sedex.valor;
        this.escolherFrete(freteEscolhido);
      }
    },
    resetarFrete() {
      this.pac.mostrar = false;
      this.sedex.mostrar = false;
      let freteEmBranco = {
        nome: "",
        valor: ""
      };
      this.escolherFrete(freteEmBranco);
    },
    newOrder(payment) {
      let shipping_lines = {
        method_id: this.freteEscolhido.nome,
        method_title: this.freteEscolhido.nome,
        total: this.freteEscolhido.valor.toString()
      };

      shipping_lines = [shipping_lines];

      let coupon_lines = { code: this.cupom.code };

      coupon_lines = [coupon_lines];

      let meta_data = [];
      meta_data.push(
        {
          key: "_billing_cpf",
          value: this.usuario.cpf
        },
        {
          key: "_billing_number",
          value: this.usuario.numero
        },
        {
          key: "_billing_neighborhood",
          value: this.usuario.bairro
        },
        {
          key: "_shipping_number",
          value: this.usuario.numeroEntrega
        },
        {
          key: "_shipping_neighborhood",
          value: this.usuario.bairroEntrega
        }
      );

      let order = {
        customer_id: this.usuario.id,
        payment_method: payment.payment_method,
        payment_method_title: payment.payment_method_title,
        set_paid: false,
        billing: {
          first_name: this.usuario.nome,
          last_name: "",
          address_1:
            this.usuario.rua +
            ", Nº: " +
            this.usuario.numero +
            ", " +
            this.usuario.bairro,
          address_2: this.usuario.complemento,
          city: this.usuario.cidade,
          state: this.usuario.estado,
          postcode: this.usuario.cep,
          country: this.usuario.pais,
          email: this.usuario.email,
          phone: this.usuario.telefone
        },
        shipping: {
          first_name: this.usuario.nomeEntrega,
          last_name: "",
          address_1:
            this.usuario.ruaEntrega +
            ", Nº: " +
            this.usuario.numeroEntrega +
            ", " +
            this.usuario.bairroEntrega,
          address_2: this.usuario.complementoEntrega,
          city: this.usuario.cidadeEntrega,
          state: this.usuario.estadoEntrega,
          postcode: this.usuario.cepEntrega,
          country: this.usuario.paisEntrega
        },
        line_items: this.line_items,
        shipping_lines: shipping_lines,
        coupon_lines: this.cupom.code ? coupon_lines : null,
        meta_data: meta_data
      };
      this.setOrder(order);
    },
    setCart() {
      this.$store.state.cart.carrinho.forEach(item => {
        let total = item.valorUnitarioCobrado * item.quantidade;
        let cartItem = {
          product_id: item.idProdutoPai,
          variation_id: item.idDaVariacao,
          quantity: item.quantidade,
          total: total.toString()
        };
        this.line_items.push(cartItem);
      });
      if (this.valorTotalCarrinho >= this.metaMaior) {
        this.line_items.push(this.presente);
      }
    },
    preencherCep() {
      const cep = this.cep.replace(/\D/g, ""); /* pegará apenas dígitos */
      if (cep.length === 8) {
        getCep(cep).then(r => {
          this.rua = r.data.logradouro;
          this.bairro = r.data.bairro;
          this.estado = r.data.uf;
          this.cidade = r.data.localidade;
        });
      }
    }
  },
  created() {
    this.finalizar = false;
    this.resetarFrete();
    this.checkCart();
    document.title = "Checkout";
    this.setCart();
    if (this.cupom.amount > 0) {
      this.alterarCupom = false;
    }
  }
};
</script>
<style scoped>
.checkout-container {
  display: grid;
  grid-template:
    ". logo ." 150px
    ". main ." 1fr
    ". . ." 50px /
    1fr 1000px 1fr;
}

.logo {
  grid-area: logo;
  height: 100px;
  margin: auto;
}

.main {
  grid-area: main;
  min-height: 400px;
  display: grid;
  grid-template:
    "mainheader" 50px
    "maincontent" 1fr;
}

.mainheader {
  grid-area: mainheader;
  align-self: center; /* alinhamento vertical */
}

.main-titulo {
  font-family: "Fira Sans", sans-serif;
  font-size: 1.3em;
  font-style: italic;
  color: black;
}

.maincontent {
  grid-area: maincontent;
  background: #f9f9f9;
  padding: 20px;
  display: grid;
  grid-template:
    "topprodutos toppreco topquantidade toptotal ." 35px
    "itensarea itensarea itensarea itensarea itensarea " 1fr
    "totalarea totalarea totalarea totalarea totalarea" 180px
    ". bottom bottom bottom bottom" 70px /
    500px 120px 190px 120px 70px;
}

.maincontent-header {
  font-family: "Fira Sans", sans-serif;
  font-size: 1em;
  font-style: italic;
  color: black;
  margin: auto;
  font-weight: bold;
}

.topprodutos {
  grid-area: topprodutos;
  align-self: center; /* alinhamento vertical */
  padding-left: 10px;
  margin: 0;
}
.toppreco {
  grid-area: toppreco;
  align-self: center; /* alinhamento vertical */
}
.topquantidade {
  grid-area: topquantidade;
  align-self: center; /* alinhamento vertical */
}
.toptotal {
  grid-area: toptotal;
  align-self: center; /* alinhamento vertical */
}

.itensarea {
  grid-area: itensarea;
  align-self: center; /* alinhamento vertical */
}

.totalarea {
  display: grid;
  grid-area: totalarea;
  grid-template:
    ". cupom frete frete ." 95px
    ". . total total ." 70px /
    500px 170px 140px 1fr 70px;
}

.label {
  font-size: 1rem;
  font-weight: bolder;
  margin-bottom: 3px;
}

.label-black {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.9em;
  font-style: italic;
  color: black;
  font-weight: bold;
}

.cupom-vazio {
  padding-top: 50px;
  position: relative;
}

.carregando-area {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1rem;
  width: 100%;
  height: 100%;
  padding: 20%;
  border-radius: 2px;
}

.cupom {
  grid-area: cupom;
  align-self: center; /* alinhamento vertical */

  text-align: center;
}

.input-cupom {
  border: none;
  width: 100%;
  height: 30px;
  margin: 0;
  box-shadow: none;
  background: #e5e5e5;
  text-transform: uppercase;
  text-align: center;
}

.btn-cupom {
  width: 95px;
  height: 20px;
  margin: 5px auto;
  display: block;
  background: #a0a0a0;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.cupom-aplicado {
  position: relative;
  height: 30px;
}

.cupom-aplicado .label-black {
  display: inline;
}

.trocar-cupom {
  position: absolute;
  margin-left: 10px;
  display: inline;
  font-size: 0.7rem;
  font-weight: bolder;
  cursor: pointer;
}

.frete-vazio {
  padding-top: 20px;
  position: relative;
}

.frete {
  grid-area: frete;
  align-self: center; /* alinhamento vertical */
  margin-left: auto;
}

.frete-selecionado {
  margin-top: 30px;
  display: grid;
  grid-template:
    "sedex_tag valor_sedex" 1fr
    "pac_tag valor_pac" 1fr
    "mudar_cep ." 25px /
    1fr 1fr;
}

.frete-selecionado * {
  margin-bottom: 0;
}

.sedex_tag {
  grid-area: sedex_tag;
}
.valor_sedex {
  grid-area: valor_sedex;
}
.label_sedex {
  grid-area: valor_sedex;
}
.input_sedex {
  grid-area: valor_sedex;
}
.pac_tag {
  grid-area: pac_tag;
}
.valor_pac {
  grid-area: valor_pac;
}
.label_pac {
  grid-area: valor_pac;
}
.input_pac {
  grid-area: valor_pac;
}
.mudar_cep {
  grid-area: mudar_cep;
  font-size: 0.8rem;
  font-style: italic;
  cursor: pointer;
}
.valor_frete,
.sedex_tag,
.pac_tag {
  color: black;
  font-style: italic;
}

.valor_frete {
  display: inline;
  text-align: right;
}

.radio {
  width: 3px;
  height: fit-content;
  margin-left: 25px;
  margin-top: 0px;
  vertical-align: middle;
}

.input-frete {
  width: 135px;
  border: 1px solid #e5e5e5;
  height: 30px;
  margin: 0;
  box-shadow: none;
  background: #e5e5e5;
  display: inline-block;
  border: none;
  padding-right: 35px;
}

.btn-frete {
  width: 35px;
  height: 31px;
  margin: 0;
  margin-left: -35px;
  display: inline-block;
  background: #a0a0a0;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.total {
  padding-top: 50px;
  grid-area: total;
  align-self: center; /* alinhamento vertical */
  display: grid;
  grid-template:
    "descontotexto descontovalor" 1fr
    "totaltexto totalvalor" 1fr /
    1fr 1fr;
}

.descontovalor,
.totalvalor {
  text-align: right;
  font-weight: bolder;
}

.descontotexto {
  grid-area: descontotexto;
  align-self: center; /* alinhamento vertical */
}

.descontovalor {
  grid-area: descontovalor;
  align-self: center; /* alinhamento vertical */
  text-decoration: line-through;
}

.totaltexto {
  grid-area: totaltexto;
  align-self: center; /* alinhamento vertical */
}

.totalvalor {
  grid-area: totalvalor;
  align-self: center; /* alinhamento vertical */
}

.bottom {
  grid-area: bottom;
  align-self: center; /* alinhamento vertical */
  display: grid;
  grid-template:
    "continuarcomprando fecharcompra" 1fr /
    300px 1fr;
}

.bottom .continuarcomprando {
  grid-area: continuarcomprando;
  align-self: center; /* alinhamento vertical */
  width: 240px;
  height: 40px;
  background: #f4f4f4;
  color: #9e9e9e;
  text-align: center;
  border-radius: 5px;
  padding: 7px;
  cursor: pointer;
}

.bottom .fecharcompra {
  grid-area: fecharcompra;
  align-self: center; /* alinhamento vertical */
  width: 175px;
  height: 40px;
  background: #a0a0a0;
  color: #f4f4f4;
  text-align: center;
  border-radius: 5px;
  padding: 7px;
  cursor: pointer;
}

/* //////////////////  CARRINHO ITEM ////////////////////////// */

.carrinho_item {
  background: white;
  padding: 3px 10px 0 10px;
  margin-top: 10px;
  display: grid;
  grid-template:
    "foto titulo valorunitarioitem quantidade valortotalitem carrinho_remover" 116px /
    100px 400px 120px 190px 120px 70px;
}

.carrinho_remover:focus {
  outline: none;
}

.carrinho_remover {
  cursor: pointer;
  grid-area: carrinho_remover;
  background: none;
  border: none;
  text-align: center;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: bolder;
  font-family: sans-serif, cursive;
  font-style: italic;
}
.titulo,
.tamanho,
.quantidade,
.valorunitarioitem,
.valortotalitem {
  padding-top: 9px;
  font-size: 1.2rem;
  color: #000;
  font-style: italic;
  align-self: center;
  text-align: center;
}

.titulo {
  grid-area: titulo;
  text-align: left;
}

.valorunitarioitem {
  grid-area: valorunitarioitem;
}

.valortotalitem {
  grid-area: valortotalitem;
}

.foto {
  grid-area: foto;
  width: 100px;
  height: 100px;
  align-self: center;
}

.tamanho {
  grid-area: tamanho;
}
.quantidade {
  grid-area: quantidade;
}

/* //////////////////  FIM CARRINHO ITEM ////////////////////////// */

@media screen and (max-width: 700px) {
  .btn {
    width: 100%;
  }
}
</style> 
 