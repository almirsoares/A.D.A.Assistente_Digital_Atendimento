function copiarCEP() {
  const cep = document.getElementById("cep").value;
  if (cep) {
    navigator.clipboard.writeText(cep).then(() => {});
  } else {
    alert("Por favor, insira um CEP antes de copiar.");
  }
}

function copiarTextoAlef() {
  let textoAlef = "MULTA DE EQUIPAMENTO GERADA, POIS A O.S. DE RETIRADA AINDA NÃO FOI FINALIZADA, CASO A CLIENTE DEVOLVA  O EQUIPAMENTO DESCONSIDERAR/DESATIVAR A MULTA E INFORMAR AO BACKOFFICE ";
  textoAlef += "\nAUTORIZAÇÃO DIRETORIA ADMINISTRATIVA - ALEF";
  navigator.clipboard.writeText(textoAlef).then(() => {});
}

function alertaNegativacao() {
  const selectPlataforma = document.getElementById("plataforma").value;
  if (!selectPlataforma) {
    alert("Erro: O elemento select com id 'plataforma' não foi encontrado.");
    return;
  }
  let alerta = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  alerta += `\n\nCLIENTE ENCONTRA-SE NEGATIVADO(A) NO ${selectPlataforma}`;
  alerta += "\nEm caso de pagamento, preencher o formulário";
  alerta += "\n para solicitação de retirada do SPC/SERASA.";
  alerta += "\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  navigator.clipboard.writeText(alerta).then(() => {});
}

function copiarNegativacao() {
  const operador = document.getElementById("operador").value.trim();
  const texto = document.getElementById("texto").value.trim();

  if (operador.length <= 5) {
    alert('Por favor, preencha o campo "operador".');
    return;
  }
  if (operador.length <= 5) {
    alert('Por favor, preencha o campo "texto" com os dados do SPC/SERASA.');
    return;
  }

  let mensagem = "CLIENTE NEGATIVADO!";
  mensagem += "\nSMS DE  INCLUSÃO ENVIADO";
  mensagem += `\nTRIAGEM: ${operador}`;
  mensagem += `\n\n${texto}`;

  navigator.clipboard.writeText(mensagem).then(() => {});
}

function copiarMultaONU() {
  navigator.clipboard.writeText("MULTA ONU").then(() => {});
}

function copiarAcordoNaoPago() {
  navigator.clipboard.writeText("ACORDO NÃO PAGO").then(() => {});
}

function copiarProtocoloRetirada() {
  let protocolo = "RETIRADA DE EQUIPAMENTOS E MATERIAIS\n";
  protocolo += "O.S. NÃO ABERTA OU NÃO FINALIZADA CORRETAMENTE APÓS DESATIVAÇÃO DE CADASTRO";

  navigator.clipboard.writeText(protocolo).then(() => {});
}
