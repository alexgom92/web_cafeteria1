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

// Función de filtrado
function filtrarGaleria(categoria) {
    items.forEach(item => {
        if (item.classList.contains(categoria)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// Variables de control del intervalo
let intervaloAutomatico;
let timeoutReinicio;

// Filtro automático rotativo
const categorias = ['desayuno', 'bebida', 'postre'];
let currentCategoryIndex = 0;

function aplicarFiltroAutomaticamente() {
    filtros.forEach(btn => btn.classList.remove('activo'));

    const categoriaActual = categorias[currentCategoryIndex];
    const buttonToClick = document.querySelector(`.filtro[data-categoria="${categoriaActual}"]`);
    if (buttonToClick) {
        buttonToClick.classList.add('activo');
        filtrarGaleria(categoriaActual);
    }

    currentCategoryIndex = (currentCategoryIndex + 1) % categorias.length;
}

// Iniciar el filtro automático
function iniciarFiltroAutomatico() {
    intervaloAutomatico = setInterval(aplicarFiltroAutomaticamente, 6000);
}

// Parar el automático y reiniciarlo tras 15 segundos
function pausarYReanudarFiltroAutomatico() {
    clearInterval(intervaloAutomatico);
    clearTimeout(timeoutReinicio);
    timeoutReinicio = setTimeout(() => {
        iniciarFiltroAutomatico();
    }, 15000); // 15 segundos
}

// Filtrado manual
filtros.forEach(boton => {
    boton.addEventListener("click", () => {
        filtros.forEach(b => b.classList.remove("activo"));
        boton.classList.add("activo");

        const categoria = boton.getAttribute("data-categoria");
        filtrarGaleria(categoria);

        pausarYReanudarFiltroAutomatico();
    });
});

// ✅ Iniciar automáticamente con "desayuno"
filtrarGaleria("desayuno");
document.querySelector(`.filtro[data-categoria="desayuno"]`)?.classList.add("activo");
iniciarFiltroAutomatico();

