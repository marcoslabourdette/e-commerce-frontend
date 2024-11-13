const originalText = "Envío gratis en compras superiores a $50.000";
const newText = "15% OFF con transferencia bancaria";
const terText = "❤ Gracias por tu visita ❤"
const label = document.querySelector(".toplabel");
const menuList = document.querySelector("#menuList");
const header = document.querySelector(".header");
const navbar = document.querySelector(".navbar");
const subList = document.querySelector(".sublist")
const carrito = document.querySelector(".carritoCompras");
const btnCarrito = document.querySelector(".bi-bag");
const btnMenu = document.querySelector(".bi-list");
const btnCerrarCarrito = document.querySelector(".modalHeader");
const modalOverlay = document.getElementById("modalOverlay");
const passwordInput = document.getElementById('userPassword');
const passwordInputConfirm = document.getElementById('userPasswordConfirm');
const togglePassword = document.getElementById('togglePassword');
const togglePasswordConfirm = document.getElementById('togglePasswordConfirm');


btnCarrito.addEventListener('click', () => {
    carrito.classList.add('visible');
    abrirOverlay();
});
btnCerrarCarrito.addEventListener('click',()=>{
    carrito.classList.remove('visible');
    cerrarOverlay();
})

btnMenu.addEventListener('click',()=>{
    navbar.classList.add('visible');
    abrirOverlay();
})

if(togglePassword && passwordInput){
    togglePassword.addEventListener('click', ()=>{
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.innerHTML = '<i class="bi bi-eye"></i>';  
        } else {
            passwordInput.type = 'password';  
            togglePassword.innerHTML = ' <i class="bi bi-eye-slash"></i>';
        }
       
    });
}

if (togglePasswordConfirm && passwordInputConfirm) {
    togglePasswordConfirm.addEventListener('click', () => {
        if (passwordInputConfirm.type === 'password') {
            passwordInputConfirm.type = 'text';
            togglePasswordConfirm.innerHTML = '<i class="bi bi-eye"></i>';
        } else {
            passwordInputConfirm.type = 'password';
            togglePasswordConfirm.innerHTML = '<i class="bi bi-eye-slash"></i>';
        }
    });
}

let currentText = originalText;

function abrirOverlay(){
    modalOverlay.style.display = "block";
    modalOverlay.style.opacity = "1";
    document.body.style.overflow = 'hidden'; 
}

modalOverlay.addEventListener('click',()=>{
    carrito.classList.remove('visible');
    navbar.classList.remove('visible');
    cerrarOverlay();
})
function cerrarOverlay(){
    modalOverlay.style.display = "none";
    modalOverlay.style.opacity = "0";
    document.body.style.overflow = 'visible';
}


function subMenu() {
    menuList.addEventListener('mouseenter', () => {
        subList.classList.add('visible');
    });

    menuList.addEventListener('mouseleave', () => {
        if (!subList.matches(':hover')) {
            subList.classList.remove('visible');
        }
    });

    subList.addEventListener('mouseenter', () => {
        subList.classList.add('visible');
    });

    subList.addEventListener('mouseleave', () => {
        subList.classList.remove('visible');
    });
}

function changeText() {
    if (currentText === originalText) {
        label.textContent = newText;
        currentText = newText;
    } else if(currentText === newText) {
        label.textContent = terText;
        currentText = terText;
    }
    else{
        label.textContent = originalText;
        currentText = originalText;
    }
}

setInterval(changeText, 15000);
subMenu();

let lastScrollTop = 0; 
window.addEventListener("scroll", function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.style.top = "-30px";
    } else {
        header.style.top = "0";
    }
    lastScrollTop = scrollTop; 
});

function adjustMenu() {
    const menuList = document.getElementById('menuList');
    menuList.style.cursor = 'pointer';
    menuList.style.paddingBottom = '0';
    const screenWidth = window.innerWidth; 

    let sublist = menuList.querySelector('.sublist-responsive');

    if (screenWidth < 700) {
        if (!sublist) {
            sublist = document.createElement('ul');
            sublist.classList.add('sublist-responsive');
            sublist.innerHTML = `
                <li><a href="">INFANTILES</a></li>
                <li><a href="">HALLOWEEN</a></li>
                <li><a href="">DEPORTES</a></li>
                <li><a href="">SUPERHÉROES</a></li>
                <li><a href="">ANIMALES</a></li>
                <li><a href="">MINIS</a></li>
            `;
            menuList.appendChild(sublist);  
            menuList.addEventListener('click', () => {
                sublist.classList.toggle('visible');
            });    
        }
    } else {
        if (sublist) {
            sublist.remove();
        }
    }
}

window.addEventListener('resize', adjustMenu);
window.addEventListener('DOMContentLoaded', adjustMenu);

