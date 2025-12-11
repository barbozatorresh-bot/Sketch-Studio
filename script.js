/* CAMBIO DE SECCIÓN */
function toggle(id) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("show"));
    setTimeout(() => {
        document.getElementById(id).classList.add("show");
    }, 50);
}

/* SLIDER */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(n) {
    slideIndex = n;
    slides.forEach((s, i) => s.classList.toggle("active", i === n));
    dots.forEach((d, i) => d.classList.toggle("active", i === n));
}

function currentSlide(n) { showSlide(n); }

/* CARRITO */
let cart = [];
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    let list = document.getElementById("cart-items");
    list.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - S/ ${item.price}`;
        list.appendChild(li);
        total += item.price;
    });

    document.getElementById("total").textContent = `Total: S/ ${total}`;
}

function toggleCart() {
    let cartBox = document.getElementById("cart");
    cartBox.style.display = cartBox.style.display === "block" ? "none" : "block";
}

/* CHATBOT */
function toggleChat() {
    let chat = document.getElementById("chatbot");
    chat.style.display = chat.style.display === "block" ? "none" : "block";
}

function sendChat() {
    let input = document.getElementById("chat-input");
    let content = document.getElementById("chat-content");

    let msg = input.value.trim();
    if (!msg) return;

    let p = document.createElement("p");
    p.textContent = "Tú: " + msg;
    content.appendChild(p);

    let bot = document.createElement("p");
    bot.textContent = "Bot: Gracias por tu mensaje 😊";
    content.appendChild(bot);

    input.value = "";
    content.scrollTop = content.scrollHeight;
}
