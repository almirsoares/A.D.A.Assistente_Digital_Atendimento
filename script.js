function calcularProporcional() {
    // Exemplo de cálculo de valor proporcional
    const valorPlano = document.getElementById('valorPlano').value;
    const dataAntiga = new Date(document.getElementById('dataAntiga').value);
    const dataNova = new Date(document.getElementById('dataNova').value);
    
    const umDia = 24 * 60 * 60 * 1000;
    const diferencaDias = Math.round((dataNova - dataAntiga) / umDia) + 30;

    // Cálculo proporcional (exemplo)
    const valorProporcional = (valorPlano / 30) * diferencaDias;

    // Mensagem programada
    const mensagemCliente = `Muito obrigado por aguardar! Verifico que sua *primeira fatura* após a mudança de data será no valor de R$ ${valorProporcional.toFixed(2)} devido ao *valor proporcional de ${diferencaDias} dias* de uso, tudo bem?`;

    // Atualizar a caixa de texto com a mensagem ao cliente
    document.getElementById('mensagemCliente').value = mensagemCliente;

    // Exemplo de protocolo (pode ser modificado conforme necessário)
    const protocolo = `PROTOCOLO-${Math.floor(Math.random() * 1000000)}`;

    // Atualizar a caixa de texto com o protocolo
    document.getElementById('protocolo').value = protocolo;
}
