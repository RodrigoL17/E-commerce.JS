class Producto {
    constructor (id,nombre,descripcion,precio){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    precioConIva (){
        return parseFloat((this.precio*IVA).toFixed(2));
    }
}

const creoId = () => parseInt(Math.random()*10000)


const crearProducto = () => {
    productos.push (new Producto (creoId(), prompt("Indique el nombre del Producto"),prompt("Ingrese breve descripcion"),parseInt(prompt("Ingrese precio")))) 
}

const crearCarrito = () =>{
    id = parseInt(prompt("Indique el ID de su producto para ingresarlo al carrito"));
    carrito.push(productos.find(producto => producto.id === id));
}


alert("atencion usted debe ingresar al menos 1 producto!");

do {
    crearProducto();
    confirmacion = confirm ("Desea agregar un nuevo producto?")
} while (confirmacion)

productos.forEach(producto => {
    console.table(producto);
   });

do {
    crearCarrito();
    confirmacion = confirm ("Desea agregar otro producto al carrito?")
} while(confirmacion){
    carrito.forEach(producto => {
        console.table(producto);
        total = total + producto.precioConIva();
    });
    console.warn(`El total a pagar es de: ${total}`)
}


