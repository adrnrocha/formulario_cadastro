document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroForm");

  const campos = ["nome", "email", "cep", "rua", "bairro", "cidade", "estado"];

  // Carregar dados do localStorage
  campos.forEach(campo => {
    const valor = localStorage.getItem(campo);
    if (valor) {
      document.getElementById(campo).value = valor;
    }
  });

  // Salvar dados no localStorage 
  campos.forEach(campo => {
    document.getElementById(campo).addEventListener("input", () => {
      localStorage.setItem(campo, document.getElementById(campo).value);
    });
  });

  // Preencher automaticamente o endereço
  document.getElementById("cep").addEventListener("blur", async () => {
    const cep = document.getElementById("cep").value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
          alert("CEP não encontrado.");
          return;
        }

        document.getElementById("rua").value = dados.logradouro || "";
        document.getElementById("bairro").value = dados.bairro || "";
        document.getElementById("cidade").value = dados.localidade || "";
        document.getElementById("estado").value = dados.uf || "";

        ["rua", "bairro", "cidade", "estado"].forEach(campo => {
          localStorage.setItem(campo, document.getElementById(campo).value);
        });

      } catch (erro) {
        console.error("Erro ao buscar CEP:", erro);
      }
    }
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Dados salvos com sucesso.");
  });
});
