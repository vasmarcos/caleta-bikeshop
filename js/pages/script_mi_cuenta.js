// Simulación de usuarios como si fuera una API
const usuariosAPI = [
  { id: 1, username: "admin", password: "12345678", nombre: "Administrador", email: "admin@ejemplo.com" },
  { id: 2, username: "marcos@user", password: "clave123", nombre: "Marcos Vásquez", email: "marcosVasquez@email.com" },
  { id: 3, username: "juan@user", password: "juan123", nombre: "Juan Perez", email: "juanPerez@email.com" },
  { id: 4, username: "soledad@user", password: "soledad123", nombre: "Soledad Aguilar", email: "soledadAguilar@email.com" }
];

function simularFetchUsuarios(username, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const usuario = usuariosAPI.find(u => u.username === username && u.password === password);
      resolve(usuario || null);
    }, 500);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("id_form");
  const usernameInput = document.getElementById("username");
  const rememberMeCheckbox = document.getElementById("rememberMe");

  // Cargar usuario recordado si existe
  const recordado = localStorage.getItem("usuarioRecordado");
  if (recordado) {
    usernameInput.value = recordado;
    rememberMeCheckbox.checked = true;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página

    const username = usernameInput.value.trim();
    const password = document.getElementById("password").value.trim();
    const recordar = rememberMeCheckbox.checked;

    if (!username || !password) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    const usuario = await simularFetchUsuarios(username, password);

    if (usuario) {
      if (recordar) {
        localStorage.setItem("usuarioRecordado", username);
      } else {
        localStorage.removeItem("usuarioRecordado");
      }

      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

      Swal.fire({
        icon: "success",
        title: `¡Bienvenido ${usuario.nombre}!`,
        text: "Redirigiendo al sitio...",
        timer: 3000,
        showConfirmButton: false
      });

      setTimeout(() => {
        window.location.href = "../index.html";
      }, 3000);

    } else {
      Swal.fire("Error", "Usuario o contraseña incorrectos", "error");
    }
  });
});