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
                texto += `O valor total devido com juros e multa é de R$ ${valorMulta.toFixed(2).replace('.',',')}`;
            } else {
                alert("O valor em aberto com multa deve ser maior que 0.");
                return;
            }
        } else if (modo === 'semMulta') {
            if (valorAberto > 0) {
                texto += `O valor total devido sem juros e multa é de R$ ${valorAberto.toFixed(2).replace('.',',')}`;
            } else {
                alert("O valor em aberto deve ser maior que 0.");
            }
        }  else if (modo === 'comDesconto') {
            if (valorDesconto > 0) {
                if (valorAberto > 0) {
                    valorAberto = (valorAberto * (100 - valorDesconto)) / 100;
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
        const valorFatura = valorPlano.toFixed(2);

        let totalDiasProporcionais = 0;

        let multa = 10/100;
        let juros = 0.08333/100; 

        if (document.getElementById('multaBase').value === '10') {
            multa = 10/100;
            juros = 0.08333/100;
        } else if (document.getElementById('multaBase').value === '2') {
            multa = 2/100;
            juros = 0.03333/100;
        } else{
            alert("A multa deve ser 2 ou 10%.");
            return;
        }

        console.log("a multa é: ", multa);
        console.log("o juros é: ", juros);

        let valorTotalDevidoComJuros = 0;
        let  resultadoMes = 0;
        let  dataMesAtrasado = new Date(dataParaCalculo);
        let jurosMultaMes = 0;

        for (let i = 0; i < mesesAtrasados; i++) {
          dataMesAtrasado.setMonth(dataMesAtrasado.getMonth() - i);

          resultadoMes = calcularProporcional(valorPlano, dataMesAtrasado, dataVencimentoAcordo, '360dias');
          totalDiasProporcionais = resultadoMes.totalDias;

          jurosMultaMes = calcularJurosMultaPorDia(valorFatura, multa, juros, totalDiasProporcionais);
          valorTotalDevidoComJuros = parseFloat(jurosMultaMes) + parseFloat(valorTotalDevidoComJuros);
        }

        diasAtrasadosProporcional = calcularProporcional(valorPlano, dataVencimento, dataVencimentoAcordo, '360dias').totalDias;
        let proprocionalComMulta = calcularJurosMultaPorDia(valorProporcionalMes, multa, juros, diasAtrasadosProporcional);

        let mesesDevidosAnteriores = valorFatura*mesesAtrasados;
        let valorTotalDevido = parseFloat(mesesDevidosAnteriores) + parseFloat(valorProporcionalMes);
        valorTotalDevidoComJuros = parseFloat(valorTotalDevidoComJuros) + parseFloat(proprocionalComMulta);

        document.getElementById('valorAberto').value = valorTotalDevido.toFixed(2);
        document.getElementById('valorMulta').value = valorTotalDevidoComJuros.toFixed(2);

        // Mensagem de protocolo
        if (modo === 'comMulta'){
          if (valorTotalDevidoComJuros > 0) {
              texto += `O valor total devido com juros e multa é de R$ ${valorTotalDevidoComJuros.toFixed(2).replace('.',',')}`;
          } else {
              alert("O valor em aberto com multa deve ser maior que 0.");
              return;
          }
      } else if (modo === 'semMulta') {
          if (valorTotalDevido > 0) {
              texto += `O valor total devido sem juros e multa é de R$ ${valorTotalDevido.toFixed(2).replace('.',',')}`;
          } else {
              alert("O valor em aberto deve ser maior que 0.");
          }
      }  else if (modo === 'comDesconto') {
          if (valorDesconto > 0) {
              if (valorTotalDevido > 0) {
                  valorTotalDevido = (valorTotalDevido * (100 - valorDesconto)) / 100;
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

    console.log("o valor proporcional é: ", resultado.valorTotal);
    console.log("o valor do proporcional com multa é: ", proprocionalComMulta);

    console.log("o valor da fatura é: ", valorFatura);
    console.log("o valor total devido é: ", valorTotalDevido);
    console.log("o valor total devido com juros e multa é: ", valorTotalDevidoComJuros);
    console.log("o valor da multa é: ", valorMulta);
    console.log("o valor do desconto é: ", valorDesconto);
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