// Crear modal, y carrito
const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1 class="modal-header-title">Checkpoint</h1>`;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "❎"
    modalButton.className = "modal-header-button";
    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
    modalHeader.append(modalButton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p class="p-precio">$${product.precio}</p>
            <p class="p-unidades">Uds: ${product.cantidad}</p>
            <span class="restar"> ➖ </span> 
            <span class="sumar"> ➕ </span>
            <p class="p-total">Total: $${product.cantidad * product.precio}</p>
            <span class="delete-product"> ❌ </span>
        `;
        modalContainer.append(carritoContent);

        // Restar cantidad de unidades de un producto 
        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--;
            };
            pintarCarrito();
            saveLocal();
        });

        // Sumar cantidad de unidades de un producto 
        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++;
            pintarCarrito();
            saveLocal();
        });

        // Funcionalidad del span '❌' y llamado de la funcion para eliminar productos
        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });
    });

    // Calcular el precio total del carrito
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: USD ${total}`;
    modalContainer.append(totalBuying);

    // Boton comprar y modal final    
    const boton = document.createElement("div");
    boton.className = "boton-pedido";
    boton.innerHTML = `<button type="button" class="btn-buy">Hacer pedido</button>`;
    modalContainer.append(boton);

    const btnBuy = document.querySelector(".btn-buy");
    btnBuy.addEventListener("click", () => {
        if (carrito.length !== 0) {
            Swal.fire({
                title: 'Pedido recibido!',
                text: 'Envíanos el comprobante de pago a techpc@email.com',
                imageUrl: '/img/logo.png',
                imageWidth: 250,
                imageHeight: 250,
                imageAlt: 'techpclogo',
                position: 'center',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'green',
            });
            carrito = [];
            carritoCounter();
            saveLocal();
            pintarCarrito();
            modalContainer.style.display = "none";
        };
    });
};
verCarrito.addEventListener("click", pintarCarrito);

// Funcion que elimina productos del carrito 
const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
};

