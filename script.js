// ===============================
// PANIER
// ===============================

let cart = [];


// ===============================
// ÉLÉMENTS HTML
// ===============================

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutBtn = document.getElementById("checkoutBtn");


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
// AJOUTER LES PRODUITS AU PANIER
// ===============================

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const name = button.getAttribute("data-name");
        const price = Number(button.getAttribute("data-price"));

        const existingProduct = cart.find(
            (product) => product.name === name
        );

        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        // Ouvre automatiquement le panier
        cartPanel.classList.add("active");
        overlay.classList.add("active");

    });

});


// ===============================
// AFFICHER LE PANIER
// ===============================

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;


    // PANIER VIDE

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


    // PRODUITS

    cart.forEach((product, index) => {

        const productTotal =
            product.price * product.quantity;

        total += productTotal;
        totalQuantity += product.quantity;


        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <div>
                <h4>${product.name}</h4>

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


    // TOTAL

    cartCount.textContent = totalQuantity;

    cartTotal.textContent =
        total.toLocaleString("fr-FR") + " DA";


    // ===============================
    // SUPPRIMER UN PRODUIT
    // ===============================

    const removeButtons =
        document.querySelectorAll(".remove-item");


    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index =
                Number(button.getAttribute("data-index"));

            cart.splice(index, 1);

            updateCart();

        });

    });

}


// ===============================
// NUMÉRO WHATSAPP
// ===============================

const whatsappNumber = "213555296176";


// ===============================
// COMMANDER
// ===============================

checkoutBtn.addEventListener("click", () => {

    // Vérifier si le panier est vide

    if (cart.length === 0) {

        alert("Votre panier est vide.");

        return;
    }


    // ===============================
    // CRÉER LE MESSAGE
    // ===============================

    let message =
        "🛒 NOUVELLE COMMANDE - MA BOUTIQUE\n\n";


    let total = 0;


    cart.forEach((product) => {

        const productTotal =
            product.price * product.quantity;

        total += productTotal;


        message +=
            "📦 " + product.name + "\n" +
            "Quantité : " + product.quantity + "\n" +
            "Prix : " +
            productTotal.toLocaleString("fr-FR") +
            " DA\n\n";

    });


    message +=
        "💰 TOTAL : " +
        total.toLocaleString("fr-FR") +
        " DA\n\n";


    message +=
        "Bonjour, je souhaite confirmer cette commande. Merci.";


    // ===============================
    // ENCODER LE MESSAGE
    // ===============================

    const encodedMessage =
        encodeURIComponent(message);


    // ===============================
    // LIEN WHATSAPP
    // ===============================

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodedMessage;


    // ===============================
    // OUVRIR WHATSAPP
    // ===============================

    window.open(
        whatsappURL,
        "_blank"
    );

});


// ===============================
// CONTACT
// ===============================

const contactBtn =
    document.getElementById("contactBtn");

if (contactBtn) {

    contactBtn.addEventListener("click", () => {

        alert(
            "Merci de nous contacter !"
        );

    });

}


// ===============================
// RECHERCHE
// ===============================

const searchBtn =
    document.getElementById("searchBtn");

if (searchBtn) {

    searchBtn.addEventListener("click", () => {

        const search =
            prompt("Quel produit recherchez-vous ?");


        if (!search) {
            return;
        }


        const products =
            document.querySelectorAll(".product-card");


        let found = false;


        products.forEach((product) => {

            const text =
                product.textContent.toLowerCase();


            if (
                text.includes(
                    search.toLowerCase()
                )
            ) {

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

}


// ===============================
// INITIALISATION
// ===============================

updateCart();
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/M-C-tech/service-worker.js")
            .then(() => {
                console.log("Service Worker activé");
            })
            .catch(error => {
                console.error("Erreur Service Worker :", error);
            });
    });
}