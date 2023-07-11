// Handle header cart number display
// localStorage.setItem('CartData', JSON.stringify(Cart));
var CartLocal = JSON.parse(localStorage.getItem('CartData'));
var totalProducts = 0;
if (CartLocal.length > 0) {
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
        .map((img) => {
            return `<div class="slide"><img src="${img[1]}"></img></div>`;
        })
        .join('');
    document.querySelector('.wrapperSlide').innerHTML = img;
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
    var trung = false;
    CartLocal.map((CartItem) => {
        if (CartItem.id == product.id) {
            // neu trung thi them
            trung = true;
            if (CartItem.quantity + quantity <= 5) {
                CartItem.quantity += quantity;
                localStorage.setItem('CartData', JSON.stringify(CartLocal));
                // return;
            } else {
                alert('vui long chon toi da 5 san pham');
            }
        }
    });
    if (!trung) {
        product.quantity = quantity;
        CartLocal.push(product);
        localStorage.setItem('CartData', JSON.stringify(CartLocal));
    }
    // cap nhat so luong gio hang
    totalProducts = 0;
    CartLocal.forEach((cart) => {
        totalProducts += cart.quantity;
    });
    document.querySelector('.header__top-cart-number').style.display = 'block';
    document.querySelector('.header__top-cart-number').innerHTML = `${totalProducts}`;
};
