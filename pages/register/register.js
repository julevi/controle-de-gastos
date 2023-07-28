
/*Inicializa executando o comando. Se o usuário estiver logado, continuar na página de home */
window.onload = function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.location.href = "../home/home.html";
      }
})};

function abrirHome() {
    window.location.href = "../../index.html";
}

function onChangeEmail(){
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    toggleRegisterButtonDisable()
}

function onChangePassword(){
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordsMatch();
    toggleRegisterButtonDisable()
}

function onChangeConfirmPassword(){
    validatePasswordsMatch();
    toggleRegisterButtonDisable()
}

function register(){
    showLoading();
    const email = form.email().value;
    const password = form.password().value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        hideLoading();
        window.location.href = "../home/home.html";
    }).catch(error =>{
        hideLoading();
        alert(getErrorMessage(error));
    })
    
}

function getErrorMessage(error){
    if (error.code == "auth/email-already-in-use"){
        return "Email já está em uso"
    }
    return error.message;
}

function validatePasswordsMatch(){
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;
    form.confirmPasswordDoesntMatchError().style.display = password == confirmPassword  ? "none" : "block";
}

function toggleRegisterButtonDisable(){
    form.registerButton().disabled = !isFormValid();
}

function isFormValid(){
    const email = form.email().value;
    if (!email || !validateEmail(email)){
        return false;
    }
    const password = form.password().value;
    if (!password || password.length < 6){
        return false;
    }
    const confirmPassword = form.confirmPassword().value
    if (password != confirmPassword){
        return false;
    }

    return true;
}

const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),

    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),

    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),

    registerButton: () => document.getElementById('register-button')
}

function login(){
    showLoading();
    window.location.href = "../login/login.html"
}