<template>
  <section class="checkout-container">
    <div class="finalizandoCompra modal" v-if="finalizandoCompra">
      <div class="loginArea">
        <p class="loginTitulo">Aguarde...</p>
        <p
          v-if="erros"
          class="loginFechar"
          @click="verificarLogin = false;finalizandoCompra=false; erros=[]; mostrarDadosCobranca = false; finalizar = false;"
        >X</p>
        <ErroNotificacao v-if="erros" :erros="erros" />
      </div>
    </div>
    <div class="verificarLogin modal" v-if="verificarLogin">
      <div class="loginArea">
        <p class="loginTitulo">Digite seu email</p>
        <p
          class="loginFechar"
          @click="verificarLogin = false; mostrarDadosCobranca = false; finalizar = false;"
        >X</p>
        <form class="loginInput">
          <input
            required
            type="email"
            id="email"
            name="email"
            v-model="email"
            class="emailLogin inputModal"
            :disabled="usuarioCadastrado"
          />
          <button
            @click.prevent="verificarSeTemLogin"
            class="btnEmailSenha"
            :class="{bg_green: emailValido}"
            :disabled="!emailValido"
          >ok</button>
        </form>
        <form class="senhaInput" v-if="usuarioCadastrado">
          <label for="senha" class="labelEmailSenha">Senha</label>
          <input
            required
            type="password"
            id="senhaModal"
            name="senha"
            v-model="loginData.senha"
            class="emailSenha inputModal"
          />
          <button
            @click.prevent="logar"
            class="btnEmailSenha"
            :class="{bg_green: this.loginData.senha.length >= 1}"
          >entrar</button>
          <ErroNotificacao :erros="erros" />
        </form>
      </div>
    </div>
    <div class="modal dadosCobranca" v-if="mostrarDadosCobranca">
      <div class="cobrancaContainer">
        <div class="cobrancaArea">
          <div class="dados_cobranca_area">
            <p class="cobrancaTitulo">Endereço de cobrança</p>
            <p
              class="loginFechar"
              @click="mostrarDadosCobranca = false; verificarLogin = true; finalizar = false;"
            >X</p>
            <div class="linha_dados">
              <div class="linha_dados">
                <div class="input_area left">
                  <label for="name" class="label_finalizar">Nome:</label>
                  <input
                    type="text"
                    class="input_finalizar bairro_entrega"
                    name="name"
                    id="nameCobranca"
                    v-model="nome"
                    maxlength="40"
                    :class="{error: !nome}"
                  />
                </div>
                <div class="input_area">
                  <label for="phone" class="label_finalizar">Telefone:</label>
                  <input
                    type="text"
                    name="phone"
                    id="phoneCobranca"
                    v-model="telefone"
                    v-mask="['(##) ####-####', '(##) #-####-####']"
                    class="input_finalizar uf_entrega"
                    :class="{error: !telefone}"
                  />
                </div>
              </div>

              <div class="input_area full">
                <label for="endereco" class="label_finalizar">Endereço:</label>
                <input
                  type="text"
                  name="address_1"
                  id="address_1"
                  v-model="rua"
                  class="input_finalizar input_endereco_entrega"
                  :class="{error: !rua}"
                />
              </div>
            </div>
            <div class="linha_dados">
              <div class="input_area left">
                <label for="postcode" class="label_finalizar">CEP:</label>
                <input
                  type="text"
                  name="postcode"
                  id="postcode"
                  v-model="cep"
                  @keyup="preencherCep"
                  v-mask="'#####-###'"
                  class="input_finalizar cep_entrega"
                  :class="{error: !cep}"
                />
              </div>
              <div class="input_area left">
                <label for="numero" class="label_finalizar">Número:</label>
                <input
                  type="text"
                  name="numero"
                  id="numero"
                  class="input_finalizar numero_entrega"
                  v-model="numero"
                  :class="{error: !numero}"
                />
              </div>
              <div class="input_area">
                <label for="complemento" class="label_finalizar">Complemento:</label>
                <input
                  type="text"
                  name="complemento"
                  id="complemento"
                  v-model="complemento"
                  class="input_finalizar complemento_entrega"
                />
              </div>
            </div>
            <div class="linha_dados">
              <div class="input_area left">
                <label for="bairro" class="label_finalizar">Bairro:</label>
                <input
                  type="text"
                  name="address_2"
                  id="address_2"
                  class="input_finalizar bairro_entrega"
                  v-model="bairro"
                  :class="{error: !bairro}"
                />
              </div>
              <div class="input_area">
                <label for="uf" class="label_finalizar">UF:</label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  v-model="estado"
                  v-mask="'AA'"
                  class="input_finalizar uf_entrega"
                  :class="{error: !estado}"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="cobrancaAreaBottom"
          @click="dadosCobranca ? mostrarDadosCobranca=false : null"
          :class="{bg_blue:dadosCobranca}"
        >ok</div>
      </div>
    </div>
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
            <p class="quantidade">
              <span
                class="alterarItemQuantidade"
                :class="{alterarItemQuantidadeDisabled: item.quantidade <= 1}"
                @click="
                item.quantidade > 1 ?
                reduzirItemDoCarrinho({index:index, estoque:item.estoque, isCombo:item.isCombo, comboFinal:item.comboFinal, comboInicial:item.comboInicial}) : 
                removerItemDoCarrinho({index:index, estoque:item.estoque, isCombo:item.isCombo, comboFinal:item.comboFinal, comboInicial:item.comboInicial})
                "
              >-</span>
              {{item.quantidade}}
              <span
                class="alterarItemQuantidade"
                :class="[item.estoque < 5 || item.quantidade >= 5 ? 'alterarItemQuantidadeDisabled' : '']"
                @click="
                item.quantidade >= 5 ?
                null : 
                aumentarItemDoCarrinho({index:index, estoque:item.estoque, isCombo:item.isCombo, comboFinal:item.comboFinal, comboInicial:item.comboInicial})
                "
              >+</span>
            </p>
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
              @click="removerItemDoCarrinho({index:index, estoque:item.estoque, isCombo:item.isCombo, comboFinal:item.comboFinal, comboInicial:item.comboInicial})"
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
                id="postcodeEntrega1"
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
            <div v-if="desconto.valor" class="descontovalor red">- {{desconto.valor | numeroPreco}}</div>
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
            @click="habilitarBtn ? fecharCompra() : null"
          >
            <p>Fechar compra</p>
          </div>
        </div>
      </div>
    </div>
    <div class="finalizar" v-else>
      <div class="dados_cliente">
        <p class="top_dados maincontent-header">Dados</p>
        <div class="dados_area">
          <div class="linha_dados">
            <div class="input_area left">
              <label for="nome" class="label_finalizar">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                v-model="nome"
                maxlength="40"
                placeholder="seu nome completo"
                class="input_finalizar nome"
                :class="{error: !nome}"
              />
            </div>
            <div class="input_area">
              <label for="cpf" class="label_finalizar">CPF:</label>
              <input
                class="input_finalizar cpf"
                required
                type="text"
                id="cpf"
                name="cpf"
                v-model="cpf"
                v-mask="['###.###.###-##']"
                :class="{error: !cpf}"
              />
            </div>
          </div>
          <div class="linha_dados">
            <div class="input_area left">
              <label for="nascimento" class="label_finalizar">Data de nascimento:</label>
              <input
                required
                type="text"
                id="nascimento"
                name="nascimento"
                v-model="nascimento"
                v-mask="['##/##/####']"
                class="input_finalizar nascimento"
                :class="{error: !nascimento}"
              />
            </div>
            <div class="input_area">
              <label for="celular" class="label_finalizar">Celular:</label>
              <input
                required
                type="text"
                id="telefone"
                name="telefone"
                v-model="telefone"
                v-mask="['(##) ####-####', '(##) #-####-####']"
                class="input_finalizar celular"
                :class="{error: !telefone}"
              />
            </div>
          </div>
          <div class="linha_dados">
            <div class="input_area full">
              <label for="email" class="label_finalizar">E-mail:</label>
              <input
                class="input_finalizar email"
                required
                type="email"
                id="input_finalizar_email"
                name="email"
                v-model="email"
                :class="{error: !email}"
              />
            </div>
            <div class="linha_dados">
              <div class="input_area left" :class="{invisible: login}">
                <label for="senha" class="label_finalizar">Senha:</label>
                <input
                  required
                  type="password"
                  id="senha"
                  name="senha"
                  v-model="senha"
                  class="input_finalizar bairro_entrega"
                  :class="{error: !senha}"
                />
              </div>
              <div class="input_area" :class="{invisible: login}">
                <label for="confirmar_senha" class="label_finalizar">Confirme sua senha:</label>
                <input
                  type="password"
                  name="confirmar_senha"
                  id="confirmar_senha"
                  v-model="confirmar_senha"
                  class="input_finalizar uf_entrega"
                  :class="{error: !senha_confirmada}"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="endereco_entrega">
        <p class="top_endereco_entrega maincontent-header">Entrega</p>
        <div class="dados_area">
          <div class="linha_dados">
            <div class="linha_dados">
              <div class="input_area left">
                <label for="nameEntrega" class="label_finalizar">Nome:</label>
                <input
                  type="text"
                  class="input_finalizar bairro_entrega"
                  name="nameEntrega"
                  id="nameEntrega"
                  v-model="nomeEntrega"
                  maxlength="40"
                  :class="{error: !nomeEntrega}"
                />
              </div>
              <div class="input_area">
                <label for="phoneEntrega" class="label_finalizar">Telefone:</label>
                <input
                  type="text"
                  name="phoneEntrega"
                  id="phoneEntrega"
                  v-model="telefoneEntrega"
                  v-mask="['(##) ####-####', '(##) #-####-####']"
                  class="input_finalizar uf_entrega"
                  :class="{error: !telefoneEntrega}"
                />
              </div>
            </div>

            <div class="input_area full">
              <label for="endereco_entrega" class="label_finalizar">Endereço:</label>
              <input
                type="text"
                name="address_1Entrega"
                id="address_1Entrega"
                v-model="ruaEntrega"
                class="input_finalizar input_endereco_entrega"
                :class="{error: !ruaEntrega}"
              />
            </div>
          </div>
          <div class="linha_dados">
            <div class="input_area left">
              <label for="postcodeEntrega" class="label_finalizar">CEP:</label>
              <input
                type="text"
                name="postcodeEntrega"
                id="postcodeEntrega2"
                v-model="cepEntrega"
                @keyup="preencherCepEntrega"
                v-mask="'#####-###'"
                class="input_finalizar cep_entrega"
                :class="{error: !cepEntrega}"
              />
            </div>
            <div class="input_area left">
              <label for="numero_entrega" class="label_finalizar">Número:</label>
              <input
                type="text"
                name="numeroEntrega"
                id="numeroEntrega"
                class="input_finalizar numero_entrega"
                v-model="numeroEntrega"
                :class="{error: !numeroEntrega}"
              />
            </div>
            <div class="input_area">
              <label for="complemento" class="label_finalizar">Complemento:</label>
              <input
                type="text"
                name="complementoEntrega"
                id="complementoEntrega"
                v-model="complementoEntrega"
                class="input_finalizar complemento_entrega"
              />
            </div>
          </div>
          <div class="linha_dados">
            <div class="input_area left">
              <label for="bairro" class="label_finalizar">Bairro:</label>
              <input
                type="text"
                name="address_2Entrega"
                id="address_2Entrega"
                class="input_finalizar bairro_entrega"
                v-model="bairroEntrega"
                :class="{error: !bairroEntrega}"
              />
            </div>
            <div class="input_area">
              <label for="uf" class="label_finalizar">UF:</label>
              <input
                type="text"
                name="stateEntrega"
                id="stateEntrega"
                v-model="estadoEntrega"
                v-mask="'AA'"
                class="input_finalizar uf_entrega"
                :class="{error: !estadoEntrega}"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="formas_de_pagamento">
        <div class="pagamento_menu">
          <div class="pagamento_header">
            <p>Pagamento</p>
          </div>
          <div
            class="pagamento_opcao"
            :class="[pagamento_selecionado == 'cartao' ? 'active' : '']"
            @click="pagamento_selecionado = 'cartao'"
          >
            <p>Cartão de crédito</p>
          </div>
          <div
            class="pagamento_opcao"
            :class="[pagamento_selecionado == 'boleto' ? 'active' : '']"
            @click="pagamento_selecionado = 'boleto'"
          >
            <p>Boleto</p>
          </div>
        </div>
        <div class="pagamento_dados">
          <section class="cartao_dados" v-if="pagamento_selecionado == 'cartao'">
            <div class="linha_dados">
              <div class="input_area left">
                <label for="CardNumber" class="label_finalizar">Número do cartão:</label>
                <input
                  type="text"
                  class="input_finalizar numero_cartao"
                  v-mask="'####.####.####.####'"
                  name="CardNumber"
                  id="CardNumber"
                  v-model="CardNumber"
                  :class="{error: !CardNumber}"
                />
              </div>
              <div class="input_area left">
                <label for="SecurityCode" class="label_finalizar">Código:</label>
                <input
                  type="text"
                  class="input_finalizar codigo_cartao"
                  name="SecurityCode"
                  id="SecurityCode"
                  v-model="SecurityCode"
                  v-mask="'####'"
                  placeholder="CVV"
                  :class="{error: !SecurityCode}"
                />
              </div>
              <div class="input_area left">
                <label for="ExpirationDate" class="label_finalizar">Validade:</label>
                <input
                  type="text"
                  class="input_finalizar validade_cartao"
                  name="ExpirationDate"
                  id="ExpirationDate"
                  placeholder="MM/AAAA"
                  v-mask="'##/20##'"
                  v-model="ExpirationDate"
                  :class="{error: !ExpirationDate}"
                />
              </div>
              <div class="input_area parcelasArea">
                <label for="Installments" class="label_finalizar">Parcelas:</label>
                <select
                  class="input_finalizar"
                  name="Installments"
                  id="parcelas_cartao"
                  v-model="Installments"
                >
                  <option
                    v-for="parcela in parcelasDisponiveis"
                    :value="parcela.numero"
                    :key="`parcela-${parcela.numero}`"
                  >{{ parcela.numero }}</option>
                </select>
              </div>
            </div>
            <div class="linha_dados">
              <div class="input_area full">
                <label for="Holder" class="label_finalizar">Nome impresso no cartão:</label>
                <input
                  type="text"
                  class="input_finalizar nome_cartao"
                  name="Holder"
                  id="Holder"
                  v-model="Holder"
                  maxlength="40"
                  :class="{error: !Holder}"
                />
              </div>
            </div>
          </section>
          <section class="boleto_dados" v-if="pagamento_selecionado == 'boleto'">
            <p>Ok! Ao clicar em "finalizar compra" iremos gerar o seu boleto.</p>
          </section>
        </div>
      </div>
      <div class="resumo_finalizar">
        <p class="top_resumo_finalizar maincontent-header">Resumo da compra</p>
        <div class="carrinho_finalizar">
          <div class="carrinho_finalizar_main">
            <div class="fechar_area">
              <p class="seu_carrinho">Seu carrinho</p>
              <p class="fechar_carrinho"></p>
            </div>
            <div class="carrinho_items">
              <div class="scroller" v-if="carrinho.length > 0">
                <transition-group class="carrinho_lista" name="cart-list" tag="ul">
                  <li v-if="ganhouPresente" class="carrinho_item" key="carrinho-presente">
                    <p class="quantidade">Quantidade: 1</p>
                    <p class="titulo">{{nomeDoPresente | uppercase}}</p>
                    <p class="tamanho">Tamanho: U</p>
                    <img :src="fotoDoPresente" :alt="nomeDoPresente" class="foto" />

                    <p class="carrinho_preco green">{{0 | numeroPreco}}</p>
                    <button class="carrinho_remover"></button>
                    <br />
                  </li>
                  <li
                    class="carrinho_item"
                    v-for="(item, index) in carrinho"
                    :key="`carrinho-item${index}`"
                  >
                    <p class="quantidade">Quantidade: {{item.quantidade}}</p>
                    <p
                      class="titulo"
                    >{{item.categoria | uppercase}} PARA CACHORROS {{item.estampa | uppercase}}</p>
                    <p class="tamanho">Tamanho: {{item.tamanho}}</p>
                    <img
                      :src="item.fotoUrl"
                      :alt="`${item.categoria} para cachorros ${item.estampa}`"
                      class="foto"
                    />

                    <p
                      :class="{ green: item.isCombo }"
                      class="carrinho_preco"
                    >{{item.valorUnitarioCobrado * item.quantidade | numeroPreco}}</p>
                    <button
                      class="carrinho_remover"
                      @click="removerItemDoCarrinho({index:index, estoque:item.estoque, isCombo:item.isCombo, comboFinal:item.comboFinal, comboInicial:item.comboInicial})"
                    >X</button>
                    <br />
                  </li>
                </transition-group>
              </div>
            </div>

            <div class="cupom_carriho">
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
            <div class="frete_carrinho">
              <div class="frete" v-if="!pac.mostrar && !sedex.mostrar">
                <section class="frete-vazio">
                  <div v-if="calculandoFrete" class="carregando-area">calculando...</div>
                  <p class="label">Digite o CEP</p>
                  <input
                    class="input-frete"
                    :class="{error: freteErrado}"
                    type="text"
                    name="postcodeEntrega"
                    id="postcodeEntrega3"
                    v-model="cepEntrega"
                    @keyup="preencherCepEntrega"
                    v-mask="'#####-###'"
                  />
                  <button
                    class="btn-frete bg_red"
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
                <label
                  v-if="sedex.mostrar"
                  class="sedex_tag"
                  for="sedex"
                >Sedex: {{sedex.prazo}} d.u.</label>
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
                  <p
                    v-if="sedex.mostrar"
                    class="valor_frete valor_sedex"
                  >{{sedex.valor | numeroPreco}}</p>
                </label>
              </div>
              <div class="total">
                <div v-if="desconto.valor" class="descontotexto label-black">DESCONTO</div>
                <div
                  v-if="desconto.valor"
                  class="descontovalor red"
                >- {{desconto.valor | numeroPreco}}</div>
                <div class="totaltexto label-black">Total</div>
                <div
                  class="totalvalor"
                >{{carrinhoTotalComDesconto+freteEscolhido.valor | numeroPreco}}</div>
              </div>
            </div>
          </div>
          <button
            class="carrinho_finalizar_btn"
            :class="{bg_green: finalizarOk}"
            :disabled="!finalizarOk"
            @click="finalizarCompra"
          >FINALIZAR COMPRA</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { mapFields } from "@/helpers.js";
import { getCep } from "@/services.js";
import axios from "axios";
import { api } from "@/services.js";
import { requestCielo } from "@/helpers.js";

export default {
  name: "Checkout",
  components: {},
  data() {
    return {
      pagou: false,
      finalizandoCompra: false,
      verificarLogin: false,
      mostrarDadosCobranca: false,
      usuarioCadastrado: false,
      confirmar_senha: "",
      loginData: {
        email: "",
        senha: ""
      },
      pagamento_selecionado: "cartao",
      Installments: 1,
      CardNumber: "",
      Holder: "",
      ExpirationDate: "",
      SecurityCode: "",
      Brand: "",
      erros: [],
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
      login: state => state.login,
      idOrdemAberta: state => state.order.idOrdemAberta,
      order: state => state.order,
      metaFreteGratis: state => state.order.metaMenor
    }),
    ...mapGetters([
      "desconto",
      "carrinhoTotalComDesconto",
      "parcelasDisponiveis"
    ]),
    ...mapFields({
      fields: [
        "nome",
        "senha",
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
    freteGratis() {
      let resposta = false;
      if (this.valorTotalCarrinho >= this.metaFreteGratis) {
        resposta = true;
      }

      return resposta;
    },
    senha_confirmada() {
      if (this.confirmar_senha === this.senha) {
        return true;
      }
      return false;
    },
    emailValido() {
      if (
        this.email.length >= 5 &&
        this.email.includes("@") &&
        this.email.includes(".") &&
        this.usuarioCadastrado == false
      ) {
        return true;
      }
      return false;
    },
    finalizarOk() {
      if (this.dadosOk && this.pagamentoOk && this.freteOk) {
        return true;
      }
      return false;
    },
    pagamentoOk() {
      if (this.pagamento_selecionado == "boleto") {
        return true;
      } else if (this.pagamento_selecionado == "cartao") {
        if (
          this.Installments &&
          this.CardNumber &&
          this.Holder &&
          this.ExpirationDate &&
          this.SecurityCode
        ) {
          return true;
        }
        return false;
      }
      return false;
    },
    freteOk() {
      if (this.freteEscolhido.valor>=0 && this.freteEscolhido.nome) {
        return true;
      }
      return false;
    },
    dadosCobranca() {
      if (
        this.nome &&
        this.telefone &&
        this.rua &&
        this.cep &&
        this.numero &&
        this.bairro &&
        this.cidade &&
        this.estado
      ) {
        return true;
      }
      return false;
    },
    dadosEntrega() {
      if (
        this.nomeEntrega &&
        this.telefoneEntrega &&
        this.ruaEntrega &&
        this.cepEntrega &&
        this.numeroEntrega &&
        this.bairroEntrega &&
        this.cidadeEntrega &&
        this.estadoEntrega
      ) {
        return true;
      }
      return false;
    },
    dadosOk() {
      if (
        this.dadosCobranca &&
        this.dadosEntrega &&
        this.cpf &&
        this.nascimento &&
        this.email
      ) {
        if (!this.login && !this.senha) {
          return false;
        } else if (this.login && !this.senha) {
          return true;
        } else if (!this.login && this.senha && this.senha_confirmada) {
          return true;
        }
      } else {
        return false;
      }
      return false;
    },
    primeiroNome() {
      return this.usuario.nome.replace(/ .*/, "");
    },
    habilitarBtn() {
      if (this.freteEscolhido.valor > 0 && !this.calculandoFrete) {
        return true;
      } else {
        return true;
      }
    }
  },
  watch: {
    verificarLogin() {
      if (this.verificarLogin === false && this.finalizar === true) {
        this.mostrarDadosCobranca = true;
        this.scrollBehavior();
      }
    },
    couponCode() {
      this.cupomInvalido = false;
    },
    cepEntrega() {
      this.pac.mostrar = false;
      this.sedex.mostrar = false;
      this.resetarFrete();
    },
    carrinho: {
      // eslint-disable-next-line
      handler: function(val, oldVal) {
        this.checkCart();
        window.localStorage.carrinho = [];
        this.atualizarCarrinhoTotal();
      },
      deep: true
    },
    order: {
      // eslint-disable-next-line
      handler: function(val, oldVal) {
        if (this.pagamento_selecionado === "cartao" && !this.pagou) {
          this.abrirOrdemCreditoCielo();
        } else if (this.pagamento_selecionado === "boleto" && !this.pagou) {
          this.abrirOrdemBoleto();
        }
      },
      deep: true
    },
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
  methods: {
    ...mapActions([
      "setOrder",
      "deleteCupom",
      "getCupom",
      "removerItemDoCarrinho",
      "aumentarItemDoCarrinho",
      "reduzirItemDoCarrinho",
      "atualizarCarrinhoTotal",
      "checarLocalStorage",
      "escolherFrete",
      "esvaziarCarrinho",
      "setOrderId"
    ]),
    scrollBehavior() {
      return window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    fecharCompra() {
      if (this.login) {
        this.finalizar = true;
      } else {
        this.email = "";
        this.usuarioCadastrado = false;

        if (this.login) {
          this.finalizar = true;
        } else {
          this.verificarLogin = true;
          this.scrollBehavior();
        }
      }
    },
    verificarSeTemLogin() {
      this.loginData.email = this.email;

      let loginTestData = {
        email: this.email,
        senha: "1j2jh44jb6b"
      };
      this.$store
        .dispatch("logarUsuario", loginTestData)
        .then(() => {
          this.usuarioCadastrado = true;
          this.erros = [];
        })
        .catch(e => {
          if (e.response.data.code == "[jwt_auth] invalid_email") {
            this.verificarLogin = false;
            this.finalizar = true;
          } else {
            this.usuarioCadastrado = true;
            this.erros = [];
          }
        });
    },
    logar() {
      this.erros = [];
      this.$store
        .dispatch("logarUsuario", this.loginData)
        .then(() => {
          this.$store.dispatch("getUsuario");
        })
        .then(() => {
          this.verificarLogin = false;
          this.finalizar = true;
        })
        .catch(e => {
          
          this.erros.push(e.response.data.message);
        });
    },
    checkCart() {
      let quantidade = this.carrinho.length;
      if (quantidade === 0) {
        this.$router.push({ name: "home" });
      }
      this.pac.mostrar = false;
      this.sedex.mostrar = false;
      this.calcularPrecoPrazo();
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
      if (this.cepEntrega.length >= 8) {
        this.calculandoFrete = true;
      }
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
          console.log("erro calcularPrecoPrazo");
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
    },
    /*************************    METHODS CARTÃO ABAIXO     ****************************************/
    abrirOrdemCreditoCielo() {
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
          this.erros.push(erro.response.data.message);
          this.pagou = false;
          return {
            status: "00",
            resposta: "erro no cartão. " + erro
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
          requestCielo("PUT", autorizacaoResposta).then(function(
            respostaCaptura
          ) {
            let resposta = JSON.parse(respostaCaptura.target.response);
            resposta.Status === 2 ? self.atualizarOrder(resposta.Status) : "";
          });
        } else {
          this.erroNoPagamentoCielo(autorizacaoResposta);
        }
      })
      .catch(erro => {
        this.erros.push(erro.response.data.message);
        });
    },
    erroNoPagamentoCielo(resposta) {
      let erro = resposta + ". Tente novamente";
      this.pagou = false;
      this.erros.push(erro);
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
            customer_note: "parcelas: " + this.Installments.toString()
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
    },
    finalizarCompra() {
      this.erros = [];
      this.finalizandoCompra = true;
      this.scrollBehavior();
      this.verificarCadastro();
    },
    verificarCadastro() {
      if (this.login) {
        this.pagar();
      } else {
        this.criarUsuario();
      }
    },
    async criarUsuario() {
      this.erros = [];

      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario");
        await this.pagar();
      } catch (e) {
        this.erros.push(e.response.data.message);
      }
    },
    pagar() {
      this.pagou = true;

      if (this.pagamento_selecionado === "cartao") {
        this.newOrder({
          payment_method: "cielo_credit",
          payment_method_title: "Cartão de crédito"
        });
        this.abrirOrdemCreditoCielo();
      } else if (this.pagamento_selecionado === "boleto") {
        this.newOrder({
          payment_method: "woo-moip-official",
          payment_method_title: "Boleto"
        });
        this.abrirOrdemBoleto();
      }
    },
    /*************     FIM METHODS CARTAO CIELO     **********************/

    /*************     METHODS BOLETO ABAIXO     **********************/
    abrirOrdemBoleto() {
      this.pagamento_selecionado === "";
      let data = {
        endpoint: "/orders",
        body: this.order.order
      };
      api.postApiWc(data).then(r => {
        this.redirecionarParaMoip(r);
      });
    },
    redirecionarParaMoip(r) {
      let orderItems = [];

      r.data.line_items.forEach(element => {
        orderItems.push({
          product: element.name,
          quantity: element.quantity,
          detail: element.sku,
          price: element.price > 0 ? element.price * 100 : 1
        });
      });

      let pedido = {
        ownId: r.data.id,
        amount: {
          currency: "BRL",
          subtotals: {
            shipping: Math.floor(Number(r.data.shipping_total) * 100)
          }
        },
        items: orderItems,
        customer: {
          ownId: this.usuario.id,
          fullname: this.usuario.nome,
          email: this.usuario.email,
          birthDate:
            this.usuario.nascimento.substring(6) +
            "-" +
            this.usuario.nascimento.substring(3, 5) +
            "-" +
            this.usuario.nascimento.substring(0, 2),
          taxDocument: {
            type: "CPF",
            number: this.usuario.cpf
          },
          phone: {
            countryCode: "55",
            areaCode: this.usuario.telefone.substring(1, 3),
            number: this.usuario.telefone.substring(5)
          },
          shippingAddress: {
            street: this.usuario.ruaEntrega,
            streetNumber: Number(this.usuario.numeroEntrega),
            complement: this.usuario.complementoEntrega,
            district: this.usuario.bairroEntrega,
            city: this.usuario.cidadeEntrega,
            state: this.usuario.estadoEntrega,
            country: "BRA",
            zipCode: this.usuario.cepEntrega
          }
        }
      };
      var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.moip.com.br/v2/orders",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          Authorization:
            "Basic: Q1VDUkgxVkhUQUpHSkZHQzJVWFFNTjAzUVJLT1NER046V041UkRNRUNaTFFDUUIwWlVMVVI1S05KUTZEUlhTT0FJMFNNREJVSg=="
        },
        data: JSON.stringify(pedido)
      };
      let self = this;
      // eslint-disable-next-line
      $.ajax(settings).done(function(response) {
        self.esvaziarCarrinho();
        self.$router.push({
          name: "BoletoGerado",
          params: { link: response._links.checkout.payBoleto.redirectHref }
        });
        window.open(response._links.checkout.payBoleto.redirectHref);
      });
    }
    /*************     FIM METHODS BOLETO     **********************/
  },
  created() {
    this.finalizandoCompra = false;
    this.pagou = false;
    this.pagamento_selecionado = "cartao";
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
    1fr minmax(1000px, 1500px) 1fr;
}

.logo {
  grid-area: logo;
  height: 100px;
  margin: auto;
}

.modal::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 96;
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

.loginArea {
  margin-top: 50px;
  position: relative;
  z-index: 99;
  animation: fadeIn 0.3s forwards;
  background: #fff;
  padding: 20px 30px;
  border-radius: 20px;
  box-shadow: 0 6px 6px rgba(38, 56, 74, 0.7);
  width: 700px;
  height: 300px;
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

.loginTitulo {
  font-family: "Fira Sans", sans-serif;
  font-size: 1.2em;
  font-style: italic;
  color: black;
  margin: auto;
  font-weight: bold;
  margin-top: 20px;
  float: left;
}

.loginFechar {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.9em;
  font-weight: bolder;
  color: black;
  margin: auto;
  float: right;
  margin-top: -10px;
  cursor: pointer;
}

.loginInputs {
  color: #000;
}

.inputModal {
  background: #ebebec;
  height: 38px;
  margin: 5px 0 10px 0;
  border-radius: 0;
  box-shadow: none;
  text-transform: uppercase;
  text-align: center;
  border: none;
  padding: 5px 0 0 0;
}
.emailLogin {
  width: 475px;
}

.btnEmailLogin {
  width: 115px;
  background: #747474;
  height: 38px;
  border: none;
  text-align: center;
  color: #fff;
  font-family: "Fira Sans", sans-serif;
  font-size: 1.2em;
  font-style: italic;
  cursor: pointer;
}

.sectionSenha {
  margin: 0 50px;
}

.labelEmailSenha {
  font-family: "Fira Sans", sans-serif;
  font-size: 0.9em;
  font-style: italic;
  color: black;
  margin: auto;
  font-weight: bold;
  display: block;
}

.emailSenha {
  width: 345px;
}

.btnEmailSenha {
  width: 115px;
  background: #747474;
  height: 38px;
  border: none;
  text-align: center;
  color: #fff;
  font-family: "Fira Sans", sans-serif;
  font-size: 1.2em;
  font-style: italic;
  cursor: pointer;
}

.continuarSemLogin {
  cursor: pointer;
  font-size: 1rem;
}

/* *************** MAIN AREA *************** */
.main {
  grid-area: main;
  min-height: 400px;
  display: grid;
  grid-template:
    ". mainheader ." 50px
    ". maincontent ." 1fr
    / 1fr 1100px 1fr;
}

.mainheader {
  grid-area: mainheader;
  align-self: center; /* alinhamento vertical */
  margin: 0 30px;
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
  max-width: 1100px;
  margin: 0 auto;
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

input {
  text-transform: uppercase;
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
  height: 3px;
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
  height: 29px;
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

.cobrancaContainer {
  margin-top: 50px;
  z-index: 99;
  animation: fadeIn 0.3s forwards;
  border-radius: 20px;
  box-shadow: 0 6px 6px rgba(38, 56, 74, 0.7);
  padding: 0;
}

.cobrancaTitulo {
  font-family: "Fira Sans", sans-serif;
  font-size: 1.2em;
  font-style: italic;
  color: black;
  margin: auto;
  font-weight: bold;
  float: left;
}

.cobrancaArea {
  position: relative;
  background: #f5f5f6;
  padding: 0;
  width: 360px;
  padding-bottom: 10px;
  border-top: 20px solid #f5f5f6;
  border-right: 20px solid #f5f5f6;
  border-left: 20px solid #f5f5f6;
  border-bottom: none;
  border-radius: 20px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.cobrancaAreaBottom {
  font-family: "Fira Sans", sans-serif;
  font-size: 1.8em;
  font-style: italic;
  padding: 10px;
  color: #fff;
  cursor: pointer;
  background: #a0a0a0;
  text-align: center;
  font-weight: 700;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

.dados_cobranca_area {
  width: 325px;
  margin: 0 auto;
}
/* ******************* FIM MAIN AREA *************************/

/* ******************* FINALIZAR AREA *************************/

.finalizar {
  grid-area: main;
  margin: 0 auto;
  min-height: 400px;
  display: grid;
  grid-template:
    "dados_cliente endereco_entrega resumo_finalizar" 1fr
    "formas_de_pagamento formas_de_pagamento resumo_finalizar" 150px /
    365px 365px 365px;
}

.top_dados,
.top_endereco_entrega,
.top_resumo_finalizar {
  margin: 10px auto 5px 0px;
  font-size: 1.5rem;
}

.label_finalizar {
  font-size: 0.8rem;
  font-weight: bolder;
  color: black;
  margin-left: 5px;
}

.input_finalizar {
  border: 2px solid #eeedef;
  background: none;
  box-shadow: none;
  background: none;
  box-shadow: none;
  padding: 5px;
  display: block;
  margin-bottom: 0;
}

.input_area {
  display: inline-block;
}

.input_area.left {
  margin-right: 5px;
}

.input_area.full {
  width: 100%;
}

.dados_cliente {
  grid-area: dados_cliente;
  display: grid;
  grid-template:
    "header" 35px
    "linha" 1fr /
    1fr;
  background: #fafafa;
  padding: 0 10px 10px 20px;
}

.input_finalizar.cpf {
  max-width: 115px;
  max-width: 130px;
}
.input_finalizar.nascimento {
  max-width: 130px;
}
.input_finalizar.cep_entrega {
  max-width: 100px;
}
.input_finalizar.numero_entrega {
  max-width: 65px;
}
.input_finalizar.complemento_entrega {
  max-width: 150px;
}
.input_finalizar.bairro_entrega {
  max-width: 160px;
}
.input_finalizar.uf_entrega {
  max-width: 160px;
}

.endereco_entrega {
  grid-area: endereco_entrega;
  display: grid;
  grid-template:
    "header" 35px
    "linha" 1fr /
    1fr;
  background: #f1f1f2;
  padding: 0 20px;
}

.resumo_finalizar {
  grid-area: resumo_finalizar;
  display: grid;
  grid-template:
    "header" 45px
    "carrinho_finalizar" 1fr /
    1fr;
  background: #e8e8e8;
  padding: 0 20px;
}

.carrinho_finalizar {
  grid-area: carrinho_finalizar;
  display: grid;
  grid-template:
    "carrinho_finalizar_main" 320px
    "carrinho_finalizar_btn" 40px /
    320px;
}

.carrinho_finalizar_main {
  grid-area: carrinho_finalizar_main;
  background: #f6f5f4;
  display: grid;
  grid-template:
    "fechar_area fechar_area" 25px
    "carrinho_items carrinho_items" 1fr
    "cupom_carriho frete_carrinho" 90px /
    1fr 1fr;
  padding: 5px 10px;
}

.fechar_area {
  grid-area: fechar_area;
}
.seu_carrinho {
  display: inline;
}
.fechar_carrinho {
  float: right;
}

.scroller {
  overflow-y: scroll;
  max-height: 185px;
}

.scroller::-webkit-scrollbar {
  width: 0;
}

.carrinho_items {
  grid-area: carrinho_items;
}

.alterarItemQuantidade {
  color: #000;
  cursor: pointer;
}

.alterarItemQuantidadeDisabled {
  color: #c7c7c7;
}

.carrinho_items .carrinho_item {
  display: grid;
  grid-template: "foto . . . carrinho_remover" 10px "foto titulo titulo titulo ." 20px "foto tamanho quantidade . ." 20px "foto  tamanho quantidade . carrinho_preco" 20px / 60px 60px 60px 1fr;
  background: white;
  border-radius: 10px;
  padding: 3px 10px 0 10px;
  margin-top: 10px;
}
.carrinho_items .carrinho_item .carrinho_preco {
  font-size: 0.8rem;
  grid-area: carrinho_preco;
}
.carrinho_items .carrinho_item .tamanho {
  font-size: 0.6rem;
  grid-area: tamanho;
  text-align: left;
}
.carrinho_items .carrinho_item .quantidade {
  font-size: 0.6rem;
  grid-area: quantidade;
  text-align: left;
}
.carrinho_items .carrinho_item .titulo {
  font-size: 0.7rem;
  grid-area: titulo;
}
.carrinho_items .carrinho_item .carrinho_remover {
  font-size: 0.6rem;
  text-align: right;
  grid-area: carrinho_remover;
}
.carrinho_items .carrinho_item .foto {
  width: 55px;
  height: 55px;
  grid-area: foto;
}

.cupom_carriho {
  grid-area: cupom_carriho;
}
.cupom_carriho .cupom-vazio {
  padding: 0;
}
.cupom_carriho .label {
  font-size: 0.8rem;
  text-align: center;
}
.cupom_carriho .cupom-vazio,
.cupom_carriho .cupom-aplicado {
  text-align: center;
}
.cupom_carriho .cupom-vazio .input-cupom {
  height: 20px;
  font-size: 0.9rem;
  padding: 5px;
  width: 110px;
}
.cupom_carriho .cupom-vazio .btn-cupom {
  width: 60px;
  height: 15px;
  padding: 0;
  font-size: 0.7rem;
}
.frete_carrinho {
  grid-area: frete_carrinho;
}

.frete_carrinho .frete-vazio {
  padding: 0;
  text-align: center;
}
.frete_carrinho .label {
  font-size: 0.8rem;
}
.frete_carrinho .input-frete {
  height: 20px;
  width: 110px;
  padding: 10px;
  font-size: 0.8rem;
}
.frete_carrinho .btn-frete {
  height: 21px;
}

.frete_carrinho .frete-selecionado {
  margin: 0 0 15px 0;
  grid-template: "sedex_tag valor_sedex" 15px "pac_tag valor_pac" 15px / 1fr 1fr;
}
.frete_carrinho .radio {
  margin: 0;
  padding: 2px;
  margin-right: 3px;
}
.frete_carrinho .radio:checked {
  border-width: 4px;
  padding: 0px;
  margin-right: 1px;
}
.frete_carrinho .valor_frete,
.frete_carrinho .sedex_tag,
.frete_carrinho .pac_tag,
.frete_carrinho .label_pac,
.frete_carrinho .label_sedex {
  font-size: 0.75rem;
  align-self: center;
}
.frete_carrinho .valor_frete {
  margin-left: 3px;
}

.frete_carrinho .total {
  padding: 0;
}
.frete_carrinho .total .descontotexto {
  font-size: 0.6em;
}
.frete_carrinho .total .descontovalor {
  font-size: 0.8em;
}
.frete_carrinho .total .totaltexto {
  font-size: 1em;
  text-transform: uppercase;
  font-style: normal;
  color: #345;
}

.carrinho_finalizar_btn {
  grid-area: carrinho_finalizar_btn;
  border: none;
  background: #a0a0a0;
  color: #f4f4f4;
  font-weight: bolder;
  font-size: 1.2rem;
  cursor: pointer;
}

.formas_de_pagamento {
  grid-area: formas_de_pagamento;
  display: grid;
  grid-template:
    "pagamento_menu pagamento_dados" 1fr /
    minmax(175px, 1fr) 550px;
  background: #247133;
}

.formas_de_pagamento ::placeholder {
  color: #fff;
}

.pagamento_menu {
  grid-area: pagamento_menu;
  padding-top: 10px;
}

.pagamento_header {
  height: 50px;
  padding-left: 15px;
}
.pagamento_opcao {
  height: 45px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  cursor: pointer;
}

.pagamento_opcao.active {
  background: #2c823a;
}

.pagamento_header p {
  font-size: 1.5rem;
  color: #fff;
  font-weight: bolder;
  font-style: italic;
}
.pagamento_opcao p {
  color: #fff;
  font-weight: bolder;
  font-style: italic;
  font-size: 1rem;
}

.pagamento_dados {
  grid-area: pagamento_dados;
  background: #2c823a;
  padding: 7px 50px 0 50px;
}

.pagamento_dados .label_finalizar {
  color: #f9f9f9;
  font-weight: normal;
}
.pagamento_dados .input_finalizar {
  border: 1px solid #eeedef;
  color: white;
}
option {
  color: black;
}

.nome_cartao {
  text-align: center;
  max-width: 390px;
}

.validade_cartao {
  max-width: 85px;
}

.codigo_cartao {
  max-width: 50px;
}

.numero_cartao {
  max-width: 180px;
}

.parcelas_cartao {
  max-width: 60px;
}

select {
  border-radius: 5px;
  width: 60px;
}

.boleto_dados {
  color: #fff;
  padding: 40px;
  font-size: 1rem;
  font-style: italic;
}

.boleto_dados p {
  font-size: 1rem;
  font-style: italic;
}

/* ******************* FIM FINALIZAR AREA *************************/

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

@media screen and (max-width: 1100px) {
  .btn {
    width: 100%;
  }
  .main {
    grid-template: "mainheader" 50px "maincontent" 1fr / 1fr;
  }
  .checkout-container {
    grid-template:
      ". logo ." 150px ". main ." 1fr ". . ." 30px / 1fr minmax(300px, 500px)
      1fr;
  }
  .maincontent {
    grid-template: "topprodutos toppreco topquantidade toptotal ." 25px "itensarea itensarea itensarea itensarea itensarea " 1fr "totalarea totalarea totalarea totalarea totalarea" 180px "bottom bottom bottom bottom bottom" 70px / 2fr 1fr 1fr 1fr 25px;
    max-width: 450px;
    margin: 0 5px;
  }
  .maincontent-header {
    font-size: 1.5rem;
  }
  .maincontent .maincontent-header {
    font-size: 1rem;
  }
  .dados_area {
    padding-top: 10px;
  }
  .topprodutos {
    grid-area: topprodutos;
    align-self: center;
    margin: 0;
    margin-left: auto;
  }
  .carrinho_item {
    grid-template: "foto titulo valorunitarioitem quantidade valortotalitem carrinho_remover" 1fr / 85px 1fr 1fr 1fr 1fr 25px;
  }
  .carrinho_item p,
  .carrinho_item button {
    font-size: 0.7rem;
  }

  .carrinho_item img {
    width: auto;
    height: auto;
  }

  .totalarea {
    grid-template:
      "cupom  cupom frete frete frete " 95px
      "total total  total total total " 70px /
      1fr 1fr 1fr 1fr 1fr;
  }
  .descontotexto {
    grid-area: descontovalor;
  }
  .descontovalor {
    text-align: right;
  }
  .totaltexto {
    text-align: left;
    grid-area: totalvalor;
    display: inline;
  }
  label {
    margin: 0;
  }

  .frete label,
  .frete p {
    font-size: 1rem;
  }

  .bottom {
    grid-template: "continuarcomprando fecharcompra" 1fr / 1fr 1fr;
  }
  .bottom .continuarcomprando {
    width: auto;
    height: auto;
    margin-right: 5px;
  }
  .bottom .fecharcompra {
    width: auto;
    height: auto;
    margin-left: 5px;
  }
  .bottom .continuarcomprando p,
  .bottom .fecharcompra p {
    font-size: 1rem;
  }

  .loginArea {
    width: auto;
    height: auto;
    text-align: center;
  }
  .loginFechar {
    margin-top: -50px;
  }
  .loginTitulo {
    float: none;
  }
  .labelEmailSenha {
    margin-top: 20px;
  }

  .emailLogin {
    width: 230px;
  }
  .btnEmailSenha {
    width: auto;
  }
  .emailSenha {
    width: auto;
  }

  .finalizar {
    min-height: 300px;
    grid-template:
      "dados_cliente" 250px
      "endereco_entrega" 275px
      "formas_de_pagamento" 350px
      "resumo_finalizar" 1fr
      / 1fr;
  }
  .formas_de_pagamento {
    grid-template:
      "pagamento_menu" 150px
      "pagamento_dados" 1fr / 1fr;
  }
  .pagamento_menu {
    text-align: center;
  }
  .pagamento_opcao {
    text-align: center;
    display: block;
    padding: 15px;
  }
  .cartao_dados,
  .boleto_dados {
    width: 250px;
    padding: 0;
    margin: 0 auto;
    text-align: center;
  }
  .nome_cartao {
    max-width: 100%;
  }

  .frete_carrinho .total .descontotexto {
    grid-area: descontotexto;
  }
  .frete_carrinho .total .totaltexto {
    grid-area: totaltexto;
  }

  .resumo_finalizar {
    padding-bottom: 20px;
  }
}
</style> 
 