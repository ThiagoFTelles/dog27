<template>
  <section class="checkout section-form">
    <section class="checkout2">
      <p v-if="Brand">Bandeira: {{Brand}}</p>
      <p v-if="!Brand">
        Favor inserir um cartão
        <b>Visa, Master, Diners, Elo ou AMEX</b>
      </p>

      <label for="CardNumber">Número do Cartão</label>
      <input
        type="text"
        v-mask="'####.####.####.####'"
        name="CardNumber"
        id="CardNumber"
        v-model="CardNumber"
      />
      <div class="separador" v-if="!Brand"></div>

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
        <p class="info-parcelas">Parcela mínima R$50, pode parcelar em até 4x sem juros</p>
        <ErroNotificacao :erros="erros" />
        <button @click="abrirOrdem" class="btn" :disabled="disabled">Pagar</button>
      </section>
    </section>
    <div class="separador2" v-if="Brand"></div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { api } from "@/services.js";
import { requestCielo } from "@/helpers.js";

export default {
  name: "CheckoutCredito",
  data() {
    return {
      disabled: false,
      Installments: 1,
      CardNumber: "",
      Holder: "",
      ExpirationDate: "",
      SecurityCode: "",
      Brand: "",
      erros: []
    };
  },
  components: {},
  methods: {
    ...mapActions(["esvaziarCarrinho", "setOrderId"]),
    abrirOrdem() {
      this.disabled = true;
      let data = {
        endpoint: "/orders",
        body: this.order.order
      };
      api.postApiWc(data).then(r => {
        let cobranca = {
          MerchantOrderId: r.data.id,
          Payment: {
            Type: "CreditCard",
            Amount: Number(r.data.total) * 100,
            Installments: this.Installments,
            SoftDescriptor: "DOG27" + r.data.id,
            CreditCard: {
              CardNumber: this.CardNumber.replace(/\./g, ""),
              Holder: this.Holder,
              ExpirationDate: this.ExpirationDate,
              SecurityCode: this.SecurityCode,
              Brand: this.Brand
            }
          }
        };
        this.setOrderId(cobranca.MerchantOrderId);
        this.capturarCielo(cobranca);
      });
    },
    solicitarAutorizacaoCielo(oderPayment) {
      this.erros = [];
      var data = JSON.stringify(oderPayment);

      return requestCielo(
        "POST",
        `${process.env.VUE_APP_REQUISICOES_API_CIELO}/1/sales`,
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
            this.disabled = false;
          } else if (statusDaResposta != 200 && statusDaResposta != 201) {
            let erro = resposta[0].Message;
            this.erros.push(erro);
            return {
              status: resposta[0].Code,
              resposta: "Erro de preenchimento - " + resposta[0].Message
            };
            this.disabled = false;
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
            this.disabled = false;
          }
        })
        .catch(erro => {
          return {
            status: "00",
            resposta: "erro no cartão. " + erro
          };
          this.disabled = false;
        });
    },
    capturarCielo(oderPayment) {
      let self = this; //preciso desta variável para acessar o "this." nas funções inferiores
      this.erros = [];
      this.solicitarAutorizacaoCielo(oderPayment).then(r => {
        let autorizacaoStatus = r.status;
        let autorizacaoResposta = r.resposta;

        if (autorizacaoStatus === 1) {
          requestCielo("PUT", autorizacaoResposta).then(function(
            respostaCaptura
          ) {
            let resposta = JSON.parse(respostaCaptura.target.response);
            resposta.Status === 2 ? self.atualizarOrder(resposta.Status) : "";
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
      this.disabled = false;
    },
    atualizarOrder(statusCaptura) {
      if (statusCaptura === 2) {
    //     let meta_data = [];
    //   meta_data.push(        {
    //   "key": "_billing_cpf",
    //   "value": this.usuario.cpf
    // },
    //     {
    //   "key": "_billing_number",
    //   "value": this.usuario.numero
    // },
    //     {
    //   "key": "_billing_neighborhood",
    //   "value": this.usuario.bairro
    // },
    //     {
    //   "key": "_shipping_number",
    //   "value": this.usuario.numeroEntrega
    // },
    //     {
    //   "key": "_shipping_neighborhood",
    //   "value": this.usuario.bairroEntrega
    // },
    //     {
    //   "key": "_payment",
    //   "value": "2x"
    // },
    // );

        const data = {
          endpoint: `/orders/${this.idOrdemAberta}`,
          body: {
            status: "processing",
            customer_note: "parcelas: "+this.Installments.toString(),
            // meta_data: meta_data
          }
        };

        api
          .putApiWc(data)
          .then(() => {
            this.setOrderId(null);
          })
          .then(() => {
            this.esvaziarCarrinho();
            this.$router.push({ name: "PagamentoConfirmado" });
          })
          .catch(error => {
            this.erros.push(error.response.data);
          });
      }
    }
  },
  computed: {
    ...mapState({
      idOrdemAberta: state => state.order.idOrdemAberta,
      order: state => state.order,
      usuario: state => state.usuario,
      carrinho: state => state.cart.carrinho
    }),
    ...mapGetters(["parcelasDisponiveis"])
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
    },
    carrinho() {
      this.$router.push({ name: "checkout" });
    }
  },
  created() {
    if (!this.order.order) {
      this.$router.push({ name: "checkout" });
    }
  }
};
</script>
<style scoped>
.checkout {
  flex: 1;
}

.checkout2 {
  flex: 1;
}

.separador {
  height: 100vh;
}

.separador2 {
  height: 18vh;
}

input {
  text-transform: uppercase;
}

.info-parcelas {
  margin: 25px 0;
}
.btn {
  width: 100%;
  font-size: x-large;
}
</style> 
 