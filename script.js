function showSection(id) {
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
}

function moveToCenter(img) {
    const carrusel = img.parentElement;
    const imgs = carrusel.querySelectorAll("img");

    imgs.forEach(i => {
        i.classList.remove("center-img");
        i.classList.add("small-img");
    });

    img.classList.remove("small-img");
    img.classList.add("center-img");
}

