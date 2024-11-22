const tabela = document.getElementById('tabelaNotas');
const calcularNota = document.getElementById('calcularNota');

// Função para carregar notas do backend
async function carregarNotas() {
  const response = await fetch('http://localhost:3000/notas');
  const notas = await response.json();

  // Preenche a tabela com as notas
  tabela.innerHTML = '';
  notas.forEach(nota => {
    const novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
      <td class="border border-gray-300 py-2 px-4">${nota.materia}</td>
      <td class="border border-gray-300 py-2 px-4">${nota.notaFinal.toFixed(2)}</td>
    `;
  });
}

// Atualiza tabela e backend ao calcular nota
calcularNota.addEventListener('click', async () => {
  const materia = document.getElementById('materia').value.trim();
  const notaProfessor = parseFloat(document.getElementById('notaProfessor').value) || 0;
  const provaDissertativa = parseFloat(document.getElementById('provaDissertativa').value) || 0;
  const simulado = parseFloat(document.getElementById('simulado').value) || 0;
  const provaObjetiva1 = parseFloat(document.getElementById('provaObjetiva1').value) || 0;
  const provaObjetiva2 = parseFloat(document.getElementById('provaObjetiva2').value) || 0;
  const provaObjetiva3 = parseFloat(document.getElementById('provaObjetiva3').value) || 0;

  if (!materia) {
    alert('Por favor, preencha o nome da matéria!');
    return;
  }

  const notaFinal = 
    notaProfessor * 0.2 +
    provaDissertativa * 0.25 +
    simulado * 0.25 +
    ((provaObjetiva1 + provaObjetiva2 + provaObjetiva3) / 3) * 0.3;

  try {
    // Envia nota para o backend
    await fetch('http://localhost:3000/notas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ materia, notaFinal }),
    });

    // Atualiza tabela
    await carregarNotas();
  } catch (err) {
    alert('Erro ao salvar nota no servidor.');
  }

  // Limpa o formulário
  document.getElementById('gradeForm').reset();
});

// Carrega notas ao iniciar
carregarNotas();
