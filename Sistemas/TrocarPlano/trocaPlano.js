// Função que calcula os valores proporcionais entre dois planos
function calcularProporcionalPlanos() {
    // Obtém os valores dos campos
    const valorPlanoAnterior = parseFloat(document.getElementById('valorPlanoAnterior').value);
    const descontoPlanoAnterior = parseFloat(document.getElementById('descontoPlanoAnterior').value);
    const valorPlanoNovo = parseFloat(document.getElementById('valorPlanoNovo').value);
    const descontoPlanoNovo = parseFloat(document.getElementById('descontoPlanoNovo').value);

    // Obtém as datas
    const dataInicioPlano = new Date(document.getElementById('inicioPlano').value + 'T00:00:00');
    const dataTroca = new Date(document.getElementById('dataTroca').value + 'T00:00:00');
    const dataVencimento = new Date(document.getElementById('dataVencimento').value + 'T00:00:00');

    if (isNaN(valorPlanoAnterior) || isNaN(valorPlanoNovo) || isNaN(dataInicioPlano) || isNaN(dataTroca) || isNaN(dataVencimento)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Calcula o valor proporcional do plano anterior até a data de troca
    const resultadoAnterior = calcularProporcional(valorPlanoAnterior, dataInicioPlano, dataTroca);
    const proporcionalAnterior = resultadoAnterior.valorTotal;

    // Calcula o valor proporcional do novo plano da data de troca até o vencimento
    const resultadoNovo = calcularProporcional(valorPlanoNovo, dataTroca, dataVencimento);
    const proporcionalNovo = resultadoNovo.valorTotal;

    // Verifica se os dias são menores ou iguais a 5 e emite alerta
    if (resultadoAnterior.totalDias <= 5) {
        alert("A quantidade de dias para o plano anterior é menor ou igual a 5. Nesta caso o proporcional de troca de plano é dispensada.");
    }
    if (resultadoNovo.totalDias <= 5) {
        alert("A quantidade de dias para o novo plano é menor ou igual a 5. Nesta caso o proporcional de troca de plano é dispensada.");
    }

    // Calcula os descontos proporcionais
    const propDescontoPlanoAnterior = (descontoPlanoAnterior / 30) * resultadoAnterior.totalDias;
    const propDescontoPlanoNovo = (descontoPlanoNovo / 30) * resultadoNovo.totalDias;

    // Soma os valores
    const valorFaturaTotal = proporcionalAnterior + proporcionalNovo;
    const valorDescontoTotal = propDescontoPlanoAnterior + propDescontoPlanoNovo;
    const valorFinalCobrado = valorFaturaTotal - valorDescontoTotal;

    // Exibe os campos de desconto e valor total da fatura apenas se aplicável
    const descontoCampos = document.querySelectorAll('.desconto-campo');
    const valorFaturaTotalCampo = document.querySelectorAll('.fatura-campo');

    if (valorDescontoTotal > 0) {
        descontoCampos.forEach(campo => campo.style.display = 'block');
        valorFaturaTotalCampo.forEach(campo => campo.style.display = 'block');

        document.getElementById('valorDescontoTotal').value = valorDescontoTotal.toFixed(2);
        document.getElementById('valorFaturaTotal').value = valorFaturaTotal.toFixed(2);
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
      calcularProporcionalPlanos();
    }
  });