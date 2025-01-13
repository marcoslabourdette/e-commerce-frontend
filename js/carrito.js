let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const localSave = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito() {
    var nombre = document.getElementById('modalNombre').textContent;
    var precio = document.getElementById('modalPrecio').textContent;
    var imagen = document.getElementById('modalImagen').src;
    var cantidad = parseInt(document.getElementById('cantidad').value);
    var id = document.getElementById('modalProducto').getAttribute('data-producto-id');

    var producto = {
        id: id,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: cantidad
    };

    var productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push(producto);
    }
    localSave();
    mostrarNotificacion(nombre, imagen, cantidad, precio);
    console.log("Carrito actualizado:", carrito);
    actualizarCarritoVista();
    cerrarOverlay(); 
}
function actualizarCarritoVista() {
    var carritoContenido = document.querySelector('.carritoContenido');
    carritoContenido.innerHTML = '';

    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>El carrito de compras está vacío 💔</p>';
    } else {
        let ul = document.createElement('ul');

        carrito.forEach(function (producto, index) {
            let li = document.createElement('li');
            li.classList.add('productoCarrito');

            let divInfoTop = document.createElement('div');
            divInfoTop.classList.add('infoTop');

            let img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = producto.nombre;
            img.width = 70; 

            let nombre = document.createElement('strong');
            nombre.textContent = producto.nombre;

            divInfoTop.appendChild(img);
            divInfoTop.appendChild(nombre);

            let divInfoBottom = document.createElement('div');
            divInfoBottom.classList.add('infoBottom');
            let divCantidad = document.createElement('div');
       
            let btnDecrementar = document.createElement('button');
            btnDecrementar.classList.add('btn-decrementar');
            btnDecrementar.textContent = '-';

            let btnIncrementar = document.createElement('button');
            btnIncrementar.classList.add('btn-incrementar');
            btnIncrementar.textContent = '+';
       

            let inputCantidad = document.createElement('input');
            inputCantidad.type = 'number';
            inputCantidad.style.outline = 'none';
            inputCantidad.style.border = '1px solid var(--main-color)';
            inputCantidad.style.width = '50px'
            inputCantidad.style.textAlign = 'center';
            inputCantidad.style.appearance = 'none';
            inputCantidad.style.paddingLeft = '15px';
            inputCantidad.readOnly = 'true';
            inputCantidad.value = producto.cantidad;

            
            btnDecrementar.addEventListener("click", () => {
                let value = parseInt(inputCantidad.value);
                if (value > 1) {
                    inputCantidad.value = value - 1;
                }
            });

            btnIncrementar.addEventListener("click", () => {
                let value = parseInt(inputCantidad.value);
                if (value < 10) {
                    inputCantidad.value = value + 1;
                }
            });

            divCantidad.appendChild(btnDecrementar);
            divCantidad.appendChild(inputCantidad);
            divCantidad.appendChild(btnIncrementar);
            
            let precioUnitario = document.createElement('p');
            precioUnitario.textContent = `Precio Unitario $${producto.precio}`;

            let total = document.createElement('p');
            total.textContent = `Total: $${(parseInt(producto.precio) * inputCantidad.value)},00`;

            
            let eliminarBtn = document.createElement('i');
            eliminarBtn.classList.add('eliminarProducto');
            eliminarBtn.innerHTML = '<i class="bi bi-trash3"></i>';

            eliminarBtn.addEventListener('click', function () {
                carrito.splice(index, 1);
                localSave();
                actualizarCarritoVista();
            });
            divInfoBottom.appendChild(divCantidad)
            divInfoBottom.appendChild(precioUnitario);
            divInfoBottom.appendChild(total);
            divInfoBottom.appendChild(eliminarBtn);

            li.appendChild(divInfoTop);
            li.appendChild(divInfoBottom);
            ul.appendChild(li);
        });
        let botonComprar = document.createElement('button');
        botonComprar.classList.add("botonCompra");
        botonComprar.innerText = "Iniciar compra";
        carritoContenido.appendChild(ul);
        carritoContenido.appendChild(botonComprar);
    }
}

function mostrarNotificacion(nombre, imagen,cantidad,precio) {
    const notificacion = document.getElementById('notificacionProducto');
    const notificacionImagen = document.getElementById('notificacionImagen');
    const notificacionNombre = document.getElementById('notificacionNombre');
    const notificacionCantidad = document.getElementById('notificacionCantidad');
    notificacionImagen.src = imagen;
    notificacionNombre.textContent = nombre;
    notificacionCantidad.textContent = cantidad + ` x ${precio}`;
    notificacion.classList.add('show');
    setTimeout(() => {
        notificacion.classList.remove('show');
    }, 2000); 
}

document.addEventListener('DOMContentLoaded', function () {
    actualizarCarritoVista();
});
