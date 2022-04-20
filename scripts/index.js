function validaLogin(resposta, campo){
    if (resposta === undefined || resposta == "Contraseña incorrecta" || resposta == "El usuario no existe"){
        ocultarSpinner();
        limparCampo(campo);
        adicionarErro(campo,"Usuário e/ou senha incorreto(s)");
        return 1;
    }else if(resposta == "Error del servidor"){
            ocultarSpinner();
            alert("Erro de servidor")
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
    validaCampo(email,"Campo obrigatório");
});

password.addEventListener("keyup", function(event){
    limparCampo(password);
})

password.addEventListener("blur", function(event){    
    validaCampo(password,"Campo obrigatório");
});

form.addEventListener("submit", function(event){
    event.preventDefault();
    mostrarSpinner();

    let a = validaCampo(email,"Campo obrigatório");
    let b = validaCampo(password,"Campo obrigatório");

    if (a == 1 || b==1){
        alert('Verifique os campos obrigatórios');
        ocultarSpinner();
    }else{
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
        fetch(`https://ctd-todo-api.herokuapp.com/v1/users/login`, settings)
            .then(function(response){
                return response.json();
            })
            .then(function(info){
                localStorage.setItem("jwt", info.jwt);
                return info;
            })
            .then(function(info){
                console.log(info);
                if (validaLogin(info, password)!=1){;
                    window.location.href = "./tarefas.html";
                }
            })
            .catch(function(error){
                console.log(error);
            })        
    }
})


