function calcularProporcional() {
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const dataAntiga = new Date(document.getElementById('dataAntiga').value);
    const dataNova = new Date(document.getElementById('dataNova').value);

    if (isNaN(valorPlano) || isNaN(dataAntiga.getTime()) || isNaN(dataNova.getTime())) {
        alert("Por favor, preencha todos os campos com valores válidos.");
        return;
    }

    const diasBase = 30;
    const diferencaDias = Math.floor((dataNova - dataAntiga) / (1000 * 60 * 60 * 24));
    const diasTotais = diasBase + diferencaDias;

    const valorProporcional = 30 + (valorPlano / diasBase) * diferencaDias;

    document.getElementById('resultado').innerText = `Proporcional de Vencimento: R$ ${valorProporcional.toFixed(2)} para ${diasTotais} dias totais`;
}
