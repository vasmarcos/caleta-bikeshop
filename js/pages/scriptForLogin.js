document.addEventListener('DOMContentLoaded', () => {
  const menuCuenta = document.getElementById('menuCuenta');
  const menuCuentaWrapper = document.getElementById('menu-cuenta-wrapper');
  const nombreUsuario = localStorage.getItem('nombreUsuario');

  if (menuCuenta && nombreUsuario) {
    menuCuenta.textContent = nombreUsuario;
  } else if (menuCuentaWrapper) {
    menuCuentaWrapper.remove();
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
          // Si querés limpiar todo:
          // localStorage.clear();

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