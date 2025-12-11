// --------- VARIABLES GLOBALES ----------
let carrito = [];
const carritoBtn = document.getElementById("cart-btn");
const carritoMenu = document.getElementById("cart-menu");
const carritoLista = document.getElementById("cart-items");
const carritoTotal = document.getElementById("cart-total");
const contadorCarrito = document.getElementById("cart-count");

// ---------- ABRIR / CERRAR CARRITO ----------
carritoBtn.addEventListener("click", () => {
    carritoMenu.classList.toggle("open");
});

// ---------- AGREGAR PRODUCTOS ----------
const botonesAgregar = document.querySelectorAll(".add-to-cart");

botonesAgregar.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const producto = e.target.closest(".product-card");
        const nombre = producto.querySelector("h3").textContent;
        const precio = parseFloat(producto.dataset.price);

        agregarAlCarrito(nombre, precio);
    });
});

function agregarAlCarrito(nombre, precio) {
    const existente = carrito.find(item => item.nombre === nombre);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            nombre,
            precio,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

// ---------- ACTUALIZAR CARRITO ----------
function actualizarCarrito() {
    carritoLista.innerHTML = "";

    let total = 0;
    let itemsTotales = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        itemsTotales += item.cantidad;

        const li = document.createElement("li");
        li.classList.add("cart-item");

        li.innerHTML = `
            <span>${item.nombre} x${item.cantidad}</span>
            <div class="actions">
                <button class="menos">-</button>
                <button class="mas">+</button>
                <button class="eliminar">x</button>
            </div>
        `;

        // botones internos
        li.querySelector(".menos").addEventListener("click", () => cambiarCantidad(item.nombre, -1));
        li.querySelector(".mas").addEventListener("click", () => cambiarCantidad(item.nombre, 1));
        li.querySelector(".eliminar").addEventListener("click", () => eliminarItem(item.nombre));

        carritoLista.appendChild(li);
    });

    carritoTotal.textContent = total.toFixed(2);
    contadorCarrito.textContent = itemsTotales;
}

// ---------- CAMBIAR CANTIDAD ----------
function cambiarCantidad(nombre, cantidad) {
    const item = carrito.find(i => i.nombre === nombre);
    if (!item) return;

    item.cantidad += cantidad;
    if (item.cantidad <= 0) {
        eliminarItem(nombre);
        return;
    }

    actualizarCarrito();
}

// ---------- ELIMINAR ----------
function eliminarItem(nombre) {
    carrito = carrito.filter(i => i.nombre !== nombre);
    actualizarCarrito();
}

// ---------- CERRAR CARRITO SI SE HACE CLICK FUERA ----------
document.addEventListener("click", (e) => {
    if (!carritoMenu.contains(e.target) && !carritoBtn.contains(e.target)) {
        carritoMenu.classList.remove("open");
    }
});
