const products = [
  {id:1,name:"Wireless Headphones",category:"electronics",price:1499,emoji:"🎧",desc:"Rich sound and everyday comfort"},
  {id:2,name:"Smart Watch",category:"electronics",price:2299,emoji:"⌚",desc:"A smarter way to stay active"},
  {id:3,name:"Running Shoes",category:"fashion",price:1899,emoji:"👟",desc:"Lightweight everyday trainers"},
  {id:4,name:"Classic Backpack",category:"fashion",price:999,emoji:"🎒",desc:"Room for all your essentials"},
  {id:5,name:"Desk Lamp",category:"home",price:699,emoji:"💡",desc:"Light up your workspace"},
  {id:6,name:"Coffee Maker",category:"home",price:2499,emoji:"☕",desc:"Start every morning right"},
  {id:7,name:"Bluetooth Speaker",category:"electronics",price:1299,emoji:"🔊",desc:"Music wherever you go"},
  {id:8,name:"Casual T-Shirt",category:"fashion",price:499,emoji:"👕",desc:"Soft fabric and relaxed fit"}
];

let cart = [];
const money = value => value.toLocaleString("en-IN");

function renderProducts() {
  const query = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category").value;

  const filtered = products.filter(p =>
    (p.name.toLowerCase().includes(query) ||
     p.desc.toLowerCase().includes(query)) &&
    (category === "all" || p.category === category)
  );

  document.getElementById("product-grid").innerHTML = filtered.map(p => `
    <article class="card">
      <div class="product-image">${p.emoji}</div>
      <h3>${p.name}</h3>
      <p class="description">${p.desc}</p>
      <div class="product-bottom">
        <span class="price">₹${money(p.price)}</span>
        <button class="add-button" data-add="${p.id}">+ Add</button>
      </div>
    </article>
  `).join("");

  document.getElementById("empty").hidden = filtered.length > 0;
}

function renderCart() {
  document.getElementById("count").textContent =
    cart.reduce((sum, item) => sum + item.qty, 0);

  document.getElementById("cart-items").innerHTML = cart.map(item => `
    <div class="cart-row">
      <span>${item.emoji} ${item.name}<br>₹${money(item.price)} × ${item.qty}</span>
      <button class="remove-button" data-remove="${item.id}">Remove</button>
    </div>
  `).join("");

  document.getElementById("total").textContent =
    money(cart.reduce((sum, item) => sum + item.price * item.qty, 0));
}

document.getElementById("product-grid").addEventListener("click", event => {
  const id = Number(event.target.dataset.add);
  if (!id) return;

  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) existing.qty++;
  else cart.push({...product, qty:1});

  renderCart();
});

document.getElementById("cart-items").addEventListener("click", event => {
  const id = Number(event.target.dataset.remove);
  if (!id) return;

