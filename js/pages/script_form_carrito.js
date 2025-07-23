/*const Carrito = {
  productos: JSON.parse(localStorage.getItem('carrito')) || [],

  agregarProducto(id, nombre, precio) {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos[index].cantidad += 1;
    } else {
      this.productos.push({ id, codigo: id, nombre, precio, cantidad: 1 });
    }
    this.guardar();
    this.mostrarProductos();
  },

  eliminarProducto(id) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.guardar();
    this.mostrarProductos();
  },

  

  mostrarProductos() {
    const tbody = document.getElementById('tabla-body');
    const totalElemento = document.getElementById('tabla-total');
    if (!tbody || !totalElemento) return;

    tbody.innerHTML = '';
    let total = 0;

    this.productos.forEach(producto => {
      const fila = document.createElement('tr');

      // Código
      const tdCodigo = document.createElement('th');
      tdCodigo.scope = 'row';
      tdCodigo.textContent = producto.codigo;

      // Descripción
      const tdDescripcion = document.createElement('td');
      tdDescripcion.textContent = producto.nombre;

      // Cantidad editable
      const tdCantidad = document.createElement('td');
      const inputCantidad = document.createElement('input');
      inputCantidad.type = 'number';
      inputCantidad.min = 1;
      inputCantidad.value = producto.cantidad;
      inputCantidad.className = 'form-control form-control-sm';
      inputCantidad.style.width = '70px';
      inputCantidad.onchange = (e) => {
        const nuevaCantidad = parseInt(e.target.value);
        if (nuevaCantidad >= 1) {
          producto.cantidad = nuevaCantidad;
          this.guardar();
          this.mostrarProductos();
        }
      };
      tdCantidad.appendChild(inputCantidad);

      // Precio
      const tdPrecio = document.createElement('td');
      const subtotal = producto.precio * producto.cantidad;
      tdPrecio.textContent = `$${subtotal.toLocaleString('es-AR')}`;
      total += subtotal;

      // Botón Eliminar
      const tdBoton = document.createElement('td');
      const btnEliminar = document.createElement('button');
      btnEliminar.className = 'btn w-100 d-flex justify-content-center align-items-center filter-button';
      btnEliminar.innerHTML = `
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
      `;
      btnEliminar.onclick = () => this.eliminarProducto(producto.id);
      tdBoton.appendChild(btnEliminar);

      // Agregar columnas
      fila.appendChild(tdCodigo);
      fila.appendChild(tdDescripcion);
      fila.appendChild(tdCantidad);
      fila.appendChild(tdPrecio);
      fila.appendChild(tdBoton);

      tbody.appendChild(fila);
    });

    totalElemento.textContent = `$${total.toLocaleString('es-AR')}`;

    const contador = document.getElementById('contador-carrito');
    if (contador) {
      const cantidadTotal = this.productos.reduce((sum, p) => sum + p.cantidad, 0);
      contador.textContent = cantidadTotal;
    }
    
  },

  guardar() {
    localStorage.setItem('carrito', JSON.stringify(this.productos));
  }
};


document.addEventListener('DOMContentLoaded', () => {
  // Botones "Agregar al carrito"
  const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');

  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const id = boton.getAttribute('data-id');
      const nombre = boton.getAttribute('data-nombre');
      const precio = parseFloat(boton.getAttribute('data-precio'));

      if (!id || !nombre || isNaN(precio)) {
        alert('Error al agregar producto');
        return;
      }

      Carrito.agregarProducto(id, nombre, precio);
    });
  });

  // Botón "Vaciar carrito"
  const btnVaciar = document.getElementById('btn-vaciar-carrito');
  if (btnVaciar) {
    btnVaciar.addEventListener('click', () => {
      Carrito.vaciarCarrito();
    });
  }
});*/

const Carrito = {
  productos: JSON.parse(localStorage.getItem("carrito")) || [],

  agregarProducto(producto) {
    const index = this.productos.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      this.productos[index].cantidad += 1;
    } else {
      producto.cantidad = 1;
      this.productos.push(producto);
    }
    this.guardar();
    this.actualizarContador();
  },

  eliminarProducto(id) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.guardar();
    this.renderTabla();
    this.actualizarContador();
  },

  guardar() {
    localStorage.setItem("carrito", JSON.stringify(this.productos));
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
