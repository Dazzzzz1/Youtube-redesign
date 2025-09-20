const slides = document.querySelector('.channel_review_content');
const slideItems = document.querySelectorAll('.channel_review_content_box');
const prevBtn = document.querySelector('#left');
const nextBtn = document.querySelector('#right');

let offset = 0;

function getSlideWidth() {
    const style = getComputedStyle(slides);
    const gap = parseInt(style.gap) || 0;
    return slideItems[0].offsetWidth + gap;
}

function getMaxOffset() {
    const visibleWidth = slides.parentElement.offsetWidth;
    const totalWidth = slides.scrollWidth;
    return Math.max(0, totalWidth - visibleWidth);
}

function updateSlider() {
    slides.style.transform = `translateX(-${offset}px)`;
}

nextBtn.addEventListener('click', () => {
    const slideWidth = getSlideWidth();
    const maxOffset = getMaxOffset();
    offset = Math.min(offset + slideWidth, maxOffset);
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    const slideWidth = getSlideWidth();
    offset = Math.max(offset - slideWidth, 0);
    updateSlider();
});

window.addEventListener('resize', () => {
    const maxOffset = getMaxOffset();
    if (offset > maxOffset) {
        offset = maxOffset;
        updateSlider();
    }
});