<template>
  <section class="checkout">
    <section v-if="vendaConcluida">
      <h1>Parabéns! A sua compra foi concluída!</h1>
      <h2>Verifique o e-mail informado para mais detalhes</h2>
    </section>

    <section v-else class="checkout">
      <p v-if="Brand">Bandeira: {{Brand}}</p>
      <p v-if="!Brand">Aceitamos: Visa, Master e AMEX</p>

      <label for="CardNumber">Número do Cartão</label>
      <input
        type="text"
        v-mask="'####.####.####.####'"
        name="CardNumber"
        id="CardNumber"
        v-model="CardNumber"
      />
      <section v-if="Brand">
        <label for="ExpirationDate">Válido até</label>
        <input
          type="text"
          name="ExpirationDate"
          id="ExpirationDate"
          placeholder="MM/AAAA"
          v-mask="'##/####'"
          v-model="ExpirationDate"
        />
        <label for="SecurityCode">CVV</label>
        <input
          type="text"
          name="SecurityCode"
          id="SecurityCode"
          v-model="SecurityCode"
          v-mask="'####'"
        />
        <label for="Holder">Nome Impresso no Cartão</label>
        <input type="text" name="Holder" id="Holder" v-model="Holder" maxlength="40" />
        <label for="Installments">Parcelas</label>
        <select name="Installments" id="Installments" v-model="Installments">
          <option
            v-for="parcela in parcelasDisponiveis"
            :value="parcela.numero"
            :key="`parcela-${parcela.numero}`"
          >{{ parcela.numero }}</option>
        </select>
        <p>Parcela mínima R$50, pode parcelar em até 4x sem juros</p>
        <ErroNotificacao :erros="erros" />
        <button @click="abrirOrdem" class="btn">Pagar</button>
      </section>
    </section>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { api } from "@/services.js";

export default {
  name: "CheckoutCredito",
  data() {
    return {
      Installments: 1,
      CardNumber: "",
      Holder: "",
      ExpirationDate: "",
      SecurityCode: "",
      Brand: "",
      erros: [],
      vendaConcluida: false
    };
  },
  components: {},
  methods: {
    ...mapActions(["esvaziarCarrinho"]),
    abrirOrdem() {
      let data = {
        endpoint: "/orders",
        body: this.order.order
      };
      api.postApiWc(data).then(r => {
        let cobranca = {
          MerchantOrderId: r.data.id,
          Payment: {
            Type: "CreditCard",
            Amount: Number(r.data.total),
            Installments: this.Installments,
            SoftDescriptor: "DOG27-" + r.data.id,
            CreditCard: {
              CardNumber: this.CardNumber,
              Holder: this.Holder,
              ExpirationDate: this.ExpirationDate,
              SecurityCode: this.SecurityCode,
              Brand: this.Brand
            }
          }
        };

        this.capturarCielo(cobranca);
      });
    },
    requestCielo(method, url, data) {
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader(
          "MerchantId",
          process.env.VUE_APP_MERCHANT_ID_CIELO
        );
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader(
          "MerchantKey",
          process.env.VUE_APP_MERCHANT_KEY_CIELO
        );
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send(data);
      });
    },
    solicitarAutorizacaoCielo(oderPayment) {
      this.erros = [];
      var data = JSON.stringify(oderPayment);

      return this.requestCielo(
        "POST",
        "https://apisandbox.cieloecommerce.cielo.com.br/1/sales",
        data
      )
        .then(function(e) {
          let resposta = JSON.parse(e.target.response);
          let statusDaResposta = JSON.parse(e.target.status);

          if (statusDaResposta == 400) {
            return {
              status: resposta[0].Code,
              resposta: "Erro de preenchimento: " + resposta[0].Message
            };
          } else if (statusDaResposta != 200 && statusDaResposta != 201) {
            let erro = resposta[0].Message;
            this.erros.push(erro);
            return {
              status: resposta[0].Code,
              resposta: "Erro de preenchimento - " + resposta[0].Message
            };
          } else if (resposta.Payment.Status === 1) {
            let links = resposta.Payment.Links;
            let objLinkCaptura = links.filter(
              element => element.Rel === "capture"
            );
            let linkCaptura = objLinkCaptura[0].Href;

            return { status: resposta.Payment.Status, resposta: linkCaptura };
          } else {
            return {
              status: resposta.Payment.Status,
              resposta: resposta.Payment.ReturnMessage
            };
          }
        })
        .catch(erro => {
          console.log("erro");
          console.log(erro);

          return {
            status: "00",
            resposta: "erro no cartão."
          };
        });
    },
    capturarCielo(oderPayment) {
      let self = this; //preciso desta variável para acessar o "this." nas funções inferiores
      this.erros = [];
      this.solicitarAutorizacaoCielo(oderPayment).then(r => {
        let autorizacaoStatus = r.status;
        let autorizacaoResposta = r.resposta;

        if (autorizacaoStatus === 1) {
          this.requestCielo("PUT", autorizacaoResposta).then(function(
            respostaCaptura
          ) {
            let resposta = JSON.parse(respostaCaptura.target.response);
            self.vendaConcluida = resposta.Status === 2 ? true : false;
            resposta.Status === 2 ? self.esvaziarCarrinho() : "";
          });
        } else {
          this.erroNoPagamentoCielo(autorizacaoResposta);
        }
      });
    },
    erroNoPagamentoCielo(resposta) {
      let erro =
        "Houve um problema com o pagamento. Por favor, verifique o cartão e tente novamente. " +
        resposta;
      this.erros.push(erro);
    }
  },
  computed: {
    ...mapState(["order"]),
    ...mapGetters(["parcelasDisponiveis"])
    // ...mapGetters({
    //   parcelasDisponiveis: state => state.cart.parcelasDisponiveis
    // })
  },
  watch: {
    CardNumber() {
      {
        if (this.CardNumber.charAt() == 4) {
          this.Brand = "Visa";
        } else if (this.CardNumber.charAt() == 5) {
          this.Brand = "Master";
        } else if (this.CardNumber.charAt() == 3) {
          this.Brand = "Amex";
        } else {
          this.Brand = "";
        }
      }
    }
  },
  created() {
    this.vendaConcluida = false;
    if (!this.order.order) {
      this.$router.push({ name: "checkout" });
    }
  }
};
</script>
<style scoped>
input {
  text-transform: uppercase;
}
</style> 
 