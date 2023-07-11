// // Test library
function Slider(selector, config) {
    config = {
        width: config.width,
        height: config.height,
        slidesPerView: config.slidesPerView,
        spaceBetween: config.spaceBetween, // FIX
        draggable: config.draggable,
        autoplay: {
            enable: config.autoplay.enable,
            delay: config.autoplay.delay,
        },
        zoomable: config.zoomable,
        wrapperSlide: config.wrapperSlide,
        pagination: {
            visible: {
                display: config.pagination.visible.display,
                img: config.pagination.visible.img,
            },
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
    if (!slider) {
        console.log(`Not fine ${selector} selector`);
        return;
    }
    slider.style = `width:${config.width}px;height:${config.height}px;position:relative;`;

    var wrapper = slider.querySelector(config.wrapperSlide); // img-slideShow
    if (!wrapper) {
        console.log(`Not fine ${config.wrapperSlide} selector`);
        return;
    }
    wrapper.style = 'width:100%;height:100%;display:flex;align-items:center;overflow-y:hidden;text-align:center;overflow-x:hidden;scroll-behavior:smooth;';

    var btnLeft = slider.querySelector(config.navigation.left);
    if (!btnLeft) {
        console.log(`Not fine ${config.navigation.left} selector`);
        return;
    }
    btnLeft.style = 'cursor:pointer;position:absolute;top:calc(100% / 2 - 30px);width:30px;height:60px;z-index:10;display:none;border:none;background-color:#fcfdf9;opacity:0.6;border-top-right-radius:6px;border-bottom-right-radius:6px;box-shadow:6px 0 4px rgba(0, 0, 0, 0.05);';

    var btnRight = slider.querySelector(config.navigation.right);
    if (!btnRight) {
        console.log(`Not fine ${config.navigation.right} selector`);
        return;
    }
    btnRight.style = 'cursor:pointer;position:absolute;top:calc(100% / 2 - 30px);right:0;width:30px;height:60px;z-index:10;display:none;border:none;background-color:#fcfdf9;opacity:0.6;border-top-left-radius:6px;border-bottom-left-radius:6px;box-shadow:-6px 0 4px rgba(0, 0, 0, 0.05);';

    var width = config.width / config.slidesPerView; // slide width

    const list = [...wrapper.children]; // Spread HTMLCollection vào mảng
    var slideCount = list.length; // sum slide
    if (slideCount > 1) btnRight.style.display = 'block';
    // Lặp qua và css cho từng phần tử
    var imgWidthArr = [];
    var imgElementArr = [];
    list.map((item, index) => {
        item.classList.add(index);
        item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc(100%/${config.slidesPerView});height:100%;`;
        for (var img of item.children) {
            imgElementArr.push(img); // push vào mảng để lưu lại DOM Element của mỗi ảnh
            imgWidthArr.push(img.offsetWidth); // push vào mảng để lưu lại giá trị chiều rộng của mỗi ảnh
            img.style = `display:block;max-width:100%;min-height:100%;object-fit:cover`; // img
        }
    }); // slide

    if (config.pagination.visible.display) {
        var paginationElement = slider.querySelector(`${config.pagination.element}`); // img-preview
        if (!paginationElement) {
            console.log(`Not fine ${config.pagination.element} selector`);
            return;
        }
        paginationElement.style = 'display:flex;justify-content:center;margin-top:4px;';
        const htmls = list
            .map((item, index) => {
                return `<div id="${index}" class="pagination-item ${index == 0 ? 'active' : ''}" ${config.pagination.clickable == true ? `onclick="handleScrollById(${index})"` : ``}></div>`;
            })
            .join('');
        paginationElement.innerHTML = htmls;
        var paginationItem = [...paginationElement.children];
        paginationItem.forEach((it, index) => {
            if (config.pagination.visible.img) {
                it.style = `min-width:${wrapper.offsetHeight / 10}px;height:${wrapper.offsetHeight / 10}px;background-image:url('${imgElementArr[index].src}');background-repeat:no-repeat;background-size:100% 100%;border:${index == 0 ? '2px' : '1px'} solid ${
                    index == 0 ? '#f06c2c' : 'black'
                };opacity:0.5;border-radius:1px;margin:0 4px;${config.pagination.clickable == true ? 'cursor:pointer;' : ''}`;
            } else {
                it.style = `width:16px;height:16px;background-color:orange;border:1px solid black;opacity:0.5;border-radius:50%;margin:0 4px;${config.pagination.clickable == true ? 'cursor:pointer;' : ''}`;
            }
            if (index == 0) it.style.opacity = '1';
        });
    }
    // render pagination
    if (config.slidesPerView > 1) {
        list.splice(list.length - (config.slidesPerView - 1), config.slidesPerView);
    }

    if (config.draggable) {
        wrapper.style = 'cursor:grab;width:100%;height:100%;display:flex;align-items:center;overflow-y:hidden;text-align:center;overflow-x:hidden;scroll-behavior:smooth;';
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
            if (direction == 'next' && currentIndex + 1 <= slideCount - 1) {
                handleScrollById(++currentIndex);
                direction = '';
            } else if (direction == 'prev' && currentIndex > 0) {
                handleScrollById(--currentIndex);
                direction = '';
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
    }
    if (config.autoplay.enable == false && config.draggable == false && config.zoomable) {
        var mirror = slider.querySelector('#mirror');
        wrapper.addEventListener('mouseout', function () {
            mirror.style.display = 'none';
        });
        wrapper.addEventListener('mousemove', function (e) {
            mirror.style = `display:block;position:fixed;pointer-events:none;transform:translate(-50%, -50%);width:${imgWidthArr[currentIndex] / 5}px;height:${config.height / 5}px;background-image:url('${imgElementArr[currentIndex].src}');background-size:${imgWidthArr[currentIndex] * 1.5}px ${
                config.height * 1.5
            }px;background-repeat:no-repeat;`;
            let heightSlide = wrapper.offsetHeight; // chieu cao slide

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

    // handle scroll
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
        if (config.pagination.visible.display) {
            slider.querySelectorAll('.pagination-item').forEach((pi) => {
                pi.classList.remove('active');
                if (pi.id == index) pi.classList.add('active');
            });
            paginationItem.forEach((e) => {
                if (e.classList.contains('active')) {
                    e.style.opacity = `1`;
                    if (config.pagination.visible.img) e.style.border = `2px solid #f06c2c`;
                } else {
                    e.style.opacity = `0.5`;
                    e.style.border = `1px solid black`;
                }
            });
        }

        if (scrolled > 0) {
            btnLeft.style.display = 'block';
        } else {
            btnLeft.style.display = 'none';
        }
        if (scrollTo == width * (slideCount - 1)) {
            btnRight.style.display = 'none';
        } else {
            btnRight.style.display = 'block';
        }
    };

    if (config.autoplay.enable == true) {
        setInterval(
            () => {
                if (currentIndex == slideCount - 1) {
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
