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
            progress: {
                element: config.autoplay.progress.element ? config.autoplay.progress.element : '.progress',
                display: config.autoplay.progress.display ? config.autoplay.progress.display : false,
            },
        },
        zoomable: {
            element: config.zoomable.element ? config.zoomable.element : '.mirror',
            display: config.zoomable.display ? config.zoomable.display : false,
        },
        wrapperSlide: config.wrapperSlide ? config.wrapperSlide : '.wrapperSlide',
        pagination: {
            element: config.pagination.element ? config.pagination.element : '.wrapperPagination',
            visible: {
                display: config.pagination.visible.display ? config.pagination.visible.display : false,
                img: config.pagination.visible.img ? config.pagination.visible.img : false,
            },
            clickable: config.pagination.clickable ? config.pagination.clickable : false,
        },
        navigation: {
            left: config.navigation.left ? config.navigation.left : '.prev',
            right: config.navigation.left ? config.navigation.right : '.next',
        },
    };

    var currentIndex = 0; // id active img
    var slider = document.querySelector(`${selector}`);
    var wrapper = slider.querySelector(config.wrapperSlide); // img-slideShow
    if (!slider) {
        console.log(`Not find ${selector} selector`);
        return;
    }
    if (!wrapper) {
        console.log(`Not find ${config.wrapperSlide} selector`);
        return;
    }
    wrapper.style = `width:${config.width}px;height:${config.height}px;display:flex;align-items:center;text-align:center;`;
    slider.style = `width:${config.width}px;height:calc(${config.height}px + ${wrapper.offsetHeight / 10 + 8}px);overflow:hidden;position:relative;`;

    var btnLeft = slider.querySelector(config.navigation.left);
    if (!btnLeft) {
        console.log(`Not find ${config.navigation.left} selector`);
        return;
    }
    btnLeft.style = `cursor:pointer;position:absolute;top:calc(100% / 2 - (30px + ${
        wrapper.offsetHeight / 10 / 2
    }px));width:30px;height:60px;z-index:10;display:none;border:none;background-color:#fcfdf9;color:#2879f9;opacity:0.6;border-top-right-radius:6px;border-bottom-right-radius:6px;box-shadow:6px 0 4px rgba(0, 0, 0, 0.3);`;
    btnLeft.addEventListener('mouseenter', () => {
        btnLeft.style.opacity = '1';
        btnLeft.style.transitionDuration = '200ms';
        btnLeft.style.transform = 'scale(1.05)';
    });
    btnLeft.addEventListener('mouseleave', () => {
        btnLeft.style.opacity = '0.6';
        btnLeft.style.transitionDuration = '200ms';
        btnLeft.style.transform = 'scale(1)';
    });

    var btnRight = slider.querySelector(config.navigation.right);
    if (!btnRight) {
        console.log(`Not find ${config.navigation.right} selector`);
        return;
    }
    btnRight.style = `cursor:pointer;position:absolute;left:0;top:calc(100% / 2 - (30px + ${
        wrapper.offsetHeight / 10 / 2
    }px));left:calc(100% - 30px);width:30px;height:60px;z-index:10;display:none;border:none;background-color:#fcfdf9;color:#2879f9;opacity:0.6;border-top-left-radius:6px;border-bottom-left-radius:6px;box-shadow:-6px 0 4px rgba(0, 0, 0, 0.5);`;
    btnRight.addEventListener('mouseenter', () => {
        btnRight.style.opacity = '1';
        btnRight.style.transitionDuration = '200ms';
        btnRight.style.transform = 'scale(1.05)';
    });
    btnRight.addEventListener('mouseleave', () => {
        btnRight.style.opacity = '0.6';
        btnRight.style.transitionDuration = '200ms';
        btnRight.style.transform = 'scale(1)';
    });

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
        } else if (config.slidesPerView > 2) {
            index == currentIndex ? item.classList.add('active') : '';
            index == currentIndex + (config.slidesPerView - 1) ? item.classList.add('active') : '';
            if (item.classList.contains('active')) {
                item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;`;
            } else {
                item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;margin:0 ${config.spaceBetween}px`;
                if (config.slidesPerView == 4) {
                    index == currentIndex + 1
                        ? (item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;margin-left: ${config.spaceBetween}px`)
                        : (item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;margin:0 ${config.spaceBetween}px`);
                }
                if (config.slidesPerView == 5) {
                    if (index == currentIndex + 1) {
                        item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;margin-left: ${config.spaceBetween}px`;
                    } else if (index == currentIndex + 2) {
                        item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;margin-left: ${config.spaceBetween}px`;
                    } else item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;margin:0 ${config.spaceBetween}px`;
                }
            }
            wrapper.addEventListener('transitionstart', () => {
                item.classList.remove('active');
                index == currentIndex ? item.classList.add('active') : '';
                index == currentIndex + (config.slidesPerView - 1) ? item.classList.add('active') : '';
                if (item.classList.contains('active')) {
                    item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;`;
                } else {
                    if (index < currentIndex) {
                        item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%`;
                    } else {
                        item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;margin:0 ${config.spaceBetween}px`;
                        if (config.slidesPerView == 4) {
                            index == currentIndex + 1
                                ? (item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;margin-left: ${config.spaceBetween}px`)
                                : (item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;margin:0 ${config.spaceBetween}px`);
                        }
                        if (config.slidesPerView == 5) {
                            if (index == currentIndex + 1) {
                                item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;margin-left: ${config.spaceBetween}px`;
                            } else if (index == currentIndex + 2) {
                                item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;margin-left: ${config.spaceBetween}px`;
                            } else item.style = `display:flex;align-items:center;justify-content:center;background-color:#fff;min-width:calc((100% - (${config.spaceBetween * (config.slidesPerView - 1)}px)) / ${config.slidesPerView});height:100%;margin:0 ${config.spaceBetween}px`;
                        }
                    }
                }
            });
        }

        for (var img of item.children) {
            img.style = `display:block;max-width:100%;min-height:100%;object-fit:cover`;
            imgElementArr.push(img); // push vào mảng để lưu lại DOM Element của mỗi ảnh
            imgWidthArr.push(img.offsetWidth); // push vào mảng để lưu lại giá trị chiều rộng của mỗi ảnh
        }
    }); // slide

    // render pagination
    if (config.pagination.visible.display) {
        var paginationElement = slider.querySelector(`${config.pagination.element}`); // img-preview
        if (!paginationElement) {
            console.log(`Not find ${config.pagination.element} selector`);
            return;
        }
        paginationElement.style = `display:flex;justify-content:center;position:absolute;width:${config.width}px;margin-top:8px;`;
        const htmls = list
            .map((item, index) => {
                return config.pagination.clickable
                    ? `<div id="${index}" class="pagination-item ${index == 0 ? 'active' : ''}" ${
                          config.slidesPerView == 1
                              ? `onclick="handleScrollById(${index})"}></div>`
                              : index >= slideCount - config.slidesPerView // Trường hợp khác 1, kiểm tra nếu là ảnh cuối
                              ? `onclick="handleScrollById(${slideCount - config.slidesPerView}); handleChangeActive(${index})"}></div>`
                              : `onclick="handleScrollById(${index})"}></div>`
                      }</div>`
                    : `<div id="${index}" class="pagination-item ${index == 0 ? 'active' : ''}"></div>`;
                // Nếu có clickable thì có onclick không thì `` cả hai trường hợp đếu cần xử lý đổi active khi chuyển slide.
                // Với trường hợp có onclick thì cần chia ra khi slidesPerView == 1 handle(index), khi slidesPerView lớn hơn 1 &&  thì handle(slideCount-slidesPerView)
            })
            .join('');
        paginationElement.innerHTML = htmls;
        var paginationItem = [...paginationElement.children];
        paginationItem.forEach((it, index) => {
            if (config.pagination.visible.img) {
                it.style = `min-width:${wrapper.offsetHeight / 10}px;height:${wrapper.offsetHeight / 10}px;background-image:url('${imgElementArr[index].src}');background-repeat:no-repeat;background-size:100% 100%;border:${index == 0 ? '2px' : '1px'} solid ${
                    index == 0 ? '#2879f9' : 'black'
                };opacity:0.5;border-radius:1px;margin:0 4px;${config.pagination.clickable ? 'cursor:pointer;' : ''}`;
            } else {
                it.style = `width:16px;height:16px;background-color:#2879f9;border:1px solid black;opacity:0.5;border-radius:50%;margin:0 4px;${config.pagination.clickable ? 'cursor:pointer;' : ''}`;
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
            if (direction == 'next' && currentIndex < slideCount - config.slidesPerView) {
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
    if (config.autoplay.enable == false && config.draggable == false && config.zoomable.display && config.slidesPerView == 1 && config.zoomable.element) {
        var mirror = slider.querySelector(`${config.zoomable.element}`);
        if (!mirror) {
            console.log(`Not find ${config.zoomable.element} selector`);
        } else {
            slider.style.cursor = 'zoom-in';
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
    }

    handleChangeActive = function (index) {
        if (config.pagination.visible.display) {
            slider.querySelectorAll('.pagination-item').forEach((pi) => {
                pi.classList.remove('active');
                if (pi.id == index) pi.classList.add('active');
            });
            paginationItem.forEach((e) => {
                if (e.classList.contains('active')) {
                    e.style.opacity = `1`;
                    config.pagination.visible.img ? (e.style.border = `2px solid #2879f9`) : (e.style.border = `1px solid black`);
                } else {
                    e.style.opacity = `0.5`;
                    e.style.border = `1px solid black`;
                }
            });
        }
    };

    handleScrollById = function (index) {
        handleChangeActive(index);
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

        if (config.slidesPerView == 1 || config.slidesPerView == 2) {
            wrapper.style.transform = `translateX(${-1 * scrollTo - index * config.spaceBetween}px)`;
        } else if (config.slidesPerView > 2) {
            wrapper.style.transform = `translateX(${(-index * (wrapper.offsetWidth - config.spaceBetween * (config.slidesPerView - 1))) / config.slidesPerView}px)`;
        }
        wrapper.style.transitionDuration = '0.6s';

        index > 0 ? (btnLeft.style.display = 'block') : (btnLeft.style.display = 'none');
        index == slideCount - 1 ? (btnRight.style.display = 'none') : (btnRight.style.display = 'block');

        if (config.slidesPerView > 1) {
            currentIndex == slideCount - config.slidesPerView ? (btnRight.style.display = 'none') : (btnRight.style.display = 'block');
        }
    };

    var progress = slider.querySelector(`${config.autoplay.progress.element}`);
    if (!progress) {
        console.log(`Not find ${config.autoplay.progress.element} selector`);
    } else {
        if (config.autoplay.enable && config.slidesPerView < slideCount && config.autoplay.progress.display) {
            var progressValue = config.autoplay.delay;
            progress.style = `background:conic-gradient(#2879f9 ${(progressValue * 360) / config.autoplay.delay}deg,#cadcff 0deg);background-color: #2879f9; border-radius: 50%; width:${(wrapper.offsetWidth * 5) / 100}px; height:${(wrapper.offsetWidth * 5) / 100}px; position: relative; bottom: ${
                (wrapper.offsetWidth * 5) / 100
            }px; left: calc(${wrapper.offsetWidth}px - ${(wrapper.offsetWidth * 5) / 100}px);`;
            var value = document.createElement('div');
            value.style = `background-color: #fff; border-radius: 50%; width:${(wrapper.offsetWidth * 4) / 100}px; height:${(wrapper.offsetWidth * 4) / 100}px; position: absolute; top: calc(50% - ${(wrapper.offsetWidth * 4) / 100 / 2}px); left: calc(50% - ${(wrapper.offsetWidth * 4) / 100 / 2}px)`;
            progress.appendChild(value);
            var progressValueElement = document.createElement('div');
            progressValueElement.style = `text-align:center;line-height:${(wrapper.offsetWidth * 4) / 100}px;font-size:24px;font-weight:600;color:#2879f9;`;
            value.appendChild(progressValueElement);
            progressValueElement.innerText = progressValue;
            progressValueElement.textContent = `${progressValue}s`;
            progressId = setInterval(() => {
                progressValue -= 0.01;
                progressValueElement.textContent = `${parseInt(progressValue)}s`;
                progress.style.background = `conic-gradient(#2879f9 ${(progressValue * 360) / config.autoplay.delay}deg,#cadcff 0deg)`;

                progressValue == 1 ? (progressValue = config.autoplay.delay + 1) : '';
            }, 10);
            // Bắt sự kiện khi onScroll thì xóa interval
            const onScroll = () => {
                progressValue = config.autoplay.delay;
                progressValueElement.textContent = `${progressValue}s`;
                progress.style.background = `conic-gradient(#2879f9 ${(progressValue * 360) / config.autoplay.delay}deg,#cadcff 0deg)`;
                clearInterval(autoplayId);
                clearInterval(progressId);
            };

            const onScrollStop = () => {
                progressValueElement.textContent = `${progressValue}s`;
                progressId = setInterval(() => {
                    progressValue -= 0.01;
                    progressValueElement.textContent = `${parseInt(progressValue)}s`;
                    progress.style.background = `conic-gradient(#2879f9 ${(progressValue * 360) / config.autoplay.delay}deg,#cadcff 0deg)`;

                    progressValue == 1 ? (progressValue = config.autoplay.delay + 1) : '';
                }, 10);
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
