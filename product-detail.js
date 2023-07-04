// Handle header cart number display
// localStorage.setItem('CartData', JSON.stringify(Cart));
var CartLocal = JSON.parse(localStorage.getItem('CartData'));
if (CartLocal.length > 0) {
    var totalProducts = 0;
    CartLocal.forEach((cart) => {
        totalProducts += cart.quantity;
    });
    document.querySelector('.header__top-cart-number').style.display = 'block';
    document.querySelector('.header__top-cart-number').innerHTML = `${totalProducts}`;
} else {
    document.querySelector('.header__top-cart-number').style.display = 'none';
}

// Handle get data from localstorage
var product = JSON.parse(localStorage.getItem('productDetail'));
var quantity = 1;
//handle render product name
const renderProductName = (product) => {
    const name = `<div>Điện thoại ${product.name}</div>`;
    document.querySelector('.productDetail-name').innerHTML = name;
};
renderProductName(product);

const renderProductImg = () => {
    const img = product.color
        .map((color) => {
            return `<div class="slide"><img src="${color[1]}"></img></div>`;
        })
        .join('');
    document.querySelector('.wrapper').innerHTML = img;
};
renderProductImg(product);

// handle quantity
window.handleQuantityMinus = function () {
    if (quantity > 1) {
        quantity -= 1;
    }
    document.querySelector('.quantity').innerHTML = quantity;
};

window.handleQuantityPlus = function () {
    if (quantity < 5) {
        quantity += 1;
    }
    document.querySelector('.quantity').innerHTML = quantity;
};

// handle add cart
window.handleAddCart = function () {
    CartLocal.map((i) => {
        if (i.id == product.id) {
            if ((i.quantity += quantity) <= 5) {
                console.log('oke');
            } else {
                console.log('chua oke');
            }
        }
    });
};
