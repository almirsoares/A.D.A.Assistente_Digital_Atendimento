// Função que calcula os valores proporcionais de desativação e inputa as faturas anteriores como prevenção

function calcularDesativacao() {
    // Obtenção de valores dos campos de entrada   new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const mesesFaturas = parseInt(document.getElementById('mesesFaturas').value);
    const dataVencimento = new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const dataUltimoAcesso = new Date(document.getElementById('dataUltimoAcesso').value + 'T00:00:00');
    const valorMultaDigitado = parseFloat(document.getElementById('valorMulta').value);
    const multaEquipamento = parseFloat(document.getElementById('multaEquipamento').value);
    const meses = parseInt(document.getElementById('meses').value);

    if (isNaN(valorPlano) || isNaN(mesesFaturas) || isNaN(dataVencimento.getTime()) || isNaN(dataUltimoAcesso.getTime()) || isNaN(valorMultaDigitado) || isNaN(meses)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Seta a data para o calculo ser referente ao dia do vencimento anterior para calcular o proporcional decorrendo daquele dia
    const dataParaCalculo = new Date(dataVencimento);
    dataParaCalculo.setMonth(dataParaCalculo.getMonth() - 1);
    dataParaCalculo.setDate(dataParaCalculo.getDate() - 1);

    // Chama a função calcularProporcional para obter os cálculos
    const resultado = calcularProporcional(valorPlano, dataParaCalculo, dataUltimoAcesso, '360dias');


    
    // Cálculo dos valores das faturas anteriores e proporcional considerando os meses de faturas
    const datasFaturas = [];
    for (let i = mesesFaturas; i > 0; i--) {
        const dataFatura = new Date(dataVencimento);
        if(dataFatura.getDate() == 30 && dataFatura.getMonth() - i == 1) {
            dataFatura.setDate(28);
            dataFatura.setMonth(dataFatura.getMonth() - i);
            const dataFaturaFormatada = `${(dataFatura.getDate()).toString().padStart(2, '0')}/${(dataFatura.getMonth() + 1).toString().padStart(2, '0')}/${dataFatura.getFullYear()}`;
            datasFaturas.push(dataFaturaFormatada);
            dataFatura.setDate(30);
        } else{
            dataFatura.setMonth(dataFatura.getMonth() - i);
            const dataFaturaFormatada = `${(dataFatura.getDate()).toString().padStart(2, '0')}/${(dataFatura.getMonth() + 1).toString().padStart(2, '0')}/${dataFatura.getFullYear()}`;
            datasFaturas.push(dataFaturaFormatada);
        }
    }

    // Formatação das datas para exibição
    let faturasTexto = '';
    datasFaturas.forEach((data, index) => {
        faturasTexto += `${data} - R$ ${valorPlano.toFixed(2)}\n`;
    });
    
    const dataProporcionalFormatada = `${(dataVencimento.getDate()).toString().padStart(2, '0')}/${(dataVencimento.getMonth() + 1).toString().padStart(2, '0')}/${dataVencimento.getFullYear()}`;

    const valorProporcionalMes = resultado.valorTotal.toFixed(2);
    const valorFatura = valorPlano.toFixed(2);

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
    const usoTexto = `PARCELA ${(dataVencimento.getMonth()+1).toString().padStart(2, '0')}/${dataVencimento.getFullYear()} - REF ${resultado.totalDias} DIAS DE USO`;
    document.getElementById('usoTotal').value = usoTexto;

    
    // Mensagem de protocolo
    let protocoloTexto = `CONTRATO DESATIVADO\n` +
        `Ajustado Faturas Referente aos dias utilizados :\n\n` +
        `${faturasTexto}`+
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


// Adiciona o evento de clique dos resultados para copiar o texto do textarea para a área de transferência
document.getElementById('protocolo').addEventListener('click', function() {
    this.select();  // Seleciona todo o conteúdo do textarea
    document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
    alert('Protocolo copiado!');  // Exibe um alerta (opcional)
  });

document.getElementById('usoTotal').addEventListener('click', function() {
    this.select();  // Seleciona todo o conteúdo do textarea
    document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
    alert('Uso Total copiado!');  // Exibe um alerta (opcional)
  });

function startTutorial() {
    const intro = introJs();
    intro.setOptions({
        steps: [
            {
                intro: "Bem-vindo ao tutorial de assistência de desativação! Todos os campos são obrigatórios para o cálculo correto."
            },
            {
                element: '#valorPlano',
                intro: "Aqui você insere o valor do plano."
            },
            {
                element: '#mesesFaturas',
                intro: "Insira o número de meses de faturas em aberto desconsiderando a fatura proporcional a ser calculada."
            },
            {
                element: '#dataVencimento',
                intro: "Selecione a data de vencimento da fatura proporcional. O sistema retorna automaticamante até o vencimento anterior para calcular os dias proporcionais de uso."
            },
            {
                element: '#dataUltimoAcesso',
                intro: "Selecione a data do último acesso do cliente. Geralmente é a data que o cliente recebeu bloqueio total"
            },
            {
                element: '#valorMulta',
                intro: "Insira o valor da multa total de contrato."
            },
            {
                element: '#multaEquipamento',
                intro: "Insira o valor do equipamento em comodato. É necessário inserir o valor mesmo que o equipamento tenha sido devolvido, pois o valor da multa é sempre subtraido pelo equipamento."
            },
            {
                element: '#meses',
                intro: "Insira o número de meses não pagos pelo cliente considerando a ativação do contrato."
            },
            {
                element: '#statusEquipamento',
                intro: "Selecione o status do equipamento. Em caso de extravio irá aparecer a mensagem de multa do equipamento."
            },
            {
                element: '#btnCalcular',
                intro: "Clique no botão 'Calcular' ou pressione Enter para calcular os valores."
            },
            {
                element: '#usoTotal',
                intro: "Este campo mostra o total de dias utilizados. Clique para copiar."
            },
            {
                element: '#protocolo',
                intro: "Este campo mostra o protocolo de desativação. Clique para copiar."
            },
            {
                intro: "Caso permaneça alguma duvida entre em contato ou preencha o formulario de feedback"
            }
        ],
        showProgress: true,
        showBullets: true,
        exitOnOverlayClick: false,
        nextLabel: 'Próximo',
        prevLabel: 'Anterior',
        skipLabel: 'Fechar',
        doneLabel: 'Concluir'
    });
    intro.start();
}
