import { Phone } from './Data.js';
var CartLocal = JSON.parse(localStorage.getItem('CartData')) != null ? JSON.parse(localStorage.getItem('CartData')) : localStorage.setItem('CartData', JSON.stringify([]));

// Handle header cart number display
function renderCartNumber(CartLocal) {
    var totalProducts = 0;
    var totalPrice = 0;
    if (CartLocal != null && CartLocal.length != 0) {
        CartLocal.forEach((cart) => {
            totalProducts += cart.quantity;
            totalPrice += cart.quantity * cart.newPrice;
        });
        document.querySelector('.header__top-cart-number').style.display = 'block';
        document.querySelector('.header__top-cart-number').innerHTML = `${totalProducts}`;
    } else {
        document.querySelector('.header__top-cart-number').style.display = 'none';
    }
    // return { totalProducts, totalPrice };
}

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

const renderPhone = (Phone) => {
    const phone = Phone.map((phone, index) => {
        return `<a href="./product-detail.html" class="product-item" onclick="pushPhone(${index})">
        <img
            class="product-item__img"
            src="${phone.color[0][1]}"
            alt="Ảnh điện thoại"
        />
        <p class="product-item__name">${phone.name}</p>
        <div class="product-item--newprice">${phone.newPrice.toLocaleString() + ' đ'}</div>
        <div>
            <del class="product-item--oldprice">${phone.oldPrice.toLocaleString() + ' đ'}</del>
            <div class="product-item__discount-persent"></div>
        </div>
    </a>`;
    }).join('');
    document.querySelector('.deal__products').innerHTML = phone;
};
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

renderCartNumber(CartLocal);
renderPhone(Phone);
