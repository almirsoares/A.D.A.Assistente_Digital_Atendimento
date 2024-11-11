// Função principal que calcula os valores proporcionais e retorna o resultado
function calcularProporcional(valorPlano, dataAntiga, dataNova) {
    // Extração dos dias e meses das datas
    const diaAntigo = dataAntiga.getDate() + 1;
    const mesAntigo = dataAntiga.getMonth() + 1;
    const diaNovo = dataNova.getDate() + 1;
    const mesNovo = dataNova.getMonth() + 1;

    // Aplicação da fórmula
    let totalDias;
    if (diaNovo > diaAntigo) {
        totalDias = (diaNovo - diaAntigo) + (mesNovo - mesAntigo) * 30;
    } else {
        totalDias = (diaNovo - diaAntigo) + (mesNovo - mesAntigo) * 30;
    }

    // Ajuste de total de dias
    totalDias = 30 + totalDias;
    const valorTotal = (valorPlano / 30) * totalDias;

    return {
        valorTotal,
        totalDias,
        diaAntigo,
        mesAntigo,
        diaNovo,
        mesNovo
    };
}

// Função auxiliar que chama calcularProporcional e cuida das atribuições adicionais
function calcularProporcionalVencimento() {
    // Obtém os valores do formulário
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const dataAntiga = new Date(document.getElementById('dataAntiga').value);
    const dataNova = new Date(document.getElementById('dataNova').value);

    // Chama a função principal para obter os cálculos
    const resultado = calcularProporcional(valorPlano, dataAntiga, dataNova);

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
        mensagemConfirmacao = "Faturas Atualizadas";
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
    // Obtenção de valores dos campos de entrada
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const dataVencimento = new Date(document.getElementById('dataVencimento').value);
    const dataUltimoAcesso = new Date(document.getElementById('dataUltimoAcesso').value);

    if (isNaN(valorPlano) || !dataVencimento || !dataUltimoAcesso) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Chama a função calcularProporcional para obter os cálculos
    const resultado = calcularProporcional(valorPlano, dataVencimento, dataUltimoAcesso);

    // Mensagem de protocolo
    const protocoloTexto = `Protocolo gerado: Valor proporcional para ${resultado.totalDias} dias é R$ ${resultado.valorTotal.toFixed(2)}`;
    document.getElementById('protocolo').value = protocoloTexto;
}

