alert ("Bienvenid@, a continuación se mostrará una lista de productos y sus precios")

const carrito = []

const ordenarProductos = () => {
    productos.sort((a, b) => a.price - b.price)
    mostrarProductos ()
};

const mostrarProductos = () => {
    const listaProductos = productos.map(producto => {
        return "- "+producto.nombre+" USD"+producto.price
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
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            do {
                alert("El producto no existe!");
                productoNombre = prompt("Escoja un producto de la lista:"+"\n\n"+listaProductos.join("\n"));
            } while (productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())==undefined);
        }
             
        productoCantidad = parseInt(prompt("Cuantas unidades queres comprar?"))
        validarCantidad(productoCantidad)
        
        otroProducto = confirm ("Continuar comprando(ACEPTAR) o pasar a pagar(CANCELAR)")
    } while (otroProducto);
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

function validarCantidad(productoCantidad) {
    while (Number.isNaN(productoCantidad) || productoCantidad < 1) {
        alert("Dato incorrecto, debe agregar un numero que sea mayor a 0.");
        productoCantidad = parseInt(prompt("Cuantas unidades a comprar?"));
    }

    return productoCantidad;
};

ordenarProductos ()





// function comprarProducto() {
//     let seleccion = prompt("Bienvenido, necesita un equipo de computo? Indique si o no").toUpperCase();
//     while (seleccion != "SI" && seleccion != "NO") {
//         alert("Dato incorrecto, por favor ingrese si o no");
//         seleccion = prompt("Le interesa comprar?").toUpperCase();
//     };
//     if (seleccion === "SI") {

//         alert("Tenemos una Notebook para USD690, o un Pc de escritorio para USD1300");
//         do {
//             producto = prompt("Que equipo te interesa? Notebook o PC");

//             switch (producto) {
//                 case "notebook":
//                     price = 690;
//                     break;
//                 case "pc" || "pc escritorio":
//                     price = 1300;
//                     break;
//                 default:
//                     alert("No has ingresado un dato correcto");

//             }
//         } while (producto != "notebook" && producto != "pc" && producto != "pc escritorio");

        // cantidad = parseInt(prompt("Unidades a comprar?"));
        // let cantidadValidada = validarCantidad(cantidad);
        // agregarMas = confirm("Queres agregar mas Unidades?");  

//         let hayCuotas = confirm("Queres pagar en cuotas?");
//         if (hayCuotas) {// si quiere comprar en cuotas
//             cuotas = parseInt(prompt("Podes pagar hasta en 6 cuotas, escribe el numero de cuotas a continuacion!"));
//             while (Number.isNaN(cuotas) || cuotas < 1 || cuotas > 6) {
//                 alert("Ingrese un valor del 1 al 6");
//                 cuotas = parseInt(prompt("Podes pagar hasta en 6 cuotas, escribe el numero de cuotas a continuacion!"));
//             }
//             totalCompra = price * cantidadValidada;
//             totalCompraEnCuotas = totalCompra / cuotas;
//             alert("El total de la compra es USD" + totalCompra + " en "+cuotas+ " cuotas de USD"+totalCompraEnCuotas);
//         } else{
//             totalCompra = price * cantidadValidada;
//             alert("El total de la compra es USD" + totalCompra);
//         }
//         alert("Gracias por su compra!")
//     } else (alert("Goodbye"));
// }



// comprarProducto();