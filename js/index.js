// Array del carrito
let carrito = JSON.parse(localStorage.getItem("pedido")) || [];

// Traer productos desde ruta relativa y plasmarlo visualmente
const getProducts = async () => {
    const resp = await fetch('../js/productos.json');
    const data = await resp.json();

    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
        <img src="${product.img}">
        <h3 class="product-nombre">${product.nombre}</h3>
        <p class="price">USD ${product.precio}</p>
        
    `;
        shopContent.append(content);
        let comprar = document.createElement("button");
        comprar.innerHTML = `<i class="bx bxs-cart-add add-cart"></i>`;
        comprar.className = "btn-add";
        content.append(comprar);
        comprar.addEventListener("click", () => {
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
            if (repeat) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad++;
                    };
                });
            } else {
                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                });
                carritoCounter();
                saveLocal();
            };
        });
    });
}
getProducts();





