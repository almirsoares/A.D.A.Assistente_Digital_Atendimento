function calcularContrato() {
    const valorOriginal = parseFloat(document.getElementById('valorOriginal').value) || 0;
    const beneficio = parseFloat(document.getElementById('beneficio').value) || 0;
    const taxaInstalacao = parseFloat(document.getElementById('taxaInstalacao').value) || 0;
    const equipamento = parseFloat(document.getElementById('equipamentoComodato').value) || 0;

    if (!valorOriginal || !beneficio || !taxaInstalacao || !equipamento) {
        alert('Por favor, preencha todos os campos antes de calcular.');
        return;
    }

    const totalSimples = valorOriginal - beneficio;
    document.getElementById('totalPagarSimples').value = totalSimples.toFixed(2).replace('.', ',');

    const valorOriginal12 = valorOriginal * 12;
    const beneficio12 = beneficio * 12;
    const totalPagarComodato = valorOriginal12 - beneficio12;
    const totalBeneficios = beneficio12 + taxaInstalacao + equipamento;

    document.getElementById('valorOriginal12').value = valorOriginal12.toFixed(2).replace('.', ',');
    document.getElementById('beneficio12').value = beneficio12.toFixed(2).replace('.', ',');
    document.getElementById('totalPagarComodato').value = totalPagarComodato.toFixed(2).replace('.', ',');
    document.getElementById('totalBeneficios').value = totalBeneficios.toFixed(2).replace('.', ',');
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 🔥 impede o comportamento padrão (submit)
      calcularContrato();
    }
  });

// Adiciona o evento de clique dos resultados para copiar o texto do textarea para a área de transferência
document.getElementById('totalPagarSimples').addEventListener('click', function() {
  this.select();  // Seleciona todo o conteúdo do textarea
  document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
  alert('Total a Pagar copiado!');  // Exibe um alerta (opcional)
});


document.getElementById('valorOriginal12').addEventListener('click', function() {
  this.select();  // Seleciona todo o conteúdo do textarea
  document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
  alert('Valor Original 12x copiado!');  // Exibe um alerta (opcional)
});

document.getElementById('beneficio12').addEventListener('click', function() {
  this.select();  // Seleciona todo o conteúdo do textarea
  document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
  alert('Benefício 12x copiado!');  // Exibe um alerta (opcional)
});

document.getElementById('totalPagarComodato').addEventListener('click', function() {
  this.select();  // Seleciona todo o conteúdo do textarea
  document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
  alert('Total a Pagar 12x copiado!');  // Exibe um alerta (opcional)
});

document.getElementById('totalBeneficios').addEventListener('click', function() { 
  this.select();  // Seleciona todo o conteúdo do textarea
  document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
  alert('Total de Benefícios copiado!');  // Exibe um alerta (opcional)
});