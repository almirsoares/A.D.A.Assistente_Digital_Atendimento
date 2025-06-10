function calcularContrato() {
    const valorOriginal = parseFloat(document.getElementById('valorOriginal').value) || 0;
    const beneficio = parseFloat(document.getElementById('beneficio').value) || 0;
    const taxaInstalacao = parseFloat(document.getElementById('taxaInstalacao').value) || 0;
    const equipamento = parseFloat(document.getElementById('equipamentoComodato').value) || 0;

    if (!valorOriginal || !beneficio || !taxaInstalacao || !equipamento) {
        alert('Por favor, preencha todos os campos antes de calcular.');
        document.getElementById('totalPagarSimples').value = 'PREENCHA OS CAMPOS DE VALORES MANUALMENTE';
        document.getElementById('valorOriginal12').value = '0';
        document.getElementById('beneficio12').value = '0';
        document.getElementById('totalPagarComodato').value = '0';
        document.getElementById('totalBeneficios').value = '0';
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

function copiarComFeedback(inputId, labelId, textoPadrao) {
  document.getElementById(inputId).select();
  document.execCommand('copy');
  const label = document.getElementById(labelId);
  if (label) {
    label.textContent = 'Copiado!';
    setTimeout(() => {
      label.textContent = textoPadrao;
    }, 1000);
  }
}

// Total a Pagar
document.getElementById('totalPagarSimples').addEventListener('click', function() {
  copiarComFeedback('totalPagarSimples', 'labelTotalAPagar', 'Total a Pagar');
});

// Valor Original (12 meses)
document.getElementById('valorOriginal12').addEventListener('click', function() {
  copiarComFeedback('valorOriginal12', 'labelValorOriginal12', 'Valor Original (12 meses)');
});

// Benefício (12 meses)
document.getElementById('beneficio12').addEventListener('click', function() {
  copiarComFeedback('beneficio12', 'labelBeneficio12', 'Benefício (12 meses)');
});

// Total a Pagar (12 meses)
document.getElementById('totalPagarComodato').addEventListener('click', function() {
  copiarComFeedback('totalPagarComodato', 'labelTotalPagarComodato', 'Total a Pagar (12 meses)');
});

// Total de Benefícios
document.getElementById('totalBeneficios').addEventListener('click', function() {
  copiarComFeedback('totalBeneficios', 'labelTotalBeneficios', 'Total de Benefícios');
});

// Valor Original
document.getElementById('valorOriginal').addEventListener('click', function() {
  copiarComFeedback('valorOriginal', 'labelValorOriginal', 'Valor Original');
});

document.getElementById('beneficio').addEventListener('click', function() {
  copiarComFeedback('beneficio', 'labelBeneficio', 'Benefício');
});

document.getElementById('taxaInstalacao').addEventListener('click', function() {
  copiarComFeedback('taxaInstalacao', 'labelTaxaInstalacao', 'Taxa de Instalação');
});

document.getElementById('equipamentoComodato').addEventListener('click', function() {
  copiarComFeedback('equipamentoComodato', 'labelEquipamentoComodato', 'Equipamento em Comodato');
});