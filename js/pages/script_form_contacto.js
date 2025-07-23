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

function validarTexto(idCampo, campoNombre) {
  const valor = document.getElementById(idCampo).value.trim();
  if (valor === "") {
    mostrarError(idCampo, `Debe ingresar su ${campoNombre}.`);
    return false;
  }
  if (!/^[a-zA-Z\s]+$/.test(valor)) {
    mostrarError(idCampo, `${campoNombre.charAt(0).toUpperCase() + campoNombre.slice(1)} inválido. Ingrese solo letras.`);
    return false;
  }
  limpiarError(idCampo);
  return true;
}

function validarTelefono(idCampo) {
  const valor = document.getElementById(idCampo).value.trim();
  if (valor === "" || valor.length <= 4) {
    mostrarError(idCampo, "Ingrese un teléfono válido (mínimo 5 dígitos).");
    return false;
  }
  if (!/^\d+$/.test(valor)) {
    mostrarError(idCampo, "El teléfono solo puede contener números.");
    return false;
  }
  limpiarError(idCampo);
  return true;
}

function validarMensaje(idCampo) {
  const valor = document.getElementById(idCampo).value.trim();
  if (valor === "") {
    mostrarError(idCampo, "Por favor escriba un mensaje.");
    return false;
  }
  if (valor.length < 10) {
    mostrarError(idCampo, "El mensaje debe tener al menos 10 caracteres.");
    return false;
  }
  limpiarError(idCampo);
  return true;
}

function validarFormulario() {
  const nombreValido = validarTexto("nombre", "nombre");
  const apellidoValido = validarTexto("apellido", "apellido");
  const telefonoValido = validarTelefono("telefono");
  const mensajeValido = validarMensaje("mensaje");

  if (nombreValido && apellidoValido && telefonoValido && mensajeValido) {
    // Mostrar alerta de éxito con SweetAlert2
    Swal.fire({
      icon: 'success',
      text: '¡A la brevedad nos estaremos contactando!',
      showConfirmButton: false,
      timer: 2000
    });

    // limpiar el formulario a los 2.5 segundos
    setTimeout(() => {
      document.getElementById("form").reset();

      const campos = ["nombre", "apellido", "telefono", "mensaje"];
      for (const id of campos) {
        const campo = document.getElementById(id);
        if (campo) {
          campo.classList.remove("is-valid");
        }
      }
    }, 2500);

    return false;
  } else {
    // Mostrar alerta de error con SweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Campos incompletos',
      text: 'Por favor, completá todos los campos correctamente.',
      confirmButtonColor: '#d33'
    });

    return false;
  }
}