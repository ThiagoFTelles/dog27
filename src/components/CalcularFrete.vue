<template>
  <section>
    <p>endereço de entrega</p>
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

export default {
  name: "CalcularFrete",
  computed: {
    ...mapFields({
      fields: [
        "nome",
        "email",
        "senha",
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
    })
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
    }
  }
};
</script>

<style>
</style>