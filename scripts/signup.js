//Validação do login:
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

function validaCampo(campo){
    if (empty(campo)){
        limparCampo(campo);
        campo.classList.add("error");
        const erro = document.createElement("small");
        erro.innerText = "Campo obrigatório";
        erro.classList.add("error");
        campo.after(erro);
        return 1;
    }
}

function validarSenha() {
    let s1 = password.value;
    let s2 = password2.value;
    if (s1 == s2) {
        return false;
    } else {
        return true;
    }
  }

//Selecionando elementos:
let form = document.querySelector("form");
let nome = seletorId('inputNome');
let apelido = seletorId('inputApelido');
let email = seletorId('inputEmail');
let password = seletorId('inputSenha');
let password2 = seletorId('inputRepetirSenha');


//Aplicando lógicas de validação:
nome.addEventListener("keyup", function(event){
    limparCampo(nome);
})

nome.addEventListener("blur", function(event){    
    validaCampo(nome);
});

apelido.addEventListener("keyup", function(event){
    limparCampo(apelido);
})

apelido.addEventListener("blur", function(event){    
    validaCampo(apelido);
});

email.addEventListener("keyup", function(event){
    limparCampo(email);
})

email.addEventListener("blur", function(event){    
    validaCampo(email);
});

password.addEventListener("keyup", function(event){
    limparCampo(password);
})

password.addEventListener("blur", function(event){    
    validaCampo(password);
});

password2.addEventListener("keyup", function(event){
    limparCampo(password2);
})

password2.addEventListener("blur", function(event){    
    validaCampo(password2);
});

form.addEventListener("submit", function(event){
    event.preventDefault();

    let a = validaCampo(nome);
    let b = validaCampo(apelido);
    let c = validaCampo(email);
    let d = validaCampo(password);
    let e = validaCampo(password2);

    if (a == 1 || b==1 || c == 1 || d==1 || e == 1){
        alert('Verifique os campos obrigatórios');
    };

    if (validarSenha()){
        limparCampo(password);
        limparCampo(password2);
        password.classList.add("error");
        password2.classList.add("error");
        
        const erro = document.createElement("small");
        erro.innerText = "As senhas precisam ser iguais";
        erro.classList.add("error");
        
        const erro2 = document.createElement("small");
        erro2.innerText = "As senhas precisam ser iguais";
        erro2.classList.add("error");

        password.after(erro);
        password2.after(erro2);

        alert('Verifique as senhas digitadas')
    }

    //Criação do objeto para API:
    //1 - Informações:
    let data = {
        firstName: nome.value,
        lastName: apelido.value,
        email: email.value,
        password: password.value
    };

    //2 - Pacote de configurações:
    let settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };

    //3 - Mandar para API:
    fetch('https://ctd-todo-api.herokuapp.com/v1/users', settings)
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            console.log(info);
        })
        .catch(function(error){
            console.log(error);
        })

})

