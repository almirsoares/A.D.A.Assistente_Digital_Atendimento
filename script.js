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