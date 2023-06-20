import { Phone } from './Data.js';
// import { Cart } from './CartData.js';

const Cart = [
    {
        id: 0,
        brand: 'Apple',
        name: 'iPhone 14 Pro Max 128GB',
        color: {
            black: ['Đen', 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-200x200.jpg'],
            yellow: ['Vàng', 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-vang-thumb-200x200.jpg'],
            white: ['Trắng', 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-bac-thumb-200x200.jpg'],
            violet: ['Tím', 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-200x200.jpg'],
        },
        oldPrice: 29000000,
        newPrice: 27000000,
        quantity: 1,
    },
    {
        id: 1,
        brand: 'Xiaomi',
        name: ' Xiaomi 13 5G',
        color: {
            black: ['Đen', 'https://cdn.tgdd.vn/Products/Images/42/267984/xiaomi-13-thumb-den-200x200.jpg'],
            white: ['Trắng', 'https://cdn.tgdd.vn/Products/Images/42/267984/xiaomi-13-thumb-xanh-200x200.jpg'],
        },
        oldPrice: 22990000,
        newPrice: 18990000,
        quantity: 5,
    },
    {
        id: 2,
        brand: 'LG',
        name: ' LG',
        color: {
            black: ['Đen', 'https://cdn.tgdd.vn/Products/Images/42/267984/xiaomi-13-thumb-den-200x200.jpg'],
            white: ['Trắng', 'https://cdn.tgdd.vn/Products/Images/42/267984/xiaomi-13-thumb-xanh-200x200.jpg'],
        },
        oldPrice: 22990000,
        newPrice: 18990000,
        quantity: 2,
    },
];

var totalProducts = 0;
const render = () => {
    Cart.forEach((cart) => {
        totalProducts += cart.quantity;
    });
    // var totalProducts = 0;
    document.querySelector('.header__top-cart-number').innerHTML = `${totalProducts}`;

    if (totalProducts == 0) {
        document.querySelector('.cart').style.display = 'none';
        document.querySelector('.cart--empty').style.display = 'block';
    } else {
        document.querySelector('.cart').style.display = 'block';
        document.querySelector('.cart--empty').style.display = 'none';
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
                                    src="${cart.color.black[1]}"
                                    alt="Ảnh sản phẩm"
                                    class="cart__product-img"
                                />
                                <div class="product__details">
                                    <div class="product__name">
                                        <p>${cart.name}</p>
                                        <div class="product__color">
                                            <p>Màu:</p>
                                            <div class="product__color-name">${cart.color.black[0]}</div>
                                            <i class="product__color-dropdown fa-solid fa-sort-down"></i>
                                        </div>
                                    </div>
                                    <div class="product__amount">
                                        <div class="product__amount-money">
                                            <div class="product__amount-money--newprice">${cart.newPrice}</div>
                                            <del class="product__amount-money--oldprice">${cart.oldPrice}</del>
                                        </div>
                                        <div class="product__amount-quantity">
                                            <button class="product__amount-minus"><i class="fa-solid fa-minus"></i></button>
                                            <div class="quantity">${cart.quantity}</div>
                                            <button class="product__amount-plus"><i class="fa-solid fa-plus"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="cart__product-del">
                                <i class="product__del-icon fa-solid fa-xmark"></i>
                                <p class="product__del-title">Xóa</p>
                            </button>
                        </div>`;
                    }).join('')}
                    <p class="total__products">Tạm tính (${totalProducts} sản phẩm)</p>
                </div>
            `;
    return cart;
};
console.log(render());
document.querySelector('.cart').innerHTML = render();

// document.querySelectorAll('.cart__product-del').forEach((btn, index) => {
//     btn.onclick = () => {
//         Cart.splice(index, 1);
//         render();
//         console.log(Cart);
//     };
// });
// function Del() {
var abc = document.querySelectorAll('.cart__product-del');
abc.forEach((btn, index) => {
    // btn.onclick = (e) => {
    //     e.target.parentElement.parentElement.remove();
    //     console.log(index);
    //     Cart.splice(index, 1);
    //     render();
    //     console.log(Cart);
    // };
    console.log(btn);
    console.log(index);
});

// Cart.splice(1, 1);
// console.log(Cart); //apple lg
// Cart.splice(1, 1);
// console.log(Cart); // apple
