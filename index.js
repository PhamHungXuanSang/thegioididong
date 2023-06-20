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
        console.log(scrollFirst);
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

// Handle cart logic
let cart = document.getElementById('cart');
