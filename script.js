// Simulación de base de datos pro
const menu = [
    { id: 1, name: "CHILAQUILES DE LA CASA", price: 120, cat: "chilaquiles", desc: "Salsa de habanero tatemado y arrachera." },
    { id: 2, name: "GORDITA BRUTAL", price: 45, cat: "guisados", desc: "Chicharrón prensado con salsa secreta." },
    { id: 3, name: "SHAKE PROTEIN OREO", price: 85, cat: "bebidas", desc: "Malteada explosiva con 30g de proteína." }
];

let cart = [];

function renderProducts() {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = menu.map(p => `
        <div class="menu-card">
            <div class="card-img"></div>
            <div class="card-body">
                <span class="price-tag">$${p.price}</span>
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <button class="add-btn-circle" onclick="addToCart(${p.id})">+</button>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const item = menu.find(p => p.id === id);
    cart.push(item);
    updateUI();
}

function updateUI() {
    const count = cart.length;
    const total = cart.reduce((s, i) => s + i.price, 0);
    
    document.getElementById('cart-count').innerText = count;
    document.getElementById('cart-total-bar').innerText = total;
    document.getElementById('cart-total-modal').innerText = `$${total}`;
    
    if(count > 0) document.getElementById('cart-bar').classList.remove('hidden');
}

function sendWhatsApp() {
    const phone = "524492094034"; // Formato internacional
    let text = `*NUEVO PEDIDO - ELITE FOODS*%0A--------------------------%0A`;
    
    cart.forEach((item, i) => {
        text += `• *${item.name}* - $${item.price}%0A`;
    });
    
    const total = cart.reduce((s, i) => s + i.price, 0);
    text += `--------------------------%0A*TOTAL: $${total}*%0A%0A_Enviado desde el Menú Digital_`;
    
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

renderProducts();