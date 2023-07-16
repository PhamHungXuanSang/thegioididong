import { Cart } from './Data.js';

const render = (Cart) => {
    var totalProducts = 0;
    var totalPrice = 0;
    Cart.forEach((cart) => {
        totalProducts += cart.quantity;
        totalPrice += cart.quantity * cart.newPrice;
    });
    document.querySelector('.header__top-cart-number').style.display = 'block';
    document.querySelector('.header__top-cart-number').innerHTML = `${totalProducts}`;

    if (totalProducts == 0) {
        document.querySelector('.cart').style.display = 'none';
        document.querySelector('.header__top-cart-number').style.display = 'none';
        document.querySelector('.cart--empty').style.display = 'block';
    }
    const cart = `<div class="cart__nav">
                    <a href="/index.html" class="cart__backhome"
                        ><i class="fa-solid fa-chevron-left"></i>Mua thêm sản phẩm khác</a
                    >
                    <p class="cart__nav-title">Giỏ hàng của anh</p>
                </div>
                <div class="cart__products">
                    ${Cart.map((cart, index) => {
                        return `
                        <div class="cart__product">
                        <div class="cart__product-top">
                            <img
                                src="${cart.color[0][1]}"
                                alt="Ảnh sản phẩm"
                                class="cart__product-img"
                            />
                            <div class="product__details">
                                <div class="product__name">
                                    <p>${cart.name}</p>
                                    <div class="product__color">
                                        <p>Màu:</p>
                                        <div class="product__color-name">${cart.color[0][0]}</div>
                                        <i class="product__color-dropdown fa-solid fa-sort-down"></i>
                                    </div>
                                </div>
                                <div class="product__amount">
                                    <div class="product__amount-money">
                                        <div class="product__amount-money--newprice">${cart.newPrice.toLocaleString() + ' đ'}</div>
                                        <del class="product__amount-money--oldprice">${cart.oldPrice.toLocaleString() + ' đ'}</del>
                                    </div>
                                    <div class="product__amount-quantity">
                                        <button class="product__amount-minus" onclick="handleDecrease(${index})"><i class="fa-solid fa-minus"></i></button>
                                        <div class="quantity">${cart.quantity}</div>
                                        <button class="product__amount-plus" onclick="handleIncrease(${index})"><i class="fa-solid fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="cart__product-del" onclick="handleDelete(${index})">
                            <i class="product__del-icon fa-solid fa-xmark"></i>
                            <p class="product__del-title">Xóa</p>
                        </button>
                    </div>
                        `;
                    }).join('')}
                    <div class="price">
                        <p class="total__products">Tạm tính (${totalProducts} sản phẩm)</p>
                        <p class="total__price">${totalPrice.toLocaleString() + ' đ'}</p>
                    </div>
                </div>
            `;
    document.querySelector('.cart').innerHTML = cart;
};

window.handleDelete = function (index) {
    CartLocal.splice(index, 1);
    localStorage.setItem('CartData', JSON.stringify(CartLocal));
    render(CartLocal);
};

window.handleDecrease = function (index) {
    if (CartLocal[index].quantity > 1) {
        CartLocal[index].quantity -= 1;
        localStorage.setItem('CartData', JSON.stringify(CartLocal));
        render(CartLocal);
    } else {
        handleDelete(index);
        render(CartLocal);
    }
};

window.handleIncrease = function (index) {
    if (CartLocal[index].quantity == 5) {
        render(CartLocal);
    } else {
        CartLocal[index].quantity += 1;
        localStorage.setItem('CartData', JSON.stringify(CartLocal));
        render(CartLocal);
    }
};
var CartLocal = JSON.parse(localStorage.getItem('CartData'));

// customer info
window.handleChecked = function (id) {
    document.querySelectorAll('.checkbox').forEach((checkbox) => {
        checkbox.checked = false;
    });
    document.querySelectorAll('.checkbox')[id].checked = true;
    // CartLocal.push(document.querySelectorAll('.checkbox')[id].value);
    // localStorage.setItem('CartData', JSON.stringify(CartLocal));
};

render(CartLocal);
