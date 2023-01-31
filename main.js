

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

let medio = prompt("¿Quieres pagar por Transferencia o con Tarjeta?. Recordá que si pagas con tarjeta tiene un 15% de recargo.")

// VERIFICADOR DE MEDIO DE PAGO

while (medio != "Tansferencia" && medio != "transferencia" && medio != "Tarjeta" && medio != "tarjeta") {
    alert("Ingrese tranferencia o tarjeta.");
    usuario = prompt(
        "Ingresar si es transferencia o tarjeta. Recordá que si pagas con Tarjeta tenes un 15% de recargo.");
}

let compra = prompt("Escriba el nombre de lo que desea comprar: Remera $4.500, Bermuda $5.000, Pantalon $5.500 o Buzo $7.000. Si no desea comprar nada escriba Fin.");

let cantidad_remeras = 0;
let cantidad_bermudas = 0;
let cantidad_pantalones = 0;
let cantidad_buzos = 0;
let precio_total_remeras = intereses(4500, medio);
let precio_total_bermudas = intereses(5000, medio);
let precio_total_pantalones = intereses(5500, medio);
let precio_total_buzos = intereses(7000, medio);

// BUCLE DE COMPRAS

while (compra != "Fin" && compra != "fin") {
    if (compra == "Remera" || compra == "remera") {
        cantidad_remeras++;
    }
    else if (compra == "Bermuda" || compra == "bermuda") {
        cantidad_bermudas++;
    }
    else if (compra == "Pantalon" || compra == "pantalon") {
        cantidad_pantalones++;
    }
    else if (compra == "Buzo" || compra == "buzo") {
        cantidad_buzos++;
    }
    else {
        alert("Ingresa un valor válido");
    }

    compra = prompt(
        "Desea agregar: Remera $4.500, Bermuda $5.000, Pantalon $5.500 o Buzo $7.000. Si no desea comprar nada escriba Fin."
    );
}

// CÁLCULO TOTAL DE LAS COMPRAS

if (cantidad_remeras > 0) {
    console.log(
        "Compraste ",
        cantidad_remeras,
        " remera/s y gastaste $",
        cantidad_remeras * precio_total_remeras
    );
}
if (cantidad_bermudas > 0) {
    console.log(
        "Compraste ",
        cantidad_bermudas,
        " camisa/s y gastaste $",
        cantidad_bermudas * precio_total_bermudas
    );
}
if (cantidad_pantalones > 0) {
    console.log(
        "Compraste ",
        cantidad_pantalones,
        " camisa/s y gastaste $",
        cantidad_pantalones * precio_total_pantalones
    );
}
if (cantidad_buzos > 0) {
    console.log(
        "Compraste ",
        cantidad_buzos,
        " campera/s y gastaste $",
        cantidad_buzos * precio_total_buzos
    );
}

let cantidad_total =
    (cantidad_remeras * precio_total_remeras +
        cantidad_bermudas * precio_total_bermudas + cantidad_pantalones * precio_total_pantalones +
        cantidad_buzos * precio_total_buzos);

if (cantidad_total != NaN) {
    console.log("Gastaste en total $", cantidad_total);
}