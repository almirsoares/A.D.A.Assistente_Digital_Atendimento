function buscarPlanos() {
  const base = document.getElementById("base").value;
  const modalidade = document.getElementById("modalidade").value;
  const promocional = document.getElementById("promocional").value;
  const select = document.getElementById("plano");
  const club = document.getElementById("club").value;
  select.innerHTML = '<option value="">Selecione um plano</option>'; // Limpa as opções anteriores

  if (base === "") {
    alert("SELECIONE A BASE");
    return;
  } 

  if (promocional === "sim") {
    if (club === "sim"){
      if (base === "dtel") {
        buscarPlanosEmArquivo("PLANOS DTEL - PROMOCIONAL CLUB DTEL.csv");
      } else {
        buscarPlanosEmArquivo("PLANOS DTEL - PROMOCIONAL CLUB OUTRAS BASES.csv");
      }
    } else {
      buscarPlanosEmArquivo("PLANOS DTEL - PROMOCIONAL SEM CLUB.csv");
    }
  } else {
    if (base === "dtel") {
      if (modalidade === "residencial") {
        buscarPlanosEmArquivo("PLANOS DTEL - DTEL.csv");
      } else if (modalidade === "comercial") {
        buscarPlanosEmArquivo("PLANOS DTEL - COMERCIAL DTEL.csv");
      }
    } else {
      if (modalidade === "residencial") {
        buscarPlanosEmArquivo("PLANOS DTEL - OUTRAS BASES.csv");
      } else if (modalidade === "comercial") {
        buscarPlanosEmArquivo("PLANOS DTEL - COMERCIAL OUTRAS BASES.csv");
      }
    }
  }
}

function buscarPlanosEmArquivo(nomeArquivo) {
  const select = document.getElementById("plano");
  select.innerHTML = '<option value="">Selecione um plano</option>'; // Limpa as opções anteriores

  // Faz a requisição para o arquivo CSV e popula o select com os planos
  fetch(nomeArquivo)
    .then((response) => response.text())
    .then((data) => {
      const linhas = data.split("\n");
      const headers = linhas[0].split(",");
      const idxCombo = headers.findIndex((h) => h.trim().toLowerCase() === "combo");
      for (let i = 1; i < linhas.length; i++) {
        const colunas = linhas[i].split(",");
        if (colunas[idxCombo]) {
          select.innerHTML += `<option value="${colunas[idxCombo].trim()}">${colunas[idxCombo].trim()}</option>`;
        }
      }
    });
}

function buscarValores() {
  const base = document.getElementById("base").value;
  const plano = document.getElementById("plano").value;
  const modalidade = document.getElementById("modalidade").value;
  const promocional = document.getElementById("promocional").value;
  const club = document.getElementById("club").value;

  if (base === "") {
    alert("SELECIONE A BASE");
    return;
  } 

  if (promocional === "sim") {
    if (club === "sim"){
      if (base === "dtel") {
        buscarValoresEmArquivos("PLANOS DTEL - PROMOCIONAL CLUB DTEL.csv", plano);
      } else {
        buscarValoresEmArquivos("PLANOS DTEL - PROMOCIONAL CLUB OUTRAS BASES.csv", plano);
      }
    } else {
      buscarValoresEmArquivos("PLANOS DTEL - PROMOCIONAL SEM CLUB.csv", plano);
    }
  } else { 
    if (base === "dtel") {
      if (modalidade === "residencial") {
        buscarValoresEmArquivos("PLANOS DTEL - DTEL.csv", plano);
      }
      if (modalidade === "comercial") {
        buscarValoresEmArquivos("PLANOS DTEL - COMERCIAL DTEL.csv", plano);
      }
    } else {
      if (modalidade === "residencial") {
        buscarValoresEmArquivos("PLANOS DTEL - OUTRAS BASES.csv", plano);
      }
      if (modalidade === "comercial") {
        buscarValoresEmArquivos("PLANOS DTEL - COMERCIAL OUTRAS BASES.csv", plano);
      }
    }
  }
}

// Função para buscar os valores do arquivo CSV e preencher os campos
function buscarValoresEmArquivos(nomeArquivo, plano) {
    console.log(nomeArquivo);

  fetch(nomeArquivo)
        .then((response) => response.text())
        .then((data) => {
          const linhas = data.split("\n");
          const headers = linhas[0].split(",");
          const idxCombo = headers.findIndex((h) => h.trim().toLowerCase() === "combo");
          const idxValorOriginal = headers.findIndex((h) => h.trim().toLowerCase() === "valor original");
          const idxBeneficio = headers.findIndex((h) => h.trim().toLowerCase() === "beneficio");
          const idxTaxaInstalacao = headers.findIndex((h) => h.trim().toLowerCase() === "taxa instalacao");
          const idxEquipamentoComodato = headers.findIndex((h) => h.trim().toLowerCase() === "equipamento comodato");
          for (let i = 1; i < linhas.length; i++) {
            console.log("entrei no for");
            const colunas = linhas[i].split(",");
            if (colunas[idxCombo] && colunas[idxCombo].trim() === plano) {

              console.log("entrei no if");

              document.getElementById("valorOriginal").value = colunas[idxValorOriginal] ? colunas[idxValorOriginal].trim() : "";
              document.getElementById("beneficio").value = colunas[idxBeneficio] ? colunas[idxBeneficio].trim() : "";
              document.getElementById("taxaInstalacao").value = colunas[idxTaxaInstalacao] ? colunas[idxTaxaInstalacao].trim() : "";
              document.getElementById("equipamentoComodato").value = colunas[idxEquipamentoComodato] ? colunas[idxEquipamentoComodato].trim() : "";
              calcularContrato();

              console.log("Valor Original: " + colunas[idxValorOriginal].trim());
              console.log("Benefício: " + colunas[idxBeneficio].trim());
              console.log("Taxa de Instalação: " + colunas[idxTaxaInstalacao].trim());
              console.log("Equipamento Comodato: " + colunas[idxEquipamentoComodato].trim());
              break;
            }
          }
        });
}


// evento quando o select promocional for alterado
document.getElementById("promocional").addEventListener("change", function () {
  const promocional = document.getElementById("promocional").value;

  if (promocional === "sim") {
    // campo divClub aparece e campo divModalidade desaparece
    document.getElementById("divModalidade").style.display = "none";
    document.getElementById("divClub").style.display = "flex";
    document.getElementById("divClub").style.flexDirection = "column";
    
  } else {
    // campo divClub desaparece e campo divModalidade aparece
    document.getElementById("divClub").style.display = "none";
    document.getElementById("divModalidade").style.display = "flex";
    document.getElementById("divModalidade").style.flexDirection = "column";

  }
  buscarPlanos();
});

// evento quando o select divBase for alterado
document.getElementById("divBase").addEventListener("change", function () {
  buscarPlanos();
});

// evento quando o select divModalidade for alterado
document.getElementById("divModalidade").addEventListener("change", function () {
  buscarPlanos();
});

// evento quando o select plano for alterado
document.getElementById("plano").addEventListener("change", function () {
  buscarValores();
});

// evento quando o select club for alterado
document.getElementById("club").addEventListener("change", function () {
  buscarPlanos();
});
