// CAMBIAR SECCIÓN
const navLinks = document.querySelectorAll("nav a");
const pages = document.querySelectorAll(".page");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const objetivo = link.getAttribute("href").substring(1);

    pages.forEach(p => p.classList.remove("show"));
    document.getElementById(objetivo).classList.add("show");
  });
});

// CARRITO
let total = 0;
const totalHTML = document.getElementById("total");

document.querySelectorAll("button[data-precio]").forEach(btn => {
  btn.addEventListener("click", () => {
    total += Number(btn.dataset.precio);
    totalHTML.textContent = total;
  });
});
