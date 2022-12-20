// VARIABLES

// let producto = prompt ("Tenemos para ofrecerte una Notebook o una PC de Escritorio, a continuación elije entre opciones 1 y/o 2");
// let cantidad = parseInt(prompt ("Unidades a comprar?"))

let productoUno = "notebook";
let productoDos = "pcescritorio";
let precioUno = 690;
let precioDos = 1300;

let seleccion = prompt ("Bienvenido, necesita un equipo de computo? Indique si o no");
while(seleccion != "si" && seleccion != "no"){
    alert ("Dato incorrecto, por favor ingrese si o no");
    seleccion = prompt("Le interesa comprar?");
};

alert("Tenemos una Notebook para USD690, o un Pc de escritorio para USD1300");

do {
    producto = prompt ("Que equipo te interesa? Notebook o PC");
    cantidad = parseInt(prompt ("Unidades a comprar?"));

    switch (producto) {
        case "notebook":
            price = 690;
            break;
        case "pc" || "pc escritorio":
            price = 1300;
            break;
        default:
            alert("No has ingresado un dato correcto");
            precio = 0;
            cantidad = 0;
    }

    totalCompra = price * cantidad
    alert ("El total de la compra es "+totalCompra)
    agregarMas = confirm ("Queres agregar mas Unidades?");

} while (agregarMas)