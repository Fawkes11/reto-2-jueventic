
class Carrito{
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains("agregar-carrito")){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    }

    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector("img").src,
            titulo : producto.querySelector("h4").textContent,
            precio : producto.querySelector("h3 span").textContent,
            id : producto.querySelector("a").getAttribute("data-id"),
            cantidad : 1
        }
        let productosLS;
        let temp = this.obtenerProductosLocalStorage();
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS) {
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        });
        if(productosLS === infoProducto.id){
            
            alert("Producto ya agregado")
            /* const t = temp.find(ele => ele.id === productosLS);
            this.eliminarProductoLocalStorage(t.id);
            t.cantidad += 1;
            this.guardarProductosLocalStorage(t); */
            

            
        }else{
            this.insertarCarrito(infoProducto);
        }
        
        /* if (carrito.hasOwnProperty(producto.id)) {
            producto.cantidad = carrito[producto.id].cantidad + 1
        } */

        
    }

    insertarCarrito(producto){
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100></img>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio*1000}</td>
            <td>
                <input type="number" min="1" class="form-control cantidad" value="${producto.cantidad}" style="width: 55px">
            </td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td>

        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }

    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains("borrar-producto")){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector("a").getAttribute("data-id");
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }

    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();

        return false;
    }

    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    obtenerProductosLocalStorage(){
        let productoLS;

        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    eliminarProductoLocalStorage(productoID){
        let productosLS;
        
        productosLS = this.obtenerProductosLocalStorage();
        
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio*1000}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value="${producto.cantidad}" style="width: 55px">
                </td>
                <td>
                    <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }

    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio*1000}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value="${producto.cantidad}" style="width: 55px">
                </td>
                <td>${producto.precio * producto.cantidad*1000}</td>

                <td>
                    <a href="#" class="borrar-producto" style="margin-left: 20px; font-size: 25px; color: red" data-id="${producto.id}">X</a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    vaciarLocalStorage(){
        localStorage.clear();
    }

    procesarPedido(e){
        
        if(this.obtenerProductosLocalStorage().length === 0){
            alert("EL CARRITO ESTÁ VACIO, AGREGA ALGÚN PRODUCTO");
        }
        else{
            location.href = "./compra.html";
        }
        
    }

    calcularTotal(){
        let productoLS;
        let total = 0, subtotal = 0, iva = 0;
        productoLS = this.obtenerProductosLocalStorage();
        for(let i=0; i<productoLS.length; i++){
            let element = Number(productoLS[i].precio * productoLS[i].cantidad);
            total = total + element;
        }
        iva = parseFloat(total * 0.19).toFixed(2);
        subtotal = parseFloat(total-iva).toFixed(2);
        document.getElementById("subtotal").innerHTML = "$. " + subtotal*1000;
        document.getElementById("iva").innerHTML = "$. " + iva*1000;
        document.getElementById("total").innerHTML = "$. " + (total*1000).toFixed(0);
    }

    /* obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
            
        }
        else {
            console.log("click afuera");
        }
    } */
}