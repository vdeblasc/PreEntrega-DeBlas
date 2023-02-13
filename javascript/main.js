

// FUNCIÓN QUE CALCULA SI HAY QUE AGREGAR INTERESES A TU COMPRA

function intereses(monto, medio) {
    if (medio == "Tarjeta" || medio == "tarjeta") {
        let precio_tarjeta = (monto * 0.15) + monto;
        return precio_tarjeta;
    }
    else if (medio == "Transferencia" || medio == "transferencia") {
        let precio_transferencia = monto;
        return precio_transferencia;
    }
}


// LISTA DE PRODUCTOS
class Productos {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

let lista_productos = [];

let nuevo_producto = new Productos("Remeras", 4500, 3);
lista_productos.push(nuevo_producto);
nuevo_producto = new Productos("Bermudas", 5000, 5);
lista_productos.push(nuevo_producto);
nuevo_producto = new Productos("Pantalones", 5500, 10);
lista_productos.push(nuevo_producto);
nuevo_producto = new Productos("Buzos", 7000, 2);
lista_productos.push(nuevo_producto);

// VERIFICADOR DE MEDIO DE PAGO

let medio = prompt("¿Quieres pagar por Transferencia o con Tarjeta?. Recordá que si pagas con tarjeta tiene un 15% de recargo.")

while (medio != "Tansferencia" && medio != "transferencia" && medio != "Tarjeta" && medio != "tarjeta") {
    alert("Ingrese transferencia o tarjeta.");
    medio = prompt(
        "Ingresar si es transferencia o tarjeta. Recordá que si pagas con Tarjeta tenes un 15% de recargo.");
}

//CONTROL STOCK

let compra = prompt("Escriba el nombre de lo que desea comprar: Remera $4.500, Bermuda $5.000, Pantalon $5.500 o Buzo $7.000. Si no desea comprar nada escriba Fin.");

let cantidad_remeras = 0;
let cantidad_bermudas = 0;
let cantidad_pantalones = 0;
let cantidad_buzos = 0;
let precio_total_remeras = intereses(lista_productos[0].precio, medio);
let precio_total_bermudas = intereses(lista_productos[1].precio, medio);
let precio_total_pantalones = intereses(lista_productos[2].precio, medio);
let precio_total_buzos = intereses(lista_productos[3].precio, medio);

// BUCLE DE COMPRAS

while (compra != "Fin" && compra != "fin") {
    if (compra == "Remera" || compra == "remera" && lista_productos[0].stock > 0) {
        cantidad_remeras++;
        lista_productos[0].stock--;
    }
    else if (compra == "Bermuda" || compra == "bermuda" && lista_productos[1].stock > 0) {
        cantidad_bermudas++;
        lista_productos[1].stock--;
    }
    else if (compra == "Pantalon" || compra == "pantalon" && lista_productos[2].stock > 0) {
        cantidad_pantalones++;
        lista_productos[2].stock--;
    }
    else if (compra == "Buzo" || compra == "buzo" && lista_productos[3].stock > 0) {
        cantidad_buzos++;
        lista_productos[3].stock--;
    }
    else {
        alert("Ingresa un valor válido. Si ingreso un valor válido, puede ser que no tengamos stock");
    }

    compra = prompt(
        "Desea agregar: Remera $4.500, Bermuda $5.000, Pantalon $5.500 o Buzo $7.000. Si no desea comprar nada escriba Fin."
    );
}

// CÁLCULO TOTAL DE LAS COMPRAS

if (cantidad_remeras > 0) {
    alert(
        "Compraste " +
        cantidad_remeras +
        " remera/s y gastaste $" +
        cantidad_remeras * precio_total_remeras
    );
}
if (cantidad_bermudas > 0) {
    alert(
        "Compraste " +
        cantidad_bermudas +
        " bermuda/s y gastaste $" +
        cantidad_bermudas * precio_total_bermudas
    );
}
if (cantidad_pantalones > 0) {
    alert(
        "Compraste " +
        cantidad_pantalones +
        " pantalon/es y gastaste $" +
        cantidad_pantalones * precio_total_pantalones
    );
}
if (cantidad_buzos > 0) {
    alert(
        "Compraste " +
        cantidad_buzos +
        " buzo/s y gastaste $" +
        cantidad_buzos * precio_total_buzos
    );
}

let cantidad_total =
    cantidad_remeras * precio_total_remeras +
    cantidad_bermudas * precio_total_bermudas + cantidad_pantalones * precio_total_pantalones +
    cantidad_buzos * precio_total_buzos;

if (cantidad_total != NaN) {
    alert("Gastaste en total $" + cantidad_total);
}

//CONTROL INTERNO DE STOCK  

let stock_falta = lista_productos.filter((producto) => producto.stock == 0);

for (let producto of stock_falta) {
    console.log("Hay que comprar stock de " + producto.nombre);
}