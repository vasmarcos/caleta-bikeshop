function mostrarError(idCampo, mensaje) {
    const campo = document.getElementById(idCampo);
    const error = document.getElementById("error-" + idCampo);
    campo.classList.add("is-invalid");
    campo.classList.remove("is-valid");
    error.textContent = mensaje;
    error.style.display = "block";
}

function limpiarError(idCampo) {
    const campo = document.getElementById(idCampo);
    const error = document.getElementById("error-" + idCampo);
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    error.style.display = "none";
}

function validacion(campo) {
    const valor = document.getElementById(campo).value.trim();

    if (valor === "") {
        mostrarError(campo, "Este campo es obligatorio.");
        return false;
    }

    if (campo === "password" && (valor.length < 8 || valor.length > 15)) {
        mostrarError(campo, "La contraseña debe tener entre 8 y 15 caracteres.");
        return false;
    }

    limpiarError(campo);
    return true;
}

function validarLogin() {
    const usuarioValido = validacion("username");
    const contraseñaValida = validacion("password");
    const errorDiv = document.getElementById("error");
    const exitoDiv = document.getElementById("exito");

    if (!usuarioValido || !contraseñaValida) {
        exitoDiv.classList.add("d-none");
        errorDiv.classList.remove("d-none");
        setTimeout(() => {
            errorDiv.style.opacity = 1;
        }, 100);
        return false;
    }

    const usuario = document.getElementById("username").value.trim();
    const contraseña = document.getElementById("password").value.trim();
    const recordar = document.getElementById("rememberMe").checked;

    // Guardar o limpiar usuario en localStorage
    if (recordar) {
        localStorage.setItem("usuarioRecordado", usuario);
    } else {
        localStorage.removeItem("usuarioRecordado");
    }

    if (usuario === "admin" && contraseña === "12345678") {
        errorDiv.classList.add("d-none");

        // Mostrar mensaje de éxito con fade-in
        exitoDiv.classList.remove("d-none");
        setTimeout(() => {
            exitoDiv.style.opacity = 1;
        }, 100);

        // Redirigir después de 3 segundos
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 3000);

        return false;
    } else {
        // Mostrar error y limpiar campos
        exitoDiv.classList.add("d-none");
        errorDiv.classList.remove("d-none");
        setTimeout(() => {
            errorDiv.style.opacity = 1;
        }, 100);

        // Limpia campos
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        // Opcional: quitar clases de validación
        document.getElementById("username").classList.remove("is-valid", "is-invalid");
        document.getElementById("password").classList.remove("is-valid", "is-invalid");

        return false;
    }
}

// Al cargar la página: si hay usuario guardado, lo insertamos
window.addEventListener("DOMContentLoaded", () => {
    const usuarioGuardado = localStorage.getItem("usuarioRecordado");
    if (usuarioGuardado) {
        document.getElementById("username").value = usuarioGuardado;
        document.getElementById("rememberMe").checked = true;
    }
});