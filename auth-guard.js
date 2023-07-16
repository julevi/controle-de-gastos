/*Guarda para usuário onão logado não acessar*/
firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location.href = "index.html";
        }
    })