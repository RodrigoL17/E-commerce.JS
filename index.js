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

const nuevoProducto = () => { 
  codigo.value = creoId();
  nombre.value = "";
  descripcion.value = "";
  nombre.focus();
}

const guardarProductos = () => {
  productos.push(new Producto(codigo.value,nombre.value,descripcion.value,precio.value));
  localStorage.setItem("productos", JSON.stringify(productos));
}


if (btnNuevoProducto){
  btnNuevoProducto.addEventListener("click", nuevoProducto);
}

if (btnAgregar){
  btnAgregar.addEventListener("click", guardarProductos);
}

// btnNuevoProducto.addEventListener("click", nuevoProducto);
// btnAgregar.addEventListener("click", guardarProductos);


const recuperarDeLS = () =>{
  if (localStorage.productos){
  const prodGuardados = JSON.parse(localStorage.getItem("productos"));
    prodGuardados.forEach(prod => {
      productos.push(prod)
    })
  }
}

recuperarDeLS();


// const crearCarrito = () => {
//   id = parseInt(
//     prompt("Indique el ID de su producto para ingresarlo al carrito")
//   );
//   carrito.push(productos.find((producto) => producto.id === id));
// };

// do {
//   crearProducto();
//   confirmacion = confirm("Desea agregar un nuevo producto?");
// } while (confirmacion){
//   agregarProductos();
// }

// do {
//   crearCarrito();
//   confirmacion = confirm("Desea agregar otro producto al carrito?");
// } while (confirmacion);
// carrito.forEach(producto => {
//   console.table(producto);
//   total = total + producto.precioConIva();
// });
// console.warn(`El total a pagar es de: ${total}`);
