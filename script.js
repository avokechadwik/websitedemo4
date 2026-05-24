let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// CORE NAVIGATION SCREEN TOGGLE SYSTEM
function togglePage(viewName, event) {
    if (event) event.preventDefault();
    const homeView = document.getElementById('home-view');
    const furnitureView = document.getElementById('furniture-view');
    const wishlistView = document.getElementById('wishlist-view');

    if(homeView) homeView.style.display = 'none';
    if(furnitureView) furnitureView.style.display = 'none';
    if(wishlistView) wishlistView.style.display = 'none';

    if (viewName === 'home' && homeView) homeView.style.display = 'block';
    if (viewName === 'furniture' && furnitureView) furnitureView.style.display = 'block';
    if (viewName === 'wishlist' && wishlistView) {
        wishlistView.style.display = 'block';
        renderWishlistItems();
    }
    closeCart();
}

// POPUP FORM CONTAINER INTERACTIVITY RULES
function openModal(modalId, event) {
    if (event) event.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

function handleLoginSubmit(event) {
    event.preventDefault();
    alert("Login successful! Welcome back.");
    closeModal('loginModal');
}

function handleContactSubmit(event) {
    event.preventDefault();
    alert("Message sent! Our support team will get back to you shortly.");
    closeModal('contactModal');
}

function updateCartCount(){
    const count1 = document.getElementById('cart-count');
    const count2 = document.getElementById('cart-count-2');
    const count3 = document.getElementById('cart-count-3');
    
    if(count1) count1.innerHTML = cart.length;
    if(count2) count2.innerHTML = cart.length;
    if(count3) count3.innerHTML = cart.length;
}

function renderCartItems() {
    const list = document.getElementById('cartItems');
    const totalSpan = document.getElementById('cartTotal');

    if (!list) return;
    let totalSum = 0;
    let outputHTML = '';

    cart.forEach((item, index) => {
        totalSum += item.price;
        outputHTML += `
            <div class="cart-item-row">
                <div>
                    <p style="font-weight:bold; margin:0;">${item.name}</p>
                    <p style="color:#c19a6b; margin:0;">$${item.price}</p>
                </div>
                <button onclick="removeFromCart(${index})" style="background:#ff4d4d; padding:5px 10px; font-size:12px; border-radius:5px;">&times;</button>
            </div>
        `;
    });

    list.innerHTML = outputHTML;
    if (totalSpan) totalSpan.innerText = totalSum;
}

function renderWishlistItems() {
    const grid = document.getElementById('wishlistGrid');
    if (!grid) return;

    if (wishlist.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; font-size:18px; padding:40px;">Your wishlist is currently empty.</p>`;
        return;
    }

    const productImages = {
        'Luxury Sofa': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
        'Modern Bedroom': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
        'Kitchen Table': 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
        'Decoration Set': 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e'
    };
    const productPrices = { 'Luxury Sofa': 799, 'Modern Bedroom': 1299, 'Kitchen Table': 499, 'Decoration Set': 299 };

    let gridHTML = '';
    wishlist.forEach((itemName, index) => {
        const img = productImages[itemName] || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85';
        const price = productPrices[itemName] || 0;
        gridHTML += `
            <div class="product">
                <img src="${img}">
                <h2>${itemName}</h2>
                <p>$${price}</p>
                <div class="buttons">
                    <button onclick="addToCart('${itemName}', ${price})">Add To Cart</button>
                    <button onclick="removeFromWishlist(${index})" style="background:#ff4d4d;">Remove</button>
                </div>
            </div>
        `;
    });
    grid.innerHTML = gridHTML;
}

function openCart(event) {
    if (event) event.preventDefault();
    const drawer = document.getElementById('cartSidebar');
    if (drawer) drawer.classList.add('active');
}

function closeCart() {
    const drawer = document.getElementById('cartSidebar');
    if (drawer) drawer.classList.remove('active');
}

function addToCart(name, price){
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
    openCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function addToWishlist(name){
    if (wishlist.includes(name)) {
        alert(name + ' is already in your wishlist!');
        return;
    }
    wishlist.push(name);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert(name + ' added to wishlist');
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderWishlistItems();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order successful! Thank you for shopping with HomeStyle.");
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    renderCartItems();
    closeCart();
}

const themeBtn = document.getElementById('themeBtn');
if(themeBtn){
    themeBtn.onclick = ()=>{
        document.body.classList.toggle('dark');
    };
}

const searchInput = document.getElementById('searchInput');
if(searchInput){
    searchInput.addEventListener('keyup',()=>{
        let filter = searchInput.value.toLowerCase();
        document.querySelectorAll('#furniture-view .product').forEach(product=>{
            let text = product.innerText.toLowerCase();
            product.style.display = text.includes(filter) ? 'block' : 'none';
        });
    });
}

// Global execution load scripts
updateCartCount();
renderCartItems();