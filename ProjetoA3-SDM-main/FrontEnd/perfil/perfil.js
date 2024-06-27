// Função para exibir as informações do usuário no perfil
function exibirPerfil() {
  // Obter os dados do localStorage
  var userDataJSON = localStorage.getItem('userData');

  if (userDataJSON) {
      // Converter a string JSON de volta para um objeto
      var userData = JSON.parse(userDataJSON);

      // Construir o HTML para exibir as informações do perfil
      var profileHTML = `
          <h2>Dados Cadastrais</h2>
          <div class="info">
              <label for="nome">Nome Completo:</label>
              <input name="nome" type="text" id="nome" value="${userData.nome}" disabled>
          </div>
          <div class="info">
              <label for="cpf">CPF:</label>
              <input name="cpf" type="text" id="cpf" value="${userData.cpf}" disabled>
          </div>
          <div class="info">
              <label for="email">E-mail:</label>
              <input name="email" type="email" id="email" value="${userData.email}" disabled>
          </div>
          <div class="info">
              <label for="senha">Senha:</label>
              <input name="senha" type="password" id="senha" value="******" disabled>
          </div>
          <div class="info">
              <label for="endereco">Endereço:</label>
              <input name="endereco" type="text" id="endereco" value="${userData.endereco}" disabled>
          </div>
          <div class="info">
              <label for="numero">Número:</label>
              <input name="numero" type="text" id="numero" value="${userData.numero}" disabled>
          </div>
          <div class="button-container">
              <button id="editar" onclick="habilitarEdicao()">Editar</button>
          </div>
      `;

      // Exibir as informações do perfil na página
      document.getElementById('profileInfo').innerHTML = profileHTML;
  } else {
      // Se não houver dados no localStorage, exibir uma mensagem de erro
      document.getElementById('profileInfo').innerHTML = "<p>Nenhuma informação de perfil encontrada.</p>";
  }
}

// Chamar a função para exibir o perfil quando a página for carregada
window.onload = exibirPerfil;

// Função para habilitar a edição dos campos
function habilitarEdicao() {
  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
      inputs[i].disabled = !inputs[i].disabled;
  }

  var btnEditar = document.getElementById('editar');
  if (btnEditar.innerHTML === "Editar") {
      btnEditar.innerHTML = "Salvar";
  } else {
      btnEditar.innerHTML = "Editar";
      alert("Cadastro atualizado com sucesso!");
  }
}


document.addEventListener('DOMContentLoaded', (event) => {
    // Função para carregar os dados do perfil do localStorage
    function loadProfile() {
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        const age = localStorage.getItem('age');

        if (name) document.getElementById('name').value = name;
        if (email) document.getElementById('email').value = email;
        if (age) document.getElementById('age').value = age;
    }

    // Função para salvar os dados do perfil no localStorage
    function saveProfile() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('age', age);
    }

    // Carregar os dados do perfil quando a página for carregada
    loadProfile();

    // Adicionar um evento ao botão de salvar para salvar os dados do perfil
    document.getElementById('saveProfile').addEventListener('click', saveProfile);
});
