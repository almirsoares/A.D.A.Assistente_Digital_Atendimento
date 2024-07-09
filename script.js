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
     "BELO JARDIM": {
        nomeBase: "DX2",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "u31"
    },
    "BARRA DE GUABIRABA": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "BARRA DE SÃO MIGUEL": {
        nomeBase: "ALEL",
        nomeVerdadeiro: "Não importa",
        ddd: "82",
        plataforma: "depende do serial"
    },
    "BEZERROS": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "unm"
    },
    "BOM CONSELHO": {
        nomeBase: "BOM CONSELHO",
        nomeVerdadeiro: "Não importa",
        ddd: "87",
        plataforma: "u31"
    },
    "BONANÇA": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "VITORIA OU MORENO",
        ddd: "81",
        plataforma: "nce"
    },
    "CABO DE SANTO AGOSTINHO": {
        nomeBase: "PROTEGE",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "nce"
    },
    "CAPOEIRAS": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Não importa",
        ddd: "87",
        plataforma: "nce"
    },
    "CAETÉS": {
        nomeBase: "H&A",
        nomeVerdadeiro: "Não importa",
        ddd: "87",
        plataforma: "nce"
    },
    "CAMELA": {
        nomeBase: "LITORAL",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "u31"
    },
    "CARPINA": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "CHÃ GRANDE": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "unm"
    },
    "COLÔNIA LEOPOLDINA": {
        nomeBase: "PALMARES",
        nomeVerdadeiro: "Não importa",
        ddd: "82",
        plataforma: "nce"
    },
    "CUCAU": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Rio Formoso",
        ddd: "81",
        plataforma: "nce"
    },
    "CUMARU": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "ESCADA": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Primavera ou escada",
        ddd: "81",
        plataforma: "UNM"
    },
    "ENSEADAS": {
        nomeBase: "PROTEGE",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "U31"
    },
    "FREXEIRAS": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Amaraji, frexeiras ou escada",
        ddd: "81",
        plataforma: "nce"
    },
    "GAMELEIRA": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "unm"
    },
    "GAIBU": {
        nomeBase: "PROTEGE",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "u31"
    },
    "GARANHUNS": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "NÃO FILTRE CIDADE",
        ddd: "87",
        plataforma: "nce"
    },
    "IGARASSU": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "IPOJUCA": {
        nomeBase: "LITORAL",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "depende do serial 🤷"
    },
    "JABOATÃO": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "JACUÍPE": {
        nomeBase: "PALMARES",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "U31"
    },
    "JAPARATINGA": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "82",
        plataforma: "nce"
    },
    "JUÇARAL": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "CABO OU VITORIA",
        ddd: "81",
        plataforma: "nce"
    },
      "LAJEDO": {
        nomeBase: "DX2",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "u31"
    },
    "MACEIÓ": {
        nomeBase: "ALEL",
        nomeVerdadeiro: "Não importa",
        ddd: "82",
        plataforma: "depende do serial"
    },
    "MARAGOGI": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "82",
        plataforma: "nce"
    },
    "MARECHAL DEODORO": {
        nomeBase: "ALEL",
        nomeVerdadeiro: "Não importa",
        ddd: "82",
        plataforma: "depende do serial"
    },
    "MASSAUASSU": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Escada",
        ddd: "81",
        plataforma: "nce"
    },
    "MORENO": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "PALMARES": {
        nomeBase: "PALMARES",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "nce"
    },
    "PAULISTA": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "PAULO AFONSO": {
        nomeBase: "H&A",
        nomeVerdadeiro: "Não importa",
        ddd: "87",
        plataforma: "u31"
    },
    "PEROBA": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Maragogi",
        ddd: "82",
        plataforma: "nce"
    },
    "PIXETE": {
        nomeBase: "S&L",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "u31"
    },
    "POMBOS": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "PORTO CALVO": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "PORTO DE GALINHAS": {
        nomeBase: "LITORAL",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "unm"
    },
    "PRIMAVERA": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Primavera ou escada",
        ddd: "81",
        plataforma: "nce"
    },
    "RECIFE": {
        nomeBase: "VOICE",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "nce"
    },
    "RIACHO DAS ALMAS": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "RIBEIRÃO": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "unm"
    },
    "RIO FORMOSO": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "SAIRÉ": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "unm"
    },
    "SANHARÓ": {
        nomeBase: "DX2",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "u31"
    },
    "SANTA CRUZ": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "u31"
    },
    "SÃO BENTO DO UNA": {
        nomeBase: "DX2",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "u31"
    },
    "SÃO DOMINGOS": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Santa Cruz",
        ddd: "81",
        plataforma: "u31"
    },
    "SÃO JOSÉ DA COROA GRANDE": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "82",
        plataforma: "nce"
    },
    "SÃO LOURENÇO DA MATA": {
        nomeBase: "S&L",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "u31"
    },
    "SERRAMBI": {
        nomeBase: "LITORAL",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "unm"
    },
    "SIRINHAÉM": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "SUAPE": {
        nomeBase: "PROTEGE",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "nce"
    },
    "TAMANDARÉ": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "nce"
    },
    "TOQUINHO": {
        nomeBase: "LITORAL",
        nomeVerdadeiro: "Não importa",
        ddd: "81",
        plataforma: "unm"
    },
    "VITÓRIA": {
        nomeBase: "DTEL",
        nomeVerdadeiro: "Nome Informado",
        ddd: "81",
        plataforma: "UNM"
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
          mensagemConfirmacao = "Cliente desistiu da mudança de data de vencimento.";
          mensagemApp = "";
    }
    
    const mensagemProtocolo = `Solicitou troca de vencimento de: ${diaAntigo.toString().padStart(2, '0')}/${mesAntigo.toString().padStart(2, '0')} para ${diaNovo.toString().padStart(2, '0')}/${mesNovo.toString().padStart(2, '0')}
Motivo: Cliente solicitou alteração
Gerou Proporcional? ( X )SIM ( )NÃO
Ciente de proporcional no valor de: R$ ${valorProporcional.toFixed(2)}
${mensagemConfirmacao} ${mensagemApp}
Atendimento finalizado.`;
    // Exibir o protocolo
    document.getElementById('protocolo').value = mensagemProtocolo;
}
