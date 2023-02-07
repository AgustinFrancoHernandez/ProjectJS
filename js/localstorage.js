// Funcion para salvar en localStorage
const saveLocal = () => {
    localStorage.setItem("pedido", JSON.stringify(carrito));
}