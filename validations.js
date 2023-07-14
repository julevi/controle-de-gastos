/*Verifica se o email foi escrito de forma válida */
function validateEmail(email){
    return /\S+@\S+/.test(email);
}
