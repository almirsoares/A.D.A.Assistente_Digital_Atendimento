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
    const prop1 = calcularProporcional(valorPlanoAnterior, dataInicio, dataDesativacao);
    const desc1 = calcularProporcional(descontoPlanoAnterior, dataInicio, dataDesativacao);
    const proporcional1 = prop1.valorTotal;
    const proporcionalDesc1 = desc1.valorTotal;


    // Chama a função calcularProporcional para obter os cálculos
    const prop2 = calcularProporcional(valorPlanoNovo, dataAtivacao, dataVencimento);
    const desc2 = calcularProporcional(descontoPlanoNovo, dataAtivacao, dataVencimento);
    const proporcional2 = prop2.valorTotal;
    const proporcionalDesc2 = desc2.valorTotal;
    

    const valorTotal = proporcional1 + proporcional2;
    const descontoTotal = proporcionalDesc1 + proporcionalDesc2;
    const valorFinalCobrado = valorTotal - descontoTotal;

    // Exibe os campos de desconto e valor total da fatura apenas se aplicável
    const descontoCampos = document.querySelectorAll('.desconto-campo');
    const valorFaturaTotalCampo = document.querySelectorAll('.fatura-campo');

    if (descontoTotal > 0) {
        descontoCampos.forEach(campo => campo.style.display = 'block');
        valorFaturaTotalCampo.forEach(campo => campo.style.display = 'block');

        document.getElementById('valorDescontoTotal').value = descontoTotal.toFixed(2);
        document.getElementById('valorFaturaTotal').value = valorTotal.toFixed(2);
    } else {
        descontoCampos.forEach(campo => campo.style.display = 'none');
        document.getElementById('valorFaturaTotal').style.display = 'none';
    }

    // Atualiza o campo do valor final cobrado
    document.getElementById('valorFinalCobrado').value = valorFinalCobrado.toFixed(2);
  
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 🔥 impede o comportamento padrão (submit)
      calcularAtivacao();
    }
  });