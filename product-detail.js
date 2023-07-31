import { Phone } from './Data.js';
// Handle header cart number display
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

const renderProductInfo = (product) => {
    document.querySelector('.info-wrapper').innerHTML = `<div class="detail" style="display: flex">
    <div style="flex: 1">
        <div style="font-size: 24px; color: #fff; margin: 8px 0">Online giá rẻ quá</div>
        <div style="color: #ffd028; font-size: 20px; font-weight: 600; margin: 8px 0">${product.newPrice.toLocaleString() + ' đ'}</div>
        <div style="color: #fff; margin: 8px 0">${product.oldPrice.toLocaleString() + ' đ'} (-${100 - 100 * (product.newPrice / product.oldPrice).toFixed(2)}%)</div>
    </div>
    <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: center">
        <p style="margin-top: 12px; color: #fff; font-weight: 600">Kết thúc sau</p>
        <div style="margin-bottom: 12px" class="header__main-countdown-time">
            <div style="background-color: #fff; color: #f86962; font-weight: 500" class="hour"></div>
            <div style="background-color: #fff; color: #f86962; font-weight: 500" class="minute"></div>
            <div style="background-color: #fff; color: #f86962; font-weight: 500" class="second"></div>
        </div>
    </div>
</div>
<div style="background-color: #fff; border-radius: 16px; padding: 16px 8px; margin: 16px 0">
    <p style="margin-bottom: 8px; font-weight: 600">Khuyến mãi:</p>
    <p style="margin-bottom: 8px">1. Nhập mã GIAMGIA100 giảm tối đa 100.000đ đối với đơn hàng có giá trị trên 5.000.000đ.</p>
    <p>2. Tặng voucher mua hàng trị giá 50.000đ khi mua hàng vào lần sau.</p>
</div>`;
};
renderProductInfo(product);

// Handle countdown timer
function pad(num) {
    num = num.toString();
    while (num.length < 2) num = '0' + num;
    return num;
}

const countdown = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const endDeal = new Date(`${month} ${day} ${year} 24:00`).getTime();
    const now = new Date().getTime();
    const timeLeft = endDeal - now;

    const hourLeft = Math.floor(timeLeft / 3600000);
    document.querySelector('.hour').innerHTML = pad(hourLeft);
    const minuteLeft = Math.floor((timeLeft - hourLeft * 3600000) / 60000);
    document.querySelector('.minute').innerHTML = pad(minuteLeft);
    const secondLeft = Math.floor((timeLeft - hourLeft * 3600000 - minuteLeft * 60000) / 1000);
    document.querySelector('.second').innerHTML = pad(secondLeft);
};
countdown();
setInterval(() => {
    countdown();
}, 1000);

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

// Onclick push phone to productDetail obj
window.pushPhone = function (index) {
    localStorage.setItem('productDetail', JSON.stringify(Phone[index]));
};

var inputSearch = document.querySelector('.header__top-search-input');
inputSearch.addEventListener('keyup', search);
function search() {
    var searchResult = document.querySelector('.header__top-search-result');
    setTimeout(() => {
        const searchValue = inputSearch.value.toUpperCase();
        const filterData = Phone.filter((item) => {
            return item.name.toUpperCase().includes(searchValue);
        });
        if (inputSearch.value.length == 0) {
            searchResult.style.display = 'none';
        } else if (filterData.length == 0 && inputSearch.value.length > 0) {
            searchResult.style.display = 'block';
            searchResult.innerHTML = '<div style="width:300px;text-align:center;color:gray;font-style:italic;font-size:12px;">Không tìm thấy sản phẩm nào</div>';
        } else {
            searchResult.style.display = 'block';
            searchResult.innerHTML = filterData
                .map((item) => {
                    return `<a href="./product-detail.html" class="result-item" onclick="pushPhone(${item.id})">
                <img src="${item.color[0][1]}" alt="Ảnh" class="result-item-img" />
                <div class="result-item-info">
                    <div class="result-item-name">${item.name}</div>
                    <div class="result-item-price">${item.newPrice.toLocaleString() + ' đ'}</div>
                </div>
            </a>`;
                })
                .join('');
        }
    }, 500);
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
