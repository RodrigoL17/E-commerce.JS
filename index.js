class Producto {
  constructor(id, nombre, descripcion, precio) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
  }

  precioConIva() {
    return parseFloat((this.precio * IVA).toFixed(2));
  }
}


const creoId = () => parseInt(Math.random() * 10000);

const habilitarInput = () => {
  nombre.disabled = false;
  descripcion.disabled = false;
  precio.disabled = false;
}

const nuevoProducto = () => { 
  codigo.value = creoId();
  habilitarInput();
  nombre.focus();
}


const guardarProductos = () => {
  if(nombre.value !== "" && descripcion.value !== "" && precio.value > 0){
  productos.push(new Producto(codigo.value,nombre.value,descripcion.value,precio.value));
  localStorage.setItem("productos", JSON.stringify(productos));}
  else {alert("no ingresaste un producto valido")}
}

btnNuevoProducto && btnNuevoProducto.addEventListener("click", nuevoProducto);

btnAgregar && btnAgregar.addEventListener("click", guardarProductos);

const recuperarDeLS = () =>{
  if (localStorage.productos){
  const prodGuardados = JSON.parse(localStorage.getItem("productos"));
    prodGuardados.forEach(prod => {
      productos.push(prod)
    })
  }
}


// const botonEP = () => {
//   if(flag1 === true){
//     btnEP.addEventListener("click", funcionalidadEP);
//   }
//   if(flag1 === false){
//     btnEP.addEventListener("click", removerProducto (codigo.value));
//     flag1 = true;
//   }
// }

// const removerProducto = (codigo) => {
//   productos.forEach
// }

// const funcionalidadEP = () => {
//   codigo.disabled = false;
//   codigo.focus();
//   flag1 = false
// }

// botonEP();





// function eliminarProducto() {
//   carrito.forEach((producto) => {
//     const btnEliminarProducto = document.querySelector(
//       `.eliminar-producto${producto.id}`
//     );
//     btnEliminarProducto.addEventListener("click", () => {
//       carrito = carrito.filter(
//         (productoFilter) => productoFilter.id !== producto.id
//       );
//       crearCarrito();
//     });
//   });
// }

// productos.forEach(producto => {
  //   if (codigo.value === producto.id){
  //     let index = productos.indexOf(producto)
  //     if (index > -1){
  //       productos.splice(index,1);
  //     }
  //   }
  // })

  // codigo.addEventListener("keypress", (event) => {
  //   if (event.key === "Enter"){
  //     if(productos.find(producto => producto.id === codigo.value)){
  //       nombre.value = producto.nombre;
  //       descripcion.value = producto.descripcion;
  //       precio.value = producto.precio;
  //       let index = productos.indexOf(producto);
  //       // if (index > -1){
  //       //   productos.splice(index,1)
  //       // }
  //     }
  //   }
  // })






recuperarDeLS();
