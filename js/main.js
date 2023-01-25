// Carrito 
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
// Abrir Carrito
cartIcon.onclick = () => {
    cart.classList.add("active");
};
// Cerrar Carrito
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Funcionamiento del Carrito JS
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Haciendo la function
function ready(){
    // remove items del carrito
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    //Cambios de Cantidad
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add to carrito
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    
    // Funcionamiento del boton de compra
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}

// Boton comprar
function buyButtonClicked() {
    alert("Su orden ha sido realizada con éxito!")
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// remove items del carrito
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove(); 
    updateTotal();
}

// Cambios de Cantidad
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    } 
    updateTotal();
}

// Add to carrito
function addCartClicked (event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName ("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Ya has añadido este artículo al carrito");
            return;
        }
    }
    var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!-- Remove cart   -->
                            <i class='bx bxs-trash cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
    cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

// Actualizar Total
function updateTotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes [i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat (priceElement.innerText.replace("US$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // Si el precio contiene algun valor decimal.
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "US$" + total;
}







































// alert ("Bienvenid@ a TechPC, en la siguiente lista se mostrará un catálogo de equipos Gaming de escritorio.")

// const carrito = []

// const ordenarProductos = () => {
//     productos.sort((a, b) => a.precio - b.precio)
//     mostrarProductos ()
// };

// const mostrarProductos = () => {
//     const listaProductos = productos.map(producto => {
//         return "- "+producto.nombre+": "+producto.descripcion+ "\nUSD"+producto.precio
//     })
//     alert("Lista de productos y precios:"+"\n\n"+listaProductos.join("\n"))
//     comprarProductos(listaProductos)
// };

// const comprarProductos = (listaProductos) => {
//     let productoNombre = "";
//     let productoCantidad = 0;
//     let otroProducto = false;
    
//     do {
//         productoNombre = prompt("Que equipo te interesa comprar?"+"\n\n"+listaProductos.join("\n"))

//         const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())
//         if (producto) {
//             productoCantidad = parseInt(prompt("Cuantas unidades queres comprar?"))
//             productoCantidad = validarCantidad(productoCantidad)
            
//             agregarAlCarrito(producto, producto.id, productoCantidad)
//         } else {
//             do {
//                 alert("El producto no existe!");
//                 productoNombre = prompt("Escoja un producto de la lista:"+"\n\n"+listaProductos.join("\n"));
//             } while (productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())==undefined);

//             productoCantidad = parseInt(prompt("Cuantas unidades queres comprar?"))
//             productoCantidad = validarCantidad(productoCantidad)

//             const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())
//             agregarAlCarrito(producto,producto.id,productoCantidad);
//         }
             
//         otroProducto = confirm ("Agregar más productos >>[ACEPTAR]"+"\nVer pedido >>[CANCELAR]")
//     } while (otroProducto);

//     confirmarCompra()
// };

// function validarCantidad(productoCantidad) {
//     while (Number.isNaN(productoCantidad) || productoCantidad < 1) {
//         alert("Dato incorrecto, debe agregar un número que sea mayor a 0.");
//         productoCantidad = parseInt(prompt("Cuantas unidades a comprar?"));
//     }

//     return productoCantidad;
// };

// const agregarAlCarrito = (producto, productoId, productoCantidad) => {
//     const mismoProducto = carrito.find(producto => producto.id === productoId)
//     if (!mismoProducto) {
//         producto.cantidad += productoCantidad
//         carrito.push(producto)
//     } else {
//         mismoProducto.cantidad += productoCantidad
//     }
// };

// const eliminarProductoCarrito = (nombreProductoAEliminar) => {
//     carrito.forEach((producto, index) => {
//         if(producto.nombre.toLowerCase()=== nombreProductoAEliminar.toLowerCase()){
//               if (producto.cantidad > 1) {
//                 producto.cantidad-- 
//               } else {
//                 carrito.splice(index, 1)
//               }
//         }
//     })

//     confirmarCompra()
// };

// const confirmarCompra = () => {
//     const listaDeProductos = carrito.map(producto => {
//         return "- "+producto.nombre+": "+producto.descripcion+"\n Precio/u USD "+producto.precio+" | Cantidad: "+producto.cantidad
//     })

//     const isConfirmar = confirm("Productos agregados: "
//         +"\n\n"+listaDeProductos.join("\n")
//         +"\n\nPara finalizar el pedido presione >>[ACEPTAR]"+"\nPara eliminar uno o más productos de la lista presione >>[CANCELAR]"
//     )

//     if (isConfirmar) {
//         finalizarCompra(listaDeProductos)
//     } else {
//         const productoAEliminar = prompt("Ingrese el producto a eliminar"
//         +"\n\n"+listaDeProductos.join("\n"))
//         eliminarProductoCarrito(productoAEliminar)
//     }
// };

// const finalizarCompra = (listaDeProductos) => {
//     const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
//     const precioTotal = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0)
//     alert("Detalle de su pedido: "
//         +"\n\n"+listaDeProductos.join("\n")
//         +"\n\nTotal de productos: "+cantidadTotal
//         +"\n\nEl total a pagar es: "+"USD "+precioTotal
//         +"\n\nGracias por su pedido, l@ contactaremos a la brevedad!"
    
//     )
// }; 

// ordenarProductos ()
