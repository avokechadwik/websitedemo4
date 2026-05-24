let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

const sidebar = document.getElementById('cartSidebar');
const closeBtn = document.getElementById('closeCartBtn');
const itemsContainer = document.getElementById('cartItemsContainer');
const totalSumSpan = document.getElementById('cartTotalSum');

function updateCartCount(){
    const count1 = document.getElementById('cart-count');
    const count2 = document.getElementById('cart-count-2');
    
    if(count1) count1.innerHTML = cart.length;
    if(count2) count2.innerHTML = cart.length;
}

function renderSidebarItems() {
    if (!itemsContainer) return;
    itemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div>
                <p style="font-weight:bold; margin:0;">${item.name}</p>
                <p style="color:#c19a6b; margin:0;">$${item.price}</p>
            </div>
            <button onclick="removeFromCart(${index})" style="background:#ff4d4d; padding:5px 10px; font-size:12px;">&times;</button>
        `;
        itemsContainer.appendChild(row);
    });

    if (totalSumSpan) {
        totalSumSpan.innerText = total;
    }
}

function openCartSidebar() {
    if (sidebar) sidebar.classList.add('active');
}

function closeCartSidebar() {
    if (sidebar) sidebar.classList.remove('active');
}

// Attach open clicks to all navigation Cart buttons
document.querySelectorAll('.cart-click-trigger').forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        openCartSidebar();
    };
});

if (closeBtn) {
    closeBtn.onclick = () => {
        closeCartSidebar();
    };
}

function addToCart(name,price){
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();
    renderSidebarItems();
    openCartSidebar(); // Slides the bar open! No alert message.
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    renderSidebarItems();
}

function addToWishlist(name){
    wishlist.push(name);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert(name + ' added to wishlist');
}

// Dark theme toggle
const themeBtn = document.getElementById('themeBtn');
if(themeBtn){
    themeBtn.onclick = ()=>{
        document.body.classList.toggle('dark');
    };
}

// Search filter
const searchInput = document.getElementById('searchInput');
if(searchInput){
    searchInput.addEventListener('keyup',()=>{
        let filter = searchInput.value.toLowerCase();
        document.querySelectorAll('.product').forEach(product=>{
            let text = product.innerText.toLowerCase();
            product.style.display = text.includes(filter) ? 'block' : 'none';
        });
    });
}

// Run functions on load
updateCartCount();
renderSidebarItems();
// Function to handle the checkout process
function processCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some furniture first.");
        return;
    }

    // 1. Alert the user their luxury order is processing (No annoying spam, just a success notice)
    alert("Order successful! Thank you for shopping with HomeStyle.");

    // 2. Wipe the cart data clean
    cart = [];
    localStorage.removeItem('cart');

    // 3. Update the UI counts and empty the drawer list
    updateCartCount();
    renderSidebarItems();

    // 4. Slide the sidebar away
    closeCartSidebar();
}

// Automatically attach this function to the checkout button when the script loads
document.addEventListener("DOMContentLoaded", () => {
    const checkoutBtn = document.querySelector('.checkout-sidebar-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = processCheckout;
    }
});