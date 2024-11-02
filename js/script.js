const originalText = "Envío gratis en compras superiores a $50.000";
const newText = "15% OFF con transferencia bancaria";
const terText = "❤ Gracias por tu visita ❤"
const label = document.querySelector(".toplabel");
const menuList = document.querySelector("#menuList");
const header = document.querySelector(".header");
const subList = document.querySelector(".sublist")
const carrito = document.querySelector(".carritoCompras");
const btnCarrito = document.querySelector(".bi-bag");
const btnCerrarCarrito = document.querySelector(".modalHeader");
const modalOverlay = document.getElementById("modalOverlay");

btnCarrito.addEventListener('click', () => {
    carrito.classList.add('visible');
    abrirOverlay();
});
btnCerrarCarrito.addEventListener('click',()=>{
    carrito.classList.remove('visible');
    cerrarOverlay();
})

let currentText = originalText;

function abrirOverlay(){
    modalOverlay.style.display = "block";
    modalOverlay.style.opacity = "1";
    document.body.style.overflow = 'hidden'; 
}

modalOverlay.addEventListener('click',()=>{
    carrito.classList.remove('visible');
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

