const socket = io();
console.log("control funcionamiento");
// En consola del navegador y en terminal avisa si se conecto alguien
socket.on("products", (data) => {
  renderProductos(data);
});

//Funcion para renderizar los productos:
//  const productList = document.getElementById('product-list');
productList.innerHTML = '';
products.forEach((product) => {
  const listItem = document.createElement('li');
  listItem.textContent = `ID: ${product.id} - Title: ${product.title} - Price: $${product.price}`;
  productList.appendChild(listItem);
});


const productForm = document.getElementById('product-form');
if (productForm) {
productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(productForm);
  const product = {};
  formData.forEach((value, key) => {
    product[key] = value;
  });
  socket.emit('createProduct', product);
  productForm.reset();
});
}

const deleteForm = document.getElementById('delete-form');
if (deleteForm) {
deleteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const productId = new FormData(deleteForm).get('productId');
  socket.emit('deleteProduct', productId);
  deleteForm.reset();
});
}

