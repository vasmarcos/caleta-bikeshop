window.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const btnCuenta = document.getElementById("btn-mi-cuenta");
    const nombreSpan = document.getElementById("nombre-usuario");

    if (usuario) {
      if (btnCuenta) btnCuenta.classList.remove("d-none");
      if (nombreSpan) nombreSpan.textContent = usuario.nombre.split(" ")[0]; // solo el primer nombre
    } else {
      if (btnCuenta) btnCuenta.classList.add("d-none");
    }
  });