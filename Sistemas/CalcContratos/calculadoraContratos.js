function calcularContrato() {
    const valorOriginal = parseFloat(document.getElementById('valorOriginal').value) || 0;
    const beneficio = parseFloat(document.getElementById('beneficio').value) || 0;
    const taxaInstalacao = parseFloat(document.getElementById('taxaInstalacao').value) || 0;
    const equipamento = parseFloat(document.getElementById('equipamentoComodato').value) || 0;

    if (!valorOriginal || !beneficio || !taxaInstalacao || !equipamento) {
        alert('Por favor, preencha todos os campos antes de calcular.');
        return;
    }

    const totalSimples = valorOriginal - beneficio;
    document.getElementById('totalPagarSimples').value = totalSimples.toFixed(2).replace('.', ',');

    const valorOriginal12 = valorOriginal * 12;
    const beneficio12 = beneficio * 12;
    const totalPagarComodato = valorOriginal12 - beneficio12;
    const totalBeneficios = beneficio12 + taxaInstalacao + equipamento;

    document.getElementById('valorOriginal12').value = valorOriginal12.toFixed(2).replace('.', ',');
    document.getElementById('beneficio12').value = beneficio12.toFixed(2).replace('.', ',');
    document.getElementById('totalPagarComodato').value = totalPagarComodato.toFixed(2).replace('.', ',');
    document.getElementById('totalBeneficios').value = totalBeneficios.toFixed(2).replace('.', ',');
}


fetch('BASE, CIDADES E INFORMAÇÕES - cidades_bases_completo.csv')
  .then(response => response.text())
  .then(data => {
  const linhas = data.split('\n');
  const cidades = new Set();
  const idxCidade = linhas[0].split(',').findIndex(h => h.trim().toLowerCase() === 'cidade');
  for (let i = 1; i < linhas.length; i++) {
    const colunas = linhas[i].split(',');
    if (colunas[idxCidade]) {
      cidades.add(colunas[idxCidade].trim());
    }
  }
  const select = document.getElementById('cidadeCliente');
  cidades.forEach(cidade => {
    if (cidade){
      select.innerHTML += `<option value="${cidade}">${cidade}</option>`;
    }
  });
});

let cidade = '';
let baseEncontrada = '';

function buscarPlanos(){
  cidade = document.getElementById('cidadeCliente').value;
  const modalidade = document.getElementById('modalidade').value;
  const promocional = document.getElementById('promocional').value;
  const select = document.getElementById('plano');
  select.innerHTML = '<option value="">Selecione um plano</option>'; // Limpa as opções anteriores
  
  fetch('BASE, CIDADES E INFORMAÇÕES - cidades_bases_completo.csv')
    .then(response => response.text())
    .then(data => {
      const linhas = data.split('\n');
      const headers = linhas[0].split(',');
      const idxCidade = headers.findIndex(h => h.trim().toLowerCase() === 'cidade');
      const idxBase = headers.findIndex(h => h.trim().toLowerCase() === 'base');
      for (let i = 1; i < linhas.length; i++) {
        const colunas = linhas[i].split(',');
        if (colunas[idxCidade] && colunas[idxCidade].trim() === cidade) {
          baseEncontrada = colunas[idxBase] ? colunas[idxBase].trim() : '';
          break;
        }
      }
      // Após encontrar a base, continue com o restante da lógica (já existente após o $PLACEHOLDER$)
      if (baseEncontrada === '') {
        alert('Base não encontrada para a cidade selecionada.');
        return;
      } else if (baseEncontrada === 'DTEL') {
        if(modalidade === 'residencial'){
          if(promocional === 'sim'){
            alert('Ainda em desenvolvimento!, coloque os valores manualmente.');
          } else {
            // popula o select com as opções de planos com o csv PLANOS DTEL - DTEL.csv da coluna COMBO 
            fetch('PLANOS DTEL - DTEL.csv')
              .then(response => response.text())
              .then(data => {
                const linhas = data.split('\n');
                const headers = linhas[0].split(',');
                const idxCombo = headers.findIndex(h => h.trim().toLowerCase() === 'combo');
                for (let i = 1; i < linhas.length; i++) {
                  const colunas = linhas[i].split(',');
                  if (colunas[idxCombo]) {
                    select.innerHTML += `<option value="${colunas[idxCombo].trim()}">${colunas[idxCombo].trim()}</option>`;
                  }
                }
              });
          }
        }
        if(modalidade === 'comercial'){
          alert('Ainda em desenvolvimento!, coloque os valores manualmente.');        }
      } else {
        if (modalidade === 'residencial'){
          if(promocional === 'sim'){
            alert('Ainda em desenvolvimento!, coloque os valores manualmente.');
          } else {
            alert('Ainda em desenvolvimento!, coloque os valores manualmente.');
          }
        }
        if (modalidade === 'comercial'){
          alert('Ainda em desenvolvimento!, coloque os valores manualmente.');
        }
      }
    });
  return;
}

function buscarValores(){
  const plano = document.getElementById('plano').value;
  const modalidade = document.getElementById('modalidade').value;
  const promocional = document.getElementById('promocional').value;

  if (baseEncontrada === '') {
        alert('Base não encontrada para a cidade selecionada.');
        return;
      } else if (baseEncontrada === 'DTEL') {
        if(modalidade === 'residencial'){
          if(promocional === 'sim'){
            alert('Ainda em desenvolvimento!, coloque os valores manualmente.');
          } else {
            // popula os campos valor original,beneficio,taxa instalacao,equipamento comodato com o csv PLANOS DTEL - DTEL.csv da coluna COMBO
            fetch('PLANOS DTEL - DTEL.csv')
              .then(response => response.text())
              .then(data => {
                const linhas = data.split('\n');
                const headers = linhas[0].split(',');
                const idxCombo = headers.findIndex(h => h.trim().toLowerCase() === 'combo');
                const idxValorOriginal = headers.findIndex(h => h.trim().toLowerCase() === 'valor original');
                const idxBeneficio = headers.findIndex(h => h.trim().toLowerCase() === 'beneficio');
                const idxTaxaInstalacao = headers.findIndex(h => h.trim().toLowerCase() === 'taxa instalacao');
                const idxEquipamentoComodato = headers.findIndex(h => h.trim().toLowerCase() === 'equipamento comodato');
                for (let i = 1; i < linhas.length; i++) {
                  const colunas = linhas[i].split(',');
                  if (colunas[idxCombo] && colunas[idxCombo].trim() === plano) {
                    document.getElementById('valorOriginal').value = colunas[idxValorOriginal] ? colunas[idxValorOriginal].trim() : '';
                    document.getElementById('beneficio').value = colunas[idxBeneficio] ? colunas[idxBeneficio].trim() : '';
                    document.getElementById('taxaInstalacao').value = colunas[idxTaxaInstalacao] ? colunas[idxTaxaInstalacao].trim() : '';
                    document.getElementById('equipamentoComodato').value = colunas[idxEquipamentoComodato] ? colunas[idxEquipamentoComodato].trim() : '';
                    calcularContrato();
                    break;
                  }
                }
              });
          }
        }
        if(modalidade === 'comercial'){
          alert('Ainda em desenvolvimento!, coloque os valores manualmente.');        }
      } else {
        if (modalidade === 'residencial'){
          if(promocional === 'sim'){
            alert('Ainda em desenvolvimento!, coloque os valores manualmente.');
          } else {
            alert('Ainda em desenvolvimento!, coloque os valores manualmente.');
          }
        }
        if (modalidade === 'comercial'){
          alert('Ainda em desenvolvimento!, coloque os valores manualmente.');
        }
      }



}

// Adiciona o botão para iniciar o tutorial
function tutorial(){
  const intro = introJs();
  intro.setOptions({
    steps: [
      {
        intro: "Bem-vindo ao tutorial! Vamos guiá-lo pelos principais elementos da página."
      },
      {
        element: '#valorOriginal',
        intro: "Aqui você insere o valor original do contrato termo combo residencial.",
      },
      {
        element: '#valorOriginal',
        intro: "Este campo é preenchido de acordo com o campo valor no serviço do topsapp."
      },
      {
        element: '#beneficio',
        intro: "Insira o valor do benefício aqui. Corresponde ao valor do desconto no serviço do topsapp."
      },
      {
        element: '#taxaInstalacao',
        intro: "Este campo é para a taxa de instalação."
      },
      {
        element: '#equipamentoComodato',
        intro: "Informe o valor do equipamento em comodato."
      },
      {
        element: '#btnCalcular',
        intro: "Clique neste botão para calcular os valores, ou pressione Enter."
      },
      {
        element: '#totalPagarSimples',
        intro: "Este campo mostra o total a pagar. No contrato é preenchido automaticamente de acordo com os valores anteriores."
      },
      {
        element: '#valorOriginal12',
        intro: "Aqui está o valor original do preenchido no beneficio 'DESCONTO FIDELIDADE'. Clique para copiar."
      },
      {
        element: '#beneficio12',
        intro: "Este campo exibe o benefício do mesmo campo. Clique para copiar."
      },
      {
        element: '#totalPagarComodato',
        intro: "Aqui está o anual pago pleo cliente. Ele também é preenchido automaticamente pelo topsapp. Use para conferir as informações."
      },
      {
        element: '#totalBeneficios',
        intro: "Este campo mostra o total de benefícios. Lembre de preencher este valor em valor origial e beneficios. Clique para copiar."
      },
      {
        intro: "Isso conclui o tutorial. Agora você pode usar a calculadora com confiança!"
      }
    ],
    showProgress: true,
    showBullets: true,
    exitOnOverlayClick: false,
    nextLabel: 'Próximo',
    prevLabel: 'Anterior',
    skipLabel: 'Fechar',
    doneLabel: 'Concluir'
  });
  intro.start();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 🔥 impede o comportamento padrão (submit)
      calcularContrato();
    }
  });

// Adiciona o evento de clique dos resultados para copiar o texto do textarea para a área de transferência
document.getElementById('totalPagarSimples').addEventListener('click', function() {
  this.select();  // Seleciona todo o conteúdo do textarea
  document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
  alert('Total a Pagar copiado!');  // Exibe um alerta (opcional)
});


document.getElementById('valorOriginal12').addEventListener('click', function() {
  this.select();  // Seleciona todo o conteúdo do textarea
  document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
  alert('Valor Original 12x copiado!');  // Exibe um alerta (opcional)
});

document.getElementById('beneficio12').addEventListener('click', function() {
  this.select();  // Seleciona todo o conteúdo do textarea
  document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
  alert('Benefício 12x copiado!');  // Exibe um alerta (opcional)
});

document.getElementById('totalPagarComodato').addEventListener('click', function() {
  this.select();  // Seleciona todo o conteúdo do textarea
  document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
  alert('Total a Pagar 12x copiado!');  // Exibe um alerta (opcional)
});

document.getElementById('totalBeneficios').addEventListener('click', function() { 
  this.select();  // Seleciona todo o conteúdo do textarea
  document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
  alert('Total de Benefícios copiado!');  // Exibe um alerta (opcional)
});