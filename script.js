/* TOGGLE SECCIONES */
function toggle(id){
  document.querySelectorAll('.section').forEach(s => s.style.display="none");
  const sec = document.getElementById(id);
  sec.style.display="block";
}

/* GALERÍA */
let index = 0;
const imgs = document.querySelectorAll(".carousel-img");
const dots = document.querySelectorAll(".dot");

function show(i){
  imgs.forEach(img=>img.classList.remove("active"));
  dots.forEach(dot=>dot.classList.remove("active"));
  index = (i + imgs.length) % imgs.length;
  imgs[index].classList.add("active");
  dots[index].classList.add("active");
}

document.getElementById("nextBtn").onclick = ()=> show(index+1);
document.getElementById("prevBtn").onclick = ()=> show(index-1);
dots.forEach((d,i)=> d.onclick = ()=> show(i));

/* AUTOSLIDE */
setInterval(()=> show(index+1), 4000);

/* CARRITO */
let cart = {};

function addToCart(id){
  const card = document.querySelector(`[data-id="${id}"]`);
  const price = parseFloat(card.dataset.price);
  const title = card.querySelector(".product-title").innerText;
  if(!cart[id]) cart[id]={qty:0, price, title};
  cart[id].qty++;
  renderCart();
  toggleCart();
}

function renderCart(){
  const box = document.getElementById("cartItems");
  let html = "";
  let total = 0;

  Object.keys(cart).forEach(k=>{
    const item = cart[k];
    total += item.qty * item.price;
    html += `<div>${item.title} x ${item.qty} - S/${(item.price*item.qty).toFixed(2)}</div>`;
  });

  box.innerHTML = html || "<div>Carrito vacío</div>";
  document.getElementById("cartTotal").innerText = "Total: S/ " + total.toFixed(2);
}

function toggleCart(){
  const c = document.getElementById("cartOverlay");
  c.style.display = (c.style.display=="flex" ? "none" : "flex");
}

function clearCart(){ cart={}; renderCart(); }

function checkout(){
  alert("Simulación de compra :)");
}

/* CHAT */
function toggleChat(){
  const w = document.getElementById("chatWindow");
  w.style.display = w.style.display=="flex" ? "none" : "flex";
}

/* MODO OSCURO */
const btn = document.getElementById("themeToggle");

btn.onclick = ()=>{
  document.body.classList.toggle("dark");
  btn.textContent = document.body.classList.contains("dark")
    ? "☀️ Modo Claro"
    : "🌙 Modo Oscuro";
};
