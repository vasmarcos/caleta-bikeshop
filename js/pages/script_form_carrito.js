// Verificar si hay un usuario logueado
try {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuarioActivo || typeof usuarioActivo !== "object") {
    throw new Error("No hay sesión activa o el objeto de usuario es inválido.");
  }// Mostrar el nombre del usuario logueado
  const menuCuenta = document.getElementById("menuCuenta");
  if (menuCuenta) {
    menuCuenta.textContent = usuarioActivo.nombre || "Mi cuenta";
  }
} catch (error) {
  console.warn("Error de sesión:", error.message);

  Swal.fire({
    icon: "warning",
    title: "Acceso denegado",
    text: "Debes iniciar sesión para acceder al carrito.",
    confirmButtonText: "Iniciar sesión"
  }).then(() => {
    window.location.href = "../pages/mi_cuenta.html";
  });


  const Carrito = {
    productos: [],
    usuario: null,

    init() {
      const user = JSON.parse(localStorage.getItem("usuarioLogueado"));
      if (!user || !user.email) return;

      this.usuario = user.email;
      const data = JSON.parse(localStorage.getItem("carrito_" + this.usuario));
      this.productos = data || [];
      this.renderTabla?.();
      this.actualizarContador?.();
    },

    guardar() {
      if (this.usuario) {
        localStorage.setItem("carrito_" + this.usuario, JSON.stringify(this.productos));
      }
    },

    agregarProducto(producto) {
      const index = this.productos.findIndex(p => p.id === producto.id);
      if (index !== -1) {
        this.productos[index].cantidad += 1;
      } else {
        producto.cantidad = 1;
        this.productos.push(producto);
      }
      this.guardar();
      this.actualizarContador?.();
    },

    eliminarProducto(id) {
      this.productos = this.productos.filter(p => p.id !== id);
      this.guardar();
      this.renderTabla?.();
      this.actualizarContador?.();
    },

    vaciarCarrito() {
      this.productos = [];
      this.guardar();
      this.renderTabla?.();
      this.actualizarContador?.();
    },

    obtenerTotal() {
      return this.productos.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    },

    renderTabla() {
      const tbody = document.getElementById("tabla-body");
      const totalEl = document.getElementById("tabla-total");

      if (!tbody || !totalEl) return;

      tbody.innerHTML = "";
      this.productos.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td class="text-center">${p.id}</td>
        <td class="text-center">${p.nombre}</td>
        <td class="text-center">${p.cantidad}</td>
        <td class="text-center">$${(p.precio * p.cantidad).toLocaleString('es-AR')}</td>
        <td class="text-center">
          <button class="btn btn-danger btn-sm" onclick="Carrito.eliminarProducto('${p.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5m2.5
            0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1
            0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0
            1-2 2H5a2 2 0 0 1-2-2V4H2.5a1 1 0 0 1-1-1V2a1
            1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1
            1h3.5a1 1 0 0 1 1 1zM4.118 4 4
            4.059V13a1 1 0 0 0 1 1h6a1 1 0 0
            0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
          </button>
        </td>
      `;
        tbody.appendChild(tr);
      });

      totalEl.textContent = `$${this.obtenerTotal().toLocaleString('es-AR')}`;
    },

    actualizarContador() {
      const contador = document.getElementById("contador-carrito");
      const total = this.productos.reduce((acc, p) => acc + p.cantidad, 0);
      if (contador) contador.textContent = total;
    },

    vaciarCarrito() {
      this.productos = [];
      this.guardar();
      this.renderTabla();
    },

  };

  // Eventos para bicis.html
  document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".btn-agregar-carrito");
    botones.forEach(btn => {
      btn.addEventListener("click", () => {
        Toastify({
          text: "Se ha agregado un nuevo producto al carrito",
          gravity: "bottom", // Aparece en la parte inferior
        }).showToast();
        const producto = {
          id: btn.dataset.id,
          nombre: btn.dataset.nombre,
          precio: parseFloat(btn.dataset.precio)
        };
        Carrito.agregarProducto(producto);
      });

    });

    // Botón "Vaciar carrito"
    const btnVaciar = document.getElementById('btn-vaciar-carrito');
    if (btnVaciar) {
      btnVaciar.addEventListener('click', () => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: 'Se eliminarán todos los productos del carrito',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#6c757d',
          confirmButtonText: 'Sí, vaciar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            Carrito.vaciarCarrito();
            Swal.fire({
              title: 'Carrito vacío',
              text: 'Todos los productos fueron eliminados',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          }
        });
      });
    }

    //Boton confirmar compra
    const btnConfirmar = document.getElementById('btn-confirmar-carrito');

    if (btnConfirmar) {
      btnConfirmar.addEventListener('click', () => {
        if (Carrito.productos.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'Agregá al menos un producto antes de confirmar la compra.',
          });
          return;
        }

        Swal.fire({
          title: '¿Deseás confirmar la compra?',
          text: 'Se procesará tu pedido con los productos seleccionados.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#198754',
          cancelButtonColor: '#6c757d',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Aquí podrías enviar los datos al backend, guardar en base de datos, etc.
            Carrito.vaciarCarrito(); // Vacía el carrito después de la "compra"

            Swal.fire({
              icon: 'success',
              title: '¡Compra confirmada!',
              text: 'Gracias por tu compra en Caleta Bike Shop.',
              timer: 2000,
              showConfirmButton: false
            });
          }
        });
      });
    }


    // Si estamos en mi_carrito.html, renderizamos la tabla
    if (document.getElementById("tabla-body")) {
      Carrito.renderTabla();
    }

    Carrito.actualizarContador();
  });

  document.addEventListener("DOMContentLoaded", () => {
    Carrito.init();
  });