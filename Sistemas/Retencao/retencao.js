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
    
    const clienteRetido = document.getElementById('cliente-retido').value;
    const motivo = document.getElementById('motivo').value.trim();
    const ofertasInputs = document.querySelectorAll('[name="matriz-ofertas[]"]');

    if (motivo === '') {
        alert('Por favor, preencha o campo "motivo".');
        return;
    }
    
    if (clienteRetido == 'sim'){

        if (isNaN(numeroOferta) || observacao === '') {
            alert('Por favor, preencha ps campos de observações necessários.');
            return;
        }
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
  

        let protocoloTexto =`MOTIVO: ${motivo}
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
${ofertas.join('\n')}\n`;
        if(valorProporcional >0 || valorMulta >0){

            let valores= valorProporcional + valorMulta;

            protocoloTexto += `VALORES: R$ ${valores.toFixed(2)} (  ) NÃO
Valor Proporcional: R$ ${valorProporcional.toFixed(2)} - ${resultado.totalDias} dias
Data de Vencimento passada ao cliente: ${dataProporcionalFormatada}\n`;
                
            
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