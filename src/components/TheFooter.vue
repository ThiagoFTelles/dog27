<template>
  <footer>
    <div class="separador"></div>
    <div class="footer-banner">
      <div class="inscricao">
        <p>Faça parte da dog27</p>
        <form action="https://your-mautic.com/api/contacts/new" method="post">
          <input type="email" placeholder="seu melhor e-mail" />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
    <img class="icone-dog-27" src="../assets/footer/icone-logo.svg" alt="Dog-27" />
    <div class="informacoes">
      <div class="texto-info">
        <div class="info">
          <h1>FRETE GRÁTIS</h1>
          <h2>em compras acima de {{metaMaior | numeroPreco}}</h2>
        </div>
        <div class="info">
          <h1>ENTREGA EXPRESSA</h1>
          <h2>a partir de 2 dias úteis</h2>
        </div>
        <div class="info">
          <h1>ATÉ 4x NO CARTÃO</h1>
          <h2>parcela mínima de R$50</h2>
        </div>
      </div>
      <div class="cartoes">
        <img src="@/assets/footer/cartoes/visa.png" alt="dog-27" />
        <img src="@/assets/footer/cartoes/visa.png" alt="dog-27" />
        <img src="@/assets/footer/cartoes/visa.png" alt="dog-27" />
        <img src="@/assets/footer/cartoes/visa.png" alt="dog-27" />
        <img src="@/assets/footer/cartoes/visa.png" alt="dog-27" />
      </div>
      <div class="copyright-area">
        <p
          class="copyright"
        >Copyright {{ano}} dog27. Todos os direitos reservado. {{nomeEmpresarial}}. {{endereco}} {{cnpj}}</p>
        <div class="links">
          <a
            href="http://www.planalto.gov.br/ccivil_03/leis/l8078.htm"
            target="_blank"
          >Código de Defesa do Consumidor</a>
          <router-link to="/termos">Termos e Políticas</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "TheFooter",
  data() {
    return {
      ano: new Date().getFullYear(),
      nomeEmpresarial: "Dog Vinte Sete Comercial S/A",
      endereco:
        "Rua Izidro Benezath 75 Enseada do Suá, Vitória ES CEP 29050300 - Brasil",
      cnpj: "25.069.492.0001/91"
    };
  },
  computed: {
    ...mapState({
      metaMaior: state => state.order.metaMaior
    })
  }
};
</script>

<style scoped>
footer {
  position: relative;
  background: #eaeae8;
  text-align: center;
  font-size: 1.2rem;
  /* top: 570px; , */
  /* 75px é "mais ou menos o tamanho dele", isto faz o site sempre ter uma barra de scroll */
}

.separador {
  height: 50px;
  margin: 0 auto;
  background: white;
}

.footer-banner {
  position: relative;
  background: url("../assets/footer/footer.jpg") no-repeat center center;
  max-width: 1200px;
  height: 283px;
  margin: 0 auto;
}

.inscricao {
}

.icone-dog-27 {
  width: 60px;
  margin: 20px auto 10px auto;
}

.info {
  display: inline-block;
  margin: 0 10px;
  text-align: left;
}

.texto-info {
  color: #717173;
  display: inline-block;
  margin: 20px 10px;
}

.texto-info h1 {
  display: block;
  text-transform: uppercase;
  font-size: 1rem;
}

.texto-info h2 {
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
}

.cartoes {
  display: inline-block;
  margin: 20px 20px;
}

.cartoes img {
  max-height: 27px;
  display: inline-block;
  margin: 0 5px;
}

.copyright-area {
  display: block;
  font-size: 0.6rem;
  max-width: 1200px;
  margin: 10px auto;
  border-top: 1px solid #ccc;
}

.copyright {
  font-size: 0.6rem;
  display: inline-block;
  font-style: italic;
  font-family: sans-serif;
  color: black;
}

.links {
  display: inline-block;
  margin-top: 15px;
}

.copyright-area .links a {
  font-weight: bolder;
  color: black;
  font-size: 0.7rem;
  padding: 5px 10px;
}

.copyright-area .links a:first-child {
  border-right: 1px solid #ccc;
}

.inscricao {
  position: absolute;
  top: 95px;
  right: 50px;
}

.inscricao p {
  color: black;
  text-align: left;
  margin: 10px auto 10px 11px;
  font-size: 1rem;
  font-weight: 600;
}

.inscricao form input {
  width: 350px;
  height: 30px;
  background: black;
  color: #ccc;
  border: none;
  border-radius: 0;
  vertical-align: top;
}

.inscricao form input::placeholder {
  color: rgb(218, 218, 218);
  font-style: italic;
  font-family: sans-serif;
  font-size: 0.8rem;
}

.inscricao form button {
  background: black;
  margin: 0 8px;
  border: none;
  width: 120px;
  height: 30px;
  font-weight: 600;
  color: white;
}
</style>
