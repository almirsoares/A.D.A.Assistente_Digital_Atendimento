// Função que calcula os valores proporcionais de desativação e inputa as faturas anteriores como prevenção

function calcularAcordo() {

    // Obtenção de valores dos campos de entrada   new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    console.log(valorPlano);
    const mesesAtrasados = parseInt(document.getElementById('mesesAtrasados').value);
    console.log(mesesAtrasados);
    const dataVencimento = new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const dataUltimoAcesso = new Date(document.getElementById('dataUltimoAcesso').value + 'T00:00:00');

    if (isNaN(valorPlano) || isNaN(mesesAtrasados) || isNaN(dataVencimento.getTime()) || isNaN(dataUltimoAcesso.getTime())) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Seta a data para o calculo ser referente ao dia do vencimento anterior para calcular o proporcional decorrendo daquele dia
    const dataParaCalculo = new Date(dataVencimento);
    dataParaCalculo.setMonth(dataParaCalculo.getMonth() - 1);
    dataParaCalculo.setDate(dataParaCalculo.getDate() - 1);

    // Chama a função calcularProporcional para obter os cálculos
    const resultado = calcularProporcional(valorPlano, dataParaCalculo, dataUltimoAcesso, '360dias');

    const valorProporcionalMes = resultado.valorTotal.toFixed(2);
    const valorFatura = valorPlano.toFixed(2);

    const mesesDevidosAnteriores = valorFatura*mesesAtrasados;
    const valorTotalDevido = parseFloat(mesesDevidosAnteriores) + parseFloat(valorProporcionalMes);

    // Mensagem de protocolo
    let texto = `Obrigado por aguardar! Verifico que o valor total dos debido sem juros e multa fica no valor de R$ ${valorTotalDevido.toFixed(2).replace('.',',')}\n` 
    document.getElementById('texto').value = texto;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 🔥 impede o comportamento padrão (submit)
      calcularAcordo();
    }
  });