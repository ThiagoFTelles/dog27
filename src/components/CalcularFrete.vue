<template>
  <section>
    <p>endereço de entrega</p>
    <button @click="calcularPrecoPrazo">calcular preço</button>

    <p>PAC R$ {{pac.valor}} - {{pac.prazo}} dias úteis</p>
    <p>SEDEX R$ {{sedex.valor}} - {{sedex.prazo}} dias úteis</p>
    <form action>
      <label for="postcode">CEP</label>
      <input type="text" name="postcode" id="postcode" v-model="cep" @keyup="preencherCep" />
      <label for="address_1">RUA</label>
      <input type="text" name="address_1" id="address_1" v-model="rua" />
      <label for="numero">Número</label>
      <input type="text" name="numero" id="numero" v-model="numero" />
      <label for="complemento">Complemento</label>
      <input type="text" name="complemento" id="complemento" v-model="complemento" />
      <label for="address_2">Bairro</label>
      <input type="text" name="address_2" id="address_2" v-model="bairro" />
      <label for="city">Cidade</label>
      <input type="text" name="city" id="city" v-model="cidade" />
      <label for="state">Estado</label>
      <input type="text" name="state" id="state" v-model="estado" />
    </form>

    <p>valor do frete</p>
  </section>
</template>

<script>
import { mapFields } from "@/helpers.js";
import { getCep } from "@/services.js";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "CalcularFrete",
  data() {
    return {
      pac: {
        valor: null,
        prazo: null
      },
      sedex: {
        valor: null,
        prazo: null
      }
    };
  },
  computed: {
    ...mapFields({
      fields: [
        "rua",
        "cep",
        "numero",
        "complemento",
        "bairro",
        "cidade",
        "estado"
      ],
      base: "usuario",
      mutation: "UPDATE_USUARIO"
    }),
    ...mapState({
      carrinho: state => state.cart.carrinho,
      valorTotalCarrinho: state => state.cart.carrinhoTotal,
      order: state => state.order.order
    }),
    multiplicadorDeCaixas() {
      let produtosPorCaixa = 4;
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
    },
    calcularPrecoPrazo() {
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
      let nCdServico = "04014,04510"; //PAC 04596, SEDEX 04553

      let cepOrigem = "29050300";
      let cepDestino = this.order.shipping.postcode;
      let nVlPeso = this.calcularPesoDeCadaCaixa;
      let nCdFormato = 1; //int
      let nVlComprimento = 27; //decimal
      let nVlAltura = 9; //decimal
      let nVlLargura = 18; //decimal
      let nVlDiametro = 32.44; //decimal
      let sCdMaoPropria = "N";
      let nVlValorDeclarado =
        this.valorTotalCarrinho / this.multiplicadorDeCaixas; //decimal
      let sCdAvisoRecebimento = "N";

      let url = `${process.env.VUE_APP_SITE_PREFIX}/proxy.php?http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=${nCdEmpresa}&sDsSenha=${sDsSenha}&nCdServico=${nCdServico}&sCepOrigem=${cepOrigem}&sCepDestino=${cepDestino}&nVlPeso=${nVlPeso}&nCdFormato=${nCdFormato}&nVlComprimento=${nVlComprimento}&nVlAltura=${nVlAltura}&nVlLargura=${nVlLargura}&nVlDiametro=${nVlDiametro}&sCdMaoPropria=${sCdMaoPropria}&nVlValorDeclarado=${nVlValorDeclarado}&sCdAvisoRecebimento=${sCdAvisoRecebimento}`;

      axios
        .get(url)
        .then(res => {
          console.log(res.data);

          var xmlString = res.data;
          var parser = new DOMParser();
          var xml = parser.parseFromString(xmlString, "text/xml");
          var obj = xmlToJson(xml);

          this.pac.valor = obj.cResultado.Servicos.cServico[0].Valor["#text"];
          this.pac.prazo =
            Number(obj.cResultado.Servicos.cServico[0].PrazoEntrega["#text"]) +
            1;

          this.sedex.valor = obj.cResultado.Servicos.cServico[1].Valor["#text"];
          this.sedex.prazo =
            Number(obj.cResultado.Servicos.cServico[1].PrazoEntrega["#text"]) +
            1;
        })
        .catch(err => {
          console.log(err);
        });
    },
    calcularPesoDeCadaCaixa() {
      let pesoTotalDoPedido = 0;
      this.carrinho.forEach(item => {
        let pesoDoItem = Number(item.pesoTotal);
        pesoTotalDoPedido += pesoDoItem;
      });

      let pesoDeCadaCaixa = pesoTotalDoPedido / this.multiplicadorDeCaixas;
      return pesoDeCadaCaixa.toString();
    }
  }
};
</script>

<style>
</style>