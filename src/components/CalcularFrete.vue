<template>
  <section>
    <h2>Dados da Entrega</h2>
    <button @click="igualarDados">Copiar do faturamento</button>
    <section id="dadosDaEntrega">
      <label for="nameEntrega">Nome</label>
      <input type="text" name="nameEntrega" id="nameEntrega" v-model="nomeEntrega" />
      <label for="phoneEntrega">Telefone</label>
      <input type="text" name="phoneEntrega" id="phoneEntrega" v-model="telefoneEntrega" />
      <label for="emailEntrega">e-mail</label>
      <input type="text" name="emailEntrega" id="emailEntrega" v-model="emailEntrega" />
      <label for="postcodeEntrega">CEP</label>
      <input
        type="text"
        name="postcodeEntrega"
        id="postcodeEntrega"
        v-model="cepEntrega"
        @keyup="preencherCepEntrega"
      />
      <label for="address_1Entrega">RUA</label>
      <input type="text" name="address_1Entrega" id="address_1Entrega" v-model="ruaEntrega" />
      <label for="numeroEntrega">Número</label>
      <input type="text" name="numeroEntrega" id="numeroEntrega" v-model="numeroEntrega" />
      <label for="complementoEntrega">Complemento</label>
      <input
        type="text"
        name="complementoEntrega"
        id="complementoEntrega"
        v-model="complementoEntrega"
      />
      <label for="address_2Entrega">Bairro</label>
      <input type="text" name="address_2Entrega" id="address_2Entrega" v-model="bairroEntrega" />
      <label for="cityEntrega">Cidade</label>
      <input type="text" name="cityEntrega" id="cityEntrega" v-model="cidadeEntrega" />
      <label for="stateEntrega">Estado</label>
      <input type="text" name="stateEntrega" id="stateEntrega" v-model="estadoEntrega" />
    </section>

    <button v-if="habilitarBtn" @click="calcularPrecoPrazo" :disabled="!habilitarBtn">calcular preço</button>

    <div class="opcoesDeFrete" v-if="!calculando">
      <p v-if="freteErrado">Verifique o CEP de entrega informado e tente novamente</p>
      <section v-if="pac.mostrar">
        <label for="pac">PAC R$ {{pac.valor}} - {{pac.prazo}} dias úteis</label>
        <input type="radio" name="opcaoDeFrete" id="pac" @click="selecionarFrete('pac')" />
      </section>
      <section v-if="sedex.mostrar">
        <label for="sedex">Sedex R$ {{sedex.valor}} - {{sedex.prazo}} dias úteis</label>
        <input type="radio" name="opcaoDeFrete" id="sedex" @click="selecionarFrete('sedex')" />
      </section>
    </div>
    <div class="calculando" v-else>Aguarde, calculando...</div>
  </section>
</template>

<script>
import { mapFields } from "@/helpers.js";
import { getCep } from "@/services.js";
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "CalcularFrete",
  data() {
    return {
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
      habilitarBtn: false,
      calculando: false,
      freteErrado: false
    };
  },
  computed: {
    ...mapFields({
      fields: [
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
    ...mapState({
      carrinho: state => state.cart.carrinho,
      valorTotalCarrinho: state => state.cart.carrinhoTotal,
      usuario: state => state.usuario,
      freteEscolhido: state => state.freteEscolhido
    }),
    quantidadeDeCaixas() {
      let produtosPorCaixa = 6;
      let itens = 0;

      this.carrinho.forEach(item => {
        let quantidadeDeItens = item.quantidade;
        itens += quantidadeDeItens;
      });

      const totalCaixas = itens / produtosPorCaixa;
      return totalCaixas !== Infinity ? Math.ceil(totalCaixas) : 1;
    }
  },
  methods: {
    ...mapActions(["escolherFrete"]),
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
      this.habilitarBtn = false;
      this.calculando = true;
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
          // eslint-disable-next-line

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

          let tempoDePostagem = 2;

          this.pac.mostrar = false;
          this.sedex.mostrar = false;
          this.freteErrado = false;

          valorPac !== "0,00"
            ? ((this.pac.valor = valorPac), (this.pac.mostrar = true))
            : 100;
          this.pac.prazo = prazoPac !== 0 ? prazoPac + tempoDePostagem : 100;

          valorSedex !== "0,00"
            ? ((this.sedex.valor = valorSedex), (this.sedex.mostrar = true))
            : 10;
          this.sedex.prazo =
            prazoSedex !== 0 ? prazoSedex + tempoDePostagem : 100;
          if (this.pac.mostrar == false && this.sedex.mostrar == false) {
            this.freteErrado = true;
          }
          this.calculando = false;
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
        });
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
    }
  },
  watch: {
    cepEntrega() {
      if (this.cepEntrega.length >= 8) {
        this.habilitarBtn = true;
      } else {
        this.habilitarBtn = false;
      }
      this.pac.mostrar = false;
      this.sedex.mostrar = false;

      let freteEmBranco = {
        nome: "",
        valor: ""
      };
      this.escolherFrete(freteEmBranco);
    }
  }
};
</script>

<style scoped>
input[type="radio"] {
  width: auto;
}
</style>