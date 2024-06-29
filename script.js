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

    const valorProporcional = valorPlano + (valorPlano / diasBase) * diferencaDias;

    document.getElementById('resultado').innerText = `Muito obrigado por aguardar! Verifico que sua *primeira fatura* após a mudança de data será no valor de R$ ${valorProporcional.toFixed(2)}  devido ao *valor proporcional de ${diasTotais} dias* de uso, tudo bem?`;

}
