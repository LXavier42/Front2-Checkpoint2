
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

//Selecionando elementos:
let form = document.querySelector("form");
let email = seletorId('inputEmail');
let password = seletorId('inputPassword');

//Aplicando lógicas de validação:
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

form.addEventListener("submit", function(event){
    event.preventDefault();
    let a = validaCampo(email);
    let b = validaCampo(password);

    if (a == 1 || b==1){
        alert('Verifique os campos obrigatórios');
    }

    //Criação do objeto para API:
    //1 - Informações:
    let data = {
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
    fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', settings)
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            console.log(info);
            localStorage.setItem("jwt", info.jwt);
        })
        .catch(function(error){
            console.log(error);
        })
})


