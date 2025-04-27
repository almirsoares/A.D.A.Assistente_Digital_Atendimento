//-------------------------------------------------------------------------------------
// FUNÇÕES PARA CALCULO DE JUROS E MULTA

// Função para atualizar os valores de juros e multa com base na seleção do usuário
function atualizarJurosMulta() {
    const tipo = document.getElementById('tipoJurosMulta').value;
    const multaInput = document.getElementById('multa');
    const jurosInput = document.getElementById('juros');

    if (tipo === "10") {
        multaInput.value = 10;
        jurosInput.value = 0.08333;
        multaInput.readOnly = true;
        jurosInput.readOnly = true;
    } else if (tipo === "2.5") {
        multaInput.value = 2.5;
        jurosInput.value = 0.033;
        multaInput.readOnly = true;
        jurosInput.readOnly = true;
    } else {
        multaInput.value = "";
        jurosInput.value = "";
        multaInput.readOnly = false;
        jurosInput.readOnly = false;
    }
}

// Define os valores padrão ao carregar a página com base na opção selecionada
document.addEventListener("DOMContentLoaded", function () {
    atualizarJurosMulta(); // Chama a função para definir os valores iniciais corretamente
});

// Função para calcular Juros e Multa utilizando calcularProporcional
function calcularJurosMulta() {
    const valorFatura = parseFloat(document.getElementById('valorFatura').value);
    const dataVencimento = new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const dataAtualizada = new Date(document.getElementById('dataAtualizada').value + 'T00:00:00');
    const multa = parseFloat(document.getElementById('multa').value) / 100;
    const juros = parseFloat(document.getElementById('juros').value) / 100;

    if (isNaN(valorFatura) || isNaN(multa) || isNaN(juros) || isNaN(dataVencimento) || isNaN(dataAtualizada)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Usa a função calcularProporcional para obter o total de dias de atraso
    const resultado = calcularProporcional(valorFatura, dataVencimento, dataAtualizada, '365dias');
    const totalDias = resultado.totalDias;

    // Calcula multa fixa
    const valorMulta = valorFatura * multa;

    // Calcula juros compostos
    const valorJuros = valorFatura * Math.pow(1 + juros, totalDias) - valorFatura;

    // Calcula o valor final com multa e juros
    const valorFinal = valorFatura + valorMulta + valorJuros;

    // Atualiza os campos com os resultados
    document.getElementById('valorFinal').value = valorFinal.toFixed(2);
}


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 🔥 impede o comportamento padrão (submit)
      calcularJurosMulta();
    }
  });

// Adiciona o evento de clique dos resultados para copiar o texto do textarea para a área de transferência
document.getElementById('valorFinal').addEventListener('click', function() {
    this.select();  // Seleciona todo o conteúdo do textarea
    document.execCommand('copy');  // Copia o conteúdo selecionado para a área de transferência
    alert('Valor final copiado!');  // Exibe um alerta (opcional)
});