document.getElementById("icon-menu").addEventListener("click", mostrar_menu);

function mostrar_menu() {
    document.getElementById("move-content").classList.toggle('move-container-all');
    document.getElementById("show-menu").classList.toggle('show-lateral');
}

// Agregar controladores de eventos a los enlaces dentro del menú
const enlacesMenu = document.querySelectorAll("#show-menu a");

enlacesMenu.forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        // Cierra el menú al hacer clic en un enlace
        document.getElementById("move-content").classList.remove('move-container-all');
        document.getElementById("show-menu").classList.remove('show-lateral');
    });
});
