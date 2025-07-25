document.addEventListener('DOMContentLoaded', () => {
  const menuCuenta = document.getElementById('menuCuenta');
  const menuCuentaWrapper = document.getElementById('menu-cuenta-wrapper');
  const nombreUsuario = localStorage.getItem('nombreUsuario');

  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

  if (menuCuenta && usuario) {
    menuCuenta.textContent = usuario.nombre;
  } else if (menuCuentaWrapper) {
    menuCuentaWrapper.remove(); // Oculta el bloque si no hay usuario
  }

  const btnCerrarSesion = document.getElementById('cerrar-sesion');
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', (e) => {
      e.preventDefault();

      Swal.fire({
        title: '¿Cerrar sesión?',
        text: 'Se eliminarán los datos de usuario guardados.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // 🔴 Borrar datos del usuario
          localStorage.removeItem('nombreUsuario');
          localStorage.removeItem('emailUsuario');
          localStorage.removeItem('rolUsuario');
          Swal.fire({
            title: 'Sesión cerrada',
            text: 'Tus datos han sido eliminados.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            location.href = '../pages/mi_cuenta.html';
          });
        }
      });
    });
  }
  
});

