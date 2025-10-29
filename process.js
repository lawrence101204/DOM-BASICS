
const main = document.getElementById('main');
const h1 = main.firstElementChild;
const section = h1.nextElementSibling;

const article1 = section.firstElementChild; 
const h2Products = article1.firstElementChild;
const productTable = h2Products.nextElementSibling;
const productList = productTable.querySelector('#productList');

const article2 = article1.nextElementSibling; 
const h2Cart = article2.firstElementChild;
const cartTable = h2Cart.nextElementSibling;
const cartList = cartTable.querySelector('#cartList');
const totalDiv = cartTable.nextElementSibling;
const totalDisplay = totalDiv.querySelector('#total');
const clearCartBtn = totalDiv.nextElementSibling;

console.log("✅ DOM Traversed Successfully");


const products = [
  { name: 'Apple', price: 100, image: 'apple.jpeg' },
  { name: 'Banana', price: 50, image: 'banana.jpeg' },
  { name: 'Orange', price: 80, image: 'orange.jpeg' },
  { name: 'Mango', price: 120, image: 'mango.jpeg' },
];

let cartItems = [];


function updateTotal() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalDisplay.textContent = total;
}

function renderCart() {
  cartList.innerHTML = '';

  cartItems.forEach(item => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50 transition';
    row.innerHTML = `
      <td class="p-3 text-gray-800">${item.name}</td>
      <td class="p-3 text-center flex items-center justify-center gap-2">
        <button class="minus bg-gray-300 px-2 rounded">−</button>
        <span class="font-semibold">${item.quantity}</span>
        <button class="plus bg-gray-300 px-2 rounded">+</button>
      </td>
      <td class="p-3 text-center text-gray-700">₱${item.price * item.quantity}</td>
      <td class="p-3 text-center">
        <button class="remove bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">✖</button>
      </td>
    `;

    const plusBtn = row.querySelector('.plus');
    const minusBtn = row.querySelector('.minus');
    const removeBtn = row.querySelector('.remove');

    plusBtn.addEventListener('click', () => {
      item.quantity++;
      console.log(`➕ Increased ${item.name} to ${item.quantity}`);
      renderCart();
      updateTotal();
    });

    minusBtn.addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
        console.log(`➖ Decreased ${item.name} to ${item.quantity}`);
      } else {
        cartItems = cartItems.filter(p => p.name !== item.name);
        console.log(`🗑️ Removed ${item.name} from cart`);
      }
      renderCart();
      updateTotal();
    });

    removeBtn.addEventListener('click', () => {
      cartItems = cartItems.filter(p => p.name !== item.name);
      console.log(`❌ Removed ${item.name} from cart`);
      renderCart();
      updateTotal();
    });

    cartList.appendChild(row);
  });
}


products.forEach(product => {
  const row = document.createElement('tr');
  row.className = 'hover:bg-gray-50 transition';

  row.innerHTML = `
    <td class="p-3"><img src="${product.image}" alt="${product.name}" class="h-12 w-12 object-cover rounded"></td>
    <td class="p-3 font-semibold text-gray-700">${product.name}</td>
    <td class="p-3 text-gray-600">₱${product.price}</td>
    <td class="p-3 text-center">
      <button class="add bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">Add</button>
    </td>
  `;

  const addBtn = row.querySelector('.add');
  addBtn.addEventListener('click', () => {
    const existing = cartItems.find(p => p.name === product.name);
    if (existing) {
      existing.quantity++;
      console.log(`🔼 Increased ${product.name} quantity`);
    } else {
      cartItems.push({ ...product, quantity: 1 });
      console.log(`🛒 Added to cart: ${product.name} (₱${product.price})`);
    }
    renderCart();
    updateTotal();
  });

  productList.appendChild(row);
});


clearCartBtn.addEventListener('click', () => {
  cartItems = [];
  renderCart();
  updateTotal();
  console.log('🧹 Cart cleared');
});

console.log(`✅ ${products.length} Products Loaded`);
