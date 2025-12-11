/* ===========================
   CAMBIO DE SECCIONES
=========================== */
function toggle(sectionId) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.style.display = "none";
        sec.style.opacity = 0;
    });

    const section = document.getElementById(sectionId);
    section.style.display = "block";
    setTimeout(() => section.style.opacity = 1, 20);
}

/* ===========================
   SLIDER CON PUNTITOS
=========================== */
let index = 0;
const images = document.querySelectorAll(".carousel-img");
const dots = document.querySelectorAll(".dot");

function showSlide(n) {
    images.forEach(img => img.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    images[n].classList.add("active");
    dots[n].classList.add("active");
}

document.getElementById("prevBtn").onclick = () => {
    index = (index - 1 + images.length) % images.length;
    showSlide(index);
};

document.getElementById("nextBtn").onclick = () => {
    index = (index + 1) % images.length;
    showSlide(index);
};

dots.forEach(dot => {
    dot.onclick = () => {
        index = Number(dot.dataset.index);
        showSlide(index);
    };
});

/* ===========================
   CARRITO
=========================== */
let cart = {};

function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    updateCart();
}

function updateCart() {
    const itemsDiv = document.getElementById("cartItems");
    itemsDiv.innerHTML = "";

    let total = 0;

    for (let id in cart) {
        let qty = cart[id];
        let price = document.querySelector(`[data-id="${id}"]`).dataset.price;
        total += qty * price;

        itemsDiv.innerHTML += `
            <div class="cart-item">
                <span>${id} (${qty})</span>
                <button class="qty-btn" onclick="removeItem('${id}')">−</button>
            </div>
        `;
    }

    document.getElementById("cartTotal").innerText = `Total: S/ ${total.toFixed(2)}`;
}

function removeItem(id) {
    if (cart[id]) {
        cart[id]--;
        if (cart[id] === 0) delete cart[id];
    }
    updateCart();
}

function toggleCart() {
    const cartOverlay = document.getElementById("cartOverlay");
    cartOverlay.style.display = cartOverlay.style.display === "block" ? "none" : "block";
}

function clearCart() {
    cart = {};
    updateCart();
}

function checkout() {
    alert("Gracias por tu compra ❤️");
}

/* ===========================
   CHATBOT
=========================== */
function toggleChat() {
    const chat = document.getElementById("chatWindow");
    chat.style.display = chat.style.display === "block" ? "none" : "block";
}

function sendMessage() {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

   let reply = "No entendí eso 😅";

   textLower = text.toLowerCase();
   if (textLower.includes("precio")) reply = "Los precios están en cada producto. ❤️";
   if (textLower.includes("envio") || textLower.includes("envío")) reply = "Hago envíos nacionales por Olva.";
   if (textLower.includes("pago")) reply = "Métodos de pago: Yape, Plin.";
   if (textLower.includes("stock")) reply = "Siempre repongo stock 😄";

    setTimeout(() => addMessage(reply, "bot"), 400);
}

function addMessage(msg, type) {
    const body = document.getElementById("chatBody");
    body.innerHTML += `<div class="chat-msg ${type}">${msg}</div>`;
    body.scrollTop = body.scrollHeight;
}
