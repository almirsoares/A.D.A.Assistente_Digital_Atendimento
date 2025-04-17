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



//-----------------------------------------------------------------------------------------
// FUNÇÃO PARA ALTERAÇÃO DE PLANO
// Função auxiliar que chama calcularProporcional e cuida das atribuições adicionais
function calcularProporcionalVencimento() {

    alert("Por favor, preencha todos os campos corretamente.");

    // Obtém os valores do formulário
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const dataAntiga = new Date(document.getElementById('dataAntiga').value + 'T00:00:00');
    const dataNova = new Date(document.getElementById('dataNova').value + 'T00:00:00');

    // Seta a data para o calculo ser referente ao dia do vencimento anterior para calcular o proporcional decorrendo daquele dia
    const dataParaCalculo = new Date(dataAntiga);
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



//-------------------------------------------------------------------------------------
// FUNÇÃO PARA DESATIVAÇÃO DE CLIENTES
// Função que calcula os valores proporcionais de desativação e inputa as faturas anteriores como prevenção

function calcularDesativacao() {
    // Obtenção de valores dos campos de entrada   new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const dataVencimento = new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const dataUltimoAcesso = new Date(document.getElementById('dataUltimoAcesso').value + 'T00:00:00');
    const valorMultaDigitado = parseFloat(document.getElementById('valorMulta').value);
    const multaEquipamento = parseFloat(document.getElementById('multaEquipamento').value);
    const meses = parseInt(document.getElementById('meses').value);

    if (isNaN(valorPlano) || isNaN(dataVencimento.getTime()) || isNaN(dataUltimoAcesso.getTime()) || isNaN(valorMultaDigitado) || isNaN(meses)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Seta a data para o calculo ser referente ao dia do vencimento anterior para calcular o proporcional decorrendo daquele dia
    const dataParaCalculo = new Date(dataVencimento);
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
        valorMulta = ((valorMultaDigitado - multaEquipamento) * meses) / 12;
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
    // Verifica o status do equipamento pelo botão lógico
    const statusEquipamento = document.getElementById('statusEquipamento').value;
    if (statusEquipamento === "Extraviado") {
        protocoloTexto += `MULTA ONU: R$ ${multaEquipamento.toFixed(2)}\n\n`;
    }
    protocoloTexto += `ENVIADO SMS DE PRÉ INCLUSÃO`;
    document.getElementById('protocolo').value = protocoloTexto;
}



//---------------------------------------------------------------------------
// FUNÇÕES PARA RETENÇÃO DE CLIENTES

document.getElementById('cliente-retido').addEventListener('change', function () {
    const fieldsetDesativação = document.getElementById('desativacao');
    const fieldsetObsRetencao = document.getElementById('obsRetencao');
    if (this.value === 'sim') {
        fieldsetDesativação.style.display = 'none';
        fieldsetObsRetencao.style.display = 'block';
    } else {
        fieldsetDesativação.style.display = 'block';
        fieldsetObsRetencao.style.display = 'none';
    }
});


//Função para adicionar novos campos de ofertas
let ofertaCount = 1;
function adicionarOferta() {
    ofertaCount++;
    const container = document.getElementById('matriz-container');
    const novoInput = document.createElement('input');
    novoInput.type = 'text';
    novoInput.name = 'matriz-ofertas[]';
    novoInput.placeholder = `${ofertaCount} - `;
    novoInput.className = 'matriz-ofertas';
    container.appendChild(novoInput);
}


// Função que calcula os valores proporcionais de retenção e inputa as faturas anteriores como prevenção
function protocoloRetencao() {
    alert("clienteRetido");

    // Obtenção de valores dos campos de entrada   new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    alert(`valorPlano: ${valorPlano}`);

    const dataVencimento = new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    alert(`dataVencimento: ${dataVencimento}`);

    const dataCancelamento = new Date(document.getElementById('dataCancelamento').value + 'T00:00:00');
    alert(`dataCancelamento: ${dataCancelamento}`);

    const valorMultaDigitado = parseFloat(document.getElementById('valorMulta').value);
    alert(`valorMultaDigitado: ${valorMultaDigitado}`);

    const multaEquipamento = parseFloat(document.getElementById('multaEquipamento').value);
    alert(`multaEquipamento: ${multaEquipamento}`);

    const meses = parseInt(document.getElementById('meses').value);
    alert(`meses: ${meses}`);

    const numeroOferta = parseInt(document.getElementById('oferta').value);
    alert(`numeroOferta: ${numeroOferta}`);

    const observacao = document.getElementById('obs').value.trim();
    alert(`observacao: ${observacao}`);

    const verificaValor = document.getElementById('verificaValor').value;
    alert(`verificaValor: ${verificaValor}`);

    const valorOuDesconto = parseFloat(document.getElementById('valorOuDesconto').value);
    alert(`valorOuDesconto: ${valorOuDesconto}`);

    const verificaPrazo = document.getElementById('verificaPrazo').value.trim();
    alert(`verificaPrazo: ${verificaPrazo}`);

    const infoPrazo = document.getElementById('infoPrazo').value.trim();
    alert(`infoPrazo: ${infoPrazo}`);

    
    const clienteRetido = document.getElementById('cliente-retido').value;
    if (clienteRetido == 'sim'){

        const motivo = document.getElementById('motivo').value.trim();
        
        const ofertasInputs = document.querySelectorAll('.matriz-ofertas');
        const ofertas = Array.from(ofertasInputs)
            .map((input, index) => `                ${index + 1} - ${input.value.trim()}`)
            .filter(texto => texto.length > 4); 
        

        let protocoloTexto =`MOTIVO: ${motivo}
OFERTAS PASSADAS:   (Mínimo 2 ofertas)
${ofertas.join('\n')}
CANCELADO: (X )NÃO\n`;

alert("Protocolo de Retenção gerado com sucesso! pre for");
        protocoloTexto += `QUAL OFERTA ACEITA: `;	
        
        for (let i = 1; i <= ofertas.length; i++) {
            if (i === numeroOferta) {
                protocoloTexto += `${i}(X) `;
            }else{
                protocoloTexto += `${i}(  ) `;
            }
        }
        alert("Protocolo de Retenção gerado com sucesso! pos for");

        protocoloTexto += `\nOBSERVAÇÕES> ${observacao}
    FOI INFORMADO ALGUM VALOR OU DESCONTO? `;
    alert( "pre if verifca valor");
        if (verificaValor === "sim") {
            protocoloTexto += `SIM - R$ ${valorOuDesconto.toFixed(2)}\n`;
        } else {
            protocoloTexto += `NÃO\n`;
        }
        protocoloTexto += `SE (SIM), QUAIS FATURAS: 
    FOI INFORMADO ALGUM PRAZO? QUAL?: ${verificaPrazo} ${infoPrazo}
    *CLIENTE CIENTE DAS INFORMAÇÕES, ACEITOU OFERTA PASSADA E ESTÁ VIGENTE A PARTIR DE HOJE.`;

        document.getElementById('protocolo').value = protocoloTexto;
    } else{
        if (isNaN(valorPlano) || isNaN(dataVencimento.getTime()) || isNaN(dataCancelamento.getTime()) || isNaN(valorMultaDigitado)|| isNaN(multaEquipamento) || isNaN(meses)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        // Seta a data para o calculo ser referente ao dia do vencimento anterior para calcular o proporcional decorrendo daquele dia
        const dataParaCalculo = new Date(dataVencimento);
        dataParaCalculo.setMonth(dataParaCalculo.getMonth() - 1);
        dataParaCalculo.setDate(dataParaCalculo.getDate() - 1);

        // Chama a função calcularProporcional para obter os cálculos
        const resultado = calcularProporcional(valorPlano, dataParaCalculo, dataCancelamento);
        const valorProporcional = resultado.valorTotal;

        // Formatação das datas
        const dataProporcionalFormatada = `${(dataVencimento.getDate()).toString().padStart(2, '0')}/${(dataVencimento.getMonth() + 1).toString().padStart(2, '0')}/${dataVencimento.getFullYear()}`;


        // Cálculo da multa
        let textoMulta;
        let valorMulta = 0;
        if (meses === 0) {
            textoMulta = "MULTA:   (   )  APLICÁVEL    (  X ) NÃO APLICÁVEL - sem fidelidade ativa";

        } else {
            valorMulta = ((valorMultaDigitado - multaEquipamento) * meses) / 12;
            textoMulta = `MULTA: R$ ${valorMulta.toFixed(2)}  (  x )  APLICÁVEL    (   ) NÃO APLICÁVEL - sem fidelidade ativa
                         Data de Vencimento passada ao cliente: ${dataProporcionalFormatada}`;
        }



        const motivo = document.getElementById('motivo').value.trim();

        const ofertasInputs = document.querySelectorAll('.matriz-ofertas');
        const ofertas = Array.from(ofertasInputs)
            .map((input, index) => `                ${index + 1} - ${input.value.trim()}`)
            .filter(texto => texto.length > 4); // evita linhas vazias como "1 - "
        
        let protocoloTexto =
`CANCELADO: (X )SIM
MOTIVO: ${motivo}
OFERTAS PASSADAS:   (Mínimo 2 ofertas)
${ofertas.join('\n')}`;
        if(valorProporcional >0 || valorMulta >0){

            let valores= valorProporcional + valorMulta;

            try {
                protocoloTexto += `
                VALORES: R$ ${valores.toFixed(2)} (  ) NÃO
                Valor Proporcional: R$ ${valorProporcional.toFixed(2)} - ${resultado.totalDias} dias
                Data de Vencimento passada ao cliente: ${dataProporcionalFormatada}\n`;
                
            } catch (err) {
                alert("Erro ao montar protocoloTexto: " + err.message);
            }
            
        } else{
            protocoloTexto += `VALORES (X ) NÃO
            Valor Proporcional: R$ 0,00 - 0 dias\n`;
        }

        protocoloTexto +=`${textoMulta}\n`;
        protocoloTexto += `- CLIENTE CIENTE QUE É NECESSÁRIO TER ALGUÉM  MAIOR DE 18 ANOS NA RESIDÊNCIA, COM O DOCUMENTO RG EM MÃOS PARA ACOMPANHAR A VISITA DOS TÉCNICOS
                           - CIENTE DA ABERTURA DE O.S. PARA RETIRADA DE EQUIPAMENTO. PRAZO INFORMADO DE: 3 DIAS ÚTEIS.`;
        document.getElementById('protocolo').value = protocoloTexto;
    }
}



//-------------------------------------------------------------------------------------
// FUNÇÕES PARA CALCULO DE JUROS E MULTA

// Função para atualizar os valores de juros e multa com base na seleção do usuário
function atualizarJurosMulta() {
    const tipo = document.getElementById('tipoJurosMulta').value;
    const multaInput = document.getElementById('multa');
    const jurosInput = document.getElementById('juros');

    if (tipo === "10") {
        multaInput.value = 10;
        jurosInput.value = 0.08333;
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

// Define os valores padrão ao carregar a página com base na opção selecionada
document.addEventListener("DOMContentLoaded", function () {
    atualizarJurosMulta(); // Chama a função para definir os valores iniciais corretamente
});

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