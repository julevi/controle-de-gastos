/*Chamei a fuhnção signOut de logout do firebase, desconectando o usuário ao clicar em sair */
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    });
}
