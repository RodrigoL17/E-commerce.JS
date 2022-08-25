const listarProductos = () => {
  if (!listaProductos) {
    return null;
  }
  listaProductos.innerHTML = "";
  productos.forEach((producto) => {
    listaProductos.innerHTML += `<div class="card" style="width: 14rem">
                                      <img src="..." class="card-img-top" alt="..." />
                                      <div class="card-body">
                                        <h4 class="card-title producto-id">
                                          Codigo: ${producto.id}
                                        </h4>
                                        <h5 class="card-title producto-nombre">
                                          ${producto.nombre}
                                        </h5>
                                        <p class="card-text producto-descripcion">
                                          ${producto.descripcion}
                                        </p>
                                        <h5 class="card-title producto-precio">
                                          $${producto.precio}
                                        </h5>
                                        <button id="btn-AAC-${producto.id}" class="btn btn-outline-dark" type="button">Agregar al carrito</button>
                                      </div>
                                    </div>`;
  });
  funcionalidadBtnAAC();
};

function funcionalidadBtnAAC() {
  productos.forEach((producto) => {
    const btnAgregarAlCarrito = document.querySelector(
      `#btn-AAC-${producto.id}`
    );
    btnAgregarAlCarrito.addEventListener("click", () => {
      agregarAlCArrito(producto);
    });
  });
}

function agregarAlCArrito(producto) {
  let existe = carrito.find((prod) => prod.id === producto.id);
  if (existe === undefined) {
    producto.cantidad = 1;
    producto.total = producto.precio;
    carrito.push(producto);
  } else {
    let prodFind = carrito.find(
      (productoFind) => productoFind.id === producto.id
    );
    prodFind.cantidad++;
    producto.total = parseInt(producto.total) + parseInt(producto.precio);
  }
  crearCarrito();
}

const carritoDiv = document.querySelector(".carrito");
const carritoIcono = document.querySelector(".icono-carrito")


function crearCarrito() {
  carritoDiv.innerHTML = "";
  carrito.forEach((producto) => {
    carritoDiv.innerHTML += ` <ul class="d-flex  carrito-item dropdown-item">
                                <button class="btn eliminar-producto${producto.id} danger" type="button dropdown-item"><i class="bi bi-x-circle-fill text-danger"></i></button></li>
                                <li class="dropdown-item">cod: ${producto.id}</li>
                                <li class="dropdown-item">${producto.nombre}</li>
                                <li class="dropdown-item"> <button class="btn btn-sumar${producto.id}" type="button"><i class="bi bi-plus-circle-fill text-info"></i></button> cant: ${producto.cantidad} <button class="btn btn-restar${producto.id}" type="button"><i class="bi bi-dash-circle-fill text-info"></i></button></li>
                                <li class="dropdown-item">$ ${producto.total}</li>
                              </ul>
                                <hr class="dropdown-divider" />`;
                              });
                              localStorage.setItem("carrito", JSON.stringify(carrito));
  crearBtnFinCompra();                            
  eliminarProducto();
  funcionalidadBtnSumar();
  funcionalidadBtnRestar();
  notificacionCarrito();
}

function crearBtnFinCompra(){
  if (carrito !== []){
    carritoDiv.innerHTML += ` <button class="btn btn-success finalizar-compra" type="btn">
                                Finalizar Compra
                              </button>`
  }
}

function funcionalidadBtnSumar (){
  carrito.forEach(producto => { const btnSumar = document.querySelector(`.btn-sumar${producto.id}`);
  btnSumar.addEventListener("click", () => {
    sumarCant(producto);
  } )});
}

function sumarCant (producto){
  let existe = carrito.find(prodFind => prodFind.id === producto.id);
  if (existe){
    producto.cantidad ++
    producto.total = parseInt(producto.total) + parseInt(producto.precio)
  }
  crearCarrito();
}

function funcionalidadBtnRestar (){
  carrito.forEach(producto => { const btnSumar = document.querySelector(`.btn-restar${producto.id}`);
  btnSumar.addEventListener("click", () => {
    restarCant(producto);
  } )});
}

function restarCant (producto){
  let existe = carrito.find(prodFind => prodFind.id === producto.id);
  if (existe && producto.cantidad > 1){
    producto.cantidad --
    producto.total = parseInt(producto.total) - parseInt(producto.precio)
  } else {
    carrito = carrito.filter(
      (productoFilter) => productoFilter.id !== producto.id
    );
  }
  crearCarrito();
}

function eliminarProducto() {
  carrito.forEach((producto) => {
    const btnEliminarProducto = document.querySelector(
      `.eliminar-producto${producto.id}`
    );
    btnEliminarProducto.addEventListener("click", () => {
      carrito = carrito.filter(
        (productoFilter) => productoFilter.id !== producto.id
      );
      crearCarrito();
    });
  });
}


listarProductos();
crearCarrito();



function notificacionCarrito (){
  let acumulador = 0;
  carrito.forEach(producto =>{ 
    acumulador += producto.cantidad;
  })
  if (acumulador == 0){
    carritoIcono.innerHTML = ``
  }else{
    carritoIcono.innerHTML = `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${acumulador}
                                <span class="visually-hidden">unread messages</span>
                              </span>`
  }
  
}
