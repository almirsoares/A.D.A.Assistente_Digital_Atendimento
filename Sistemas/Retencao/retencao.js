//---------------------------------------------------------------------------
// FUNÇÕES PARA RETENÇÃO DE CLIENTES

document.getElementById('cliente-retido').addEventListener('change', function () {
    const fieldsetDesativação = document.getElementById('desativacao');
    const fieldsetObsRetencao = document.getElementById('obsRetencao');
    const textoFatura = document.getElementById('textoFatura');
    if (this.value === 'sim') {
        fieldsetDesativação.style.display = 'none';
        fieldsetObsRetencao.style.display = 'block';
        textoFatura.style.display = 'none'; // Esconde o campo de texto de fatura

    } else {
        fieldsetDesativação.style.display = 'block';
        fieldsetObsRetencao.style.display = 'none';
        textoFatura.style.display = 'block'; // Exibe o campo de texto de fatura
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

function abrirRetirada() {
    const solicitante = document.getElementById('solicitante').value.trim();
    const numProtocolo = document.getElementById('numProtocolo').value.trim();
    const parentesco = document.getElementById('parentesco').value.trim();

    let textoRetirada = `RETIRADA DE ONU - EQUIPAMENTOS E MATERIAIS
SOLICITANTE: ${solicitante} / ${parentesco}
PROTOCOLO: ${numProtocolo}
RETIRADA POR MOTIVO DE CANCELAMENTO (  x  )
RETIRADA POR MOTIVO DE INADIMPLÊNCIA  (      )
RETIRADA POR MOTIVO DE BLOQUEIO TEMPORÁRIO (     )
CTO/PORTA:
PORTA:
RETIRADO: (   ) ONU  /  (   ) EQUIPAMENTOS
ONU EXTRAVIADO: (  ) SIM (  ) NÃO
OBSERVAÇÕES: (Preenchimento do técnico )
Ponto de Referência:
OBSERVAÇÕES> 

CLIENTE CIENTE DAS SEGUINTES INFORMAÇÕES:
*É NECESSÁRIO  MAIOR DE 18 ANOS NA RESIDÊNCIA, COM O DOCUMENTO RG EM MÃOS PARA ACOMPANHAR A VISITA DOS TÉCNICOS NO MOMENTO DE ENTREGA DE EQUIPAMENTOS.
*CLIENTE CIENTE DA RETIRADA DE EQUIPAMENTO.  PRAZO INFORMADO DE: 3 DIAS ÚTEIS.
*CASO CLIENTE DESEJAR PODERÁ ENTREGAR O EQUIPAMENTO NA LOJA MAIS PRÓXIMA EM SUA CIDADE`;

    // Copia o texto para a área de transferência sem preencher o textarea 'protocolo'
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textoRetirada)
            .then(() => alert('Texto de retirada copiado!'))
            .catch(() => alert('Falha ao copiar o texto.'));
    } else {
        // Fallback para navegadores antigos
        const tempInput = document.createElement('textarea');
        tempInput.value = textoRetirada;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Texto de retirada copiado!');
    }
}

// Função que calcula os valores proporcionais de retenção e inputa as faturas anteriores como prevenção
function protocoloRetencao() {

    // Obtenção de valores dos campos de entrada   new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const dataVencimento = new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const dataCancelamento = new Date(document.getElementById('dataCancelamento').value + 'T00:00:00');
    const valorMultaDigitado = parseFloat(document.getElementById('valorMulta').value);
    const multaEquipamento = parseFloat(document.getElementById('multaEquipamento').value);
    const meses = parseInt(document.getElementById('meses').value);
    const numeroOferta = parseInt(document.getElementById('oferta').value);
    const observacao = document.getElementById('obs').value.trim();
    const verificaValor = document.getElementById('verificaValor').value;
    const valorOuDesconto = parseFloat(document.getElementById('valorOuDesconto').value);
    const verificaPrazo = document.getElementById('verificaPrazo').value.trim();
    const infoPrazo = document.getElementById('infoPrazo').value.trim();
    const gerarProporcional = document.getElementById('gerarProporcional').value;
    
    const clienteRetido = document.getElementById('cliente-retido').value;
    const motivo = document.getElementById('motivo').value.trim();
    const ofertasInputs = document.querySelectorAll('[name="matriz-ofertas[]"]');

    const solicitante = document.getElementById('solicitante').value.trim();
    const numProtocolo = document.getElementById('numProtocolo').value.trim();
    const parentesco = document.getElementById('parentesco').value.trim();

    let cabacalhoProtocolo = `RETENÇÃO N2
PROTOCOLO: ${numProtocolo}
GRAU DE PARENTESCO / CARGO FUNÇÃO: ${parentesco}
SOLICITANTE: ${solicitante}
TELEFONE: 
`;

    if (motivo === '') {
        alert('Por favor, preencha o campo "motivo".');
        return;
    }
    
    if (clienteRetido == 'sim'){

        if (verificaValor === "sim" && isNaN(valorOuDesconto)) {
            alert('Por favor, preencha o campo de valor ou desconto.');
            return;
        }

        if (verificaPrazo === "sim" && infoPrazo === '') {
            alert('Por favor, preencha o campo de informações sobre o prazo.');
            return;
        }
        
        const ofertas = Array.from(ofertasInputs)
            .map((input, index) => `                ${index + 1} - ${input.value.trim()}`)
            .filter(texto => texto.length > 4); 

        // Se nenhuma oferta for considerada válida
        if (ofertas.length === 0) {
            alert('Por favor, preencha ao menos um campo da Matriz de Ofertas.');
            return;
        }
  
        let protocoloTexto = cabacalhoProtocolo;
        protocoloTexto += `MOTIVO: ${motivo}
OFERTAS PASSADAS:   (Mínimo 2 ofertas)
${ofertas.join('\n')}
CANCELADO: (X )NÃO\n`;

        protocoloTexto += `QUAL OFERTA ACEITA: `;	
        
        for (let i = 1; i <= ofertas.length; i++) {
            if (i === numeroOferta) {
                protocoloTexto += `${i}(X) `;
            }else{
                protocoloTexto += `${i}(  ) `;
            }
        }

        protocoloTexto += `\nOBSERVAÇÕES> ${observacao}
FOI INFORMADO ALGUM VALOR OU DESCONTO? `;
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
        let valorProporcional = 0;
        let diasProporcionais = '';
        let textoProporcional = '';

        // Formatação das datas
        const dataProporcionalFormatada = `${(dataVencimento.getDate()).toString().padStart(2, '0')}/${(dataVencimento.getMonth() + 1).toString().padStart(2, '0')}/${dataVencimento.getFullYear()}`;


        if (gerarProporcional === "nao") {
            console.log('Valor proporcional não gerado.');
            const proporcionalInsento = 0;
            valorProporcional = proporcionalInsento;
            diasProporcionais = '0 dias - faturas já pagas';
            textoProporcional = `Valor Proporcional: R$ ${valorProporcional.toFixed(2)} - ${diasProporcionais}\n`;

        } else if (gerarProporcional === "sim") {
            // Seta a data para o calculo ser referente ao dia do vencimento anterior para calcular o proporcional decorrendo daquele dia
            const dataParaCalculo = new Date(dataVencimento);
            dataParaCalculo.setMonth(dataParaCalculo.getMonth() - 1);
            dataParaCalculo.setDate(dataParaCalculo.getDate() - 1);

            // Chama a função calcularProporcional para obter os cálculos
            const resultado = calcularProporcional(valorPlano, dataParaCalculo, dataCancelamento, '360dias');
            valorProporcional = resultado.valorTotal;
            diasProporcionais = `${resultado.totalDias} dias`;
            textoProporcional = `Valor Proporcional: R$ ${valorProporcional.toFixed(2)} - ${diasProporcionais}
Data de Vencimento passada ao cliente: ${dataProporcionalFormatada}\n`;
        }



        // Cálculo da multa
        let textoMulta;
        let valorMulta = 0;
        if (meses === 0) {
            textoMulta = "MULTA:   (   )  APLICÁVEL    (  X ) NÃO APLICÁVEL - sem fidelidade ativa";

        } else {
            valorMulta = ((valorMultaDigitado - multaEquipamento) * meses) / 12;
            textoMulta = `MULTA: R$ ${valorMulta.toFixed(2)}  (  x )  APLICÁVEL    (   ) NÃO APLICÁVEL
Data de Vencimento passada ao cliente: ${dataProporcionalFormatada}`;
        }


        const motivo = document.getElementById('motivo').value.trim();

        const ofertasInputs = document.querySelectorAll('.matriz-ofertas');
        const ofertas = Array.from(ofertasInputs)
            .map((input, index) => `                ${index + 1} - ${input.value.trim()}`)
            .filter(texto => texto.length > 4); // evita linhas vazias como "1 - "
        
        let valoresTexto = '';
        let protocoloTexto = cabacalhoProtocolo;
        protocoloTexto += `CANCELADO: (X )SIM
MOTIVO: ${motivo}
OFERTAS PASSADAS:   (Mínimo 2 ofertas)
${ofertas.join('\n')}\n`;
        if(valorProporcional >0 || valorMulta >0){

            let valores= valorProporcional + valorMulta;

            protocoloTexto += `VALORES: R$ ${valores.toFixed(2)} (  ) NÃO\n`
            protocoloTexto += `${textoProporcional}\n`;

            if (valorProporcional > 0) {
                valoresTexto = `Seguindo com o cancelamento nesse momento é gerado proporcional de uso no valor de R$ ${valorProporcional.toFixed(2)}
esse valor é referente a distribuição de conexão do dia ${dataVencimento.getDate().toString().padStart(2, '0')}/${(dataVencimento.getMonth()).toString().padStart(2, '0')}/${dataVencimento.getFullYear()} até o dia ${dataCancelamento.getDate().toString().padStart(2, '0')}/${(dataCancelamento.getMonth() + 1).toString().padStart(2, '0')}/${dataCancelamento.getFullYear()}`;
            }
            if (valorMulta > 0) {
                valoresTexto += `\nA multa de contrato é de R$ ${valorMulta.toFixed(2)} e será cobrada no dia ${dataVencimento.getDate().toString().padStart(2,'0')}/${(dataVencimento.getMonth()+1).toString().padStart(2,'0')}.`;
            }

            
        } else{
            valoresTexto = `Seguindo com o cancelamento nesse momento não é gerado proporcional de uso, visto que o cliente já pagou todas as faturas.`;
            protocoloTexto += `VALORES (X ) NÃO
Valor Proporcional: R$ 0,00 - 0 dias\n`;
        }

        protocoloTexto +=`${textoMulta}\n`;
        protocoloTexto += `- CLIENTE CIENTE QUE É NECESSÁRIO TER ALGUÉM  MAIOR DE 18 ANOS NA RESIDÊNCIA, COM O DOCUMENTO RG EM MÃOS PARA ACOMPANHAR A VISITA DOS TÉCNICOS
- CIENTE DA ABERTURA DE O.S. PARA RETIRADA DE EQUIPAMENTO. PRAZO INFORMADO DE: 3 DIAS ÚTEIS.`;
        document.getElementById('protocolo').value = protocoloTexto;
        document.getElementById('textoFatura').value = valoresTexto;
    }
}

// função para limpar dados da tela e remover os campos de ofertas passadas
function limpar() {
    document.getElementById('valorPlano').value = '';
    document.getElementById('dataVencimento').value = '';
    document.getElementById('dataCancelamento').value = '';
    document.getElementById('valorMulta').value = '';
    document.getElementById('multaEquipamento').value = '';
    document.getElementById('meses').value = '';    
    document.getElementById('oferta').value = '';
    document.getElementById('obs').value = '';
    document.getElementById('valorOuDesconto').value = '';
    document.getElementById('infoPrazo').value = '';
    document.getElementById('gerarProporcional').value = 'nao';
    document.getElementById('verificaValor').value = 'nao';
    document.getElementById('verificaPrazo').value = 'nao';
    document.getElementById('protocolo').value = '';
    document.getElementById('motivo').value = '';
    document.getElementById('cliente-retido').value = 'sim';
    document.getElementById('desativacao').style.display = 'none';
    document.getElementById('obsRetencao').style.display = 'block';
    document.getElementById('matriz-container').innerHTML = ''; // Limpa os campos de ofertas passadas
    ofertaCount = 1; // Reseta o contador de ofertas
    const container = document.getElementById('matriz-container');
    const novoInput = document.createElement('input');
    novoInput.type = 'text';
    novoInput.name = 'matriz-ofertas[]';
    novoInput.placeholder = `${ofertaCount} - `;
    novoInput.className = 'matriz-ofertas';
    container.appendChild(novoInput);
    console.log('Dados limpos e campos de ofertas removidos.');
}

function tutorial() {
    const intro = introJs();
    const introSequence = introJs();
    intro.setOptions({
        steps: [
            {
                intro: "Bem-vindo ao tutorial! Vamos guiá-lo pelos principais elementos da página."
            },
            {
                element: '#motivo',
                intro: "Aqui você o motivo pelo qual o cliente deseja cancelar o plano.",
            },
            {
                element: '#matriz-container',
                intro: "Insira as ofertas passadas aqui.",
            },
            {
                element: '#btnAdd',
                intro: "Clique aqui para adicionar mais campos de ofertas passadas.",
            },
            {
                element: '#oferta',
                intro: "Informe o número da oferta aceita pelo cliente.",
            },
            {
                element: '#obs',
                intro: "Adicione observações relevantes sobre a retenção ou cancelamento.",
            },
            {
                element: '#verificaValor',
                intro: "Selecione se foi informado algum valor ou desconto ao cliente.",
            },
            {
                element: '#valorOuDesconto',
                intro: "Digite o valor ou desconto informado ao cliente, caso aplicável.",
            },
            {
                element: '#verificaPrazo',
                intro: "Selecione se foi informado algum prazo ao cliente.",
            },
            {
                element: '#infoPrazo',
                intro: "Digite o prazo informado ao cliente, caso aplicável.",
            },
            {
                element: '#cliente-retido',
                intro: "Selecione se o cliente foi retido ou não. Caso tenha sido, o sistema irá gerar um protocolo de retenção com base nas observaçoes abaixo",
            },
            {
                element: '#cliente-retido',
                intro: "caso o cliente não tenha sido retido, o sistema irá gerar um protocolo com base na desativação do seu cadastro.",
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

    introSequence.setOptions({
        steps: [
            {
                element: '#valorPlano',
                intro: "Aqui você insere o valor do plano."
            },
            {
                element: '#dataVencimento',
                intro: "Selecione a data de vencimento da fatura proporcional. O sistema retorna automaticamante até o vencimento anterior para calcular os dias proporcionais de uso."
            },
            {
                element: '#dataCancelamento',
                intro: "Selecione a data do cancelamento do cliente"
            },
            {
                element: '#valorMulta',
                intro: "Insira o valor da multa total de contrato."
            },
            {
                element: '#multaEquipamento',
                intro: "Insira o valor do equipamento em comodato. É necessário inserir o valor mesmo abridno retirada para fins de calculo"
            },
            {
                element: '#meses',
                intro: "Insira o número de meses não pagos pelo cliente considerando a ativação do contrato."
            },
            {
                element: '#btnGerarProtocolo',
                intro: "Clique no botão 'Gerar protocolo' ou pressione Enter para gerar o protocolo correspondente."
            },
            {
                element: '#protocolo',
                intro: "Este campo mostra o protocolo de retenção. Clique para copiar."
            },
            {
                intro: "Caso permaneça com alguma dúvida entre em contato ou preencha o formulário de feedback."
            }
        ],
        howProgress: true,
        showBullets: true,
        exitOnOverlayClick: false,
        nextLabel: 'Próximo',
        prevLabel: 'Anterior',
        skipLabel: 'Pular',
        doneLabel: 'Concluir'
    });

    intro.oncomplete(function () {
        alterarClienteRetido('não');
    });

    intro.onexit(function () {
        alterarClienteRetido('não');
        console.log('Tutorial encerrado sem conclusão. Nenhuma alteração feita.');
        introSequence.start();
    });

    intro.start();
}

function alterarClienteRetido(valor) {
    console.log('Função alterarClienteRetido chamada com valor:', valor);
    const selectClienteRetido = document.getElementById('cliente-retido');
    if (valor === 'sim' || valor === 'não') {
        console.log('Valor válido recebido. Atualizando select...');
        selectClienteRetido.value = valor;
        console.log('Valor do select atualizado para:', selectClienteRetido.value);
    } else {
        console.log('Valor inválido recebido:', valor);
        alert('Valor inválido! Use "sim" ou "não".');
        return; // Sai da função se o valor for inválido
    }

    // Atualiza a exibição dos fieldsets com base no valor do select
    const fieldsetDesativacao = document.getElementById('desativacao');
    const fieldsetObsRetencao = document.getElementById('obsRetencao');
    const textoFatura = document.getElementById('textoFatura');

    if (valor === 'sim') {
        fieldsetDesativacao.style.display = 'none';
        fieldsetObsRetencao.style.display = 'block';
        textoFatura.style.display = 'none'; // Esconde o campo de texto de fatura
    } else {
        fieldsetDesativacao.style.display = 'block';
        fieldsetObsRetencao.style.display = 'none';
        textoFatura.style.display = 'block'; // Exibe o campo de texto de fatura
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 🔥 impede o comportamento padrão (submit)
      protocoloRetencao();
    }
  });


// Adiciona o evento de clique dos resultados para copiar o texto do textarea para a área de transferência
document.getElementById('protocolo').addEventListener('click', function() {
    this.select();  // Seleciona todo o conteúdo do textarea
    document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
    alert('Protocolo copiado!');  // Exibe um alerta (opcional)
  });

