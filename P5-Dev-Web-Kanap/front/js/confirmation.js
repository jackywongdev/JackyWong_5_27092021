function catchAndDrawId() {

    // on vide le local storage
    localStorage.clear()

    const idPlace = window.location.search

    let params = new URLSearchParams(idPlace);

    const idOfOrder = params.get("orderId");

    let drawIdOnHtml = document.getElementById('orderId')

    drawIdOnHtml.innerHTML = `${idOfOrder}`
    // on affiche le numéro de commande
}
catchAndDrawId()