// Carrega o CSV e popula o select + lógica de localização dinâmica
let cidadesCSV = [];

async function carregarCidadesDoCSV() {
    const response = await fetch('BASE, CIDADES E INFORMAÇÕES - cidades_bases_completo.csv');
    const data = await response.text();
    const linhas = data.split('\n');
    const cabecalhos = linhas[0].split(',');

    cidadesCSV = linhas.slice(1).map(linha => {
        const valores = linha.split(',');
        return {
            cidade: valores[0]?.trim(),
            nomeBase: valores[1]?.trim(),
            estado: valores[2]?.trim(), 
            nomeVerdadeiro: valores[3]?.trim(),
            ddd: valores[4]?.trim(),
            plataforma: valores[5]?.trim(),
        };
    });

    // Popula o select com nomes das cidades
    const cidadeSelect = document.getElementById('cidade');
    cidadesCSV.forEach(info => {
        if (info.cidade) {
            const option = document.createElement('option');
            option.value = info.cidade;
            option.textContent = info.cidade;
            cidadeSelect.appendChild(option);
        }
    });

    // Chama localizarBase automaticamente ao mudar a cidade
    cidadeSelect.addEventListener('change', localizarBase);
}


function localizarBase() {
    const cidadeSelecionada = document.getElementById('cidade').value;
    const info = cidadesCSV.find(c => c.cidade === cidadeSelecionada);
    
    if (info) {
        document.getElementById('nomeBase').textContent = `Nome da Base: ${info.nomeBase}`;
        document.getElementById('estado').textContent = `Estado: ${info.estado}`;
        document.getElementById('nomeVerdadeiro').textContent = `Nome da cidade: ${info.nomeVerdadeiro}`;
        document.getElementById('ddd').textContent = `DDD: ${info.ddd}`;
        document.getElementById('plataforma').textContent = `Plataforma: ${info.plataforma}`;
    } else {
        document.getElementById('nomeBase').textContent = '';
        document.getElementById('estado').textContent = '';
        document.getElementById('nomeVerdadeiro').textContent = '';
        document.getElementById('ddd').textContent = '';
        document.getElementById('plataforma').textContent = '';
    }
}

window.onload = carregarCidadesDoCSV;
