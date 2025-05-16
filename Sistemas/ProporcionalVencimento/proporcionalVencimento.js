// Função auxiliar que chama calcularProporcional e cuida das atribuições adicionais
function calcularProporcionalVencimento() {

    // Obtém os valores do formulário
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const dataAntiga = new Date(document.getElementById('dataAntiga').value + 'T00:00:00');
    const dataNova = new Date(document.getElementById('dataNova').value + 'T00:00:00');
    const descontoPlano = parseFloat(document.getElementById('descontoPlano').value);

    // Seta a data para o calculo ser referente ao dia do vencimento anterior para calcular o proporcional decorrendo daquele dia
    const dataParaCalculo = new Date(dataAntiga);
    dataParaCalculo.setMonth(dataParaCalculo.getMonth() - 1);
    let desconto =0;
    let valorFinal = 0;

    // Chama a função principal para obter os cálculos
    const resultado = calcularProporcional(valorPlano, dataParaCalculo, dataNova, '360dias');
    if (descontoPlano > 0) {
        if (resultado.totalDias >= 30) {
            desconto = descontoPlano;
        } else {
            desconto = calcularProporcional(descontoPlano, dataParaCalculo, dataNova, '360dias').valorTotal.toFixed(2);
        }
        valorFinal = resultado.valorTotal - desconto;
    } else {
        valorFinal = resultado.valorTotal;
    }



    let valorProporcional;
    let proporcionalDias;
    let mensagemProporcional;
    let protocoloDesconto;

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
    let mensagemCliente = `Muito obrigado por aguardar! Verifico que sua *primeira fatura* após a mudança de data será no valor de R$ ${resultado.valorTotal.toFixed(2)} devido ao *total de ${resultado.totalDias} dias* de uso, ${mensagemProporcional} tudo bem?`;
    if (descontoPlano > 0) {
        mensagemCliente += `\npagando até a data de vencimento, você terá um desconto de R$ ${desconto}. e pagará apenas R$ ${valorFinal.toFixed(2)}.`;
        protocoloDesconto = ` (DESCONTO DE R$ ${desconto} E VALOR FINAL DE R$ ${valorFinal.toFixed(2)})`;
    }
    document.getElementById('mensagemCliente').value = mensagemCliente;

    // Gerar a mensagem de protocolo
    const desejaMudanca = document.getElementById('desejaMudanca').checked ? "SIM" : "NÃO";
    const utilizaApp = document.getElementById('utilizaApp').checked ? "SIM" : "NÃO";
    let mensagemConfirmacao;
    let mensagemApp;

    if (desejaMudanca === "SIM") {
        mensagemConfirmacao = "Faturas Atualizadas\n";
        mensagemApp = utilizaApp === "SIM" ? "Cliente confirmou mudança em app" : ">>> ADICIONAR PROTOCOLO DE CARNE <<<";
    } else {
        mensagemConfirmacao = "Cliente desistiu da mudança de data de vencimento.";
        mensagemApp = "";
    }

    // Corrige o mês adicionando +1, pois getMonth() retorna de 0 a 11
    const mensagemProtocolo = `Solicitou troca de vencimento de: ${dataAntiga.getDate().toString().padStart(2, '0')}/${(dataAntiga.getMonth() + 1).toString().padStart(2, '0')} para ${dataNova.getDate().toString().padStart(2, '0')}/${(dataNova.getMonth() + 1).toString().padStart(2, '0')}
Motivo: Cliente solicitou alteração
Gerou Proporcional? ( X )SIM ( )NÃO
Ciente de proporcional no valor de: R$ ${valorProporcional.toFixed(2)} ${protocoloDesconto}
${mensagemConfirmacao} ${mensagemApp}
Atendimento finalizado.`;

    // Exibir o protocolo
    document.getElementById('protocolo').value = mensagemProtocolo;
}


// Adiciona o evento onde clicar no botão enter no campo de texto chama a função calcularProporcionalVencimento
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 🔥 impede o comportamento padrão (submit)
      calcularProporcionalVencimento();
    }
  });


// Adiciona o evento de clique output protocolo para copiar o texto do textarea para a área de transferência
document.getElementById('protocolo').addEventListener('click', function() {
    this.select();  // Seleciona todo o conteúdo do textarea
    document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
    alert('Protocolo copiado!');  // Exibe um alerta (opcional)
  });


// Adiciona o evento de clique output mensagem cliente para copiar o texto do textarea para a área de transferência
document.getElementById('mensagemCliente').addEventListener('click', function() {
    this.select();  // Seleciona todo o conteúdo do textarea
    document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
    alert('Texto copiado!');  // Exibe um alerta (opcional)
  });