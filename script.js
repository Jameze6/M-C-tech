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

if (cartBtn) {
    cartBtn.addEventListener("click", () => {
        cartPanel.classList.add("active");
        overlay.classList.add("active");
    });
}


// ===============================
// FERMER LE PANIER
// ===============================

function closeCartPanel() {
    cartPanel.classList.remove("active");
    overlay.classList.remove("active");
}

if (closeCart) {
    closeCart.addEventListener("click", closeCartPanel);
}

if (overlay) {
    overlay.addEventListener("click", closeCartPanel);
}


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

        // Ouvrir automatiquement le panier
        if (cartPanel) {
            cartPanel.classList.add("active");
        }

        if (overlay) {
            overlay.classList.add("active");
        }

    });

});


// ===============================
// AFFICHER LE PANIER
// ===============================

function updateCart() {

    if (!cartItems) return;

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

        if (cartCount) {
            cartCount.textContent = "0";
        }

        if (cartTotal) {
            cartTotal.textContent = "0 DA";
        }

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

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    if (cartTotal) {
        cartTotal.textContent =
            total.toLocaleString("fr-FR") + " DA";
    }


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

if (checkoutBtn) {

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
            "🛒 NOUVELLE COMMANDE - M-C TECH\n\n";

        let total = 0;


        cart.forEach((product) => {

            const productTotal =
                product.price * product.quantity;

            total += productTotal;


            message +=
                "📦 Produit : " + product.name + "\n" +
                "🔢 Quantité : " + product.quantity + "\n" +
                "💵 Prix : " +
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

        window.location.href = whatsappURL;

    });

}


// ===============================
// CONTACT
// ===============================

const contactBtn =
    document.getElementById("contactBtn");

if (contactBtn) {

    contactBtn.addEventListener("click", () => {

        const instagram =
            "https://www.instagram.com/m_c.technology?igsh=amI2YjA4NGtraHV3";

        const message =
            "📞 Téléphone : 0555 29 61 76\n\n" +
            "📱 WhatsApp : 0555 29 61 76\n\n" +
            "📧 Email : hridjou@gmail.com\n\n" +
            "📷 Instagram : m_c.technology";

        const ouvrirInstagram =
            confirm(message + "\n\nOuvrir notre Instagram ?");

        if (ouvrirInstagram) {
            window.location.href = instagram;
        }

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


// ===============================
// SERVICE WORKER
// ===============================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register(
            "/M-C-tech/service-worker.js"
        )
        .then(() => {

            console.log(
                "Service Worker activé"
            );

        })
        .catch(error => {

            console.error(
                "Erreur Service Worker :",
                error
            );

        });

    });

}
// ===== INTRO VIDEO MC TECHNO =====

const introVideo = document.getElementById("intro-video");

setTimeout(() => {
    if (introVideo) {
        introVideo.classList.add("hide");

        setTimeout(() => {
            introVideo.remove();
        }, 700);
    }
}, 36000);
// =========================================================
// FILTRE DES CATÉGORIES
// =========================================================

const categoryCards = document.querySelectorAll(".category-card");
const productCards = document.querySelectorAll(".product-card");

categoryCards.forEach(category => {

    category.addEventListener("click", () => {

        const selectedCategory = category.dataset.category;

        productCards.forEach(product => {

            const productCategory = product.dataset.category;

            if (productCategory === selectedCategory) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

        // Faire défiler automatiquement vers les produits
        const productsSection = document.querySelector("#produits");

        if (productsSection) {
            productsSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});