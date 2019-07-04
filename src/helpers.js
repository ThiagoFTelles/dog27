export function serialize(obj) {
  let queryString = "";

  for (let key in obj) {
    queryString += `&${key}=${obj[key]}`;
  }

  return queryString;
}


export function mapFields(options) {
  /* 
  mapFields(options) serve para atualizar os valores (no state) usando formulários
  options é um objeto onde eu passo 3 coisas:
  1) Os fields que quero mapear;
  2) A base, que é o nome do objeto que possui os fields (ex: usuario)
  3) e a mutation que farei o commit
  */
  const object = {};
  for (let x = 0; x < options.fields.length; x++) {
    const field = [options.fields[x]];
    object[field] = {
      get() {
        return this.$store.state[options.base][field];
      },
      set(value) {
        this.$store.commit(options.mutation, {
          [field]: value
        });
      }
    };
  }
  return object;
}