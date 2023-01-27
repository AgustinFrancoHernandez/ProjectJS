// Create the array for the localStorage
let localStorageProducts = [];
//Show the product
const conteinerProducts = document.querySelector("#shop-content")
function loadProduct () {
    products.forEach(product =>{
        let div = document.createElement("div");
        div.classList.add("product-box");
        div.innerHTML = 
                    ` 
                        <img src="${product.imagen}" alt="Imagen del Producto" class="product-img">
                        <h2 class="product-title">${product.titulo}</h2>
                        <span class="price">US$ ${product.precio}</span>
                        <i class='bx bxs-cart-add add-cart'></i>
                     `;

        conteinerProducts.append(div);
    })
}

loadProduct()

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
// Making the function
function ready(){
    // remove items del carrito
    let removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++){
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Changes of Cantidad
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add to carrito
    let addCart = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
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
    let cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// remove items del carrito
function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove(); 

    updateTotal();
}

// Changes of Cantidad
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    } 
    
    localStorageProducts.push(input.value);
    
    saveLocal();

    updateTotal();
  
}

// Add to carrito
function addCartClicked (event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    //  Push the array 
    localStorageProducts.push(title, price);
    // Save the localStorage
    saveLocal ();
    
    addProductToCart(title, price, productImg);
    updateTotal();
    
}

function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName ("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Ya has añadido este artículo al carrito");
            return;
        }
    }
    let cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
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
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes [i];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat (priceElement.innerText.replace("US$", ""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // Si el precio contiene algun valor decimal.
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "US$" + total;

        localStorageProducts.push(total);
        saveLocal();
       
}

const saveLocal = () => {
    localStorage.setItem('Product', JSON.stringify(localStorageProducts));
};

// obtenerLocalStorage();

const obtenerLocalStorage = JSON.parse(localStorage.getItem('Product'))
 
if (obtenerLocalStorage) {
    console.log('hay')
}else{
    console.log('no hay')

}

