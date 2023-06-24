import { Phone, Cart } from './Data.js';

// Handle image slider
var scrollFirst = 0;
var sumImages = document.querySelectorAll('.images--slider').length;

const slideInterval = setInterval(() => {
    var boc = document.querySelector('.boc');
    boc.scrollLeft = boc.scrollLeft + 1200;
    boc.addEventListener('scroll', (e) => {
        scrollFirst = boc.scrollLeft;
    });
}, 3000);

const slideFirstInterval = setInterval(() => {
    var boc = document.querySelector('.boc');
    boc.scrollLeft = boc.scrollLeft - scrollFirst;
}, sumImages * 3000);

document.querySelector('.slider__btn-right').onclick = () => {
    var boc = document.querySelector('.boc');
    if (scrollFirst == 1200 * (sumImages - 1)) {
        boc.scrollLeft = boc.scrollLeft - scrollFirst;
    } else {
        boc.scrollLeft = boc.scrollLeft + 1200;
        boc.addEventListener('scroll', (e) => {
            scrollFirst = boc.scrollLeft;
        });
        clearInterval(slideInterval);
        clearInterval(slideFirstInterval);
    }
};

document.querySelector('.slider__btn-left').onclick = () => {
    var boc = document.querySelector('.boc');
    if (scrollFirst == 0) {
        boc.scrollLeft = boc.scrollLeft + 1200 * sumImages;
        boc.addEventListener('scroll', (e) => {
            scrollFirst = boc.scrollLeft;
        });
    } else {
        boc.scrollLeft = boc.scrollLeft - 1200;
        clearInterval(slideInterval);
        clearInterval(slideFirstInterval);
    }
};

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

// Handle push product-detail
// Fake data Phone
localStorage.setItem('Phone', JSON.stringify(Phone));
var dealPhone = JSON.parse(localStorage.getItem('Phone'));
console.log(dealPhone);
const renderDeal = (Phone) => {
    const phone = Phone.map((phone, index) => {
        return `<a href="./product-detail.html" class="product-item" onclick="pushPhone(${index})">
        <img
            class="product-item__img"
            src="${phone.color.black[1]}"
            alt="Ảnh điện thoại"
        />
        <p class="product-item__name">${phone.name}</p>
        <div class="product-item--newprice">${phone.newPrice}</div>
        <div>
            <del class="product-item--oldprice">${phone.oldPrice}</del>
            <div class="product-item__discount-persent"></div>
        </div>
    </a>`;
    }).join('');
    document.querySelector('.deal__products').innerHTML = phone;
};

// Onclick push phone to productDetail obj
window.pushPhone = function (index) {
    localStorage.setItem('productDetail', JSON.stringify(Phone[index]));
    var product = JSON.parse(localStorage.getItem('productDetail'));
    console.log(product);
};

renderDeal(dealPhone);
