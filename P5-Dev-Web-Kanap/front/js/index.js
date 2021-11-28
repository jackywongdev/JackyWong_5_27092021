
//on selectione l'endroit ou injecté les produits

const productsInDocument = document.getElementById("items")

// on se sert de la methode fetch pour récupérer les produit depuis l'API

async function fetchAndDrawProducts() {

    try {

        const response = await fetch('http://localhost:3000/api/products');

        const products = await response.json();


        productsInDocument.innerHTML = products.map(products => {

            const productsToHtml = `
        <a href="./product.html?id=${products._id}">
        <article>
        <img src=${products.imageUrl} alt=${products.altTxt}>
        <h3 class="productName">${products.name}</h3>
        <p class="productsDescription">${products.description}</p>
        </article>
        </a>
        `;
            return productsToHtml;
        }).join('') // ici on utilise la méthode .join pour enlever les virgules entres chaque produits du tableau
    }
    catch (error) {
        console.log('Erreur de la requête API')
        return error('Erreur de la requête API')
    };

}

fetchAndDrawProducts()



