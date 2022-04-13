window.onload = function () {
    // INFORMAÇÕES DO USUÁRIO   
    let settings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("jwt")
        },
    };

    fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', settings)
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            document.querySelector(".user-info").innerHTML = `${info.firstName} ${info.lastName}`;
            console.log(info);
        })

        // TAREFAS USUÁRIO
        let settings2 = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("jwt")
            },
        };
    
        fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', settings2)
            .then(function(response){
                return response.json();
            })
            .then(function(info){
                console.log(info);
            })
}