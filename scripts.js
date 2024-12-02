console.log("El archivo scripts.js se ha cargado correctamente.");
// Botón de ofertas
const ofertasLink = document.querySelector(".top-bar .left a");
if (ofertasLink) {
    ofertasLink.addEventListener("click", (e) => {
        e.preventDefault();
        verOfertas();
    });
}

// Redirigir al libro de reclamaciones
const libroReclamaciones = document.querySelector("footer .footer-content a");
if (libroReclamaciones) {
    libroReclamaciones.addEventListener("click", (e) => {
        e.preventDefault();
        abrirLibroReclamaciones();
    });
}

// Función de prueba para botones de productos
const productButtons = document.querySelectorAll(".ver-mas");
productButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productName = button.dataset.productName || "Producto";
        verMas(productName);
    });
});

// Función para mostrar más detalles de un producto
function verMas(producto) {
    alert("Más detalles sobre: " + producto);
    // Puedes redirigir a otra página específica del producto:
    // window.location.href = producto + ".html";
}
// Función que se ejecuta cuando se hace clic en el botón "Suscribirse"
function suscribirse() {
    // Obtener el valor del correo ingresado
    const email = document.getElementById('email').value.trim();

    // Verificar si el correo es válido
    if (email) {
        // Mostrar el mensaje de agradecimiento con el correo registrado
        const message = `¡Gracias por suscribirte! Hemos registrado tu correo: ${email}`;
        document.getElementById('subscription-message').textContent = message;
        document.getElementById('subscription-message').style.display = 'block'; // Hacer visible el mensaje

        // Opcional: Limpiar el campo de correo después de suscribirse
        document.getElementById('email').value = '';
    } else {
        // Si el correo no es válido, mostrar un mensaje de alerta o advertencia
        alert('Por favor ingresa un correo válido');
    }
}



// Función de búsqueda
function buscar() {
    const query = document.querySelector(".search-box").value;
    if (query) {
        alert("Buscando: " + query);
        // Puedes implementar la búsqueda con un sistema más complejo:
        // Por ejemplo, redirigir a una página con los resultados
        // window.location.href = "buscar.html?q=" + encodeURIComponent(query);
    } else {
        alert("Por favor, ingresa un término de búsqueda.");
    }
}

// Función para mostrar productos de una categoría específica
function showCategory(category) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => product.classList.remove('show'));

    const selectedProducts = document.querySelectorAll(`.${category}`);
    selectedProducts.forEach(product => product.classList.add('show'));
}
const productosFragancias = [
    { nombre: "Perfume Bombshell Isle", imagen: "images/perfume-bombshell.png", precio: "S/ 389.00" },
    { nombre: "Perfume Tease Dreamer", imagen: "images/perfume-tease-dreamer.png", precio: "S/ 299.00" },
    { nombre: "Perfume Love Spell", imagen: "images/perfume-love-spell.png", precio: "S/ 219.00" },
];

function mostrarFragancias() {
    const contenedor = document.getElementById("productos-contenedor");
    contenedor.innerHTML = productosFragancias.map(producto => `
        <div class="product">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}</p>
            <button onclick="verMas('${producto.nombre}', '${producto.imagen}', '${producto.precio}')">Ver Más</button>
        </div>
    `).join("");
}

function verMas(nombre, imagen, precio) {
    document.getElementById("modal-title").innerText = nombre;
    document.getElementById("modal-img").src = imagen;
    document.getElementById("modal-price").innerText = precio;
    document.getElementById("myModal").style.display = "block";
}

function cerrarModal() {
    document.getElementById("myModal").style.display = "none";
}

// Llama a las funciones al cargar la página
window.onload = function() {
    mostrarFragancias();
};


// Lista de compras (carrito)
const compras = [];

// Función para añadir un producto al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    const producto = { nombre, precio: parseFloat(precio.replace('S/', '').trim()), imagen }; // Convertir precio a número
    compras.push(producto);
    alert(`${nombre} ha sido agregado al carrito.`);
    mostrarCompras();
}

// Función para mostrar el carrito
function mostrarCompras() {
    const carritoExistente = document.querySelector('.carrito-contenido');
    if (carritoExistente) carritoExistente.remove();

    const carritoDiv = document.createElement('div');
    carritoDiv.className = 'carrito-contenido';

    // Calcular el total
    const total = compras.reduce((suma, producto) => suma + producto.precio, 0);

    if (compras.length === 0) {
        carritoDiv.innerHTML = `<h2>Carrito vacío</h2>`;
    } else {
        carritoDiv.innerHTML = `
            <h2>Productos en el carrito:</h2>
            ${compras.map(producto => `
                <div class="compra-item">
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px;">
                    <div>
                        <h3>${producto.nombre}</h3>
                        <span>Precio: S/ ${producto.precio.toFixed(2)}</span>
                    </div>
                </div>
            `).join('')}
            <h3>Total: S/ ${total.toFixed(2)}</h3>
        `;
    }

    const cerrarBtn = document.createElement('button');
    cerrarBtn.textContent = 'Cerrar';
    cerrarBtn.className = 'cerrar-carrito';
    cerrarBtn.onclick = () => carritoDiv.remove();

    carritoDiv.appendChild(cerrarBtn);
    document.body.appendChild(carritoDiv);
}

// Escucha eventos de los botones "Comprar"
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-comprar')) {
        const productoDiv = e.target.closest('.producto'); // Encuentra el contenedor del producto
        const nombre = productoDiv.querySelector('h3').textContent;
        const precio = productoDiv.querySelector('p').textContent.replace('Precio: ', '');
        const imagen = productoDiv.querySelector('img').src;
        agregarAlCarrito(nombre, precio, imagen);
    }
});

// Función para mostrar el popup de "Compra exitosa"
function mostrarPopup(mensaje) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
        <p>${mensaje}</p>
        <button onclick="cerrarPopup(this)">Cerrar</button>
    `;
    document.body.appendChild(popup);

    // Mostrar el popup
    popup.classList.add("show");

    // Remover el popup después de 3 segundos
    setTimeout(() => {
        popup.classList.remove("show");
        popup.remove();  // Eliminar el popup del DOM
    }, 3000);
}

// Función para cerrar el popup manualmente
function cerrarPopup(button) {
    button.parentElement.remove();  // Eliminar el popup cuando se cierra manualmente
}

document.getElementById('fine-fragrance-btn').addEventListener('click', function() {
    mostrarProductosFineFragrance();
});

// Combinar todos los productos en un solo array
const todosLosProductos = [
    ...productosFragancias,
    ...productosMists,
    ...productosPanties,
    ...productosBolsos,
];

// Seleccionar el cuadro de búsqueda y contenedor de productos
const searchBox = document.querySelector(".search-box");
const contenedor = document.getElementById("productos-contenedor");

// Función para mostrar productos
function mostrarProductos(productos) {
    contenedor.innerHTML = ""; // Limpiar contenido anterior

    if (productos.length === 0) {
        // Mostrar mensaje si no hay resultados
        contenedor.innerHTML = `<p>Producto no encontrado</p>`;
    } else {
        // Mostrar productos encontrados
        productos.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");

            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-precio">${producto.precio}</p>
            `;

            contenedor.appendChild(productoDiv);
        });
    }
}

// Evento de búsqueda
searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();

    // Filtrar productos según la búsqueda
    const productosFiltrados = todosLosProductos.filter(producto =>
        producto.nombre.toLowerCase().includes(query)
    );

    mostrarProductos(productosFiltrados);
});

// Mostrar todos los productos al cargar la página
mostrarProductos(todosLosProductos);