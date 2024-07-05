// Lista de cidades e suas informações
const cidades = {
     "ABREU E LIMA": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "AMARAJI": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Primavera ou escada",
        ddd: "81",
        plataforma: "nce"
    },
    "AMEIXAS": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
        "APOTI": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    // Adicione mais cidades conforme necessário
};

// Popula o menu suspenso com as cidades
window.onload = function() {
    const cidadeSelect = document.getElementById('cidade');
    for (let cidade in cidades) {
        const option = document.createElement('option');
        option.value = cidade;
        option.textContent = cidade;
        cidadeSelect.appendChild(option);
    }
};
// Função para localizar a base e exibir as informações
function localizarBase() {
    const cidadeSelecionada = document.getElementById('cidade').value;
    const info = cidades[cidadeSelecionada];
    if (info) {
        document.getElementById('nomeBase').textContent = `Nome da Base: ${info.nomeBase}`;
        document.getElementById('nomeVerdadeiro').textContent = `Nome Verdadeiro: ${info.nomeVerdadeiro}`;
        document.getElementById('ddd').textContent = `DDD: ${info.ddd}`;
        document.getElementById('plataforma').textContent = `Plataforma: ${info.plataforma}`;
    } else {
        document.getElementById('nomeBase').textContent = '';
        document.getElementById('nomeVerdadeiro').textContent = '';
        document.getElementById('ddd').textContent = '';
        document.getElementById('plataforma').textContent = '';
    }
}
function calcularProporcional() {
    // Obtém os valores do formulário
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const dataAntiga = new Date(document.getElementById('dataAntiga').value);
    const dataNova = new Date(document.getElementById('dataNova').value);
    // Extração dos dias e meses das datas
    const diaAntigo = dataAntiga.getDate()+1;
    const mesAntigo = dataAntiga.getMonth() + 1; // getMonth() retorna 0-11, então adicionamos 1
    const diaNovo = dataNova.getDate()+1;
    const mesNovo = dataNova.getMonth() + 1; // getMonth() retorna 0-11, então adicionamos 1
    // Aplicação da fórmula
    let totalDias;
    if (diaNovo > diaAntigo) {
        totalDias = (diaNovo - diaAntigo) + (mesNovo - mesAntigo) * 30;
    } else {
        totalDias = (diaNovo - diaAntigo) + (mesNovo - mesAntigo) * 30;
    }
    // Calcula o valor proporcional
    totalDias = 30 + totalDias;
    const valorProporcional = (valorPlano / 30) * totalDias;
    // Mensagem ao cliente
    const mensagemCliente = `Muito obrigado por aguardar! Verifico que sua *primeira fatura* após a mudança de data será no valor de R$ ${valorProporcional.toFixed(2)} devido ao *valor proporcional de ${totalDias} dias* de uso, tudo bem?`;
    // Exibir a mensagem ao cliente
    document.getElementById('mensagemCliente').value = mensagemCliente;
    // Gerar a mensagem de protocolo
    const desejaMudanca = document.getElementById('desejaMudanca').checked ? "SIM" : "NÃO";
    const utilizaApp = document.getElementById('utilizaApp').checked ? "SIM" : "NÃO";
    const protocolo = `PROTOCOLO-${Math.floor(Math.random() * 1000000)}`;
    let mensagemConfirmacao;
    let mensagemApp;
    if (desejaMudanca === "SIM") {
        mensagemConfirmacao = "Faturas Atualizadas";
        if (utilizaApp === "SIM") {
            mensagemApp = "Cliente confirmou mudança em app";
        } else {
            mensagemApp = ">>> ADICIONAR PROTOCOLO DE CARNE <<<";
        }
    } else {
        mensagemConfirmacao = "";
    }
    
    
    const mensagemProtocolo = `Solicitou troca de vencimento de: ${diaAntigo.toString().padStart(2, '0')}/${mesAntigo.toString().padStart(2, '0')} para ${diaNovo.toString().padStart(2, '0')}/${mesNovo.toString().padStart(2, '0')}
Motivo: Cliente solicitou alteração
Gerou Proporcional? ( X )SIM ( )NÃO
Ciente de proporcional no valor de: R$ ${valorProporcional.toFixed(2)}
${mensagemConfirmacao}
${mensagemApp}
Atendimento finalizado.`;
    // Exibir o protocolo
    document.getElementById('protocolo').value = mensagemProtocolo;
}
