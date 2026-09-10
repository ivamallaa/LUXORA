/* =====================================
   LUXORA PRODUCT DATABASE
===================================== */

const products = [

    {
        id: 1,
        name: "Classic Wool Coat",
        category: "Women",
        type: "Outerwear",
        price: 129,
        oldPrice: 159,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 2,
        name: "Satin Evening Dress",
        category: "Women",
        type: "Dresses",
        price: 88,
        oldPrice: 110,
        badge: "20% OFF",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 3,
        name: "Minimal Overshirt",
        category: "Men",
        type: "Shirts",
        price: 79,
        oldPrice: null,
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 4,
        name: "Classic Linen Shirt",
        category: "Men",
        type: "Shirts",
        price: 65,
        oldPrice: 80,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 5,
        name: "Structured Leather Bag",
        category: "Accessories",
        type: "Bags",
        price: 95,
        oldPrice: null,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 6,
        name: "Minimal Shoulder Bag",
        category: "Accessories",
        type: "Bags",
        price: 72,
        oldPrice: null,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 7,
        name: "Leather Chelsea Boots",
        category: "Shoes",
        type: "Footwear",
        price: 119,
        oldPrice: 145,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 8,
        name: "Everyday Sneakers",
        category: "Shoes",
        type: "Footwear",
        price: 85,
        oldPrice: null,
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 9,
        name: "Relaxed Knit Sweater",
        category: "Women",
        type: "Knitwear",
        price: 69,
        oldPrice: null,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 10,
        name: "Tailored Blazer",
        category: "Men",
        type: "Outerwear",
        price: 110,
        oldPrice: 135,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 11,
        name: "Silk Scarf",
        category: "Accessories",
        type: "Scarves",
        price: 45,
        oldPrice: null,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1601924928375-6d9c0b1e2c75?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 12,
        name: "Pleated Midi Skirt",
        category: "Women",
        type: "Skirts",
        price: 74,
        oldPrice: 90,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=700&q=85"
    }

];


/* =====================================
   CART
===================================== */

let cart =
    JSON.parse(localStorage.getItem("luxoraCart")) || [];


/* =====================================
   CURRENT FILTER
===================================== */

let currentCategory = "All";


/* =====================================
   DISPLAY PRODUCTS
===================================== */

function displayProducts(productList) {

    const container =
        document.getElementById("productsGrid");

    const count =
        document.getElementById("productCount");

    if (!container) return;

    count.textContent = productList.length;

    if (productList.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        productList.map(product => `

            <article class="shop-product">

                <div class="shop-product-image">

                    <span class="shop-badge">
                        ${product.badge}
                    </span>

                    <button
                        class="shop-heart"
                        onclick="toggleWishlist(this)">
                        ♡
                    </button>

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                </div>


                <div class="shop-info">

                    <span class="category">
                        ${product.category} · ${product.type}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>


                    <div class="shop-price">

                        ${
                            product.oldPrice
                            ? `
                                <span class="old-price">
                                    $${product.oldPrice}
                                </span>
                              `
                            : ""
                        }

                        <strong>
                            $${product.price}
                        </strong>

                    </div>


                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})">

                        ADD TO CART

                    </button>

                </div>

            </article>

        `).join("");
}


/* =====================================
   FILTER PRODUCTS
===================================== */

function filterProducts() {

    const searchInput =
        document.getElementById("searchBox");

    const searchTerm =
        searchInput.value.toLowerCase().trim();


    let filtered =
        products.filter(product => {

            const matchesCategory =
                currentCategory === "All" ||
                product.category === currentCategory;

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm) ||

                product.category
                    .toLowerCase()
                    .includes(searchTerm) ||

                product.type
                    .toLowerCase()
                    .includes(searchTerm);

            return matchesCategory && matchesSearch;

        });


    sortProducts(filtered);
}


/* =====================================
   SORT PRODUCTS
===================================== */

function sortProducts(productList) {

    const sortValue =
        document.getElementById("sortProducts").value;


    if (sortValue === "low") {

        productList.sort(
            (a, b) => a.price - b.price
        );

    }

    else if (sortValue === "high") {

        productList.sort(
            (a, b) => b.price - a.price
        );

    }

    else if (sortValue === "name") {

        productList.sort(
            (a, b) => a.name.localeCompare(b.name)
        );

    }


    displayProducts(productList);
}


/* =====================================
   ADD TO CART
===================================== */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });

    }


    saveCart();

    updateCartUI();

    openCart();

}


/* =====================================
   SAVE CART
===================================== */

function saveCart() {

    localStorage.setItem(
        "luxoraCart",
        JSON.stringify(cart)
    );

}


/* =====================================
   UPDATE CART UI
===================================== */

function updateCartUI() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems) return;


    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const totalPrice =
        cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        totalPrice.toFixed(2);


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your cart is empty.
                <br><br>
                Discover something you love.
            </div>
        `;

        return;
    }


    cartItems.innerHTML =
        cart.map(item => `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >


                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        $${item.price}
                    </p>


                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${item.id}, -1)">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                    </div>


                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})">

                        REMOVE

                    </button>

                </div>

            </div>

        `).join("");

}


/* =====================================
   CHANGE QUANTITY
===================================== */

function changeQuantity(productId, amount) {

    const item =
        cart.find(
            item => item.id === productId
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== productId
            );

    }


    saveCart();

    updateCartUI();

}


/* =====================================
   REMOVE FROM CART
===================================== */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    saveCart();

    updateCartUI();

}


/* =====================================
   CART OPEN / CLOSE
===================================== */

function openCart() {

    document
        .getElementById("cartPanel")
        .classList.add("open");

}


function closeCart() {

    document
        .getElementById("cartPanel")
        .classList.remove("open");

}


/* =====================================
   WISHLIST BUTTON
===================================== */

function toggleWishlist(button) {

    if (button.textContent === "♡") {

        button.textContent = "♥";

    } else {

        button.textContent = "♡";

    }

}


/* =====================================
   CHECKOUT
===================================== */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Add a product first."
        );

        return;

    }


    alert(
        "Thank you for shopping with LUXORA! " +
        "Checkout functionality can be connected to a payment system."
    );

}


/* =====================================
   EVENT LISTENERS
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayProducts(products);

        updateCartUI();


        /*
         * Category buttons
         */

        const filterButtons =
            document.querySelectorAll(
                ".filter-btn"
            );


        filterButtons.forEach(button => {

            button.addEventListener(
                "click",
                function() {

                    filterButtons.forEach(btn =>
                        btn.classList.remove("active")
                    );


                    this.classList.add("active");


                    currentCategory =
                        this.dataset.category;


                    filterProducts();

                }
            );

        });


        /*
         * Search
         */

        document
            .getElementById("searchBox")
            .addEventListener(
                "input",
                filterProducts
            );


        /*
         * Sorting
         */

        document
            .getElementById("sortProducts")
            .addEventListener(
                "change",
                filterProducts
            );


        /*
         * Read category from URL
         *
         * Example:
         * products.html?category=Women
         */

        const params =
            new URLSearchParams(
                window.location.search
            );


        const urlCategory =
            params.get("category");


        if (urlCategory) {

            const matchingButton =
                document.querySelector(
                    `[data-category="${urlCategory}"]`
                );


            if (matchingButton) {

                filterButtons.forEach(btn =>
                    btn.classList.remove("active")
                );

                matchingButton.classList.add("active");

                currentCategory =
                    urlCategory;

                filterProducts();

            }

        }

    }
);