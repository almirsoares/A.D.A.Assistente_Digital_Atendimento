function calcularProporcional() {
    // Obtém os valores do formulário
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const dataAntiga = new Date(document.getElementById('dataAntiga').value);
    const dataNova = new Date(document.getElementById('dataNova').value);

    // Extração dos dias e meses das datas
    const diaAntigo = dataAntiga.getDate();
    const mesAntigo = dataAntiga.getMonth() + 1; // getMonth() retorna 0-11, então adicionamos 1
    const diaNovo = dataNova.getDate();
    const mesNovo = dataNova.getMonth() + 1; // getMonth() retorna 0-11, então adicionamos 1

    // Aplicação da fórmula
    let totalDias;
    if (diaNovo > diaAntigo) {
        totalDias = (diaNovo - diaAntigo) + (mesNovo - mesAntigo) * 30;
    } else {
        totalDias = (diaNovo - diaAntigo) + (mesNovo - mesAntigo) * 30;
    }

    totalDias = totalDias+30;
    // Calcula o valor proporcional
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
