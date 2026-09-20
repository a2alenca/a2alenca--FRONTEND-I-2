// Lista
let listaProductos = [];
let carrito = [];

// DOM
const contenedorCatalogo = document.getElementById("catalogo");
const mensajeError = document.getElementById("mensaje-error");
const formularioBusqueda = document.getElementById("formulario-busqueda");
const cajaBuscar = document.getElementById("caja-buscar");
const listaCarrito = document.getElementById("lista-carrito");
const totalPagar = document.getElementById("total-pagar");
const btnVaciar = document.getElementById("btn-vaciar");


//  Fetch API

function cargarProductos() {
  fetch("assets/js/productos.json")
    .then(function (respuesta) {
      if (!respuesta.ok) {
        throw new Error("Error en la petición");
      }
      return respuesta.json();
    })
    .then(function (datos) {
      listaProductos = datos;
      mostrarProductos(listaProductos);
    })
    .catch(function (error) {
      // Muestra el mensaje de error amigable al usuario
      mensajeError.classList.remove("d-none");
      console.log(error);
    });
}


// renderizar el catálogo en el DOM

function mostrarProductos(productos) {
  contenedorCatalogo.innerHTML = "";

  if (productos.length === 0) {
    contenedorCatalogo.innerHTML = "<p class='text-muted'>No se encontraron juegos con ese nombre.</p>";
    return;
  }

  for (let i = 0; i < productos.length; i++) {
    const p = productos[i];

    const columna = document.createElement("div");
    columna.className = "col";
    columna.innerHTML = `
      <div class="card h-100">
        <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
        <div class="card-body d-flex flex-column">
          <span class="badge bg-secondary mb-2 align-self-start">${p.categoria}</span>
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text fw-bold text-primary">$${p.precio}</p>
          <button class="btn btn-success mt-auto" onclick="agregarAlCarrito(${p.id})">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;
    contenedorCatalogo.appendChild(columna);
  }
}


// Buscar producto
formularioBusqueda.addEventListener("submit", function (evento) {
  evento.preventDefault(); 

  const texto = cajaBuscar.value.toLowerCase().trim();

  const filtrados = listaProductos.filter(function (p) {
    return p.nombre.toLowerCase().includes(texto);
  });

  mostrarProductos(filtrados);
});


// Barra navegacion
document.getElementById("link-todos").addEventListener("click", function (e) {
  e.preventDefault();
  mostrarProductos(listaProductos);
});

document.getElementById("link-accion").addEventListener("click", function (e) {
  e.preventDefault();
  const filtrados = listaProductos.filter(function (p) {
    return p.categoria === "Accion";
  });
  mostrarProductos(filtrados);
});

document.getElementById("link-aventura").addEventListener("click", function (e) {
  e.preventDefault();
  const filtrados = listaProductos.filter(function (p) {
    return p.categoria === "Aventura";
  });
  mostrarProductos(filtrados);
});


// Agregar a carrito
function agregarAlCarrito(id) {
  const juego = listaProductos.find(function (p) {
    return p.id === id;
  });

  if (juego) {
    carrito.push(juego);
    actualizarCarrito();
  }
}


// Actualizar carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    listaCarrito.innerHTML = "<li class='list-group-item text-muted text-center'>El carrito está vacío</li>";
    totalPagar.textContent = "$0";
    return;
  }

  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${carrito[i].nombre}</span>
      <span class="badge bg-primary rounded-pill">$${carrito[i].precio}</span>
    `;
    listaCarrito.appendChild(li);
  }

  totalPagar.textContent = "$" + total;
}

// Vaciar carrito
btnVaciar.addEventListener("click", function () {
  carrito = [];
  actualizarCarrito();
});

// Carga producto
cargarProductos();