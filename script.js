// Função principal que calcula os valores proporcionais e retorna o resultado
function calcularProporcional365(valorPlano, dataAntiga, dataNova) {
    // Calcula a diferença em milissegundos entre as datas
    const diferencaMilissegundos = dataNova - dataAntiga;

    // Converte a diferença para dias corridos
    const totalDias = Math.ceil(diferencaMilissegundos / (1000 * 3600 * 24));

    // Calcula o valor proporcional com base nos dias corridos
    const valorTotal = (valorPlano / 30) * totalDias;

    return {
        valorTotal,
        totalDias,
        diaAntigo: dataAntiga.getDate(),
        mesAntigo: dataAntiga.getMonth() + 2,
        diaNovo: dataNova.getDate(),
        mesNovo: dataNova.getMonth() + 1
    };
}

// Função para calcular o proporcional de datas considerando um ciclo de 360 dias (ano comercial)
function calcularProporcional360(valorPlano, dataAntiga, dataNova) {
    const diaAntigo = dataAntiga.getDate();
    const mesAntigo = dataAntiga.getMonth() + 1;
    const anoAntigo = dataAntiga.getFullYear();

    const diaNovo = dataNova.getDate();
    const mesNovo = dataNova.getMonth() + 1;
    const anoNovo = dataNova.getFullYear();

    // Cálculo com base em 360 dias por ano (12 meses de 30 dias)
    const totalDias = ((anoNovo - anoAntigo) * 360) + ((mesNovo - mesAntigo) * 30) + (diaNovo - diaAntigo);

    const valorTotal = (valorPlano / 30) * totalDias;

    return {
        valorTotal,
        totalDias,
        diaAntigo,
        mesAntigo,
        diaNovo,
        mesNovo
    };
}

function calcularProporcional(valorPlano, dataAntiga, dataNova, modoCalculo){

    if (modoCalculo = "360dias"){
        const resultado = calcularProporcional360(valorPlano, dataAntiga, dataNova);
        return{
            valorTotal : resultado.valorTotal,
            totalDias : resultado.totalDias,
            diaAntigo : resultado.diaAntigo,
            mesAntigo : resultado.mesAntigo,
            diaNovo : resultado.diaNovo,
            mesNovo : resultado.mesNovo
        };
    } else if(modoCalculo = "365dias"){
        const resultado = calcularProporcional365(valorPlano, dataAntiga, dataNova);
        return{
            valorTotal : resultado.valorTotal,
            totalDias : resultado.totalDias,
            diaAntigo : resultado.diaAntigo,
            mesAntigo : resultado.mesAntigo,
            diaNovo : resultado.diaNovo,
            mesNovo : resultado.mesNovo
        };
    } else {
        alert ("ERROR : modo de operação invalido!!!! \n preencher formulario de feedback!")
        return
    }
}


