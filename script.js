function calcular() {
  // Captura os valores dos campos de seleção (regular)
  const NP = parseFloat(document.getElementById('NP').value) || 0;
  const PD = parseFloat(document.getElementById('PD').value) || 0;
  const SI = parseFloat(document.getElementById('SI').value) || 0;
  const PO1 = parseFloat(document.getElementById('PO1').value) || 0;
  const PO2 = parseFloat(document.getElementById('PO2').value) || 0;
  const PO3 = parseFloat(document.getElementById('PO3').value) || 0;
  
  // Captura os valores dos campos de seleção (recuperação)
  const ED = parseFloat(document.getElementById('ED').value) || 0;
  const PR = parseFloat(document.getElementById('PR').value) || 0;

  // Captura o nível educacional
  const nívelEducacional = document.getElementById('nívelEducacional').value; // Supondo que o nívelEducacional seja capturado de um campo de seleção
  
  // Inicializa a variável nota e recuperação
  let nota = 0;
  let recuperação = 0;

  // Faz o cálculo das notas
  if (nívelEducacional === 'EFI') {
    nota = NP * 0.20 + PD * 0.25 + SI * 0.25;
    recuperação = (nota + (ED * 0.30 + PR * 0.70)) / 2;
  }
  else if (nívelEducacional === 'EFII') {
    nota = NP * 0.20 + PD * 0.25 + SI * 0.25 + ((PO1 + PO2) * 0.30 / 2);
    recuperação = (nota + (ED * 0.30 + PR * 0.70)) / 2;
  }
  else if (nívelEducacional === 'EM') {
    nota = NP * 0.20 + PD * 0.25 + SI * 0.25 + ((PO1 + PO2 + PO3) * 0.30 / 3);
    recuperação = (nota + (ED * 0.30 + PR * 0.70)) / 2;
  }
  else {
    console.error("Nível educacional inválido!");
    return; // sair da função em caso de erro
  }
  
  // Exibe a nota no campo correspondente
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `Sua nota final é: <strong>${nota.toFixed(2)}</strong>`; // Exibe a nota com 2 casas decimais

  // Verifica se o aluno foi aprovado ou reprovado
  if (nota >= 6 && nota <= 10) { 
    resultado.classList.add('aprovado');
    resultado.classList.remove('reprovado');
    resultado.innerHTML += `<br>Parabéns! Você passou.<br>`;
    resultado.innerHTML += `Com <strong>${nota.toFixed(2)}</strong> pontos.`;
  } 
  else if (nota >= 0 && nota < 6) {
    resultado.classList.add('reprovado');
    resultado.classList.remove('aprovado');
    resultado.innerHTML += `<br>Infelizmente, você não passou.<br>`;
    const pontosFaltando = (6 - nota).toFixed(2);
    resultado.innerHTML += `Você precisa de mais <strong>${pontosFaltando}</strong> pontos para ser aprovado.`;
  }

  // Atualiza a tabela (se necessário)
  atualizar();
}

function mostrar() {
  const nívelEducacional = document.getElementById('nível').value;

  // esconde o formulário para o caso de não selecionar um nível
  if (nívelEducacional === "EFI") {
    document.getElementById('formulário').classList.remove('hidden');
    document.getElementById('regular-seção').classList.add('hidden');
    document.getElementById('técnico').classList.add('hidden');
    document.getElementById('técnico-seção').classList.add('hidden');
    document.getElementById('recuperação-seção').classList.add('hidden');
    document.getElementById('ações').classList.add('hidden');
    document.getElementById('prova-objetiva-emii').classList.add('hidden');
    document.getElementById('prova-objetiva-em').classList.add('hidden');
  } 
  else if (nívelEducacional === "EFII") {
    document.getElementById('formulário').classList.remove('hidden');
    document.getElementById('regular-seção').classList.add('hidden');
    document.getElementById('técnico').classList.add('hidden');
    document.getElementById('técnico-seção').classList.add('hidden');
    document.getElementById('recuperação-seção').classList.add('hidden');
    document.getElementById('ações').classList.add('hidden');
    document.getElementById('prova-objetiva-emii').classList.remove('hidden');
    document.getElementById('prova-objetiva-em').classList.add('hidden');
  } 
  else if (nívelEducacional === "EM") {
    document.getElementById('formulário').classList.remove('hidden');
    document.getElementById('regular-seção').classList.add('hidden');
    document.getElementById('recuperação-seção').classList.add('hidden');
    document.getElementById('técnico').classList.remove('hidden');
    document.getElementById('técnico-seção').classList.add('hidden');
    document.getElementById('ações').classList.add('hidden');
    document.getElementById('prova-objetiva-emii').classList.add('hidden');
    document.getElementById('prova-objetiva-em').classList.remove('hidden');
  }
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `Sua nota final é: <strong>${nota}</strong>`;
  if (6 <= nota <= 10) { 
    resultado.classList.add('aprovado');
    resultado.classList.remove('reprovado'); resultado.innerHTML += `<br>Parabéns! Você passou.<br>`;
    resultado.innerHTML += `Com <strong>${nota}</strong> pontos.`; }
  else if (0 <= nota <= 6) {
    resultado.classList.add('reprovado');
    resultado.classList.remove('aprovado'); resultado.innerHTML += `<br>Infelizmente, você não passou.<br>`;
    resultado.innerHTML += `É necessário de mais <strong>${nota}</strong> pontos para ser aprovado.`; }
}

function menu(display) {
  switch (display) {
    case 1:
      // exibindo as opções para o ensino regular
      document.getElementById('regular-seção').classList.remove('hidden');
      document.getElementById('técnico-seção').classList.add('hidden');
      document.getElementById('recuperação-seção').classList.add('hidden');
      document.getElementById('ações').classList.remove('hidden');
      break;    
    case 2:
      // exibindo as opções para a recuperação
      document.getElementById('regular-seção').classList.add('hidden');
      document.getElementById('técnico-seção').classList.remove('hidden');
      document.getElementById('recuperação-seção').classList.add('hidden');
      document.getElementById('ações').classList.remove('hidden');
      break;
    case 3:
      // exibindo as opções para o ensino técnico
      document.getElementById('regular-seção').classList.add('hidden');
      document.getElementById('técnico-seção').classList.add('hidden');
      document.getElementById('recuperação-seção').classList.remove('hidden');
      document.getElementById('ações').classList.remove('hidden');
      break;
    default:
      console.log("Menu inválido!");
  }
}

function remover() {
  const campos = ['NP', 'PD', 'SI', 'PO1', 'PO2', 'PO3', 'EX', 'PV', 'PE', 'ED', 'PR'];

  // limpa campos de texto
  campos.forEach((id) => {
    const campo = document.getElementById(id);
    if (campo) {
      campo.value = ''; // limpa o valor
    }
  });

  // limpa o campo <select>
  const select = document.getElementById('PO1');
  if (select) {
    select.value = null; // define o valor padrão
  }

  // limpa o conteúdo e as classes do elemento 'resultado'
  const resultado = document.getElementById('resultado');
  if (resultado) {
    resultado.innerHTML = '...'; // define o conteúdo padrão
    resultado.classList.remove('aprovado', 'reprovado'); // remove classes
  }
}

async function atualizar() {
  const tabela = document.getElementById('tabela');
  const response = await fetch('http://localhost:3000/notas');
  const notas = await response.json();

  tabela.innerHTML = ''; // limpa a tabela antes de adicionar novas linhas
  notas.forEach(nota => {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
      <td class="border border-gray-300 py-2 px-4">${nota.materia}</td>
      <td class="border border-gray-300 py-2 px-4">${nota.notaFinal.toFixed(1)}</td>
    `;
    tabela.appendChild(novaLinha);
  });
}

// função de inicialização, chama a função de carregar as notas assim que o script é carregado
window.onload = async function() {
  await atualizar();
};

// vincula o evento de click no botão de calcular
document.getElementById('calcular').addEventListener('click', calcular);

// vincula o evento de click no botão de remover
document.getElementById('remover').addEventListener('click', remover);