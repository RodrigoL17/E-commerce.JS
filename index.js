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
};

const nuevoProducto = () => {
  codigo.value = creoId();
  habilitarInput();
  nombre.focus();
};

const guardarProductos = () => {
  if (nombre.value !== "" && descripcion.value !== "" && precio.value > 0) {
    productos.push(
      new Producto(codigo.value, nombre.value, descripcion.value, precio.value)
    );
    localStorage.setItem("productos", JSON.stringify(productos));
  } else {
    alert("no ingresaste un producto valido");
  }
};

btnNuevoProducto && btnNuevoProducto.addEventListener("click", nuevoProducto);

btnAgregar && btnAgregar.addEventListener("click", guardarProductos);

const recuperarDeLS = () => {
  if (localStorage.productos) {
    const prodGuardados = JSON.parse(localStorage.getItem("productos"));
    prodGuardados.forEach((prod) => {
      productos.push(prod);
    });
  }
};

const funcionalidadEP = () => {
  if (btnEP && flag1 === true) {
    codigo.disabled = false;
    codigo.focus();
    flag1 = false;
  } else {
    let index = productos.findIndex((producto) => producto.id === codigo.value);
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    flag1 = true;
  }
};

btnEP && btnEP.addEventListener("click", () => funcionalidadEP());


recuperarDeLS();
