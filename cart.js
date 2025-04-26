// Improved Shopping Cart Implementation

document.addEventListener("DOMContentLoaded", () => {
    updateCartCounter();
    renderCart();
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    
    saveCart();
    updateCartCounter();
    renderCart();
}

function updateCartCounter() {
    let cartCounter = document.querySelector(".fa-cart-shopping");
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.setAttribute("data-count", totalItems);
}

function renderCart() {
    let cartContainer = document.getElementById("cart-items");
    let total = 0;
    cartContainer.innerHTML = "";
    
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div>${item.name} - ₦${(item.price * item.quantity).toLocaleString()}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-button" onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-button" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-button" onclick="removeFromCart(${index})">X</button>
            </div>
        `;
    });
    
    document.getElementById("cart-total").textContent = total.toLocaleString();
}

function changeQuantity(index, amount) {
    if (cart[index].quantity + amount <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].quantity += amount;
    }
    
    saveCart();
    updateCartCounter();
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCounter();
    renderCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
