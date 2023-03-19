async function getProductos() {
    const response = await fetch("data/productos.json")
    const data = await response.json();
    return data;
}


// RENDER PRODUCTOS

let productos_agregar = document.querySelector(".productos");

getProductos().then((productos) => {
    productos.forEach((producto) => {
        producto.precio = parseInt(producto.precio);
        productos_agregar.innerHTML += `
            <div class='card'>
                <img src='${producto.imgSrc}' class='card-img-top card_img' alt='imagen ${producto.nombre}'>
                <div class='card_body'>
                    <h4 class='categoria'>${producto.categoria}</h4>
                    <h5 class='nombre'>${producto.distincion}</h5>
                    <h5 class='card_precio'>${producto.precio}$</h5>
                    <h6 id='card_id'>${producto.id}</h6>
                    <button class='btn_agregar_carrito'>AGREGAR AL CARRITO</button>
                </div>
            </div>
        `;
    });


    // CARRITO

    let btn_agregar = document.querySelectorAll(".btn_agregar_carrito");

    for (let btn of btn_agregar) {
        btn.addEventListener("click", agregar_a_carrito);
    }

    // AGREGAR A CARRITO

    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    function agregar_a_carrito(e) {
        let button = e.target;
        let idProducto = button.parentElement.querySelector("#card_id").textContent;
        let categoriaProducto = button.parentElement.querySelector(".categoria").textContent;
        let distincionProducto =
            button.parentElement.querySelector(".nombre").textContent;
        let precioProducto =
            button.parentElement.querySelector(".card_precio").textContent;
        let imagenProducto =
            button.parentElement.parentElement.querySelector("img").src;

        Toa_agregar_prod();

        let producto_carrito = {
            idProducto: idProducto,
            categoriaProducto: categoriaProducto,
            distincionProducto: distincionProducto,
            precio: precioProducto,
            cantidad: 1,
            img: imagenProducto,
        };

        aumentar_producto__carrito(producto_carrito);
    }

    // TOTAL CARRITO

    const carrito_total = () => {
        const valor_total = document.getElementById("carrito_precio_total");

        let total_a_pagar = 0;
        carrito.forEach((producto) => {
            const precio = parseInt(producto.precio);
            const cantidad = parseInt(producto.cantidad);
            total_a_pagar += precio * cantidad;


        });
        valor_total.innerHTML = `$${total_a_pagar}`;
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
    };

    //TOASTIFIES

    function Toa_agregar_prod() {
        Toastify({
            text: "Producto agregado",
            className: "alerta_agregado",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    };

    function Toa_eliminar_prod() {

        Toastify({
            text: "Producto eliminado",
            className: "alerta_eliminado",
            style: {
                background: "linear-gradient(to right, #E63147, #E73348)",
            }
        }).showToast();
    };

    //BUSCADOR

    const searchInput = document.querySelector("[data-search]");
    const card = document.getElementsByClassName("card");

    searchInput.addEventListener("input", (e) => {

        const value = e.target.value.toLowerCase()

        for (let i = 0; i < productos.length; i++) {
            const isVisible =
                productos[i].categoria.toLowerCase().includes(value) ||
                productos[i].distincion.toLowerCase().includes(value);
            card[i].classList.toggle("hide", !isVisible)
        }

    });



    // AGREGAR A CARRITO O AUMENTAR VALOR INPUT DESDE AGREGAR A CARRITO

    function aumentar_producto__carrito(producto_carrito) {
        const inputProductoUnidades = document.getElementsByClassName("input_unidades");
        for (let i = 0; i < carrito.length; i++) {
            if (carrito[i].idProducto === producto_carrito.idProducto) {
                carrito[i].cantidad++;
                const inputValorNuevoUnidades = inputProductoUnidades[i];
                inputValorNuevoUnidades.value++;
                carrito_total();
                return "";
            }
        }

        carrito.push(producto_carrito);
        render_carrito();
    }

    render_carrito();

    // RENDER CARRITO

    function render_carrito() {
        let tabla = document.getElementById("carrito-items");
        tabla.innerHTML = "";

        for (let producto of carrito) {
            let fila = document.createElement("tr");
            fila.innerHTML = `<td><img src="${producto.img}" width="80px">
                        <p class="id_producto">${producto.idProducto}</p></td>
                        <td><p class="categoria_producto">${producto.categorias}</p></td>
                        <td><p class="nombre_producto">${producto.distincion}</p></td>
                        <td>
                        <input type="number" min="1" class="input_unidades" value=${producto.cantidad}></td>
                        <td class="prod_carrito_precio">${producto.precio}</td>
                        <button class="btn btn-danger button btn_borrar_elemento">ELIMINAR</button>`;

            tabla.append(fila);
            carrito_total();
        }

        // AUMENTAR CLICKEANDO BOTON INPUT

        const btn_input = document.querySelectorAll(".input_unidades");



        for (let btn of btn_input) {
            btn.addEventListener("change", sumaCantidad);
        }

        function sumaCantidad(e) {

            const sumaInput = e.target;
            const idProd = sumaInput.parentElement.parentElement.querySelector(".id_producto").textContent;

            carrito.forEach((item) => {
                if (item.idProducto === idProd) {
                    sumaInput.value < 1 ? sumaInput.value = 1 : sumaInput.value;
                    item.cantidad = sumaInput.value;
                    carrito_total();
                }
            });
        }


        // BORRAR ELEMENTOS

        let btn_borrar_elemento = document.querySelectorAll(".btn_borrar_elemento");

        for (let btn of btn_borrar_elemento) {
            btn.addEventListener("click", eliminar_producto);
        }

        function eliminar_producto(e) {
            let padre = e.target.parentNode;
            let producto_eliminar = padre.querySelector(".id_producto").textContent;

            for (let i = 0; i < carrito.length; i++) {
                if (carrito[i].idProducto === producto_eliminar) {
                    carrito.splice(i, 1);
                    padre.remove();
                    Toa_eliminar_prod();
                    carrito_total();
                }
            }
        }

        carrito_total();
    }


    let btn_pagar = document.querySelector('.btn-pagar');

    btn_pagar.addEventListener('click', () => {


        let total_a_pagar = document.getElementById('carrito_precio_total').textContent.replace("$", "");

        if (total_a_pagar > 0) {


            document.body.innerHTML =
                `<div class="gracias">
            <h1 >¡GRACIAS POR SU COMPRA!</h1>
            </div>
            <div class="volver">
            <a href="index.html" class= "volver_a_la_tienda">ATRAS</a>
            </div>`}
        else {


            document.body.innerHTML =
                `<div class="ninguna">
            <h1>¡NO HA REALIZADO NINGUNA COMPRA!</h1>
            </div>
            <div class="volver">
            <a href="index.html" class= "volver_a_la_tienda">ATRAS</a>
            </div>`

        }

        ;
    });
})