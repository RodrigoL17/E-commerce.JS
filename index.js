class Producto {
  constructor(id, nombre, descripcion, precio) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}
const peticionFetch = async () =>{ 
  const response = await fetch("/productos.json")
  const data = await response.json();
  return data
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

const reiniciarCampos = () => {
  codigo.disabled = true;
  codigo.value = "";
  nombre.disabled = true;
  nombre.value = "";
  descripcion.disabled = true;
  descripcion.value = "";
  precio.disabled = true;
  precio.value = 0;
};

const guardarProductos = () => {
  if (nombre.value !== "" && descripcion.value !== "" && precio.value > 0) {
    productos.push(
      new Producto(codigo.value, nombre.value, descripcion.value, precio.value)
    );
    localStorage.setItem("productos", JSON.stringify(productos));
    confirmacionGuardado();
    reiniciarCampos();
  } else {
    infoCampos();
  }
};

const recuperarDeLS = () => {
  const productos = [];
  if (localStorage.productos) {
    const prodGuardados = JSON.parse(localStorage.getItem("productos"));
    prodGuardados.forEach((prod) => {
      productos.push(prod);
    });
  }
  return productos;
};

const funcionalidadEP = async () => {
  console.log("ep", btnEP, flag1, codigo.value);
  if (btnEP && flag1 === true) {
    codigo.disabled = false;
    codigo.focus();
    flag1 = false;
  } else {
    let productos = recuperarDeLS();
    let index = productos.findIndex((producto) => producto.id === codigo.value);
    if (codigo.value !== "" && index !== -1) {
      productos.splice(index, 1);
      localStorage.setItem("productos", JSON.stringify(productos));
      flag1 = true;
      productoEliminiado();
      codigo.disabled = true;
    } else {
      let prodsFetch = await peticionFetch();
      let i = prodsFetch.findIndex(producto => producto.id === codigo.value)
      if (codigo.value !== "" && i !== -1){
      prohibidoEliminar();
      flag1 = true;}
      else{
        ingresoErroneo();
        flag1 = true;
      }
    }
  }
};

btnEP && btnEP.addEventListener("click", () => funcionalidadEP());

//SweetAlert
function confirmacionGuardado() {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "El producto ha sido guardado correctamente",
    showConfirmButton: false,
    timer: 2000,
  });
}

function infoCampos() {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "warning",
    title: "No has completado todos los campos necesarios",
    showConfirmButton: false,
    timer: 2000,
  });
}

function productoEliminiado() {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "error",
    title: "El producto se ha eliminado correctamente",
    showConfirmButton: false,
    timer: 2000,
  });
}
function prohibidoEliminar(){
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "error",
    title: "No tienes permiso para eliminar este producto",
    showConfirmButton: false,
    timer: 2000,
  });
}

function ingresoErroneo() {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "warning",
    title: "No has completado el campo, o el codigo de producto no existe",
    showConfirmButton: false,
    timer: 2000,
  });
  codigo.disabled = true;
}

 async function  recuperarProds  () {
  const productosFetch = await peticionFetch();
    const productosLS = recuperarDeLS();
    return [...productosFetch, ...productosLS];
}

btnNuevoProducto && btnNuevoProducto.addEventListener("click", nuevoProducto);

btnAgregar && btnAgregar.addEventListener("click", guardarProductos);
