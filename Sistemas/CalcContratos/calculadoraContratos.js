function calcularContrato() {
    const valorOriginal = parseFloat(document.getElementById('valorOriginal').value) || 0;
    const beneficio = parseFloat(document.getElementById('beneficio').value) || 0;
    const taxaInstalacao = parseFloat(document.getElementById('taxaInstalacao').value) || 0;
    const equipamento = parseFloat(document.getElementById('equipamentoComodato').value) || 0;

    const totalSimples = valorOriginal - beneficio;
    document.getElementById('totalPagarSimples').value = totalSimples.toFixed(2);

    const valorOriginal12 = valorOriginal * 12;
    const beneficio12 = beneficio * 12;
    const totalPagarComodato = valorOriginal12 - beneficio12;
    const totalBeneficios = beneficio12 + taxaInstalacao + equipamento;

    document.getElementById('valorOriginal12').value = valorOriginal12.toFixed(2);
    document.getElementById('beneficio12').value = beneficio12.toFixed(2);
    document.getElementById('totalPagarComodato').value = totalPagarComodato.toFixed(2);
    document.getElementById('totalBeneficios').value = totalBeneficios.toFixed(2);
}