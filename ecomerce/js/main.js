// cart

let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#fecha-cart')

// open
cartIcon.onclick = () => {
    cart.classList.add('active')
}

// close
closeCart.onclick = () => {
    cart.classList.remove('active')
}

// making function
const ready = () => {
    // remove intens cart
    let removeCartButtons = document.getElementsByClassName('cart-lixeira')
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem)
    }
    // quantity changes
    let quantityInputs = document.getElementsByClassName('cart-produto-quantidade')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged)
    }
    // add to cart
    let addCart = document.getElementsByClassName('add-cart')
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }
    // buy button work
    document.getElementsByClassName('btn-comprar')[0].addEventListener('click', buyButtonClicked)

}


function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}


// cart working
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}




// buy button
let buyButtonClicked = () => {
    alert('Seu pedido foi aprovado!')
    let cartContent = document.getElementsByClassName('cart-informacoes')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}





// quantity changes 
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}

// add to cart
function addCartClicked(event) {
    let button = event.target
    let shopProducts = button.parentElement
    let title = shopProducts.getElementsByClassName('produto-titulo')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('produto-img')[0].src;
    addProductToCart(title, price, productImg)
    updateTotal()
}
function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box')
    let cartItens = document.getElementsByClassName('cart-informacoes')[0]
    let cartItenNames = cartItens.getElementsByClassName('cart-produto-titulo')
    for (let i = 0; i < cartItenNames.length; i++) {
        if (cartItenNames[i].innerText == title) {
            alert("Você já adicionou este item no carrinho")
            return;
        }
    }



    let cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="cart-detalhes">
                            <div class="cart-produto-titulo">${title}</div>
                            <div class="cart-produto-preco">${price}</div>
                            <input type="number" value="1" class="cart-produto-quantidade">
                        </div>
                        <!-- lixeira -->
                        <i class='bx bxs-trash-alt cart-lixeira' ></i>
`
    cartShopBox.innerHTML = cartBoxContent;
    cartItens.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-lixeira')[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart-produto-quantidade')[0].addEventListener('change', quantityChanged)
}

// update total 
function updateTotal() {
    let cartContent = document.getElementsByClassName('cart-informacoes')[0]
    let cartBoxes = cartContent.getElementsByClassName('cart-box')
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName('cart-produto-preco')[0]
        let quantityElement = cartBox.getElementsByClassName('cart-produto-quantidade')[0]
        let price = parseFloat(priceElement.innerText.replace("$", ""))
        let quantity = quantityElement.value
        total = total + (price * quantity);
    }
    // total = math.round(total * 100) / 100;

    document.getElementsByClassName('total-preco')[0].innerText = '$' + total

}




