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

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 🔥 impede o comportamento padrão (submit)
      calcularDesativacao();
    }
  });