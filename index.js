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
  debugger 
  codigo.value = creoId();
  nombre.value = "";
  descripcion.value = "";
  // nombre.focus();
}

const guardarProductos = () => {
  productos.push(new Producto(codigo.value,nombre.value,descripcion.value,precio.value));
  localStorage.setItem("productos", JSON.stringify(productos));
}


btnNuevoProducto.addEventListener("click", nuevoProducto);
btnAgregar.addEventListener("click", guardarProductos);


const recuperarDeLS = () =>{
  if (localStorage.productos){
  const prodGuardados = JSON.parse(localStorage.getItem("productos"));
    prodGuardados.forEach(prod => {
      productos.push(prod)
      console.log(productos)
    })
  }
}

const listarProductos = () => {
  recuperarDeLS();
  console.log(listaProductos)
  if (!listaProductos) {return null}
  listaProductos.innerHTML = "";
  productos.forEach(producto => {
  listaProductos.innerHTML += `<div class="card" style="width: 15rem">
                                    <img src="..." class="card-img-top" alt="..." />
                                    <div class="card-body">
                                      <h4 class="card-title">
                                        ${producto.nombre}
                                      </h4>
                                      <h5 class="card-title">
                                        ${producto.id}
                                      </h5>
                                      <p class="card-text">
                                        ${producto.descripcion}
                                      </p>
                                      <h5 class="card-title">
                                        ${producto.precio}
                                      </h5>
                                      <button class="btn btn-outline-dark" type="submit">Agregar al carrito</button>
                                    </div>
                                  </div>`;
  })
};

listarProductos();


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
