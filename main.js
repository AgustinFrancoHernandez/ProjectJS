// VARIABLES

// let producto = prompt ("Tenemos para ofrecerte una Notebook o una PC de Escritorio, a continuación elije entre opciones 1 y/o 2");
// let cantidad = parseInt(prompt ("Unidades a comprar?"))

let productoUno = "notebook";
let productoDos = "pcescritorio";
let precioUno = 690;
let precioDos = 1300;

let seleccion = prompt ("Bienvenido, necesita un equipo de computo? Indique si o no");
while(seleccion != "si" && seleccion != "no"){
    alert ("Dato incorrecto, por favor ingrese si o no")
    seleccion = prompt("Le interesa comprar?")
};
