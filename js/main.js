alert ("Bienvenid@ a TechPC, en la siguiente lista se mostrará un catálogo de equipos Gaming de escritorio.")

const carrito = []

const ordenarProductos = () => {
    productos.sort((a, b) => a.precio - b.precio)
    mostrarProductos ()
};

const mostrarProductos = () => {
    const listaProductos = productos.map(producto => {
        return "- "+producto.nombre+": "+producto.descripcion+ "\nUSD"+producto.precio
    })
    alert("Lista de productos y precios:"+"\n\n"+listaProductos.join("\n"))
    comprarProductos(listaProductos)
};

const comprarProductos = (listaProductos) => {
    let productoNombre = "";
    let productoCantidad = 0;
    let otroProducto = false;
    
    do {
        productoNombre = prompt("Que equipo te interesa comprar?"+"\n\n"+listaProductos.join("\n"))

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())
        if (producto) {
            productoCantidad = parseInt(prompt("Cuantas unidades queres comprar?"))
            productoCantidad = validarCantidad(productoCantidad)
            
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            do {
                alert("El producto no existe!");
                productoNombre = prompt("Escoja un producto de la lista:"+"\n\n"+listaProductos.join("\n"));
            } while (productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())==undefined);

            productoCantidad = parseInt(prompt("Cuantas unidades queres comprar?"))
            productoCantidad = validarCantidad(productoCantidad)

            const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())
            agregarAlCarrito(producto,producto.id,productoCantidad);
        }
             
        otroProducto = confirm ("Agregar más productos >>[ACEPTAR]"+"\nVer pedido >>[CANCELAR]")
    } while (otroProducto);

    confirmarCompra()
};

function validarCantidad(productoCantidad) {
    while (Number.isNaN(productoCantidad) || productoCantidad < 1) {
        alert("Dato incorrecto, debe agregar un número que sea mayor a 0.");
        productoCantidad = parseInt(prompt("Cuantas unidades a comprar?"));
    }

    return productoCantidad;
};

const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const mismoProducto = carrito.find(producto => producto.id === productoId)
    if (!mismoProducto) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        mismoProducto.cantidad += productoCantidad
    }
};

const eliminarProductoCarrito = (nombreProductoAEliminar) => {
    carrito.forEach((producto, index) => {
        if(producto.nombre.toLowerCase()=== nombreProductoAEliminar.toLowerCase()){
              if (producto.cantidad > 1) {
                producto.cantidad-- 
              } else {
                carrito.splice(index, 1)
              }
        }
    })

    confirmarCompra()
};

const confirmarCompra = () => {
    const listaDeProductos = carrito.map(producto => {
        return "- "+producto.nombre+": "+producto.descripcion+"\n Precio/u USD "+producto.precio+" | Cantidad: "+producto.cantidad
    })

    const isConfirmar = confirm("Productos agregados: "
        +"\n\n"+listaDeProductos.join("\n")
        +"\n\nPara finalizar el pedido presione >>[ACEPTAR]"+"\nPara eliminar uno o más productos de la lista presione >>[CANCELAR]"
    )

    if (isConfirmar) {
        finalizarCompra(listaDeProductos)
    } else {
        const productoAEliminar = prompt("Ingrese el producto a eliminar"
        +"\n\n"+listaDeProductos.join("\n"))
        eliminarProductoCarrito(productoAEliminar)
    }
};

const finalizarCompra = (listaDeProductos) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0)
    alert("Detalle de su pedido: "
        +"\n\n"+listaDeProductos.join("\n")
        +"\n\nTotal de productos: "+cantidadTotal
        +"\n\nEl total a pagar es: "+"USD "+precioTotal
        +"\n\nGracias por su pedido, l@ contactaremos a la brevedad!"
    
    )
}; 

ordenarProductos ()
