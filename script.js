let total = 0;

function agregarCarrito(precio) {
    total += precio;
    document.getElementById("total").textContent = total;
}
