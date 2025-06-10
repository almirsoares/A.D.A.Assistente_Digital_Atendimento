// Função que calcula os valores proporcionais de desativação e inputa as faturas anteriores como prevenção

function calcularAtivacao() {
    const valorPlanoAnterior = parseFloat(document.getElementById('valorPlanoAnterior').value);
    const descontoPlanoAnterior = parseFloat(document.getElementById('descontoPlanoAnterior').value);
    const valorPlanoNovo = parseFloat(document.getElementById('valorPlanoNovo').value);
    const descontoPlanoNovo = parseFloat(document.getElementById('descontoPlanoNovo').value);
    
    const dataInicio = new Date(document.getElementById('inicioPlano').value + 'T00:00:00');
    const dataDesativacao = new Date(document.getElementById('dataDesativacao').value + 'T00:00:00');
    const dataAtivacao = new Date(document.getElementById('dataAtivacao').value + 'T00:00:00');
    const dataVencimento = new Date(document.getElementById('dataVencimento').value + 'T00:00:00');

    // Chama a função calcularProporcional para obter os cálculos
    let prop1 = calcularProporcional(valorPlanoAnterior, dataInicio, dataDesativacao, '360dias');
    let desc1 = calcularProporcional(descontoPlanoAnterior, dataInicio, dataDesativacao, '360dias');
    let proporcional1 = prop1.valorTotal;
    let proporcionalDesc1 = desc1.valorTotal;


    // Chama a função calcularProporcional para obter os cálculos
    let prop2 = calcularProporcional(valorPlanoNovo, dataAtivacao, dataVencimento, '360dias');
    let desc2 = calcularProporcional(descontoPlanoNovo, dataAtivacao, dataVencimento, '360dias');
    let proporcional2 = prop2.valorTotal;
    let proporcionalDesc2 = desc2.valorTotal;
    

    // Verifica se pelo menos um dos campos do Plano Antigo foi preenchido
    const camposPlanoAntigoPreenchidos = valorPlanoAnterior || !isNaN(dataInicio.getTime()) || !isNaN(dataDesativacao.getTime());

    // Se algum campo foi preenchido, verifica se todos os campos estão preenchidos
    if (camposPlanoAntigoPreenchidos) {
        if (!valorPlanoAnterior || isNaN(dataInicio.getTime()) || isNaN(dataDesativacao.getTime())) {
            alert("Preencha todos os campos válidos do Plano Antigo.");
            return;
        }
    } else{
        // Se nenhum campo do plano antigo foi preenchido, zera os valores proporcionais
        proporcional1 = 0;
        proporcionalDesc1 = 0;
    }
    
    // Verifica se pelo menos um dos campos do Plano Novo foi preenchido
    const camposPlanoNovoPreenchidos = valorPlanoNovo || !isNaN(dataAtivacao.getTime()) || !isNaN(dataVencimento.getTime());
    // Se algum campo foi preenchido, verifica se todos os campos estão preenchidos
    if (camposPlanoNovoPreenchidos) {
        if (!valorPlanoNovo || isNaN(dataAtivacao.getTime()) || isNaN(dataVencimento.getTime())) {
            alert("Preencha todos os campos válidos do Plano Novo.");
            return;
        }
    } else{
        // Se nenhum campo do plano novo foi preenchido, zera os valores proporcionais
        proporcional2 = 0;
        proporcionalDesc2 = 0;
    }

    const valorTotal = proporcional1 + proporcional2;
    const descontoTotal = proporcionalDesc1 + proporcionalDesc2;
    const valorFinalCobrado = valorTotal - descontoTotal;

    // Exibe os campos de desconto e valor total da fatura apenas se aplicável
    const descontoCampos = document.querySelectorAll('.desconto-campo');
    const valorFaturaTotalCampo = document.querySelectorAll('.fatura-campo');

    if (descontoTotal > 0) {
        descontoCampos.forEach(campo => campo.style.display = 'block');
        valorFaturaTotalCampo.forEach(campo => campo.style.display = 'block');

        document.getElementById('valorDescontoTotal').value = descontoTotal.toFixed(2).replace('.', ',');
        document.getElementById('valorFaturaTotal').value = valorTotal.toFixed(2).replace('.', ',');
    } else {
        descontoCampos.forEach(campo => campo.style.display = 'none');
        valorFaturaTotalCampo.forEach(campo => campo.style.display = 'none');
    }

    // Atualiza o campo do valor final cobrado
    document.getElementById('valorFinalCobrado').value = valorFinalCobrado.toFixed(2).replace('.', ',');
  
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 🔥 impede o comportamento padrão (submit)
      calcularAtivacao();
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

// Adiciona o evento de clique dos resultadis para copiar o texto do textarea para a área de transferência
document.getElementById('valorDescontoTotal').addEventListener('click', function() {
    copiarComFeedback('valorDescontoTotal', 'labelValorDescontoTotal', 'Valor total de desconto');
  });


  document.getElementById('valorFaturaTotal').addEventListener('click', function() {
    copiarComFeedback('valorFaturaTotal', 'labelValorFaturaTotal', 'Valor da fatura total');
  });

document.getElementById('valorFinalCobrado').addEventListener('click', function() {
    copiarComFeedback('valorFinalCobrado', 'labelValorFinalCobrado', 'Valor final cobrado');
  } );

