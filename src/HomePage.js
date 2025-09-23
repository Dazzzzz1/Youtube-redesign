function initSlider(contentSelector, itemSelector, leftBtnSelector, rightBtnSelector) {
    const slides = document.querySelector(contentSelector);
    const slideItems = slides.querySelectorAll(itemSelector);
    const prevBtn = document.querySelector(leftBtnSelector);
    const nextBtn = document.querySelector(rightBtnSelector);
    
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
}

initSlider('.channel_review > .channel_review_content', ' .channel_review_content_box', '#left', '#right');
initSlider('.recommended_content_boxes', '.recommended_content_box', '#left2', '#right2');
initSlider('.rec_channel > .channel_review_content', '.channel_review_content_box', '#left3', '#right3');

const vid_boxes = document.querySelectorAll(".channel_review_content_box")
const video_boxes = document.querySelectorAll('.recommended_content_box');


video_boxes.forEach(box  => {
   const video = box.querySelector('.recommended_content_video');

    box.addEventListener('mouseenter', () => {
        video.play()
    });
    box.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

vid_boxes.forEach(box  => {
   const video = box.querySelector('.channel_review_content_video');

    box.addEventListener('mouseenter', () => {
        video.play()
    });
    box.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});
