// Função que calcula o desconto baseado no tipo selecionado
function calcularDesconto() {
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const descontoPlano = parseFloat(document.getElementById('descontoPlano').value);
    const descontoSolicitado = parseFloat(document.getElementById('descontoSolicitado').value);
    const tipoDesconto = document.getElementById('tipoDesconto').value;

    if (isNaN(valorPlano) || isNaN(descontoPlano) || isNaN(descontoSolicitado)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    let valorFaturaTotal = valorPlano; // Começa com o valor do plano
    let valorDescontoTotal = descontoPlano; // Inclui o desconto do plano

    switch (tipoDesconto) {
        case 'porDias':
            const dias = parseInt(descontoSolicitado);
            if (isNaN(dias)) {
                alert("Por favor, insira um número válido de dias.");
                return;
            }
            valorFaturaTotal = (valorFaturaTotal / 30) * (30 - dias);
            valorDescontoTotal = (valorDescontoTotal / 30) * (30 - dias);
            break;
        case 'porPorcentagem':
            const percentual = parseFloat(descontoSolicitado);
            if (isNaN(percentual) || percentual < 0 || percentual > 100) {
                alert("Por favor, insira uma porcentagem válida (0 a 100).");
                return;
            }
            valorFaturaTotal = (valorFaturaTotal * (100 - percentual)) / 100;
            valorDescontoTotal = (valorDescontoTotal * (100 - percentual)) / 100;

            break;
        case 'porValor':
            const valor = parseFloat(descontoSolicitado);
            if (isNaN(valor)) {
                alert("Por favor, insira um valor válido.");
                return;
            }
            valorFaturaTotal = valorFaturaTotal - valor;
            break;
        default:
            alert("Selecione um tipo de desconto válido.");
            return;
    }

    const valorFinalCobrado = valorFaturaTotal - valorDescontoTotal;

    if (valorFinalCobrado < 0) {
        alert("O desconto total não pode exceder o valor da fatura total.");
        return;
    }

    // Atualiza os campos de resultado
    document.getElementById('valorFaturaTotal').value = valorFaturaTotal.toFixed(2);
    document.getElementById('valorDescontoTotal').value = valorDescontoTotal.toFixed(2);
    document.getElementById('valorFinalCobrado').value = valorFinalCobrado.toFixed(2);

    // Exibe os campos de desconto
    document.querySelectorAll('.desconto-campo').forEach(campo => campo.style.display = 'block');
}