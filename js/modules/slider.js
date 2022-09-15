function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    let slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        slideCurrent = document.querySelector(currentCounter),
        slides = document.querySelectorAll(slide),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        currentSlideIndex = 1,
        offset = 0;
    
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        slideCurrent.textContent = `0${currentSlideIndex}`;
    } else {
        total.textContent = slides.length;
        slideCurrent.textContent = currentSlideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }


    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (currentSlideIndex == slides.length) {
            currentSlideIndex = 1;
        } else {
            currentSlideIndex++;
        }

        if (slides.length < 10) {
            slideCurrent.textContent = `0${currentSlideIndex}`;
        } else {
            slideCurrent.textContent = currentSlideIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[currentSlideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (currentSlideIndex == 1) {
            currentSlideIndex = slides.length;
        } else {
            currentSlideIndex--;
        }
        
        if (slides.length < 10) {
            slideCurrent.textContent = `0${currentSlideIndex}`;
        } else {
            slideCurrent.textContent = currentSlideIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[currentSlideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {

            const slideTo = e.target.getAttribute('data-slide-to');

            currentSlideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                slideCurrent.textContent = `0${currentSlideIndex}`;
            } else {
                slideCurrent.textContent = currentSlideIndex;
            }
            
            dots.forEach(dot => {
                dot.style.opacity = '.5';
            });
            dots[currentSlideIndex - 1].style.opacity = 1;

        });
    });
}

export default slider;