
// Renderizado de Productos
const listarProductos = async () => {
  const texto = barraBuscar.value.toLocaleLowerCase();
  listaProductos.innerHTML = "";
  try{
    productos = await recuperarProds();
    productos.forEach((producto) => {
      let nombre = producto.nombre.toLocaleLowerCase();
    if (nombre.indexOf(texto) !== -1){
    listaProductos.innerHTML += `<div class="card" style="width: 14rem">
                                      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" />
                                      <div class="card-body"
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
                                  }});
  }
  catch(error){
    console.error("error: ", error)
    if (listaProductos.innerHTML === ``){
      listaProductos.innerHTML += `<div class="div-no-encontrado">
                                    <i class="bi bi-emoji-frown-fill"></i>
                                    <p class="p-productos">Lo sentimos... No hemos encotrado ese producto</p>
                                  </div>`
    }
  }
  funcionalidadBtnAAC();
};

//Boton Agregar al Carrito

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

//Renderizado del Carrito

function crearCarrito() {
  carritoDiv.innerHTML = "";
  carrito.forEach((producto) => {
    carritoDiv.innerHTML += ` <ul class="carrito-item dropdown-item">
                                <button class="btn eliminar-producto${producto.id} danger" type="button dropdown-item"><i class="bi bi-x-circle-fill text-danger"></i></button></li>
                                <li class="dropdown-item">cod: ${producto.id}</li>
                                <li class="dropdown-item">${producto.nombre}</li>
                                <li class="dropdown-item"> <button class="btn btn-sumar${producto.id}" type="button"><i class="bi bi-plus-circle-fill text-info"></i></button> cant: ${producto.cantidad} <button class="btn btn-restar${producto.id}" type="button"><i class="bi bi-dash-circle-fill text-info"></i></button></li>
                                <li class="dropdown-item">$ ${producto.total}</li>
                              </ul>`;
                              });
                              localStorage.setItem("carrito", JSON.stringify(carrito));
  crearBtnFinCompra();                            
  eliminarProducto();
  funcionalidadBtnSumar();
  funcionalidadBtnRestar();
  notificacionCarrito();
  renderizarModal();
}

//Botones del carrito y badge

function crearBtnFinCompra(){
  if (carrito.length){
    carritoDiv.innerHTML += ` <button class="btn btn-success finalizar-compra" data-bs-toggle="modal" data-bs-target="#Modal" type="btn">
                                Finalizar Compra
                              </button>`
  }else{
    carritoDiv.innerHTML += `<p>No hay productos en el carrito</p>`
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

//badge carrito

function notificacionCarrito (){
  let acumulador = 0;
  carrito.forEach(producto =>{ 
    acumulador += producto.cantidad;
  })
  if (acumulador == 0){
    carritoIcono.innerHTML = ``
  }else{
    carritoIcono.innerHTML = `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${acumulador}
                              </span>`
  }
  
}

listarProductos();
crearCarrito();

//Barra de busqueda

btnBuscar.addEventListener("click",listarProductos);
barraBuscar.addEventListener("keyup", listarProductos);

//Finalizar Compra



//modal



function renderizarModal  () {
  cuerpoModal.innerHTML =``
  carrito.forEach(producto =>{
    cuerpoModal.innerHTML += `<ul class="ul-fin-compra">
                                <img src="" alt="">
                                <li>${producto.nombre}</li>
                                <li>${producto.cantidad}</li>
                                <li>$${producto.total}</li>
                              </ul>`
  });
  let totalAPagar = carrito.reduce((acc,producto) => {return parseInt(acc) + parseInt(producto.total)},0);
  cuerpoModal.innerHTML += `<p>Total a pagar: $${totalAPagar}</p>`;
}

const btnPagar = document.querySelector(".pagar");

btnPagar && btnPagar.addEventListener("click", vaciarCarrito)

function vaciarCarrito (){
  carrito = []
  localStorage.setItem("carrito", JSON.stringify(carrito));
  Swal.fire({
    icon: "success",
    title: "Tu compra se ha realizado con exito",
    showConfirmButton: false,
    timer: 2000,
  });
  const recarga = setTimeout(recargar,2000)
}

function recargar (){
  window.location.reload()
}
