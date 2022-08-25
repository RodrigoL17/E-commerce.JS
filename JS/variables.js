const productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
const IVA = 1.21;

let confirmacion;
let total = 0;
let acumulador = 0;
let flag1 = true;

const nombre = document.getElementById("obtener-nombre");
const precio = document.getElementById("obtener-precio");
const codigo = document.getElementById("obtener-codigo");
const descripcion = document.getElementById("obtener-descripcion")


const listaProductos = document.querySelector("#lista-productos")

const btnEP = document.getElementById("btn-eliminar-producto");
const btnNuevoProducto = document.querySelector("#btn-nuevo-producto");
const btnAgregar = document.querySelector("#btn-agregar");

