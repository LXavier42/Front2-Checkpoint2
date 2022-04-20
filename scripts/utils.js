function seletorId(id){
    return document.getElementById(id);
}

function empty(input){
    return input.value.trim() ==="";
}

function limparCampo(campo){
    if (campo.classList.contains("error")){
        campo.classList.remove("error");
        campo.nextSibling.remove();
    }
}

function validaCampo(campo,mensagem){
    if (empty(campo)){
        limparCampo(campo);
        adicionarErro(campo, mensagem);
        return 1;
    }
}

function adicionarErro(campo,mensagem){
    campo.classList.add("error");
    const erro = document.createElement("small");
    erro.innerText = mensagem;
    erro.classList.add("error");
    campo.after(erro);
}
