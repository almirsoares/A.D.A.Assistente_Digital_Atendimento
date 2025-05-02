// Função que calcula os valores proporcionais de desativação e inputa as faturas anteriores como prevenção

function calcularAcordo() {

    const ansDesaConcluida = document.getElementById('ansDesaConcluida').value;
    const dataVencimentoAcordo = new Date(document.getElementById('dataVencimentoAcordo').value + 'T00:00:00');

    if (isNaN(dataVencimentoAcordo.getTime())){
      alert("A data de vencimento do acordo deve ser preenchida.");
      return;
    }

    // Obtenção de valores dos campos de entrada   new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const valorPlano = parseFloat(document.getElementById('valorPlano').value);
    const mesesAtrasados = parseInt(document.getElementById('mesesAtrasados').value);
    const dataVencimento = new Date(document.getElementById('dataVencimento').value + 'T00:00:00');
    const dataUltimoAcesso = new Date(document.getElementById('dataUltimoAcesso').value + 'T00:00:00');

    let valorAberto = parseFloat(document.getElementById('valorAberto').value);
    let valorMulta = parseFloat(document.getElementById('valorMulta').value);
    let valorDesconto = parseFloat(document.getElementById('valorDesconto').value);
    const modo = document.getElementById('modo').value;

    let texto ="Obrigado por aguardar! ";

    if (ansDesaConcluida === 'sim') {
        if (modo === 'comMulta'){
            if (valorMulta > 0) {
                console.log('valor multa ' + valorMulta);
                texto += `O valor total devido com juros e multa é de R$ ${valorMulta.toFixed(2).replace('.',',')}`;
            } else {
                alert("O valor em aberto com multa deve ser maior que 0.");
                return;
            }
        } else if (modo === 'semMulta') {
            if (valorAberto > 0) {
                console.log('valor aberto ' + valorAberto);
                texto += `O valor total devido sem juros e multa é de R$ ${valorAberto.toFixed(2).replace('.',',')}`;
            } else {
                alert("O valor em aberto deve ser maior que 0.");
            }
        }  else if (modo === 'comDesconto') {
            if (valorDesconto > 0) {
                if (valorAberto > 0) {
                    valorAberto = (valorAberto * (100 - valorDesconto)) / 100;
                    console.log('valor aberto com desconto ' + valorAberto);
                    texto += `O valor total devido com desconto é de R$ ${valorAberto.toFixed(2).replace('.',',')}`;
                }
                else {
                    alert("O valor em aberto deve ser maior que 0.");
                    return;
                }
              } else {
                alert("O desconto deve ser maior que 0.");
                return;
            }
        }
        texto += ' para a data de vencimento ' + dataVencimentoAcordo.toLocaleDateString('pt-BR');
    } else {

        // Seta a data para o calculo ser referente ao dia do vencimento anterior para calcular o proporcional decorrendo daquele dia
        const dataParaCalculo = new Date(dataVencimento);
        dataParaCalculo.setMonth(dataParaCalculo.getMonth() - 1);
        dataParaCalculo.setDate(dataParaCalculo.getDate() - 1);

        // Chama a função calcularProporcional para obter os cálculos
        const resultado = calcularProporcional(valorPlano, dataParaCalculo, dataUltimoAcesso, '360dias');

        const valorProporcionalMes = resultado.valorTotal.toFixed(2);
        console.log('valor proporcional mes ' + valorProporcionalMes);
        const valorFatura = valorPlano.toFixed(2);

        let totalDiasProporcionais = 0;
        let totalJurosMulta = 0;

        const multa = 10/100;
        const juros = 0.08333/100; 
        let valorTotalDevidoComJuros = 0;
        let  resultadoMes = 0;
        let  dataMesAtrasado = new Date(dataParaCalculo);
        let jurosMultaMes = 0;

        for (let i = 0; i < mesesAtrasados; i++) {
          dataMesAtrasado.setMonth(dataMesAtrasado.getMonth() - i);
          console.log('data mes atrasado ' + dataMesAtrasado);

          resultadoMes = calcularProporcional(valorPlano, dataMesAtrasado, dataVencimentoAcordo, '360dias');
          totalDiasProporcionais = resultadoMes.totalDias;
          console.log('total dias proporcionais ' + totalDiasProporcionais);

          jurosMultaMes = calcularJurosMultaPorDia(valorFatura, multa, juros, totalDiasProporcionais);
          console.log('juros e multa mes ' + jurosMultaMes);
          valorTotalDevidoComJuros = parseFloat(jurosMultaMes) + parseFloat(valorTotalDevidoComJuros);
          console.log('valor total devido com juros ' + valorTotalDevidoComJuros);
        }

        diasAtrasadosProporcional = calcularProporcional(valorPlano, dataVencimento, dataVencimentoAcordo, '360dias').totalDias;
        let proprocionalComMulta = calcularJurosMultaPorDia(valorProporcionalMes, multa, juros, diasAtrasadosProporcional);

        let mesesDevidosAnteriores = valorFatura*mesesAtrasados;
        let valorTotalDevido = parseFloat(mesesDevidosAnteriores) + parseFloat(valorProporcionalMes);
        valorTotalDevidoComJuros = parseFloat(valorTotalDevidoComJuros) + parseFloat(proprocionalComMulta);

        // Mensagem de protocolo
        if (modo === 'comMulta'){
          if (valorTotalDevidoComJuros > 0) {
              console.log('valor multa ' + valorTotalDevidoComJuros);
              texto += `O valor total devido com juros e multa é de R$ ${valorTotalDevidoComJuros.toFixed(2).replace('.',',')}`;
          } else {
              alert("O valor em aberto com multa deve ser maior que 0.");
              return;
          }
      } else if (modo === 'semMulta') {
          if (valorTotalDevido > 0) {
              console.log('valor aberto ' + valorTotalDevido);
              texto += `O valor total devido sem juros e multa é de R$ ${valorTotalDevido.toFixed(2).replace('.',',')}`;
          } else {
              alert("O valor em aberto deve ser maior que 0.");
          }
      }  else if (modo === 'comDesconto') {
          if (valorDesconto > 0) {
              if (valorTotalDevido > 0) {
                  valorTotalDevido = (valorTotalDevido * (100 - valorDesconto)) / 100;
                  console.log('valor aberto com desconto ' + valorTotalDevido);
                  texto += `O valor total devido com desconto é de R$ ${valorTotalDevido.toFixed(2).replace('.',',')}`;
              }
              else {
                  alert("O valor em aberto deve ser maior que 0.");
                  return;
              }
            } else {
              alert("O desconto deve ser maior que 0.");
              return;
          }
      }
      texto += ' para a data de vencimento ' + dataVencimentoAcordo.toLocaleDateString('pt-BR');

    }
    document.getElementById('texto').value = texto;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 🔥 impede o comportamento padrão (submit)
      calcularAcordo();
    }
  });

document.getElementById('modo').addEventListener('change', function () {
  calcularAcordo();
});

document.getElementById('ansDesaConcluida').addEventListener('change', function () {
    const fieldsetDesativacao = document.getElementById('fieldsetDesativacao');
    if (this.value === 'sim') {
      fieldsetDesativacao.style.display = 'none';
    }
    else {
      fieldsetDesativacao.style.display = 'block';
    }
});