// Função principal que calcula os valores proporcionais e retorna o resultado
function calcularProporcional(valorPlano, dataAntiga, dataNova) {
    // Calcula a diferença em milissegundos entre as datas
    const diferencaMilissegundos = dataNova - dataAntiga;

    // Converte a diferença para dias corridos
    const totalDias = Math.ceil(diferencaMilissegundos / (1000 * 3600 * 24));

    // Calcula o valor proporcional com base nos dias corridos
    const valorTotal = (valorPlano / 30) * totalDias;

    return {
        valorTotal,
        totalDias,
        diaAntigo: dataAntiga.getDate(),
        mesAntigo: dataAntiga.getMonth() + 2,
        diaNovo: dataNova.getDate(),
        mesNovo: dataNova.getMonth() + 1
    };
}

// Função auxiliar que chama calcularProporcional e cuida das atribuições adicionais
function calcularProporcionalVencimento() {

        alert("Por favor, preencha todos os campos corretamente.");

    // Obtém os valores do formulário
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const dataAntiga = new Date(document.getElementById('dataAntiga').value + 'T00:00:00');
    const dataNova = new Date(document.getElementById('dataNova').value + 'T00:00:00');

    // Seta a data para o calculo ser referente ao dia do vencimento anterior para calcular o proporcional decorrendo daquele dia
    const dataParaCalculo= new Date(dataAntiga);
    dataParaCalculo.setMonth(dataParaCalculo.getMonth() - 1);
    
    // Chama a função principal para obter os cálculos
    const resultado = calcularProporcional(valorPlano, dataParaCalculo, dataNova);

    let valorProporcional;
    let proporcionalDias;
    let mensagemProporcional;

    if (resultado.totalDias > 30) {
        proporcionalDias = resultado.totalDias - 30;
        valorProporcional = (valorPlano / 30) * proporcionalDias;
        mensagemProporcional = `devido a um valor adicional de R$ ${valorProporcional.toFixed(2)} por um total extra de ${proporcionalDias} dias `;
    } else {
        proporcionalDias = resultado.totalDias;
        valorProporcional = resultado.valorTotal;
        mensagemProporcional = "";
    }

    // Mensagem ao cliente
    const mensagemCliente = `Muito obrigado por aguardar! Verifico que sua *primeira fatura* após a mudança de data será no valor de R$ ${resultado.valorTotal.toFixed(2)} devido ao *total de ${resultado.totalDias} dias* de uso, ${mensagemProporcional} tudo bem?`;
    document.getElementById('mensagemCliente').value = mensagemCliente;

    // Gerar a mensagem de protocolo
    const desejaMudanca = document.getElementById('desejaMudanca').checked ? "SIM" : "NÃO";
    const utilizaApp = document.getElementById('utilizaApp').checked ? "SIM" : "NÃO";
    const protocolo = `PROTOCOLO-${Math.floor(Math.random() * 1000000)}`;
    let mensagemConfirmacao;
    let mensagemApp;

    if (desejaMudanca === "SIM") {
        mensagemConfirmacao = "Faturas Atualizadas\n";
        mensagemApp = utilizaApp === "SIM" ? "Cliente confirmou mudança em app" : ">>> ADICIONAR PROTOCOLO DE CARNE <<<";
    } else {
        mensagemConfirmacao = "Cliente desistiu da mudança de data de vencimento.";
        mensagemApp = "";
    }

    const mensagemProtocolo = `Solicitou troca de vencimento de: ${resultado.diaAntigo.toString().padStart(2, '0')}/${resultado.mesAntigo.toString().padStart(2, '0')} para ${resultado.diaNovo.toString().padStart(2, '0')}/${resultado.mesNovo.toString().padStart(2, '0')}
Motivo: Cliente solicitou alteração
Gerou Proporcional? ( X )SIM ( )NÃO
Ciente de proporcional no valor de: R$ ${valorProporcional.toFixed(2)}
${mensagemConfirmacao} ${mensagemApp}
Atendimento finalizado.`;

    // Exibir o protocolo
    document.getElementById('protocolo').value = mensagemProtocolo;
}

function calcularDesativacao() {
    // Obtenção de valores dos campos de entrada   new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const dataVencimento = new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const dataUltimoAcesso = new Date(document.getElementById('dataUltimoAcesso').value + 'T00:00:00');
    const valorMultaDigitado = parseFloat(document.getElementById('valorMulta').value);
    const multaEquipamento = parseFloat(document.getElementById('multaEquipamento').value);
    const meses = parseInt(document.getElementById('meses').value);

    if (isNaN(valorPlano) || !dataVencimento || !dataUltimoAcesso || isNaN(valorMultaDigitado) || isNaN(meses)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Seta a data para o calculo ser referente ao dia do vencimento anterior para calcular o proporcional decorrendo daquele dia
    const dataParaCalculo= new Date(dataVencimento);
    dataParaCalculo.setMonth(dataParaCalculo.getMonth() - 1);
    dataParaCalculo.setDate(dataParaCalculo.getDate() - 1);

    // Chama a função calcularProporcional para obter os cálculos
    const resultado = calcularProporcional(valorPlano, dataParaCalculo, dataUltimoAcesso);

    // Cálculo dos valores das faturas anteriores e proporcional
    const dataMes1 = new Date(dataVencimento);
    dataMes1.setMonth(dataMes1.getMonth() - 2);
    const dataMes2 = new Date(dataVencimento);
    dataMes2.setMonth(dataMes2.getMonth() - 1);

    const valorProporcionalMes = resultado.valorTotal.toFixed(2);
    const valorFatura = valorPlano.toFixed(2);

    // Formatação das datas
    const dataMes1Formatada = `${(dataMes1.getDate()).toString().padStart(2, '0')}/${(dataMes1.getMonth() + 1).toString().padStart(2, '0')}/${dataMes1.getFullYear()}`;
    const dataMes2Formatada = `${(dataMes2.getDate()).toString().padStart(2, '0')}/${(dataMes2.getMonth() + 1).toString().padStart(2, '0')}/${dataMes2.getFullYear()}`;
    const dataProporcionalFormatada = `${(dataVencimento.getDate()).toString().padStart(2, '0')}/${(dataVencimento.getMonth() + 1).toString().padStart(2, '0')}/${dataVencimento.getFullYear()}`;

    // Cálculo da multa
    let textoMulta;
    let valorMulta = 0;
    if (meses === 0) {
        textoMulta = "MULTA RESCISÓRIA : R$  (  ) SIM    ( X ) NÃO";
    } else {
        valorMulta = ((valorMultaDigitado - 500) * meses) / 12;
        textoMulta = "MULTA RESCISÓRIA : R$  ( X ) SIM    (  ) NÃO";
    }

    // Mensagem de uso total
    const usoTexto = `REF ${resultado.totalDias} DIAS DE USO`;
    document.getElementById('usoTotal').value = usoTexto;

    // Mensagem de protocolo
    let protocoloTexto = `CONTRATO DESATIVADO\n` +
        `Ajustado Faturas Referente aos dias utilizados :\n\n` +
        `${dataMes1Formatada} - R$ ${valorFatura}\n` +
        `${dataMes2Formatada} - R$ ${valorFatura}\n` +
        `${dataProporcionalFormatada} - R$ ${valorProporcionalMes}\n\n` +
        `${textoMulta}\n` +
        `VALOR DA MULTA: R$ ${valorMulta.toFixed(2)}\n`;

    // Adiciona multa do equipamento antes do SMS, se aplicável
    if (multaEquipamento > 0) {
        protocoloTexto += `MULTA ONU: R$ ${multaEquipamento.toFixed(2)}\n\n`;
    }

    protocoloTexto += `ENVIADO SMS DE PRÉ INCLUSÃO`;

    document.getElementById('protocolo').value = protocoloTexto;
}


// Função que calcula os valores proporcionais entre dois planos
function calcularProporcionalPlanos() {
    // Obtém os valores dos campos
    const valorPlanoAnterior = parseFloat(document.getElementById('valorPlanoAnterior').value);
    let diasPlanoAnterior = parseInt(document.getElementById('diasPlanoAnterior').value);
    const descontoPlanoAnterior = parseFloat(document.getElementById('descontoPlanoAnterior').value);

    const valorPlanoNovo = parseFloat(document.getElementById('valorPlanoNovo').value);
    let diasPlanoNovo = parseInt(document.getElementById('diasPlanoNovo').value);
    const descontoPlanoNovo = parseFloat(document.getElementById('descontoPlanoNovo').value);

    // Validações básicas
    if (isNaN(valorPlanoAnterior) || isNaN(diasPlanoAnterior) || isNaN(valorPlanoNovo) || isNaN(diasPlanoNovo)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Verifica se os dias são menores ou iguais a 5 e emite alerta
    if (diasPlanoAnterior <= 5) {
        alert("A quantidade de dias para o plano anterior é menor ou igual a 5 e não será considerada no cálculo proporcional. Considere o plano de maior duração.");
        diasPlanoNovo = diasPlanoNovo + diasPlanoAnterior;        
        diasPlanoAnterior = 0;
    }

    if (diasPlanoNovo <= 5) {
        alert("A quantidade de dias para o novo plano é menor ou igual a 5 e não será considerada no cálculo proporcional. Considere o plano de maior duração.");
        diasPlanoAnterior = diasPlanoAnterior + diasPlanoNovo;
        diasPlanoNovo = 0;
    }

    // Calcula os valores proporcionais
    const proporcionalAnterior = (valorPlanoAnterior / 30) * diasPlanoAnterior;
    const proporcionalNovo = (valorPlanoNovo / 30) * diasPlanoNovo;

    let propDescontoPlanoAnterior = descontoPlanoAnterior;
    let propDescontoPlanoNovo = descontoPlanoNovo;

    if (diasPlanoAnterior > 30) {
        propDescontoPlanoAnterior = descontoPlanoAnterior;
    } else {
        propDescontoPlanoAnterior = (descontoPlanoAnterior / 30) * diasPlanoAnterior;
    }

    if (diasPlanoNovo > 30) {
        propDescontoPlanoNovo = descontoPlanoNovo;
    } else {
        propDescontoPlanoNovo = (descontoPlanoNovo / 30) * diasPlanoNovo;
    }

    // Soma os valores
    const valorFaturaTotal = proporcionalAnterior + proporcionalNovo;
    const valorDescontoTotal = propDescontoPlanoAnterior + propDescontoPlanoNovo;
    const valorFinalCobrado = valorFaturaTotal - valorDescontoTotal;

    // Atualiza os campos do resumo
    document.getElementById('valorFaturaTotal').value = valorFaturaTotal.toFixed(2);
    document.getElementById('valorFinalCobrado').value = valorFinalCobrado.toFixed(2);

    // Exibe os campos de desconto apenas se aplicável
    const descontoCampos = document.querySelectorAll('.desconto-campo');
    if (valorDescontoTotal > 0) {
        descontoCampos.forEach(campo => campo.style.display = 'block');
        document.getElementById('valorDescontoTotal').value = valorDescontoTotal.toFixed(2);
    } else {
        descontoCampos.forEach(campo => campo.style.display = 'none');
    }
}

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
            valorFaturaTotal = (valorFaturaTotal / 30) * (30-dias);
            valorDescontoTotal = (valorDescontoTotal / 30) * (30-dias);
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
// Função para calcular Juros e Multa utilizando calcularProporcional
function calcularJurosMulta() {
    const valorFatura = parseFloat(document.getElementById('valorFatura').value);
    const dataVencimento = new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const dataAtualizada = new Date(document.getElementById('dataAtualizada').value + 'T00:00:00');
    const multa = parseFloat(document.getElementById('multa').value) / 100;
    const juros = parseFloat(document.getElementById('juros').value) / 100;

    if (isNaN(valorFatura) || isNaN(multa) || isNaN(juros) || isNaN(dataVencimento) || isNaN(dataAtualizada)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Usa a função calcularProporcional para obter o total de dias de atraso
    const resultado = calcularProporcional(valorFatura, dataVencimento, dataAtualizada);
    const totalDias = resultado.totalDias;

    // Calcula multa fixa
    const valorMulta = valorFatura * multa;

    // Calcula juros compostos
    const valorJuros = valorFatura * Math.pow(1 + juros, totalDias) - valorFatura;

    // Calcula o valor final com multa e juros
    const valorFinal = valorFatura + valorMulta + valorJuros;

    // Atualiza os campos com os resultados
    document.getElementById('valorFinal').value = valorFinal.toFixed(2);
}

// Função para atualizar os valores de juros e multa com base na seleção do usuário
function atualizarJurosMulta() {
    const tipo = document.getElementById('tipoJurosMulta').value;
    const multaInput = document.getElementById('multa');
    const jurosInput = document.getElementById('juros');

    if (tipo === "10") {
        multaInput.value = 10;
        jurosInput.value = 0.833;
        multaInput.readOnly = true;
        jurosInput.readOnly = true;
    } else if (tipo === "2.5") {
        multaInput.value = 2.5;
        jurosInput.value = 0.033;
        multaInput.readOnly = true;
        jurosInput.readOnly = true;
    } else {
        multaInput.value = "";
        jurosInput.value = "";
        multaInput.readOnly = false;
        jurosInput.readOnly = false;
    }
}


