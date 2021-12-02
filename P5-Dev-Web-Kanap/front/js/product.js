//pour un affichage dynamique de la page, nous avons du localiser l'id de notre url afin d'avoir un affichage dynamique  

let params = new URL(document.location).searchParams;
let id = params.get("id");


// on défini des constante pour créer des chemins d'accès vers le DOM pour les différents items que nous avons. "nom, description, prix, couleurs, image"

const productImage = document.querySelector(".item__img");

const productName = document.getElementById("title");

const productPrice = document.getElementById("price");
const productQuantity = document.querySelector("#quantity")

const productDescription = document.getElementById("description");

const productColor = document.getElementById("colors");

// Avec l'id produit on peu alors faire un appel vers la base de données et recevoir les données. Permetant d'avoir un affichage dynamique automatisé des informations propres à chaque produit.






async function fetchAndDrawProduct() {

  try {

    const response = await fetch(`http://localhost:3000/api/products/${id}`)

    const data = await response.json();

    productName.innerHTML = data.name
    productPrice.innerHTML = data.price
    productDescription.innerHTML = data.description

    productImage.innerHTML += `<img src=${data.imageUrl} alt=${data.altTxt}>`

    // pour la couleur nous devons créer une boucle for que l'on incrémente en fonction du nombre de couleur disponible par produit

    for (let i = 0; i < data.colors.length; i++) {

      let option = document.createElement("option");
      option.innerText = data.colors[i];
      productColor.appendChild(option);
    }
    let addToCartButton = document.getElementById('addToCart');

    addToCartButton.addEventListener('click', () => {

      var productInLocalStorage = JSON.parse(localStorage.getItem('cartItems'));


      localStorage = window.localStorage;

      var objQuantity = productQuantity.value
      var objColor = productColor.value

      // pour ajouter un produit il faut absolument avoir au moins 1 de quantité et une couleur selectioner
      if (objQuantity > 0 && objColor != 0) {

        let selectedProduct =

        {
          id: data._id,
          name: data.name,
          description: data.description,
          image: data.imageUrl,
          imageAltText: data.imageTxt,
          quantity: quantity.value,
          color: colors.value,
          price: data.price,
        };

        if (productInLocalStorage) {
          // si notre produit existe id + color alors on incrémente sa quantité (quantité existante + quantité ajouté)
          var existantProduct = productInLocalStorage.find((element) => element.id === data._id && element.color === colors.value);

          if (existantProduct) {
            let modifyQuantity = parseInt(selectedProduct.quantity) + parseInt(existantProduct.quantity);
            existantProduct.quantity = modifyQuantity;
            localStorage.setItem('cartItems', JSON.stringify(productInLocalStorage));
          }
          // si le panier n'est pas vide est que l'id et différent on ajoute le produit
          else {
            productInLocalStorage.push(selectedProduct);
            localStorage.setItem('cartItems', JSON.stringify(productInLocalStorage));
          }
        }
        // si le panier est vide on crée l'élément avec son id et sa couleur et sa quantité
        else {
          productInLocalStorage = [];
          productInLocalStorage.push(selectedProduct);
          localStorage.setItem('cartItems', JSON.stringify(productInLocalStorage));
        };
        alert('Votre Produit à été ajouté au panier!')
      } else {
        alert('Veuillez ajouté un produit et choisir une couleur!')

      };
    });
  }
  catch (error) {
    console.log('Erreur de la requête API')
    return error('Erreur de la requête API')
  };
}
fetchAndDrawProduct()
