/*Verifica se o email é válido para habiliatar o recuperar senha*/
function onChangeEmail(){
    toggleButtonDisable();
    toggleEmailErrors();
}

function onChangePassword(){
    toggleButtonDisable();
    togglePasswordErrors();
}

function login() {
    showLoading();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            hideLoading();
            window.location.href = "home.html";
        })
        .catch(error => {
            hideLoading();
            alert(getErrorMessage(error))
        });
}

function getErrorMessage(error){
        if (error.code =="auth/user-not-found") {
            return "Usuário não encontrado";
        }
        if (error.code == "auth/wrong-password"){
            return "Senha inválida"
        }
        return error.message;
}

function register(){
    window.location.href = "register.html"
}

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

function isEmailValid(){
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid(){
    const password = document.getElementById('password').value;
    if (!password){
        return false;
    }
    return true;
}

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

function togglePasswordErrors(){
    const password = document.getElementById('password').value;
    if(!password){
        document.getElementById('password-required-error').style.display = "block";
    } else{
        document.getElementById('password-required-error').style.display = "none";
    }
}

function toggleButtonDisable(){
    const emailValid = isEmailValid();
    document.getElementById("recover-password-button").disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById('login-button').disabled = !emailValid || !passwordValid;
}
