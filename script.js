const tabela = document.getElementById('tabela');
const calcularNota = document.getElementById('calcular');

// função para carregar notas do backend
async function carregar() {
  const response = await fetch('http://localhost:3000/notas');
  const notas = await response.json();

  // preenche a tabela com as notas
  tabela.innerHTML = '';
  notas.forEach(nota => {
    const novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
      <td class="border border-gray-300 py-2 px-4">${nota.Matéria}</td>
      <td class="border border-gray-300 py-2 px-4">${nota.notaFinal.toFixed(2)}</td>
    `;
  });
}

// atualiza tabela e backend ao calcular nota
calcularNota.addEventListener('click', async () => {
  const Matéria = document.getElementById('matéria').value.trim();
  const NP = parseFloat(document.getElementById('NP').value) || 0;
  const PD = parseFloat(document.getElementById('PD').value) || 0;
  const SI = parseFloat(document.getElementById('SI').value) || 0;
  const PO1 = parseFloat(document.getElementById('PO1').value) || 0;
  const PO2 = parseFloat(document.getElementById('PO2').value) || 0;
  const PO3 = parseFloat(document.getElementById('PO3').value) || 0;

  if (!Matéria) {
    alert('Por favor, preencha o nome da matéria!');
    return;
  }

  const notaFinal = 
    NP * 0.2 +
    PD * 0.25 +
    SI * 0.25 +
    ((PO1 + PO2 + PO3) / 3) * 0.3;

  try {
    // envia nota para o backend
    await fetch('http://localhost:3000/notas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Matéria, notaFinal }),
    });

    // atualiza tabela
    await carregar();
  } catch (err) {
    alert('Erro ao salvar nota no servidor.');
  }

  // limpa o formulário
  document.getElementById('gradeForm').reset();
});

fetch('https://eniac.onrender.com/api/rota', {
  method: 'POST',
  body: JSON.stringify(dados),
  headers: { 'Content-Type': 'application/json' },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));

// carrega notas ao iniciar
carregar();
