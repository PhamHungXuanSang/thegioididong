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

// Handle scroll product img
var scrollValue = 0;
var id = 0;
var totalImages = document.querySelectorAll('.boc').length;
console.log(totalImages);
if (totalImages > 1) {
    document.querySelector('.img-slideShow__btn--right').style.display = 'block';
}

document.querySelector('.img-slideShow__btn--right').onclick = () => {
    document.querySelectorAll('.preview-wrapper').forEach((wrap) => {
        wrap.classList.remove('active'); // wrap sẽ bị remove cái class active
    });
    id += 1;
    document.getElementById(`${id}`).classList.add('active'); // add vào ảnh vừa chuyển đến cái class active
    var wrapper = document.querySelector('.img__wrapper');
    wrapper.scrollLeft = wrapper.scrollLeft + 710;
    scrollValue += 710;
    if (scrollValue > 0) {
        document.querySelector('.img-slideShow__btn--left').style.display = 'block';
    }
    if (scrollValue == (totalImages - 1) * 710) {
        // kiểm tra nếu scrollValue == ảnh cuối cùng thì ẩn nút phải
        document.querySelector('.img-slideShow__btn--right').style.display = 'none';
    }
    console.log(scrollValue);
};

document.querySelector('.img-slideShow__btn--left').onclick = () => {
    document.querySelectorAll('.preview-wrapper').forEach((wrap) => {
        wrap.classList.remove('active');
    });
    id -= 1; // id=1
    document.getElementById(`${id}`).classList.add('active');
    var wrapper = document.querySelector('.img__wrapper');
    wrapper.scrollLeft = wrapper.scrollLeft - (scrollValue - 710 * id);
    scrollValue -= 710;
    if (scrollValue == 0) {
        document.querySelector('.img-slideShow__btn--left').style.display = 'none';
    }
    if (totalImages > 1) {
        document.querySelector('.img-slideShow__btn--right').style.display = 'block';
    }
};

// handle img preview
window.handleChangeActive = function (index) {
    id = index;
    document.querySelectorAll('.preview-wrapper').forEach((wrap) => {
        wrap.classList.remove('active');
    });
    document.getElementById(`${index}`).classList.add('active');
    var scrollTo = index * 710; //2130

    if (scrollTo > scrollValue) {
        var wrapper = document.querySelector('.img__wrapper');
        wrapper.scrollLeft = wrapper.scrollLeft + (scrollTo - scrollValue);
        scrollValue = scrollTo; // tại vì scrollValue dùng để theo dõi coi mình đang scroll bao nhiêu so với vị trí 0
    }

    if (scrollTo < scrollValue) {
        var wrapper = document.querySelector('.img__wrapper');
        if (scrollTo == 0) {
            wrapper.scrollLeft = wrapper.scrollLeft - scrollValue;
        } else {
            wrapper.scrollLeft = wrapper.scrollLeft - (scrollValue - scrollTo);
        }
        scrollValue = scrollTo;
    }

    if (scrollValue == 0) {
        document.querySelector('.img-slideShow__btn--left').style.display = 'none';
    } else {
        document.querySelector('.img-slideShow__btn--left').style.display = 'block';
    }

    if (scrollTo == 710 * (totalImages - 1)) {
        document.querySelector('.img-slideShow__btn--right').style.display = 'none';
    } else {
        document.querySelector('.img-slideShow__btn--right').style.display = 'block';
    }
};

// handle add cart
