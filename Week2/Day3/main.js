// Mobile menu toggle functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');

mobileMenuButton.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');

    if (isHidden) {
        // Show mobile menu
        mobileMenu.classList.remove('hidden');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        // Hide mobile menu
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
});

// Close mobile menu when clicking on navigation links
const mobileNavLinks = mobileMenu.querySelectorAll('a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
});

// cart modal
const openCartModal = document.querySelectorAll('#openCartModal');
const cartbox = document.getElementById('cart');
const cartModalOverlay = document.getElementById('cartModalOverlay');
const closeCartModal = document.getElementById('closeCartModal');
const takeMeBack = document.getElementById('backToHome');

openCartModal.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        cartbox.classList.remove('hidden');
        cartModalOverlay.classList.remove('hidden');
    });
});

closeCartModal.addEventListener('click', () => {
    cartbox.classList.add('hidden');
    cartModalOverlay.classList.add('hidden');
});

takeMeBack.addEventListener('click', () => {
    cartbox.classList.add('hidden');
    cartModalOverlay.classList.add('hidden');
})


// cart functinality:
window.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

// Cart state
const cart = {};

function renderCart() {
    const cartItemsWrapper = document.getElementById("cartModal");
    const cartSummary = document.getElementById("cartSummary");
    const nextProcess = document.getElementById("nextProcess");
    const totalItems = document.getElementById("totalItems")

    const cartItems = Object.values(cart);
    let total = 0;

    totalItems.innerHTML = cartItems.length;

    // Clear the cart items container
    cartItemsWrapper.innerHTML = "";

    if (cartItems.length === 0) {
        cartItemsWrapper.innerHTML = `
            <div class="p-4 font-poppins flex items-center justify-center gap-4">
                <p>Your cart is currently empty.</p>
            </div>
        `;
        cartSummary.classList.add('hidden');
        nextProcess.classList.add('hidden');
        return;
    }


    cartItems.forEach(item => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "flex flex-col sm:flex-row items-center justify-between gap-2 rounded-lg bg-[#D9D9D999] p-4";

        cartItem.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${item.image}" alt="${item.title}" class="w-12 md:w-20">
                <img src="./assets/cart/Line.png" alt="line" class="h-8 md:h-16">
                <h1 class="font-bold text-base md:text-xl px-3">${item.title}</h1>
            </div>
            <div class="flex items-center gap-3">
                <img src="./assets/cart/minus.png" alt="-" class="w-6 md:w-8 cursor-pointer" data-id="${item.id}" data-action="decrease">
                <span class="bg-white text-base md:text-xl font-bold px-4 md:px-6 py-2 md:py-4 rounded-lg">${item.quantity}</span>
                <img src="./assets/cart/plus.png" alt="+" class="w-6 md:w-8 cursor-pointer" data-id="${item.id}" data-action="increase">
            </div>
        `;

        cartItemsWrapper.appendChild(cartItem);
    });

    cartSummary.classList.remove('hidden');
    nextProcess.classList.remove('hidden');

    // Update total
    const totalPriceEl = cartSummary.querySelector("span");
    totalPriceEl.textContent = `£${total.toFixed(2)}`;
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        const id = parseInt(e.target.dataset.id);
        const product = products.products.find(item => item.id === id);
        if (!product) return;

        if (cart[id]) {
            cart[id].quantity += 1;
            showToast(`🛒 ${product.title} quantity increased`, "info");
        } else {
            cart[id] = {
                ...product,
                quantity: 1
            };
            showToast(`✅ ${product.title} added to cart`, "success");
        }

        renderCart();
    }
});

document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.dataset.action === "increase" || target.dataset.action === "decrease") {
        const id = parseInt(target.dataset.id);
        if (!cart[id]) return;

        if (target.dataset.action === "increase") {
            cart[id].quantity += 1;
            showToast(`🔼 ${cart[id].title} quantity increased`, "info");
        } else if (target.dataset.action === "decrease") {
            cart[id].quantity -= 1;
            if (cart[id].quantity <= 0) {
                showToast(`❌ ${cart[id].title} removed from cart`, "danger");
                delete cart[id];
            } else {
                showToast(`🔽 ${cart[id].title} quantity decreased`, "info");
            }
        }

        renderCart();
    }
});

function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = message;

    // Reset classes
    toast.className = "fixed bottom-6 right-6 text-white text-sm md:text-base px-8 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out";

    if (type === "success") toast.classList.add("bg-[#028643]");
    else if (type === "info") toast.classList.add("bg-[#FC8A06]");
    else if (type === "danger") toast.classList.add("bg-red-500");

    toast.classList.remove("hidden", "opacity-0");
    toast.classList.add("opacity-90");

    setTimeout(() => {
        toast.classList.add("opacity-0");
        setTimeout(() => {
            toast.classList.add("hidden");
        }, 300);
    }, 2000);
}

// products
const products = {
    "products": [
        {
            "id": 1,
            "title": "Royal Cheese Burger",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium fries",
            "price": 23.10,
            "image": "./assets/burgers/burger-1.png",
            "category": "burger"
        },
        {
            "id": 2,
            "title": "The classics for 3",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks",
            "price": 19.99,
            "image": "./assets/burgers/burger-2.png",
            "category": "burger"
        },
        {
            "id": 3,
            "title": "The classics for 3",
            "description": "Crispy chicken, lettuce, spicy mayo",
            "price": 17.50,
            "image": "./assets/burgers/burger-3.png",
            "category": "burger"
        },
        {
            "id": 4,
            "title": "The classics for 3",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks",
            "price": 17.50,
            "image": "./assets/burgers/burger-4.png",
            "category": "burger"
        },
        {
            "id": 5,
            "title": "The classics for 3",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks",
            "price": 17.50,
            "image": "./assets/burgers/burger-5.png",
            "category": "burger"
        },
        {
            "id": 6,
            "title": "The classics for 3",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks",
            "price": 17.50,
            "image": "./assets/burgers/burger-6.png",
            "category": "burger"
        },
        {
            "id": 7,
            "title": "Royal Cheese Burger with extra Fries",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium",
            "price": 4.99,
            "image": "./assets/fries/fries-1.png",
            "category": "fries"
        },
        {
            "id": 8,
            "title": "The classics for 3",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks",
            "price": 19.99,
            "image": "./assets/fries/fries-2.png",
            "category": "fries"
        },
        {
            "id": 9,
            "title": "The classics for 3",
            "description": "Crispy chicken, lettuce, spicy mayo",
            "price": 17.50,
            "image": "./assets/fries/fries-3.png",
            "category": "fries"
        },
        {
            "id": 10,
            "title": "The classics for 3",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks",
            "price": 17.50,
            "image": "./assets/fries/fries-4.png",
            "category": "fries"
        },
        {
            "id": 11,
            "title": "The classics for 3",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks",
            "price": 17.50,
            "image": "./assets/fries/fries-5.png",
            "category": "fries"
        },
        {
            "id": 12,
            "title": "The classics for 3",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks",
            "price": 17.50,
            "image": "./assets/fries/fries-6.png",
            "category": "fries"
        },
        {
            "id": 13,
            "title": "Royal Cheese Burger with extra Fries",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium",
            "price": 22.99,
            "image": "./assets/drinks/drink-1.png",
            "category": "drink"
        },
        {
            "id": 14,
            "title": "The classics for 3",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks",
            "price": 19.99,
            "image": "./assets/drinks/drink-2.png",
            "category": "drink"
        },
        {
            "id": 15,
            "title": "The classics for 3",
            "description": "Crispy chicken, lettuce, spicy mayo",
            "price": 17.50,
            "image": "./assets/drinks/drink-3.png",
            "category": "drink"
        },
        {
            "id": 16,
            "title": "The classics for 3",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks",
            "price": 17.50,
            "image": "./assets/drinks/drink-4.png",
            "category": "drink"
        },
        {
            "id": 17,
            "title": "The classics for 3",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks",
            "price": 17.50,
            "image": "./assets/drinks/drink-5.png",
            "category": "drink"
        },
        {
            "id": 18,
            "title": "The classics for 3",
            "description": "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks",
            "price": 17.50,
            "image": "./assets/drinks/drink-6.png",
            "category": "drink"
        }
    ]
}

// Access the containers
const burgerContainer = document.getElementById("burgerContainer");
const friesContainer = document.getElementById("friesContainer");
const drinksContainer = document.getElementById("drinksContainer");

// 'products' is JSON object and products.products is the array
products.products.forEach((item) => {
    // Create the card
    const card = document.createElement("div");
    card.className = "flex flex-col-reverse lg:flex-row justify-between shadow-2xl p-6 rounded-2xl w-full h-auto bg-white";

    card.innerHTML = `  
        <div class="flex flex-col justify-evenly lg:w-3/5 2xl:gap-4 pr-4 pt-6 gap-2 lg:gap-0 lg:pt-0">
            <h3 class="font-semibold text-xl">${item.title}</h3>
            <p class="text-sm">${item.description}</p>
            <h6 class="text-lg font-bold">GBP ${item.price.toFixed(2)}</h6>
        </div>

        <div class="relative lg:w-2/5 h-auto aspect-square rounded-xl overflow-hidden">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" />
            <div class="bg-white opacity-90 absolute bottom-0 right-0 rounded-tl-[50%]">
                <img src="./assets/shared/Plus.png" alt="plus" class="w-12 h-12 m-4 cursor-pointer add-to-cart" data-id="${item.id}" />
            </div>
        </div>
    `;

    // Append to the right container
    if (item.category === "burger") {
        burgerContainer.appendChild(card);
    } else if (item.category === "fries") {
        friesContainer.appendChild(card);
    } else if (item.category === "drink") {
        drinksContainer.appendChild(card);
    }
});



console.log("DOM loaded?", document.getElementById("burgerContainer"));
