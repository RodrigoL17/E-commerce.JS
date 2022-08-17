const productos = [];
const carrito = [];
const IVA = 1.21;

let confirmacion;
let total = 0;

const nombre = document.getElementById("obtener-nombre");
const precio = document.getElementById("obtener-precio");
const codigo = document.getElementById("obtener-codigo");
const descripcion = document.getElementById("obtener-descripcion")

const listaProductos = document.querySelector("#lista-productos")

const btnNuevoProducto = document.querySelector("#btn-nuevo-producto");
const btnAgregar = document.querySelector("#btn-agregar")