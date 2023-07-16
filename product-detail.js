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

function toast({ title = '', message = '', type = '', duration = 3000 }) {
    const main = document.getElementById('toast');
    if (!main) {
        return;
    }
    const toast = document.createElement('div');

    // auto remove toast
    const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
    }, duration + 1000);

    // remove toast when clicked
    toast.onclick = function (e) {
        if (e.target.closest('.toast__close')) {
            main.removeChild(toast);
            clearTimeout(autoRemoveId);
        }
    };

    const icons = {
        success: 'fas fa-circle-check',
        error: 'fas fa-circle-exclamation',
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add('toast', `toast--${type}`);
    toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
    toast.innerHTML = `
        <div class="toast__icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast__body">
            <h3 class="toast__title">${title}</h3>
            <p class="toast__message">${message}</p>
        </div>
        <div class="toast__close">
            <i class="fas fa-times"></i>
        </div>
    `;
    main.appendChild(toast);
}

// handle add cart
window.handleAddCart = function () {
    var isAdded = false;
    var isDuplicate = false;
    CartLocal.map((CartItem) => {
        if (CartItem.id == product.id) {
            // neu isDuplicate thi them
            isDuplicate = true;
            if (CartItem.quantity + quantity <= 5) {
                isAdded = true;
                CartItem.quantity += quantity;
                localStorage.setItem('CartData', JSON.stringify(CartLocal));
            } else {
                isAdded = false;
                toast({ title: 'Thất bại', message: `Chọn tối đa 5 sản phẩm`, type: 'error', duration: 5000 });
            }
        }
    });
    if (!isDuplicate) {
        isAdded = true;
        product.quantity = quantity;
        CartLocal.push(product);
        localStorage.setItem('CartData', JSON.stringify(CartLocal));
    }
    // cap nhat so luong gio hang
    totalProducts = 0;
    CartLocal.forEach((cart) => {
        totalProducts += cart.quantity;
    });
    if (isAdded) toast({ title: 'Thành công', message: `Đã thêm vào giỏ ${quantity} sản phẩm`, type: 'success' });
    document.querySelector('.header__top-cart-number').style.display = 'block';
    document.querySelector('.header__top-cart-number').innerHTML = `${totalProducts}`;
};
