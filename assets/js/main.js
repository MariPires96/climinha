const botaoBuscar = document.getElementById("buscar");
const inputCidade = document.getElementById("cidade");

botaoBuscar.addEventListener("click", async () => {
  const cidade = inputCidade.value.trim();

  if (!cidade) {
    alert("Digite o nome de uma cidade");
    return;
  }

  try {
    const dados = await getWeatherByCity(cidade);

    mostrarResultado(
      dados.cidade,
      dados.atual.temperatura,
      dados.atual.sensacao,
      dados.atual.weatherCode
    );

    mostrarPrevisao(dados.diaria);

  } catch (erro) {
    alert("Erro ao buscar dados do clima");
    console.error(erro);
  }
});

