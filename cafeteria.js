const btnVolverArriba = document.getElementById("btn-volver-arriba");

window.addEventListener("scroll", () => {
    if(window.scrollY > 300) {
        btnVolverArriba.classList.add("visible");
    } else {
        btnVolverArriba.classList.remove("visible");
    }
});

btnVolverArriba.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const filtros = document.querySelectorAll(".filtro");
const items = document.querySelectorAll(".item-galeria");

filtros.forEach(boton => {
    boton.addEventListener("click", () => {
        // Quitar clase activa a todos
        filtros.forEach(b => b.classList.remove("activo"));
        boton.classList.add("activo");

        const categoria = boton.getAttribute("data-categoria");

        items.forEach(item => {
            if (categoria === "todos" || item.classList.contains(categoria)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
})