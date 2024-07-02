function calcularProporcional() {
    // Obtém os valores do formulário
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const dataAntiga = new Date(document.getElementById('dataAntiga').value);
    const dataNova = new Date(document.getElementById('dataNova').value);

    // Validação simples das datas
    if (dataAntiga >= dataNova) {
        alert("A data nova deve ser posterior à data antiga.");
        return;
    }

    // Cálculo da diferença em dias (considerando um ciclo fixo de 30 dias)
    const umDia = 24 * 60 * 60 * 1000;
    let diferencaDias = Math.round((dataNova - dataAntiga) / umDia);

    // Ajuste para ciclo fixo de 30 dias por mês
    let totalDias = 0;
    let dataTemp = new Date(dataAntiga);

    while (dataTemp < dataNova) {
        totalDias++;
        dataTemp.setDate(dataTemp.getDate() + 1);
        
        // Pular dias extras no final do mês
        if (dataTemp.getDate() === 1) {
            dataTemp.setDate(dataTemp.getDate() - 1); // Volta ao último dia do mês anterior
            dataTemp.setDate(30); // Ajusta para o último dia do ciclo de 30 dias
        }
    }

    totalDias = totalDias +30;
    const valorProporcional = (valorPlano / 30) * totalDias;

    // Mensagem ao cliente
    const mensagemCliente = `Muito obrigado por aguardar! Verifico que sua *primeira fatura* após a mudança de data será no valor de R$ ${valorProporcional.toFixed(2)} devido ao *valor proporcional de ${totalDias} dias* de uso, tudo bem?`;

    // Exibir a mensagem ao cliente
    document.getElementById('mensagemCliente').value = mensagemCliente;

    // Gerar um exemplo de protocolo (isso pode ser ajustado conforme necessário)
    const protocolo = `PROTOCOLO-${Math.floor(Math.random() * 1000000)}`;

    // Exibir o protocolo
    document.getElementById('protocolo').value = protocolo;
}
