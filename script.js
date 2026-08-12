// ===============================
// PANIER
// ===============================

let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


// ===============================
// OUVRIR LE PANIER
// ===============================

cartBtn.addEventListener("click", () => {
    cartPanel.classList.add("active");
    overlay.classList.add("active");
});


// ===============================
// FERMER LE PANIER
// ===============================

function closeCartPanel() {
    cartPanel.classList.remove("active");
    overlay.classList.remove("active");
}

closeCart.addEventListener("click", closeCartPanel);

overlay.addEventListener("click", closeCartPanel);


// ===============================
// AJOUTER AU PANIER
// ===============================

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cart.find(
            product => product.name === name
        );

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        cartPanel.classList.add("active");
        overlay.classList.add("active");

    });

});


// ===============================
// AFFICHER LE PANIER
// ===============================

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Votre panier est vide.
            </p>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "0 DA";

        return;
    }


    let total = 0;
    let numberOfProducts = 0;


    cart.forEach((product, index) => {

        const productTotal =
            product.price * product.quantity;

        total += productTotal;

        numberOfProducts += product.quantity;


        const item = document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div>

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ${product.price.toLocaleString("fr-FR")} DA
                </p>

                <small>
                    Quantité : ${product.quantity}
                </small>

            </div>

            <button
                class="remove-item"
                data-index="${index}"
            >
                ✕
            </button>

        `;


        cartItems.appendChild(item);

    });


    cartCount.textContent = numberOfProducts;

    cartTotal.textContent =
        total.toLocaleString("fr-FR") + " DA";


    // ===============================
    // SUPPRIMER UN PRODUIT
    // ===============================

    const removeButtons =
        document.querySelectorAll(".remove-item");


    removeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);

            cart.splice(index, 1);

            updateCart();

        });

    });

}


// ===============================
// BOUTON COMMANDER
// ===============================

const checkoutBtn =
    document.getElementById("checkoutBtn");


checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Votre panier est vide.");

        return;
    }


    alert(
        "Merci pour votre commande !\n\n" +
        "Cette fonctionnalité sera disponible prochainement."
    );

});


// ===============================
// BOUTON CONTACT
// ===============================

const contactBtn = document.getElementById("contactBtn");

if (contactBtn) {
    contactBtn.addEventListener("click", () => {
        alert(
            "Merci de nous contacter !\n\n" +
            "Téléphone : 0555 29 61 76\n" +
            "Email : hridjou@gmail.com"
        );
    });
}


// ===============================
// RECHERCHE
// ===============================

const searchBtn =
    document.getElementById("searchBtn");


searchBtn.addEventListener("click", () => {

    const search =
        prompt("Quel produit recherchez-vous ?");


    if (!search) {
        return;
    }


    const products =
        document.querySelectorAll(".product-card");


    let found = false;


    products.forEach(product => {

        const text =
            product.textContent.toLowerCase();


        if (text.includes(search.toLowerCase())) {

            product.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            product.style.outline =
                "3px solid #2563eb";

            setTimeout(() => {

                product.style.outline = "";

            }, 2000);

            found = true;

        }

    });


    if (!found) {

        alert(
            "Aucun produit trouvé pour : " +
            search
        );

    }

});