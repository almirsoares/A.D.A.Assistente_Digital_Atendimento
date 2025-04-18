// Função auxiliar que chama calcularProporcional e cuida das atribuições adicionais
function calcularProporcionalVencimento() {

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


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 🔥 impede o comportamento padrão (submit)
      calcularProporcionalVencimento();
    }
  });