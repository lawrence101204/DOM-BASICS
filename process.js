const products = Array.from (document.querySelectorAll('.product-card'));
products.forEach(product => {
  const name = product.querySelector('.product-name').textContent;
  const price = product.querySelector('.product-price').textContent;

  const card = document.createElement('div');
  card.className = 'p-4 bg-white rounded shadow';
  card.innerHTML = `
    <h3 class="font-bold">${name}</h3>
    <p class="text-sm">${price}</p>
    <button class="mt-2 bg-blue-500 text-white px-2 py-1 rounded add-to-cart">Add to Cart</button>
  `;
  card.querySelector('.add-to-cart').addEventListener('click', () => {
    const li = document.createElement('li');
    li.textContent = `${name} - ${price}`;
    cartList.appendChild(li);
  });
  productList.appendChild(card);
});