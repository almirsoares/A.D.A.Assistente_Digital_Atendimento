let dadosCidades = [];

async function carregarCidadesDoCSV() {
    const response = await fetch('DESATIVAÇÃO E NEGATIVAÇÃO - BKO - CEPs.csv');
    const data = await response.text();
    const linhas = data.split('\n').filter(l => l.trim() !== '');
    const cabecalhos = linhas[0].split(',');

    const idxCidade = cabecalhos.findIndex(h => h.trim().toLowerCase().includes('cidade'));
    const idxCep = cabecalhos.findIndex(h => h.trim().toLowerCase() === 'cep');

    if (idxCidade === -1 || idxCep === -1) {
        console.error('Colunas de cidade ou CEP não encontradas.');
        return;
    }

    const cidadesSet = new Set();
    dadosCidades = linhas.slice(1).map(linha => {
        const colunas = linha.split(',');
        const cidade = colunas[idxCidade]?.trim();
        const cep = colunas[idxCep]?.trim();
        if (cidade && cep) cidadesSet.add(cidade);
        return { cidade, cep };
    });

    const cidadeSelect = document.getElementById('cidade');
    cidadesSet.forEach(cidade => {
        const option = document.createElement('option');
        option.value = cidade;
        option.textContent = cidade;
        cidadeSelect.appendChild(option);
    });

    cidadeSelect.addEventListener('change', preencherCep);
        
}

let qtdLetrasDigAgora = 0;
let qtdLetrasDigAntes = 0;
let qtdDiferencaLetras = 0;

const campoMedio = document.getElementById("texto");
campoMedio.addEventListener("input", function () {
    qtdLetrasDigAntes = qtdLetrasDigAgora;
    qtdLetrasDigAgora = campoMedio.value.length;
    qtdDiferencaLetras = qtdLetrasDigAgora - qtdLetrasDigAntes;

    if (qtdDiferencaLetras > 100) {
        campoMedio.value += '\n\n';
    }
});

carregarCidadesDoCSV();


function preencherCep() {
    const cidadeSelecionada = document.getElementById('cidade').value;
    const entrada = dadosCidades.find(entry => entry.cidade === cidadeSelecionada);
    document.getElementById('cep').value = entrada ? entrada.cep : '';

    let cep = document.getElementById("cep").value;
    console.log('o cep eh: ' + cep);

    if (cep ==="00000000"){
        console.log('cep vazio');
        document.getElementById("pesquisacep").style.display = "block";
    } else{
        console.log('cep preenchido');
        document.getElementById("pesquisacep").style.display = "none";
    }
}

function copiarCEP() {
    const cep = document.getElementById("cep").value;
    if (cep) {
      navigator.clipboard.writeText(cep).then(() => {});
    } else {
      alert("Por favor, insira um CEP antes de copiar.");
    }
  }
  
function copiarTextoAlef() {
    let textoAlef = "MULTA DE EQUIPAMENTO GERADA, POIS A O.S. DE RETIRADA AINDA NÃO FOI FINALIZADA, CASO A CLIENTE DEVOLVA  O EQUIPAMENTO DESCONSIDERAR/DESATIVAR A MULTA E INFORMAR AO BACKOFFICE ";
    textoAlef += "\nAUTORIZAÇÃO DIRETORIA ADMINISTRATIVA - ALEF";
    navigator.clipboard.writeText(textoAlef).then(() => {});
}

function alertaNegativacao() {
    const selectPlataforma = document.getElementById("plataforma").value;
    if (!selectPlataforma) {
        alert("Erro: O elemento select com id 'plataforma' não foi encontrado.");
        return;
    }
    let alerta = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    alerta += `\n\nCLIENTE ENCONTRA-SE NEGATIVADO(A) NO ${selectPlataforma}`;
    alerta += "\nEm caso de pagamento, preencher o formulário";
    alerta += "\n para solicitação de retirada do SPC/SERASA.";
    alerta += "\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

    navigator.clipboard.writeText(alerta).then(() => {});
    }

    function copiarNegativacao() {
    const operador = document.getElementById("operador").value.trim();
    const texto = document.getElementById("texto").value.trim();

    if (operador.length <= 5) {
        alert('Por favor, preencha o campo "operador".');
        return;
    }
    if (texto.length <= 50) {
        alert('Por favor, preencha o campo "texto" com os dados do SPC/SERASA.');
        return;
    }

    let mensagem = "CLIENTE NEGATIVADO!";
    mensagem += "\nSMS DE  INCLUSÃO ENVIADO";
    mensagem += `\nTRIAGEM: ${operador}`;
    mensagem += `\n\n${texto}`;

    navigator.clipboard.writeText(mensagem).then(() => {});
}

// == LIMPAR TEXTAREA

function limparTextarea(){
    document.getElementById('texto').value = '';
    qtdLetrasDigAgora = 0;
}

function copiarMultaONU() {
    navigator.clipboard.writeText("MULTA ONU").then(() => {});
}

function copiarAcordoNaoPago() {
    navigator.clipboard.writeText("ACORDO NÃO PAGO").then(() => {});
}

function copiarProtocoloRetirada() {
    let protocolo = "RETIRADA DE EQUIPAMENTOS E MATERIAIS\n";
    protocolo += "O.S. NÃO ABERTA OU NÃO FINALIZADA CORRETAMENTE APÓS DESATIVAÇÃO DE CADASTRO";

    navigator.clipboard.writeText(protocolo).then(() => {});
}

const buscarCep = document.getElementById("buscarCep");

buscarCep.addEventListener("click", function () {
    const rua = document.getElementById("rua").value.trim();
    const cidade = document.getElementById("inputCidade").value.trim();
    const estado = document.getElementById("estado").value.trim(); // Adicionei esta linha para pegar o estado
    const cepInput = document.getElementById("cep"); // ← Aqui vamos preencher

    if (!rua || !cidade) {
        alert("Por favor, preencha os campos de rua e cidade.");
        return;
    }

    console.log(`Buscando CEP para a rua: ${rua}, cidade: ${cidade}`);
    const url = `https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json/`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar o CEP.");
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                cepInput.value = data[0].cep; // Preenche o campo com o primeiro resultado
            } else {
                alert("Nenhum CEP encontrado para a rua e cidade informadas.");
                cepInput.value = "";
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao buscar o CEP.");
        });
});