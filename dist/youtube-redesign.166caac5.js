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
    nextBtn.addEventListener('click', ()=>{
        const slideWidth = getSlideWidth();
        const maxOffset = getMaxOffset();
        offset = Math.min(offset + slideWidth, maxOffset);
        updateSlider();
    });
    prevBtn.addEventListener('click', ()=>{
        const slideWidth = getSlideWidth();
        offset = Math.max(offset - slideWidth, 0);
        updateSlider();
    });
    window.addEventListener('resize', ()=>{
        const maxOffset = getMaxOffset();
        if (offset > maxOffset) {
            offset = maxOffset;
            updateSlider();
        }
    });
}
initSlider('.channel-review > .channel-review__wrapper', ' .video-card__wrapper', '#left', '#right');
initSlider('.recommended__wrapper', '.recommended__content', '#left2', '#right2');
initSlider('.rec-channel > .channel-review__wrapper', '.video-card__wrapper', '#left3', '#right3');
const vid_boxes = document.querySelectorAll(".video-card__wrapper");
const video_boxes = document.querySelectorAll('.recommended__content');
vid_boxes.forEach((box)=>{
    const video = box.querySelector('.video');
    box.addEventListener('mouseenter', ()=>{
        video.play();
    });
    box.addEventListener('mouseleave', ()=>{
        video.pause();
        video.currentTime = 0;
    });
});
video_boxes.forEach((box)=>{
    const video = box.querySelector('.recommended__video');
    box.addEventListener('mouseenter', ()=>{
        video.play();
    });
    box.addEventListener('mouseleave', ()=>{
        video.pause();
        video.currentTime = 0;
    });
}); // const burger = document.querySelector('.header_start_burger');
 // const sidenavBurger = document.querySelector('.side_nav_burger');
 // let body = document.body;
 // burger.addEventListener('click', () => {
 //     sidenavBurger.classList.toggle('active');  
 // });
 // document.addEventListener('click', (e) => {
 //     if ( 
 //         !e.target.closest('.header_start_burger') 
 //         &&
 //         !e.target.closest('.side_nav_burger')
 //      ){
 //         sidenavBurger.style.display = 'none';
 //     }
 // });

//# sourceMappingURL=Youtube-redesign.166caac5.js.map
