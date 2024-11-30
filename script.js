function calcular() {
  // captura os valores dos campos de entrada
  const campos = {
    NP: parseFloat(document.getElementById('NP').value) || 0,
    PD: parseFloat(document.getElementById('PD').value) || 0,
    SI: parseFloat(document.getElementById('SI').value) || 0,
    PO1: parseFloat(document.getElementById('PO1').value) || 0,
    PO2: parseFloat(document.getElementById('PO2').value) || 0,
    PO3: parseFloat(document.getElementById('PO3').value) || 0,
    EX: parseFloat(document.getElementById('EX').value) || 0,
    DS: parseFloat(document.getElementById('DS').value) || 0,
    PV: parseFloat(document.getElementById('PV').value) || 0,
    PE: parseFloat(document.getElementById('PE').value) || 0,
    MP: parseFloat(document.getElementById('MP').value) || 0,
    ED: parseFloat(document.getElementById('ED').value) || 0,
    PR: parseFloat(document.getElementById('PR').value) || 0,
  };

  const nível = document.getElementById('nível-educacional').value;
  const matéria = document.getElementById('matéria').value;
  const disciplina = document.getElementById('disciplina').value;
  const área = document.getElementById('áreas').value;

  let nota, recuperação, técnico, projeto = 0;

  // verifica o nível educacional e calcula a nota e recuperação
  switch (nível) {
    case 'EFI':
      nota = campos.NP * 0.20 + campos.PD * 0.25 + campos.SI * 0.25;
      recuperação = (nota + (campos.ED * 0.30 + campos.PR * 0.70)) / 2;
      break;
    case 'EFII':
      nota = campos.NP * 0.20 + campos.PD * 0.25 + campos.SI * 0.25 + ((campos.PO1 + campos.PO2) * 0.30 / 2);
      recuperação = (nota + (campos.ED * 0.30 + campos.PR * 0.70)) / 2;
      break;
    case 'EM':
      nota = campos.NP * 0.20 + campos.PD * 0.25 + campos.SI * 0.25 + ((campos.PO1 + campos.PO2 + campos.PO3) * 0.30 / 3);
      recuperação = (campos.MP + (campos.ED * 0.30 + campos.PR * 0.70)) / 2;
      técnico = campos.EX * 0.20 + campos.DS * 0.30 + campos.PV * 0.50;
      projeto = campos.PE;
      break;
    default:
      console.error("Nível educacional inválido!");
      return; // sai da função em caso de erro
  }

  // exibe a nota no campo de resultado
  const resultado = document.getElementById('resultado');
  resultado.classList.remove('hidden');
  let mensagem = `Sua nota final em <b>${matéria || "Matéria"}</b> é de <b>${nota.toFixed(1)}</b> pontos.<br>`;

  // determina se o aluno foi aprovado ou reprovado no regular
  if (document.getElementById('regular').classList.contains('selecionado')) {
    if (nota === 0) {
      resultado.classList.add('bg-teal-500');
      resultado.classList.remove('bg-green-600');
      resultado.classList.remove('bg-yellow-400');
      resultado.classList.remove('bg-purple-400');
      mensagem = `Preencha ao menos um campo!`; // mostra a mensagem de campos não preenchidos
    } else if (nota < 0 || nota > 10) {
      resultado.classList.add('bg-purple-400');
      resultado.classList.remove('bg-green-600');
      resultado.classList.remove('bg-yellow-400');
      resultado.classList.remove('bg-teal-500');
      if (nota < 0) {
        mensagem = `A nota ${nota.toFixed(1)} não pode ser abaixo de zero (0) pontos. <br> Preencha os campos com valores reais!`;
      }
      else{
        mensagem = `A nota ${nota.toFixed(1)} não pode ser acima de dez (10) pontos. <br> Preencha os campos com valores reais!`;
      }
    } else if (nota >= 6 && nota <= 10) {
      resultado.classList.add('bg-green-600');
      resultado.classList.remove('bg-yellow-400');
      resultado.classList.remove('bg-purple-400');
      resultado.classList.remove('bg-teal-500');
      const acima = nota - 6;
      mensagem += `Parabéns! Você passou. <br>Sua nota está <b>${acima.toFixed(1)}</b> pontos acima da média.`;
    } else if (nota > 0 && nota < 6) {
      resultado.classList.add('bg-yellow-400');
      resultado.classList.remove('bg-green-600');
      resultado.classList.remove('bg-purple-400');
      resultado.classList.remove('bg-teal-500');
      const abaixo = 6 - nota;
      mensagem += `Que pena! Você não passou. <br>Sua nota está <b>${abaixo.toFixed(1)}</b> pontos abaixo da média.`;
    } else {
      alert("A nota final não pôde ser calculada."); // induz que a nota é um número inválido
      return; 
    }
  }

  // determina se o aluno foi aprovado ou reprovado no técnico
  if (document.getElementById('técnico').classList.contains('selecionado')) {
    mensagem = `Sua nota final em <b>${disciplina || "Matéria"}</b> é de <b>${técnico.toFixed(1)}</b> pontos.<br>`;
    if (técnico === 0) {
      resultado.classList.add('bg-teal-500');
      resultado.classList.remove('bg-green-600');
      resultado.classList.remove('bg-yellow-400');
      resultado.classList.remove('bg-purple-400');
      mensagem = `Preencha ao menos um campo!`; // mostra a mensagem de campos não preenchidos
    } else if (técnico < 0 || técnico > 10) {
      resultado.classList.add('bg-purple-400');
      resultado.classList.remove('bg-green-600');
      resultado.classList.remove('bg-yellow-400');
      resultado.classList.remove('bg-teal-500');
      if (técnico < 0) {
        mensagem = `A nota ${técnico.toFixed(1)} não pode ser abaixo de zero (0) pontos. <br> Preencha os campos com valores reais!`;
      }
      else{
        mensagem = `A nota ${técnico.toFixed(1)} não pode ser acima de dez (10) pontos. <br> Preencha os campos com valores reais!`;
      }
    } else if (técnico >= 6 && técnico <= 10) {
      resultado.classList.add('bg-green-600');
      resultado.classList.remove('bg-yellow-400');
      resultado.classList.remove('bg-purple-400');
      resultado.classList.remove('bg-teal-500');
      const acima = técnico - 6;
      mensagem += `Parabéns! Você passou. <br>Sua nota está <b>${acima.toFixed(1)}</b> pontos acima da média.`;
    } else if (técnico > 0 && técnico < 6) {
      resultado.classList.add('bg-yellow-400');
      resultado.classList.remove('bg-green-600');
      resultado.classList.remove('bg-purple-400');
      resultado.classList.remove('bg-teal-500');
      const abaixo = 6 - técnico;
      mensagem += `Que pena! Você não passou. <br>Sua nota está <b>${abaixo.toFixed(1)}</b> pontos abaixo da média.`;
    } else {
      alert("A nota final não pôde ser calculada."); // induz que a nota é um número inválido
      return; 
    }
  }

  // determina se o aluno foi aprovado ou reprovado na recuperação
  if (document.getElementById('recuperação').classList.contains('selecionado')) {
    mensagem = `Sua nota final em <b>${área || "Matéria"}</b> é de <b>${recuperação.toFixed(1)}</b> pontos.<br>`;
    if (recuperação === 0) {
      resultado.classList.add('bg-teal-500');
      resultado.classList.remove('bg-green-600');
      resultado.classList.remove('bg-yellow-400');
      resultado.classList.remove('bg-purple-400');
      mensagem = `Preencha ao menos um campo!`; // mostra a mensagem de campos não preenchidos
    } else if (recuperação < 0 || recuperação > 10) {
      resultado.classList.add('bg-purple-400');
      resultado.classList.remove('bg-green-600');
      resultado.classList.remove('bg-yellow-400');
      resultado.classList.remove('bg-teal-500');
      if (recuperação < 0) {
        mensagem = `A nota ${recuperação.toFixed(1)} não pode ser abaixo de zero (0) pontos. <br> Preencha os campos com valores reais!`;
      }
      else{
        mensagem = `A nota ${recuperação.toFixed(1)} não pode ser acima de dez (10) pontos. <br> Preencha os campos com valores reais!`;
      }
    } else if (recuperação >= 6 && recuperação <= 10) {
      resultado.classList.add('bg-green-600');
      resultado.classList.remove('bg-yellow-400');
      resultado.classList.remove('bg-purple-400');
      resultado.classList.remove('bg-teal-500');
      const acima = recuperação - 6;
      mensagem += `Parabéns! Você passou. <br>Sua nota está <b>${acima.toFixed(1)}</b> pontos acima da média.`;
    } else if (recuperação > 0 && recuperação < 6) {
      resultado.classList.add('bg-yellow-400');
      resultado.classList.remove('bg-green-600');
      resultado.classList.remove('bg-purple-400');
      resultado.classList.remove('bg-teal-500');
      const abaixo = 6 - recuperação;
      mensagem += `Que pena! Você não passou. <br>Sua nota está <b>${abaixo.toFixed(1)}</b> pontos abaixo da média.`;
    } else {
      alert("A nota final não pôde ser calculada."); // induz que a nota é um número inválido
      return; 
    }
  }

  resultado.innerHTML = mensagem;

  // atualiza a tabela (se necessário)
  atualizar();
}

function mostrar() {
  const nível = document.getElementById('nível-educacional').value;

  // esconde o formulário para o caso de não selecionar um nível
  if (nível === "EFI") {
    document.getElementById('formulário').classList.remove('hidden');
    document.getElementById('regular-seção').classList.add('hidden');
    document.getElementById('técnico').classList.add('hidden');
    document.getElementById('técnico-seção').classList.add('hidden');
    document.getElementById('recuperação-seção').classList.add('hidden');
    document.getElementById('ações').classList.add('hidden');
    document.getElementById('prova-objetiva-emii').classList.add('hidden');
    document.getElementById('prova-objetiva-em').classList.add('hidden');
  } 
  else if (nível === "EFII") {
    document.getElementById('formulário').classList.remove('hidden');
    document.getElementById('regular-seção').classList.add('hidden');
    document.getElementById('técnico').classList.add('hidden');
    document.getElementById('técnico-seção').classList.add('hidden');
    document.getElementById('recuperação-seção').classList.add('hidden');
    document.getElementById('ações').classList.add('hidden');
    document.getElementById('prova-objetiva-emii').classList.remove('hidden');
    document.getElementById('prova-objetiva-em').classList.add('hidden');
  } 
  else if (nível === "EM") {
    document.getElementById('formulário').classList.remove('hidden');
    document.getElementById('regular-seção').classList.add('hidden');
    document.getElementById('recuperação-seção').classList.add('hidden');
    document.getElementById('técnico').classList.remove('hidden');
    document.getElementById('técnico-seção').classList.add('hidden');
    document.getElementById('ações').classList.add('hidden');
    document.getElementById('prova-objetiva-emii').classList.add('hidden');
    document.getElementById('prova-objetiva-em').classList.remove('hidden');
  }
}

function menu(display) {
  switch (display) {
    case 1:
      // exibe as opções para o ensino regular
      document.getElementById('regular').classList.add('selecionado');
      document.getElementById('técnico').classList.remove('selecionado');
      document.getElementById('recuperação').classList.remove('selecionado');
      document.getElementById('regular-seção').classList.remove('hidden');
      document.getElementById('técnico-seção').classList.add('hidden');
      document.getElementById('recuperação-seção').classList.add('hidden');
      document.getElementById('ações').classList.remove('hidden');
      break;    
    case 2:
      // exibe as opções para o ensino técnico
      document.getElementById('técnico').classList.add('selecionado');
      document.getElementById('regular').classList.remove('selecionado');
      document.getElementById('recuperação').classList.remove('selecionado');
      document.getElementById('regular-seção').classList.add('hidden');
      document.getElementById('técnico-seção').classList.remove('hidden');
      document.getElementById('recuperação-seção').classList.add('hidden');
      document.getElementById('ações').classList.remove('hidden');
      break;
    case 3:
      // exibe as opções para a recuperação
      document.getElementById('recuperação').classList.add('selecionado');
      document.getElementById('regular').classList.remove('selecionado');
      document.getElementById('técnico').classList.remove('selecionado');
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

  const matérias = ['matéria', 'disciplina', 'áreas'];

  // limpa campos de disciplinas
  matérias.forEach((id) => {
    const matéria = document.getElementById(id);
    if (matéria) {
      matéria.value = ''; // limpa o valor
    }
  });

  // limpa o campo <select>
  const select = {PO1: document.getElementById('PO1'), PO2: document.getElementById('PO2'), PO3: document.getElementById('PO3')};
  if (select) {
    select.value = null; // define o valor padrão
  }

  // limpa o conteúdo e as classes do elemento 'resultado'
  const resultado = document.getElementById('resultado');
  if (resultado) {
    resultado.classList.add('hidden'); // define o conteúdo padrão
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