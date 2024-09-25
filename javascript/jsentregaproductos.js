/* Carga los productos guardados en localStorage cuando se carga la página */
function loadProducts() {
    const storedProducts = JSON.parse(localStorage.getItem('productsToDeliver')) || [];
    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];

    /* Añade cada producto guardado en una nueva fila en la tabla */
    storedProducts.forEach((product, index) => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>
                <div class="image-upload">
                    <img src="${product.image}" class="preview">
                </div>
            </td>
            <td contenteditable="true">${product.productName}</td>
            <td contenteditable="true">${product.quantity}</td>
            <td contenteditable="true">${product.deliveryDate}</td>
            <td contenteditable="true">${product.customer}</td>
            <td contenteditable="true">$${parseFloat(product.salePrice).toFixed(2)}</td>
            <td>
                <button class="edit-button" onclick="editProduct(this, ${index})">Editar</button>
                <button class="delete-button" onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
    });

    // Muestra la tabla solo si hay productos
    const tableContainer = document.getElementById('productTableContainer');
    tableContainer.style.display = storedProducts.length > 0 ? 'block' : 'none';
}

/* Guarda un nuevo producto en localStorage y lo añade a la tabla */
function saveProduct() {
    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;
    const deliveryDate = document.getElementById('deliveryDate').value;
    const customer = document.getElementById('customer').value;
    const salePrice = document.getElementById('salePrice').value;
    const image = document.getElementById('preview').src;

    /* Valida que todos los campos estén completos antes de guardar */
    if (!productName || !quantity || !deliveryDate || !customer || !salePrice || image === "") {
        document.getElementById('errorMessage').style.display = 'block';
        return false;
    }

    const storedProducts = JSON.parse(localStorage.getItem('productsToDeliver')) || [];
    storedProducts.push({
        productName,
        quantity,
        deliveryDate,
        customer,
        salePrice,
        image
    });

    localStorage.setItem('productsToDeliver', JSON.stringify(storedProducts));

    /* Añade el nuevo producto como una fila en la tabla */
    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>
            <div class="image-upload">
                <img src="${image}" class="preview">
            </div>
        </td>
        <td contenteditable="true">${productName}</td>
        <td contenteditable="true">${quantity}</td>
        <td contenteditable="true">${deliveryDate}</td>
        <td contenteditable="true">${customer}</td>
        <td contenteditable="true">$${parseFloat(salePrice).toFixed(2)}</td>
        <td>
            <button class="edit-button" onclick="editProduct(this)">Editar</button>
            <button class="delete-button" onclick="deleteProduct(${storedProducts.length - 1})">Eliminar</button>
        </td>
    `;

    /* Limpia los campos del formulario después de guardar */
    resetForm();

    document.getElementById('errorMessage').style.display = 'none';

    return false;
}

/* (Mantén las demás funciones igual, solo asegúrate de que todas referencien 'productsToDeliver' en lugar de 'receivedProducts') */

/* Se ejecuta al cargar la página */
window.onload = function() {
    loadProducts();
};
