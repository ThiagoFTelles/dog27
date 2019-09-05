<template>
  <div class="submenu-container">
    <h3>Contact Form</h3>

    <div class="container">
      <form action="/action_page.php">
        <input type="text" id="fname" name="firstname" placeholder="NOME COMPLETO" />
        <input type="email" id="email" name="email" placeholder="EMAIL*" />
        <input type="text" id="assunto" name="assunto" placeholder="ASSUNTO" />
        <textarea
          id="subject"
          name="subject"
          placeholder="ESCREVE AQUI A SUA MENSAGEM"
          style="height:100px"
        ></textarea>

        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubMenuContato"
};
</script>

<style scoped>
.submenu-container {
  width: 100%;
  height: 380px;
  background: #f3f3f3;
  box-shadow: 0 6px 6px rgba(38, 56, 74, 0.4);
}

h3 {
  margin: 0;
}

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f3f3f3;
  padding: 20px;
}
</style>
