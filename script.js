/* Carrusel */
let index = 0;
const slides = document.querySelectorAll(".carousel img");
const dots = document.querySelectorAll(".dot");

function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    slides[i].classList.add("active");
    dots[i].classList.add("active");
}

function goToSlide(i) {
    index = i;
    showSlide(i);
}

setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
}, 3000);

/* Carrito */
let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const list = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    list.innerHTML = "";
    let sum = 0;

    cart.forEach(item => {
        list.innerHTML += `<li>${item.name} - S/ ${item.price}</li>`;
        sum += item.price;
    });

    total.textContent = sum;
}

function openCart() {
    document.getElementById("cart-window").style.display = "block";
}

function closeCart() {
    document.getElementById("cart-window").style.display = "none";
}

/* Chatbot simple */

function toggleChat() {
    const bot = document.getElementById("chatbot");
    bot.style.display = bot.style.display === "flex" ? "none" : "flex";
}

function sendMessage(event) {
    if (event.key === "Enter") {
        let input = document.getElementById("chat-input");
        let text = input.value.trim();
        if (text === "") return;

        let body = document.getElementById("chat-body");
        body.innerHTML += `<p><b>Tú:</b> ${text}</p>`;

        let response = "No entendí, pero pronto seré más inteligente 😅";

        if (text.includes("precio")) response = "Los precios están en la tienda 💖";
        if (text.includes("hola")) response = "¡Hola! Bienvenida a Kaychan Store 💕";

        body.innerHTML += `<p><b>Bot:</b> ${response}</p>`;

        input.value = "";
        body.scrollTop = body.scrollHeight;
    }
}
