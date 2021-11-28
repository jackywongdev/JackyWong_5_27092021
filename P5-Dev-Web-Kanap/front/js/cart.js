
// récupération des donées du local storage

let currentItemsInCart = JSON.parse(localStorage.getItem('cartItems'))
console.table(currentItemsInCart)

const productsInCart = document.getElementById('cart__items')


function drawDataFromLocalStorage() {

  // si le local storage est vide alors nous affichons un message  
  if (currentItemsInCart === null || currentItemsInCart == 0) {
    productsInCart.innerHTML = `<p>Votre panier ne contiens pas d'article</p>`
  }
  // si non on affiche les produits du local storage avec la méthode map
  else {

    productsInCart.innerHTML = currentItemsInCart.map(el => {
      const productRow = `
      <article class="cart__item" data-id=${el.id}> 
        <div class="cart__item__img">
          <img src=${el.image} alt=${el.altTxt}>
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>${el.name}</h2>
            <p>${el.color}</p>
            <p>${el.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : ${el.quantity}</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${el.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
      `;
      return productRow
    })
  }
}
drawDataFromLocalStorage()

// retirer une ligne d'objet du panier grace au bouton supprimer

function deleteProductFromCart() {
  let deleteButton = document.querySelectorAll('.deleteItem')

  for (let i = 0; i < deleteButton.length; ++i) {
    deleteButton[i].addEventListener('click', (event) => {
      event.preventDefault();

      let productId = currentItemsInCart[i].id;
      let productColor = currentItemsInCart[i].color;

      // sachant qu'un produit possède à la foi un id et une couleur nous devons selectionnez les deux

      currentItemsInCart = currentItemsInCart.filter(element => element.id !== productId || element.color !== productColor)

      localStorage.setItem("cartItems", JSON.stringify(currentItemsInCart))

      alert('Le produit selectionné à été supprimer du panier')
      // On effectue un reload de la page pour actualiser l'affichage du panier
      location.reload()
    });
  };
};

deleteProductFromCart()


// mettre à jour le nombre de produits dans le panier

function productTotalPriceAndCount() {

  var itemQuantity = document.getElementsByClassName('itemQuantity');
  var ItemTotal = itemQuantity.length;
  var total = 0;

  // ici dans notre calcul nous devons définir la valeur avec valueAsNumber car par default le type de la valeur est une "string" et dans notre cas c'est un chiffre

  for (var j = 0; j < ItemTotal; ++j) {
    total += itemQuantity[j].valueAsNumber;
  }

  let productNumber = document.getElementById('totalQuantity')
  productNumber.innerHTML = total

  productSum = 0;


  for (var j = 0; j < ItemTotal; ++j) {
    productSum += (itemQuantity[j].valueAsNumber * currentItemsInCart[j].price)
  };

  let totalSum = document.getElementById('totalPrice');
  totalSum.innerHTML = productSum;
}
productTotalPriceAndCount()

// modification du nombre de produit

function modifyQuantityWitchSelector() {

  let modifyedQuantity = document.querySelectorAll('.itemQuantity');

  for (let k = 0; k < modifyedQuantity.length; ++k) {
    modifyedQuantity[k].addEventListener('change', (event) => {
      event.preventDefault();

      let localStorageQuantity = currentItemsInCart[k].quantity;
      let quantityModifyed = modifyedQuantity[k].valueAsNumber

      const sumQuantity = currentItemsInCart.find((element) => element.quantityModifyed !== localStorageQuantity);

      sumQuantity.quantity = quantityModifyed;
      currentItemsInCart[k].quantity = sumQuantity.quantity;

      localStorage.setItem('cartItems', JSON.stringify(currentItemsInCart));
      // une actualisation de la page permet la modification visuel de la quantité indiqué sur le produit et le total d'article, ainsi que le réajustement du prix
      location.reload();
    });
  };
};
modifyQuantityWitchSelector()


function cartFormValidator() {

  //on définit dans un premier les RegExp afin que l'utilisateur remplisse les champs de manière valide 

  let form = document.querySelector(".cart__order__form");

  let nameRegExp = new RegExp('^[-A-Za-z]+$')

  let addressRegExp = new RegExp("^[0-9a-zA-Z&àâäéèêëïîôöùûüç ]");

  let emailRegExp = new RegExp('^[^\s@]+@[^\s@]+\.[^\s@]+$');


  // On écoute le champs suite à la modification des éléments et on valide ou non leurs entrées avec les RegExp avec un message validant ou refusant l'entrée

  form.firstName.addEventListener('change', function () {
    checkFirstName(this);
  });

  const checkFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (nameRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = 'champ validé';

    } else {
      firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom!';

    }
  };

  form.lastName.addEventListener('change', function () {
    checkLastName(this);
  });

  const checkLastName = function (inputLastName) {
    let firstNameErrorMsg = inputLastName.nextElementSibling;

    if (nameRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = 'champ validé';
    } else {
      firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom de famille!';
    }

  };

  form.address.addEventListener('change', function () {
    checkaddress(this);
  });

  const checkaddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = 'champ validé';
    } else {
      addressErrorMsg.innerHTML = 'Veuillez renseigner votre addresse!';
    }
  };

  form.city.addEventListener('change', function () {
    checkCity(this);
  });

  const checkCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (nameRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = 'champ validé';
    } else {
      cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville!';
    }
  };

  form.email.addEventListener('change', function () {
    checkEmail(this);
  });

  const checkEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = 'champ validé';
    } else {
      emailErrorMsg.innerHTML = 'Veuillez renseigner votre e-mail!';
    }
  };
}
cartFormValidator();

// récupération des données du formulaire dans le local storage

function saveForm() {

  const orderButton = document.getElementById('order');

  orderButton.addEventListener('click', (event) => {
    let clientFirstName = document.getElementById('firstName')
    let clientLastName = document.getElementById('lastName')
    let clientAddress = document.getElementById('address')
    let clientCity = document.getElementById('city')
    let clientEmail = document.getElementById('email')

    const orderClientInfo = {
      firstName: clientFirstName.value,
      lastName: clientLastName.value,
      address: clientAddress.value,
      city: clientCity.value,
      email: clientEmail.value,
    };

    const order = {
      contact: orderClientInfo,
      products: currentItemsInCart.map(product => product.id)
    }

    // on utilise la méthode post pour envoyé les informations du client et sont panier
    fetch("http://localhost:3000/api/products/order",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(order)
      })
      .then(res => res.json())
      .then(data => {
        // on redirige l'utilisateur vers la page confirmation
        document.location.href = `./confirmation.html?orderId=${data.orderId}`

      })
      .catch((error) => {
        console.log('Erreur de la requête API')
        return error('Erreur de la requête API')
      });
  });
};
saveForm()

