window.onload = function () {
    //OBTENDO DADOS DO USUÁRIO:
    // Montagem do pacote de configurações para API: 
    let settings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("jwt")
        },
    };

    // Obtendo o nome do usuário: 
    fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', settings)
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            let userInfo = document.getElementById("nome-usuario");
            userInfo.innerText = `${info.firstName} ${info.lastName}`;
        })

    // OBTENDO TAREFAS:
    // Montagem do pacote de configurações para API:
    let settings2 = {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("jwt")
        },
    };
    
    // Obtendo tarefas do usuário: 
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', settings2)
        .then(function(response){
            return response.json();
        })
    
    // EXIBINDO TAREFAS:
    //tarefas pendentes:
        .then(function(tarefas){
            for (let i=0; i<tarefas.length;i++){
                if (tarefas[i].completed===false){            
                    let ulTarefasPendentes = document.querySelector(".tarefas-pendentes");
                    //let divSkeleton = document.createElement("div")
                    let liPendente = document.createElement("li");
                    let divNotDone = document.createElement("div");
                    let divDescricao = document.createElement("div");
                    let pNome = document.createElement("p");
                    let pTimeStamp = document.createElement("p");
                    let iFarfaCalendarAlt = document.createElement("i");

                    //divSkeleton.setAttribute("id","skeleton");
                    liPendente.classList.add("tarefa");
                    divNotDone.classList.add("not-done");
                    divDescricao.classList.add("descricao");
                    pNome.classList.add("nome");
                    pTimeStamp.classList.add("timestamp"); 
                    iFarfaCalendarAlt.classList.add("far"); 
                    iFarfaCalendarAlt.classList.add("fa-calendar-alt");   

                    divNotDone.setAttribute('id',`${tarefas[i].id}`);
                    divNotDone.setAttribute('onClick',`finalizarTarefa(${tarefas[i].id})`);
                    pNome.innerHTML = `${tarefas[i].description}`;
                    iFarfaCalendarAlt.innerHTML = `${tarefas[i].createdAt}`;
                    
                    pTimeStamp.appendChild(iFarfaCalendarAlt);
                    divDescricao.appendChild(pNome);
                    divDescricao.appendChild(pTimeStamp);
                    liPendente.appendChild(divNotDone);
                    liPendente.appendChild(divDescricao);
                    //divSkeleton.appendChild(liPendente);
                    ulTarefasPendentes.appendChild(liPendente);
                }else{
                    //Criando elementos:
                    let ulTarefasTerminadas = document.querySelector(".tarefas-terminadas");
                    let liTerminada = document.createElement("li");
                    let divDone = document.createElement("div");
                    let divDescricao = document.createElement("div");
                    let pNome = document.createElement("p");
                    let divButtons = document.createElement("div");
                    let buttonUndo = document.createElement("button");
                    let buttonTrash = document.createElement("button");
                    let iUndo = document.createElement("i");
                    let iTrash = document.createElement("i");
                    
                    //Criando classes:
                    liTerminada.classList.add("tarefa");
                    divDone.classList.add("done");
                    divDescricao.classList.add("descricao");
                    pNome.classList.add("nome");
                    iUndo.classList.add("fas");
                    iUndo.classList.add("fa-undo-alt");
                    iUndo.classList.add("change");
                    iTrash.classList.add("far");
                    iTrash.classList.add("fa-trash-alt");
                    
                    //Criando IDs e conteúdos:
                    pNome.innerHTML = `${tarefas[i].description}`;
                    iUndo.setAttribute('id',`${tarefas[i].id}`);
                    iUndo.setAttribute('onClick',`reabrirTarefa(${tarefas[i].id})`);
                    iTrash.setAttribute('id',`${tarefas[i].id}`);
                    iTrash.setAttribute('onClick',`excluirTarefa(${tarefas[i].id})`);

                    //Atribuindo elementos:
                    buttonUndo.appendChild(iUndo);
                    buttonTrash.appendChild(iTrash);
                    divButtons.appendChild(buttonTrash);
                    divButtons.appendChild(buttonUndo);
                    divDescricao.appendChild(pNome);
                    divDescricao.appendChild(divButtons);
                    liTerminada.appendChild(divDone);
                    liTerminada.appendChild(divDescricao);                    
                    ulTarefasTerminadas.appendChild(liTerminada);
                }
            }
        })
        .catch(function(error){
            alert(error);
        })
    
    
    // CRIANDO TAREFAS:
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event){
        event.preventDefault();
        // Obtendo dados do formulário:
        const novaTarefa = document.getElementById('novaTarefa').value;
        
        // Montagem dos dados para API:
        let data = {
            description:novaTarefa,
            completed: false
        };
         // Montagem do pacote de configurações para API:
         let settings3 = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("jwt")
            },
            body: JSON.stringify(data)  
        };
        // Enviando dados para API:
        fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', settings3)
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            console.log(info);
        })
        .then(function(){
            location.reload();
        })
        .catch(function(error){
            console.log(error);
        })

    })
}
    //FINALIZANDO TAREFAS:
    function finalizarTarefa(id){
        let finalizarTarefa = confirm("Deseja finalizar a tarefa?")
        if(finalizarTarefa){
            // Montagem dos dados para API:
            let data = {
                completed: true,
            };
            // Montagem do pacote de configurações para API:
            let settings4 = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("jwt")
                },
                body: JSON.stringify(data)  
            };
            // Enviando dados para API:
            fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, settings4)
            .then(function(response){
                return response.json();
            })
            .then(function(info){
                console.log(info);
            })
            .then(function(){
                location.reload();
            })
        }
        
    }

    //REABRINDO TAREFAS:
    function reabrirTarefa(id){
        // Montagem dos dados para API:
        let data = {
            completed: false,
        };
        // Montagem do pacote de configurações para API:
         let settings = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("jwt")
            },
            body: JSON.stringify(data)  
        };
        // Enviando dados para API:
        fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, settings)
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            console.log(info);
        })
        .then(function(){
            location.reload();
        })
    }
    
    // EXCLUINDO TAREFAS:
    function excluirTarefa(id){
        let excluirTarefa = confirm("Deseja mesmo excluir a tarefa?")
        if(excluirTarefa){
            // Montagem do pacote de configurações para API:
            let settings5 = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("jwt")
                },
            };
            // Enviando dados para API:
            fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, settings5)
            .then(function(response){
                return response.json();
            })
            .then(function(info){
                console.log(info);
            })
            .then(function(){
                location.reload();
            })
        }
    }

    //ENCERRANDO A SESSÃO:
    function encerrarSessao(){
        let encerrarSessao = confirm("Deseja encerrar a sessão?");
        if (encerrarSessao){
            localStorage.jwt = "";
            window.location.href = "./index.html"
        }
    } 