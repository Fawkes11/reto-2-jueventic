const compra = new Carrito()
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById("carrito");
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos(){

    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

    procesarCompraBtn.addEventListener('click', procesarCompra);

/*     carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) }); */

}

function procesarCompra() {
    if (compra.obtenerProductosLocalStorage().length === 0) {
        alert("No hay productos seleccionados, seleccione alguno!");
        /* function redireccionar(){location.href = "./menu.html"}
        setTimeout ("redireccionar()", 1000); */
        

    }else if (cliente.value === '' || correo.value === '') {
        alert("Ingrese los datos de usuario");
    }
    else{
        (function(){
            emailjs.init('user_1fIetOJnEqYyFFcKdpAkZ')
        })();

        const btn = document.getElementById('procesar-compra');

        document.getElementById("procesar-pago").addEventListener("submit", function (event) {
        event.preventDefault();

        btn.value = "Sending...";

        const serviceID = "default_service";
        const templateID = "template_n4kci39";

        emailjs.sendForm(serviceID, templateID, this).then(
            () => {
            btn.value = "Send Email";
            alert("Sent!");
            },
            (err) => {
            btn.value = "Send Email";
            alert(JSON.stringify(err));
            }
        );
        });

/*         const cargandoGif = document.querySelector("#cargando");
        cargandoGif.style.display = "block"

        const enviado = document.createElement("img");
        enviado.src = "../images/mail.gif"
        enviado.style.display = "block";
        enviado.width = "150";

        setTimeout(() => {
            cargandoGif.style.display = "nonte";
            document.querySelector("#loaders").appendChild(enviado);
            setTimeout(()=>{
                enviado.remove();
                compra.vaciarLocalStorage();
                location.href = "./menu.html";
            })
        }, 3000); */
    }
    
} 
