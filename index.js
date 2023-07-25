function login() {
    window.location.href = "pages/login/login.html";

}

function criar() {
    window.location.href = "pages/register/register.html";

}

function subMenu() {
    const sub = document.querySelector(".sub-menu");
    sub.style.display = "block";

    const barra = document.querySelector(".barra-de-menu");
    barra.style.display = "none";

    const img = document.querySelector(".logo");
    img.style.display = "none";

    
    const header = document.querySelector(".header");
    header.style.display = "block";
}

function fecharMenu() {
    const sub = document.querySelector(".sub-menu");
    sub.style.display = "none";

    const barra = document.querySelector(".barra-de-menu");
    barra.style.display = "block";

    const img = document.querySelector(".logo");
    img.style.display = "block";

    const header = document.querySelector(".header");
    header.style.display = "flex";
}