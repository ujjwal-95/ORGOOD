let cartItemCount = 0;
function addToCart() {
  cartItemCount++;
  document.getElementById("cart-count").innerText = cartItemCount;
}

function showNotification() {
    const notification = document.getElementById("notification");
    const progressBar = document.getElementById("progress-bar");

    notification.classList.remove("hidden"); // Show the notification
    notification.style.display = "flex"; // Ensure display is flex

    // Set the initial width of the progress bar to 100%
    progressBar.style.width = '100%';

    // Smoothly reduce the width of the progress bar over 5 seconds
    setTimeout(() => {
        progressBar.style.width = '0%';
    }, 100); // Start shrinking after a short delay

    // Hide the notification after 5 seconds (matching the progress bar duration)
    setTimeout(() => {
        notification.classList.add("hidden");
        notification.style.display = "none";
    }, 5000); // Hide after 5 seconds
 }
 
let cart = [];
let totalPrice = 0;

// Function to add items to the cart and update the count
function addToCart(product, price) {
    cart.push({ product, price });
    totalPrice += price;

    // Update cart count in the nav
    const cartCount = document.getElementById("cart-count");
    cartCount.innerText = cart.length;

    // Show the notification when an item is added
    showNotification();
}

// Function to open the cart modal
function openCartModal() {
    const cartModal = document.getElementById("cart-modal");
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    // Clear previous items in the modal
    cartItemsContainer.innerHTML = '';

    // Populate cart items in the modal
    if (cart.length > 0) {
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("flex", "justify-between", "p-2", "border-b", "border-gray-300");

            cartItem.innerHTML = `
                <span>${item.product}</span>
                <span>Rs-${item.price.toFixed(2)}</span>
            `;

            cartItemsContainer.appendChild(cartItem);
        });
    } else {
        cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
    }

    // Update total price
    totalPriceElement.innerText = totalPrice.toFixed(2);

    // Show the modal
    cartModal.classList.remove("hidden");
    cartModal.classList.add("flex");
}

// Function to close the cart modal
function closeCartModal() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.add("hidden");
}

// Event listener for the cart button to open the modal
document.getElementById("cart-btn").addEventListener("click", openCartModal);

// Event listener for the close button to close the modal
document.getElementById("close-cart-btn").addEventListener("click", closeCartModal);

// Handle "Place Your Order" button click
document.getElementById("place-order-btn").addEventListener("click", function() {
   alert("Your Order placed successfully.Thank you for shopping!");

    // Clear the cart and close the modal
    cart = [];
    totalPrice = 0;
    closeCartModal();

    // Update cart count to 0 after clearing
    document.getElementById("cart-count").innerText = "0";
});


// Smooth scroll to product section when clicking on navbar button
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });

// Get the button and form elements
const placeOrderBtn = document.getElementById('place-order-btn');
const orderForm = document.getElementById('order-form');

// // Add event listener for form submission
placeOrderBtn.addEventListener('click', function() {
  const name = document.getElementById('name').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const address = document.getElementById('address').value.trim();
  
  // Check if all fields are filled
  if (!name || !mobile || !address || !cart-count) {
    validateForm(); // To show the error messages if fields are empty
  } else {
    // If everything is valid, proceed with order submission

    // Reset the form after submission
    orderForm.reset();
    placeOrderBtn.disabled = true; // Re-disable the button after submission
  }
});

// Form validation function for enabling/disabling the button
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const address = document.getElementById('address').value.trim();
  
  // Enable the button if all fields are filled
  const isFormValid = name && mobile && address;
  document.getElementById('place-order-btn').disabled = !isFormValid;

  // Show error messages if fields are empty
  document.getElementById('name-error').classList.toggle('hidden', !!name);
  document.getElementById('mobile-error').classList.toggle('hidden', !!mobile);
  document.getElementById('address-error').classList.toggle('hidden', !!address);
}
// Event listeners for input changes
document.getElementById('name').addEventListener('input', validateForm);
document.getElementById('mobile').addEventListener('input', validateForm);
document.getElementById('address').addEventListener('input', validateForm);
});