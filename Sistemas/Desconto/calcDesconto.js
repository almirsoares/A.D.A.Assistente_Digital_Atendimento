// Função que calcula o desconto baseado no tipo selecionado
function calcularDesconto() {
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const descontoPlano = parseFloat(document.getElementById('descontoPlano').value);
    const descontoSolicitado = parseFloat(document.getElementById('descontoSolicitado').value);
    const tipoDesconto = document.getElementById('tipoDesconto').value;

    if (isNaN(valorPlano) || isNaN(descontoPlano) || isNaN(descontoSolicitado)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    let valorFaturaTotal = valorPlano; // Começa com o valor do plano
    let valorDescontoTotal = descontoPlano; // Inclui o desconto do plano

    switch (tipoDesconto) {
        case 'porDias':
            const dias = parseInt(descontoSolicitado);
            if (isNaN(dias) || dias < 0 || dias > 30) {
                alert("Por favor, insira um número válido de dias.");
                return;
            }
            valorFaturaTotal = (valorFaturaTotal / 30) * (30 - dias);
            valorDescontoTotal = (valorDescontoTotal / 30) * (30 - dias);
            break;
        case 'porPorcentagem':
            const percentual = parseFloat(descontoSolicitado);
            if (isNaN(percentual) || percentual < 0 || percentual > 100) {
                alert("Por favor, insira uma porcentagem válida (0 a 100).");
                return;
            }
            valorFaturaTotal = (valorFaturaTotal * (100 - percentual)) / 100;
            valorDescontoTotal = (valorDescontoTotal * (100 - percentual)) / 100;

            break;
        case 'porValor':
            const valor = parseFloat(descontoSolicitado);
            if (isNaN(valor)) {
                alert("Por favor, insira um valor válido.");
                return;
            }
            valorFaturaTotal = valorFaturaTotal - valor;
            break;
        default:
            alert("Selecione um tipo de desconto válido.");
            return;
    }

    const valorFinalCobrado = valorFaturaTotal - valorDescontoTotal;

    if (valorFinalCobrado < 0) {
        alert("O desconto total não pode exceder o valor da fatura total.");
        return;
    }

    if (valorDescontoTotal > 0) {
        // Exibe os campos de desconto e valor total da fatura
        document.querySelectorAll('.desconto-campo').forEach(campo => campo.style.display = 'block');
        document.querySelectorAll('.valor-total-campo').forEach(campo => campo.style.display = 'block');
    }

    // Atualiza os campos de resultado
    document.getElementById('valorFaturaTotal').value = valorFaturaTotal.toFixed(2);
    document.getElementById('valorDescontoPlano').value = valorDescontoTotal.toFixed(2);
    document.getElementById('valorFinalCobrado').value = valorFinalCobrado.toFixed(2);
}

function tutorial() {
    // Função que exibe um tutorial para o usuário
    intro = introJs();
    intro.setOptions({
        steps: [
            {
                intro: "Olá! Vamos aprender a calcular um desconto extra para um cliente"
            },
            {
                element: '#valorPlano',
                intro: 'Insira o valor do plano.'
            },
            {
                element: '#descontoPlano',
                intro: 'Insira o desconto do plano. Se não houver deixe com valor 0.'
            },
            {
                element: '#descontoSolicitado',
                intro: 'Insira o valor, porcentagem ou dias para o desconto solicitado.'
            },
            {
                element: '#tipoDesconto',
                intro: 'Selecione o tipo de desconto desejado.'
            },
            {
                element: '#calcularDesconto',
                intro: 'Clique aqui para calcular o desconto ou pressione Enter.'
            },
            {
                element: '#valorFaturaTotal',
                intro: 'Aqui você verá o valor total da fatura após o desconto ofertado. Esse campo só aparece se houver desconto do plano.'
            },
            {
                element: '#valorDescontoPlano',
                intro: 'Aqui você verá o valor do desconto proporcional do plano. Esse campo só aparece se houver desconto do plano.'
            },
            {
                element: '#valorFinalCobrado',
                intro: 'Aqui você verá o valor final a ser cobrado ao cliente após inserir o desconto ofertado.'
            },
            {
                intro: "Caso permaneça alguma dúvida, entre em contato ou preencha o formulário de feedback."
            }
        ],
        showProgress: true,
        showBullets: true,
        exitOnOverlayClick: false,
        exitOnEsc: true,
        nextLabel: 'Próximo',
        prevLabel: 'Voltar',
        doneLabel: 'Fechar',
        skipLabel: 'Sair',
    });

    intro.start();
}


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 🔥 impede o comportamento padrão (submit)
      calcularDesconto();
    }
  });