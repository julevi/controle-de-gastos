/*Inicializa executando o comando. Se o usuário estiver logado, continuar na página de home */
window.onload = function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.location.href = "../home/home.html";
      }
    })};

/*Verifica se o email é válido para habilitar o recuperar senha*/
function onChangeEmail(){
    toggleButtonDisable();
    toggleEmailErrors();
}

function onChangePassword(){
    toggleButtonDisable();
    togglePasswordErrors();
}

/*A função irá fazer o login do usuário, isso se no firebase existir esse usuário, se não executará uma mensagem de erro */
function login() {
    showLoading();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            hideLoading();
            window.location.href = "../home/home.html";
        })
        .catch(error => {
            hideLoading();
            alert(getErrorMessage(error))
        });
}

/*O que acontece com a mensagem de erro anterior: Se não encontrar o usuário, dirá ou se a senha não for igual dirá também */
function getErrorMessage(error){
        if (error.code =="auth/user-not-found") {
            return "Usuário não encontrado";
        }
        if (error.code == "auth/wrong-password"){
            return "Senha inválida"
        }
        return error.message;
}

/*Se chamar o registro vai para tela de registro */
function register(){
    window.location.href = "../register/register.html"
}

/*Se o usuário esqueceu a senha receberá uma mensagem no email para recuperar*/
function recoverPassword(){
    showLoading();
    
    firebase.auth().sendPasswordResetEmail(document.getElementById("email").value).then(() => {
        hideLoading();
        alert('Email enviado com sucesso!');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

/*Função que valida o email, lógica escrita no validation.js */
function isEmailValid(){
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

/*Função que valida o senha*/
function isPasswordValid(){
    const password = document.getElementById('password').value;
    if (!password){
        return false;
    }
    return true;
}

/*Vai definir se o botão vai aparecer caso exista um erro ou não no email*/
function toggleEmailErrors(){
    const email = document.getElementById('email').value;
    if(!email){
        document.getElementById('email-required-error').style.display = "block";
    } else{
        document.getElementById('email-required-error').style.display = "none";
    }

    if (validateEmail(email)){
        document.getElementById('email-invalid-error').style.display = "none";
    }else{
        document.getElementById('email-invalid-error').style.display = "block";
    }
}

/*Vai definir se o botão vai aparecer caso exista um erro ou não na senha*/
function togglePasswordErrors(){
    const password = document.getElementById('password').value;
    if(!password){
        document.getElementById('password-required-error').style.display = "block";
    } else{
        document.getElementById('password-required-error').style.display = "none";
    }
}

/*Vai definir se o botão vai aparecer caso exista um erro ou não na senha ou email*/
function toggleButtonDisable(){
    const emailValid = isEmailValid();
    document.getElementById("recover-password-button").disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById('login-button').disabled = !emailValid || !passwordValid;
}
