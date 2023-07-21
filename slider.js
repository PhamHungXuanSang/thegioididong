// // Test library
function Slider(selector, config) {
    config = {
        width: config.width ? config.width : 800,
        height: config.height ? config.height : 400,
        slidesPerView: config.slidesPerView ? config.slidesPerView : 1,
        spaceBetween: config.spaceBetween ? config.spaceBetween : 0,
        draggable: config.draggable ? config.draggable : false,
        autoplay: {
            enable: config.autoplay.enable ? config.autoplay.enable : false,
            delay: config.autoplay.delay ? config.autoplay.delay : 3,
            // progress: config.autoplay.progress ? config.autoplay.delay : false,
            progress: {
                element: config.autoplay.progress.element ? config.autoplay.progress.element : '.progress',
                display: config.autoplay.progress.display ? config.autoplay.progress.display : false,
            },
        },
        zoomable: config.zoomable ? config.zoomable : false,
        wrapperSlide: config.wrapperSlide ? config.wrapperSlide : '.wrapperSlide',
        pagination: {
            element: config.pagination.element ? config.pagination.element : '.wrapperPagination',
            visible: {
                display: config.pagination.visible.display ? config.pagination.visible.display : false,
                img: config.pagination.visible.img ? config.pagination.visible.img : false,
            },
            clickable: config.pagination.clickable ? config.pagination.clickable : true,
        },
        navigation: {
            left: config.navigation.left ? config.navigation.left : '.prev',
            right: config.navigation.left ? config.navigation.right : '.next',
        },
    };

    var currentIndex = 0; // id active img
    var slider = document.querySelector(`${selector}`);
    if (!slider) {
        console.log(`Not fine ${selector} selector`);
        return;
    }
    slider.style = `width:${config.width}px;height:${config.height}px;overflow:hidden;position:relative;`; // thằng này phải relative

    var wrapper = slider.querySelector(config.wrapperSlide); // img-slideShow
    if (!wrapper) {
        console.log(`Not fine ${config.wrapperSlide} selector`);
        return;
    }
    wrapper.style = 'width:100%;height:100%;display:flex;align-items:center;text-align:center;';

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
    btnRight.style = `cursor:pointer;position:absolute;left:0;top:calc(100% / 2 - 30px);left:calc(100% - 30px);width:30px;height:60px;z-index:10;display:none;border:none;background-color:#fcfdf9;opacity:0.6;border-top-left-radius:6px;border-bottom-left-radius:6px;box-shadow:-6px 0 4px rgba(0, 0, 0, 0.05);`;

    var width = config.slidesPerView > 1 ? config.width / config.slidesPerView - config.spaceBetween : config.width / config.slidesPerView; // slide width

    const list = [...wrapper.children]; // Spread HTMLCollection vào mảng
    var slideCount = list.length; // Tổng số slide
    if (slideCount > 1 && config.slidesPerView < slideCount) btnRight.style.display = 'block';
    // Lặp qua và css cho từng phần tử
    var imgWidthArr = [];
    var imgElementArr = [];
    list.forEach((item, index) => {
        item.classList.add(index);
        if (config.slidesPerView == 2) {
            index == currentIndex ? item.classList.add('active') : '';
            item.classList.contains('active')
                ? (item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc(100%/${config.slidesPerView} - ${config.spaceBetween / 2}px);height:100%;margin-right:${config.spaceBetween / 2}px`)
                : (item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc(100%/${config.slidesPerView} - ${config.spaceBetween / 2}px);height:100%;margin-left:${config.spaceBetween / 2}px`);
        } else if (config.slidesPerView == 1) {
            item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc(100%/${config.slidesPerView});height:100%;margin-right:${config.spaceBetween}px`;
        }

        for (var img of item.children) {
            img.style = `display:block;max-width:100%;min-height:100%;object-fit:cover`;
            imgElementArr.push(img); // push vào mảng để lưu lại DOM Element của mỗi ảnh
            imgWidthArr.push(img.offsetWidth); // push vào mảng để lưu lại giá trị chiều rộng của mỗi ảnh
        }
    }); // slide

    // render pagination
    if (config.slidesPerView > 1) list.splice(list.length - (config.slidesPerView - 1), config.slidesPerView);
    if (config.pagination.visible.display) {
        var paginationElement = slider.querySelector(`${config.pagination.element}`); // img-preview
        if (!paginationElement) {
            console.log(`Not fine ${config.pagination.element} selector`);
            return;
        }
        paginationElement.style = `display:flex;justify-content:center;position:absolute;width:${config.width}px;margin-top:8px;`;
        const htmls = list
            .map((item, index) => {
                return `<div id="${index}" class="pagination-item ${index == 0 ? 'active' : ''}" ${config.pagination.clickable ? `onclick="handleScrollById(${index})"` : ``}></div>`;
            })
            .join('');
        paginationElement.innerHTML = htmls;
        var paginationItem = [...paginationElement.children];
        paginationItem.forEach((it, index) => {
            if (config.pagination.visible.img && config.slidesPerView == 1) {
                it.style = `min-width:${wrapper.offsetHeight / 10}px;height:${wrapper.offsetHeight / 10}px;background-image:url('${imgElementArr[index].src}');background-repeat:no-repeat;background-size:100% 100%;border:${index == 0 ? '2px' : '1px'} solid ${
                    index == 0 ? '#f06c2c' : 'black'
                };opacity:0.5;border-radius:1px;margin:0 4px;${config.pagination.clickable ? 'cursor:pointer;' : ''}`;
            } else {
                it.style = `width:16px;height:16px;background-color:orange;border:1px solid black;;opacity:0.5;border-radius:50%;margin:0 4px;${config.pagination.clickable ? 'cursor:pointer;' : ''}`;
            }
            if (index == 0) it.style.opacity = '1';
        });
    }

    if (config.draggable) {
        wrapper.style.cursor = 'grab';
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
        slider.style.cursor = 'zoom-in';
        var mirror = slider.querySelector('#mirror');
        wrapper.addEventListener('mouseout', function () {
            mirror.style.display = 'none';
        });
        wrapper.addEventListener('mousemove', function (e) {
            mirror.style = `display:block;position:fixed;pointer-events:none;transform:translate(-50%, -50%);width:${imgWidthArr[currentIndex] / 5}px;height:${config.height / 5}px;background-image:url('${imgElementArr[currentIndex].src}');background-size:${imgWidthArr[currentIndex] * 1.5}px ${
                config.height * 1.5
            }px;background-repeat:no-repeat;`;
            let heightSlide = wrapper.offsetHeight; // Chiều cao slide

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

    handleScrollById = function (index) {
        currentIndex = index;
        var scrollTo = index * width;
        if (config.slidesPerView == 2) {
            list.forEach((item, itemIndex) => {
                currentIndex == itemIndex ? item.classList.add('active') : item.classList.remove('active');
                item.classList.contains('active')
                    ? (item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc(100%/${config.slidesPerView} - ${config.spaceBetween / 2}px);height:100%;margin-right:${config.spaceBetween / 2}px`)
                    : (item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc(100%/${config.slidesPerView} - ${config.spaceBetween / 2}px);height:100%;margin-left:${config.spaceBetween / 2}px`);
            });
        }

        wrapper.style.transform = `translateX(${-1 * scrollTo - index * config.spaceBetween}px)`;
        wrapper.style.transitionDuration = '0.5s';

        if (config.pagination.visible.display) {
            slider.querySelectorAll('.pagination-item').forEach((pi) => {
                pi.classList.remove('active');
                if (pi.id == index) pi.classList.add('active');
            });
            paginationItem.forEach((e) => {
                if (e.classList.contains('active')) {
                    e.style.opacity = `1`;
                    config.pagination.visible.img && config.slidesPerView == 1 ? (e.style.border = `2px solid #f06c2c`) : (e.style.border = `1px solid black`);
                } else {
                    e.style.opacity = `0.5`;
                    e.style.border = `1px solid black`;
                }
            });
        }

        index > 0 ? (btnLeft.style.display = 'block') : (btnLeft.style.display = 'none');
        index == slideCount - 1 ? (btnRight.style.display = 'none') : (btnRight.style.display = 'block');

        if (config.slidesPerView > 1) {
            currentIndex == slideCount - config.slidesPerView ? (btnRight.style.display = 'none') : (btnRight.style.display = 'block');
        }
    };

    var progress = slider.querySelector(`${config.autoplay.progress.element}`);
    if (!progress) {
        console.log(`Not fine ${config.autoplay.progress.element} selector`);
    } else {
        if (config.autoplay.enable && config.slidesPerView < slideCount && config.autoplay.progress.display) {
                var progressValue = config.autoplay.delay;
                progress.style = `background:conic-gradient(#4d5bf9 ${progressValue * 3.6}deg,#cadcff ${progressValue * 3.6}deg);background-color: #4d5bf9; border-radius: 50%; width:${(wrapper.offsetWidth * 5) / 100}px; height:${(wrapper.offsetWidth * 5) / 100}px; position: relative; bottom: ${
                    (wrapper.offsetWidth * 5) / 100
                }px; left: calc(${wrapper.offsetWidth}px - ${(wrapper.offsetWidth * 5) / 100}px);`;
                var value = document.createElement('div');
                value.style = `background-color: #fff; border-radius: 50%; width:${(wrapper.offsetWidth * 4) / 100}px; height:${(wrapper.offsetWidth * 4) / 100}px; position: absolute; top: calc(50% - ${(wrapper.offsetWidth * 4) / 100 / 2}px); left: calc(50% - ${(wrapper.offsetWidth * 4) / 100 / 2}px)`;
                progress.appendChild(value);
                var progressValueElement = document.createElement('div');
                progressValueElement.style = `text-align:center;line-height:${(wrapper.offsetWidth * 4) / 100}px;font-size:24px;font-weight:600;color:#4d5bf9;`;
                value.appendChild(progressValueElement);
                progressValueElement.innerText = progressValue;
                progressValueElement.textContent = `${progressValue}s`;
                progressId = setInterval(() => {
                    progressValue--;
                    progressValueElement.textContent = `${progressValue}s`;
                    // Tìm cách đưa cái số deg thành 360 to 0
                    progress.style.background = `conic-gradient(#4d5bf9 ${progressValue * 3.6}deg,#cadcff ${progressValue * 3.6}deg)`;

                    progressValue == 1 ? (progressValue = config.autoplay.delay + 1) : '';
                }, 1000);
                // Bắt sự kiện khi onScroll thì xóa interval
                const onScroll = () => {
                    progressValue = config.autoplay.delay;
                    progressValueElement.textContent = `${progressValue}s`;
                    progress.style.background = `conic-gradient(#4d5bf9 ${progressValue * 3.6}deg,#cadcff ${progressValue * 3.6}deg)`;
                    clearInterval(autoplayId);
                    clearInterval(progressId);
                };

                const onScrollStop = () => {
                    progressValueElement.textContent = `${progressValue}s`;
                    progressId = setInterval(() => {
                        progressValue--;
                        progressValueElement.textContent = `${progressValue}s`;
                        // Tìm cách đưa cái số deg thành 360 to 0
                        progress.style.background = `conic-gradient(#4d5bf9 ${progressValue * 3.6}deg,#cadcff ${progressValue * 3.6}deg)`;

                        progressValue == 1 ? (progressValue = config.autoplay.delay + 1) : '';
                    }, 1000);
                    autoplayId = setInterval(
                        () => {
                            if (config.slidesPerView > 1) {
                                currentIndex == slideCount - config.slidesPerView ? handleScrollById(0) : handleScrollById(++currentIndex);
                            } else if (currentIndex == slideCount - 1) {
                                handleScrollById(0);
                            } else {
                                handleScrollById(++currentIndex);
                            }
                        },
                        config.autoplay.delay < 1000 ? config.autoplay.delay * 1000 : config.autoplay.delay,
                    );
                };
                wrapper.addEventListener('transitionstart', onScroll);
                wrapper.addEventListener('transitionend', onScrollStop);
        }
    }
    if (config.autoplay.enable && config.slidesPerView < slideCount) {
        autoplayId = setInterval(
            () => {
                if (config.slidesPerView > 1) {
                    currentIndex == slideCount - config.slidesPerView ? handleScrollById(0) : handleScrollById(++currentIndex);
                } else if (currentIndex == slideCount - 1) {
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
