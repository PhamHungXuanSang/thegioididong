// // Test library
function Slider(selector, config) {
    config = {
        width: config.width,
        height: config.height,
        slidesPerView: config.slidesPerView,
        spaceBetween: config.spaceBetween,
        draggable: config.draggable,
        autoplay: {
            enable: config.autoplay.enable,
            delay: config.autoplay.delay,
        },
        pagination: {
            element: config.pagination.element,
            clickable: config.pagination.clickable,
        },
        navigation: {
            left: config.navigation.left,
            right: config.navigation.right,
        },
    };

    var currentIndex = 0; // id active img
    // Lấy ra các element sẽ dùng
    var slider = document.querySelector(`${selector}`);
    slider.style = `width:${config.width}px;height:${config.height}px;position:relative;`;

    var wrapper = document.querySelector(`${selector}`).children[0]; // img-slideShow
    wrapper.style = 'width:100%;height:100%;display:flex;align-items:center;overflow-y:hidden;text-align:center;overflow-x:hidden;scroll-behavior:smooth;';

    var btnLeft = document.querySelector(config.navigation.left);
    btnLeft.style = 'cursor:pointer;position:absolute;top:calc(100% / 2 - 30px);width:30px;height:60px;z-index:10;display:none;border:none;background-color:#fcfdf9;opacity:0.6;border-top-right-radius:6px;border-bottom-right-radius:6px;box-shadow:6px 0 4px rgba(0, 0, 0, 0.05);';

    var btnRight = document.querySelector(config.navigation.right);
    btnRight.style = 'cursor:pointer;position:absolute;top:calc(100% / 2 - 30px);right:0;width:30px;height:60px;z-index:10;display:none;border:none;background-color:#fcfdf9;opacity:0.6;border-top-left-radius:6px;border-bottom-left-radius:6px;box-shadow:-6px 0 4px rgba(0, 0, 0, 0.05);';

    var paginationElement = document.querySelector(`${config.pagination.element}`); // img-preview
    paginationElement.style = 'display:flex;justify-content:center;margin-top:4px;';

    var width = config.width / config.slidesPerView; // slide width

    const list = [...document.querySelector(`${selector}`).children[0].children]; // Spread HTMLCollection vào mảng
    var slideNum = list.length; // sum slide
    if (slideNum > 1) btnRight.style.display = 'block';
    // Lặp qua và css cho từng phần tử
    var imgWidthArr = [];
    var imgElementArr = [];
    list.map((item) => {
        item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc(100%/${config.slidesPerView});height:100%;padding:0 ${config.spaceBetween}px`;
        [...item.children][0].style = 'display:block;max-width:100%;min-height:100%;object-fit:cover;'; // img
        imgWidthArr.push([...item.children][0].offsetWidth); // push vào mảng để lưu lại giá trị chiều rộng của mỗi ảnh
        imgElementArr.push([...item.children][0]); // push vào mảng để lưu lại DOM Element của mỗi ảnh
    }); // slide

    // render pagination
    if (config.slidesPerView > 1) {
        list.splice(list.length - (config.slidesPerView - 1), config.slidesPerView);
    }
    const htmls = list
        .map((item, index) => {
            return `<div id="${index}" class="preview-wrapper ${index == 0 ? 'active' : ''}" ${config.pagination.clickable == true ? `onclick="handleScrollById(${index})"` : ``} style='width:12px;height:12px;margin:auto 4px;border:1px solid #000;border-radius:50%;background-color:orange;'></div>`;
        })
        .join('');
    paginationElement.innerHTML = htmls;

    if (config.draggable) {
        wrapper.style = 'cursor:grab;width:100%;height:100%;display:flex;align-items:center;overflow-y:hidden;text-align:center;overflow-x:hidden;scroll-behavior:auto;';
        let startX,
            direction = '',
            isDragging = false;
        const dragStart = (e) => {
            isDragging = true;
            e.preventDefault();
            startX = e.pageX; // giá trị tại điểm X theo chiều rộng màn hình
        };
        const dragStop = () => {
            isDragging = false;
            if (direction == 'next' && currentIndex + 1 <= slideNum - 1) {
                handleScrollById(++currentIndex);
            } else if (direction == 'prev' && currentIndex > 0) {
                handleScrollById(--currentIndex);
            }
        };
        const dragging = (e) => {
            if (!isDragging) return;
            if (e.pageX - startX > 0) {
                direction = 'prev';
            } else if (e.pageX - startX < 0) {
                direction = 'next';
            }
        };
        wrapper.addEventListener('mousedown', dragStart);
        wrapper.addEventListener('mousemove', dragging);
        wrapper.addEventListener('mouseup', dragStop);
        var mirror = document.querySelector('#mirror');
        mirror.style = `display:block;position:fixed;pointer-events:none;transform:translate(-50%, -50%);width:${imgWidthArr[currentIndex] / 5}px;height:${
            config.height / 5
        }px;background-image:url('https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-200x200.jpg');background-size:${imgWidthArr[currentIndex] * 1.5}px ${config.height * 1.5}px;background-repeat:no-repeat;`;

        wrapper.addEventListener('mouseout', function () {
            mirror.style.display = 'none';
        });
        wrapper.addEventListener('mousemove', function (e) {
            mirror.style.display = 'block';
            let heightSlide = this.offsetHeight; // chieu cao slide = 400

            let elementRect = imgElementArr[currentIndex].getBoundingClientRect();
            let elementLeft = Math.floor(elementRect.left);
            let elementTop = Math.floor(elementRect.top);
            // lấy đc w tại chuột so với viền trái ảnh
            // lấy đc w tại chuột so với viền trái trình duyệt = e.pageX

            let mouseWithImgBorderX = e.pageX - elementLeft;
            let mouseWithImgBorderY = e.pageY - elementTop;

            let percentMouseByW = Math.floor((mouseWithImgBorderX / imgWidthArr[currentIndex]) * 100);
            let percentMouseByH = Math.floor((mouseWithImgBorderY / heightSlide) * 100);

            mirror.style.backgroundPosition = `${percentMouseByW}% ${percentMouseByH}%`;
            mirror.style.top = `${e.clientY}px`;
            mirror.style.left = `${e.clientX}px`;
        });
    }

    var scrolled = 0; // tracking scrolled pixel
    var paginationItem = [...paginationElement.children];
    paginationItem.forEach((it, index) => {
        it.style = `width:16px;height:16px;background-color:orange;border:1px solid black;opacity:0.5;border-radius:50%;margin:0 4px;${config.pagination.clickable == true ? 'cursor:pointer;' : ''}`;
        if (index == 0) it.style.opacity = '1';
    });
    // handle click img preview
    handleScrollById = function (index) {
        var scrollTo = index * width;
        if (scrollTo > scrolled) {
            wrapper.scrollLeft = wrapper.scrollLeft + (scrollTo - scrolled);
            scrolled = scrollTo;
        }
        if (scrollTo < scrolled) {
            wrapper.scrollLeft = wrapper.scrollLeft - (scrolled - scrollTo);
            scrolled = scrollTo;
        }
        currentIndex = index;
        document.querySelectorAll('.preview-wrapper').forEach((wrap) => {
            wrap.classList.remove('active');
        });
        document.getElementById(`${index}`).classList.add('active');
        paginationItem.forEach((e) => {
            if (e.classList.contains('active')) {
                e.style.opacity = `1`;
            } else {
                e.style.opacity = `0.5`;
            }
        });

        if (scrolled > 0) {
            btnLeft.style.display = 'block';
        } else {
            btnLeft.style.display = 'none';
        }
        if (scrollTo == width * (slideNum - 1)) {
            btnRight.style.display = 'none';
        } else {
            btnRight.style.display = 'block';
        }
    };

    if (config.autoplay.enable == true) {
        const timerId = setInterval(
            () => {
                if (currentIndex == slideNum - 1) {
                    handleScrollById(0);
                } else {
                    handleScrollById(++currentIndex);
                }
            },
            config.autoplay.delay < 1000 ? config.autoplay.delay * 1000 : config.autoplay.delay,
        );
    }
    btnRight.onclick = () => {
        handleScrollById(++currentIndex);
    };
    btnLeft.onclick = () => {
        handleScrollById(--currentIndex);
    };
}
