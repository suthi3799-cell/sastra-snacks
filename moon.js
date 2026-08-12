const foods = [
    {
        id: 1,
        name: "Masala Dosa",
        category: "Meals",
        price: 45,
        icon: "🥞",
        description: "Crispy dosa with potato masala and chutney."
    },

    {
        id: 2,
        name: "Idli Sambar",
        category: "Meals",
        price: 35,
        icon: "🍚",
        description: "Soft idlis served with hot and tasty sambar."
    },

    {
        id: 3,
        name: "Veg Meals",
        category: "Meals",
        price: 80,
        icon: "🍛",
        description: "A complete South Indian lunch for students."
    },

    {
        id: 4,
        name: "Paneer Wrap",
        category: "Snacks",
        price: 70,
        icon: "🌯",
        description: "Spicy paneer and vegetables wrapped to perfection."
    },

    {
        id: 5,
        name: "French Fries",
        category: "Snacks",
        price: 55,
        icon: "🍟",
        description: "Crispy golden fries with a delicious dip."
    },

    {
        id: 6,
        name: "Cheese Dosa",
        category: "Snacks",
        price: 75,
        icon: "🧀",
        description: "Crispy dosa filled with melted cheese."
    },

    {
        id: 7,
        name: "Cold Coffee",
        category: "Drinks",
        price: 60,
        icon: "🥤",
        description: "Chilled creamy coffee for your campus break."
    },

    {
        id: 8,
        name: "Lime Soda",
        category: "Drinks",
        price: 40,
        icon: "🍋",
        description: "Refreshing fizzy lime drink served chilled."
    },

    {
        id: 9,
        name: "Chocolate Cake",
        category: "Desserts",
        price: 65,
        icon: "🍰",
        description: "Soft chocolate cake for a sweet ending."
    }
];


let cart = [];


function displayFoods(category = "All") {

    const grid = document.getElementById("foodGrid");

    grid.innerHTML = "";

    const list =
        category === "All"
            ? foods
            : foods.filter(food => food.category === category);


    list.forEach(food => {

        let className = food.category.toLowerCase();


        const card = document.createElement("div");

        card.className = "food-card";


        card.innerHTML = `

            <div class="food-image ${className}">

                <span class="food-label">
                    ${food.category}
                </span>

                <div class="food-emoji">
                    ${food.icon}
                </div>

            </div>


            <div class="food-info">

                <h3>${food.name}</h3>

                <p>
                    ${food.description}
                </p>


                <div class="food-bottom">

                    <span class="price">
                        ₹${food.price}
                    </span>

                    <button
                        class="add"
                        onclick="addToCart(${food.id})"
                    >
                        + Add
                    </button>

                </div>

            </div>
        `;


        grid.appendChild(card);

    });
}



function filterItems(category, button) {

    document
        .querySelectorAll(".filter")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    displayFoods(category);
}



function addToCart(id) {

    const food = foods.find(item => item.id === id);

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: food.id,
            name: food.name,
            price: food.price,
            icon: food.icon,
            quantity: 1
        });

    }


    updateCart();
}



function changeQuantity(id, amount) {

    const item =
        cart.find(product => product.id === id);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(product => product.id !== id);

    }


    updateCart();
}



function removeItem(id) {

    cart =
        cart.filter(item => item.id !== id);

    updateCart();
}



function updateCart() {

    const cartElement =
        document.getElementById("cart");

    const countElement =
        document.getElementById("cartCount");

    const statusElement =
        document.getElementById("itemStatus");

    const subtotalElement =
        document.getElementById("subtotal");

    const feeElement =
        document.getElementById("fee");

    const totalElement =
        document.getElementById("total");

    const confirmButton =
        document.getElementById("confirm");


    let count = 0;
    let subtotal = 0;


    cart.forEach(item => {

        count += item.quantity;

        subtotal +=
            item.price * item.quantity;

    });


    countElement.textContent = count;

    statusElement.textContent =
        count === 1
            ? "1 item"
            : `${count} items`;


    if (cart.length === 0) {

        cartElement.innerHTML = `

            <div class="empty">

                <div class="empty-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add something delicious from the menu.
                </p>

                <button onclick="scrollToMenu()">
                    Browse Menu
                </button>

            </div>
        `;

    } else {

        cartElement.innerHTML = "";


        cart.forEach(item => {

            const row =
                document.createElement("div");

            row.className = "cart-item";


            row.innerHTML = `

                <div class="cart-emoji">
                    ${item.icon}
                </div>


                <div class="cart-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ₹${item.price} each
                    </p>

                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(
                            ${item.id}, -1
                        )"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(
                            ${item.id}, 1
                        )"
                    >
                        +
                    </button>

                </div>


                <div class="item-total">
                    ₹${item.price * item.quantity}
                </div>


                <button
                    class="delete"
                    onclick="removeItem(${item.id})"
                >
                    ✕
                </button>
            `;


            cartElement.appendChild(row);

        });

    }


    const fee = subtotal > 0 ? 5 : 0;

    const total = subtotal + fee;


    subtotalElement.textContent =
        `₹${subtotal}`;

    feeElement.textContent =
        `₹${fee}`;

    totalElement.textContent =
        `₹${total}`;


    confirmButton.disabled =
        cart.length === 0;
}



function confirmOrder() {

    if (cart.length === 0) return;


    const token =
        "SP-" +
        Math.floor(
            1000 + Math.random() * 9000
        );


    document.getElementById("token").textContent =
        token;


    document
        .getElementById("modal")
        .classList.add("show");


    cart = [];

    updateCart();
}



function closeModal() {

    document
        .getElementById("modal")
        .classList.remove("show");
}



function scrollToMenu() {

    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });
}



function scrollToOrder() {

    document
        .getElementById("order")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* START */

displayFoods();

updateCart();