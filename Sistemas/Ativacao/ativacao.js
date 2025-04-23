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
    let prop1 = calcularProporcional(valorPlanoAnterior, dataInicio, dataDesativacao);
    let desc1 = calcularProporcional(descontoPlanoAnterior, dataInicio, dataDesativacao);
    let proporcional1 = prop1.valorTotal;
    let proporcionalDesc1 = desc1.valorTotal;


    // Chama a função calcularProporcional para obter os cálculos
    let prop2 = calcularProporcional(valorPlanoNovo, dataAtivacao, dataVencimento);
    let desc2 = calcularProporcional(descontoPlanoNovo, dataAtivacao, dataVencimento);
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

        document.getElementById('valorDescontoTotal').value = descontoTotal.toFixed(2);
        document.getElementById('valorFaturaTotal').value = valorTotal.toFixed(2);
    } else {
        descontoCampos.forEach(campo => campo.style.display = 'none');
        valorFaturaTotalCampo.forEach(campo => campo.style.display = 'none');
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