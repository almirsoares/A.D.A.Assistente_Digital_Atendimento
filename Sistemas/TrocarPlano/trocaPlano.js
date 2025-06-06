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
    const resultadoAnterior = calcularProporcional(valorPlanoAnterior, dataInicioPlano, dataTroca, '360dias');
    const proporcionalAnterior = resultadoAnterior.valorTotal;

    // Calcula o valor proporcional do novo plano da data de troca até o vencimento
    const resultadoNovo = calcularProporcional(valorPlanoNovo, dataTroca, dataVencimento, '360dias');
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

        document.getElementById('valorDescontoTotal').value = valorDescontoTotal.toFixed(2).replace('.', ',');
        document.getElementById('valorFaturaTotal').value = valorFaturaTotal.toFixed(2).replace('.', ',');
    } else {
        descontoCampos.forEach(campo => campo.style.display = 'none');
        valorFaturaTotalCampo.forEach(campo => campo.style.display = 'none');
    }

    // Atualiza o campo do valor final cobrado
    document.getElementById('valorFinalCobrado').value = valorFinalCobrado.toFixed(2).replace('.', ',');
}

function tutorial() {
    const intro = introJs()
    intro.setOptions({
        steps: [
            {
                intro: "Olá! Vamos aprender a calcular o valor proporcional entre dois planos."
            },
            {
                element: '#valorPlanoAnterior',
                intro: 'Insira o valor do plano anterior.'
            },
            {
                element: '#descontoPlanoAnterior',
                intro: 'Insira o desconto do plano anterior. Se não houver deixe com valor 0.'
            },
            {
                element: '#valorPlanoNovo',
                intro: 'Insira o valor do novo plano.'
            },
            {
                element: '#descontoPlanoNovo',
                intro: 'Insira o desconto do novo plano. Se não houver deixe com valor 0.'
            },
            {
                element: '#inicioPlano',
                intro: 'Selecione a data de início do plano anterior. Corresponde a data de vencimento do plano antes da troxa.'
            },
            {
                element: '#dataTroca',
                intro: 'Selecione a data de troca de plano. Geralmente hoje.'
            },
            {
                element: '#dataVencimento',
                intro: 'Selecione a data de vencimento do novo plano. Corresponde a próxima data de vencimento.'
            },
            {
                element: '#valorFaturaTotal',
                intro: 'Aqui está o valor integral da fatura, sem o desconto de um dos planos, se houver. Esse campo só aparece se houver desconto.'
            },
            {
                element: '#valorDescontoTotal',
                intro: 'Aqui está o valor total dos descontos proporcionais. Esse campo só aparece se houver desconto.'
            },
            {
                element: '#valorFinalCobrado',
                intro: 'Aqui está o valor final que será cobrado após aplicar os descontos.'
            },
            {
                element: '#btnCalcular',
                intro: 'Clique aqui para calcular o valor da fatura a ser gerada.'
            },
            {
                intro: "Caso tenha alguma dúvida, entre em contato ou preencha o formulário de feedback."
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
      calcularProporcionalPlanos();
    }
  });

// Adiciona o evento de clique dos resultados para copiar o texto do textarea para a área de transferência
document.getElementById('valorFaturaTotal').addEventListener('click', function() {
  this.select();  // Seleciona todo o conteúdo do textarea
  document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
  alert('Valor Fatura Total copiado!');  // Exibe um alerta (opcional)
});

document.getElementById('valorDescontoTotal').addEventListener('click', function() {
    this.select();  // Seleciona todo o conteúdo do textarea
    document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
    alert('Valor Desconto Total copiado!');  // Exibe um alerta (opcional)
});

document.getElementById('valorFinalCobrado').addEventListener('click', function() {
    this.select();  // Seleciona todo o conteúdo do textarea
    document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
    alert('Valor Final Cobrado copiado!');  // Exibe um alerta (opcional)
});