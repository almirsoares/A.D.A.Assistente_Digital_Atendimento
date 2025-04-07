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