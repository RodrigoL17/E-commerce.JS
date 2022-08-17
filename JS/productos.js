const listarProductos = () => {
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