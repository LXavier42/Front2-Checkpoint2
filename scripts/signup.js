//Validação do login:
function validarSenha() {
    let s1 = password.value;
    let s2 = password2.value;
    if (s1 == s2) {
        return false;
    } else {
        ocultarSpinner();
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
    validaCampo(nome,"Campo obrigatório");
});

apelido.addEventListener("keyup", function(event){
    limparCampo(apelido);
})

apelido.addEventListener("blur", function(event){    
    validaCampo(apelido,"Campo obrigatório");
});

email.addEventListener("keyup", function(event){
    limparCampo(email);
})

email.addEventListener("blur", function(event){    
    validaCampo(email,"Campo obrigatório");
});

password.addEventListener("keyup", function(event){
    limparCampo(password, "Campo obrigatório");
})

password.addEventListener("blur", function(event){    
    validaCampo(password,"Campo obrigatório");
});

password2.addEventListener("keyup", function(event){
    limparCampo(password2);
})

password2.addEventListener("blur", function(event){    
    validaCampo(password2,"Campo obrigatório");
});

form.addEventListener("submit", function(event){
    event.preventDefault();
    mostrarSpinner();

    let a = validaCampo(nome,"Campo obrigatório");
    let b = validaCampo(apelido,"Campo obrigatório");
    let c = validaCampo(email,"Campo obrigatório");
    let d = validaCampo(password,"Campo obrigatório");
    let e = validaCampo(password2,"Campo obrigatório");

    if (a == 1 || b==1 || c == 1 || d==1 || e == 1){
        ocultarSpinner();
        alert('Verifique os campos obrigatórios');
    };

    if (validarSenha()){
        alert('Verifique as senhas digitadas');
    }else{

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
                if (info == "El usuario ya se encuentra registrado"){
                    limparCampo(password);
                    limparCampo(password2);
                    adicionarErro(email,"Usuário já cadastrado");
                    ocultarSpinner();
                }else if (info == "Error del servidor"){
                    alert("Erro do servidor");
                    ocultarSpinner();
                }
                else{                
                    window.location.href = "./index.html"
                }
            })
            .catch(function(error){
                console.log(error);
            })
    }
})

