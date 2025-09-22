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

import {videos} from './storage.js';

function playVideo(elem) {
    const video = elem.querySelector('.player');
    const img = elem.querySelector('.vids_result_img');
    
    img.style.opacity = '0';
    video.style.opacity = '1';
    video.play();
    
}

function stopVideo(elem) {
    const video = elem.querySelector('.player');
    const img = elem.querySelector('.vids_result_img');
   
    video.pause();
    img.style.opacity = '1';
    video.style.opacity = '0';
}

function searchVideos(inputText) {
  if (!inputText.trim()) return [];
  
  const inputTextLower = inputText.toLowerCase();
  
  return videos.filter(video => {
    return (
      video.title.toLowerCase().includes(inputTextLower) ||
      video.description.toLowerCase().includes(inputTextLower) ||
      video.owner.toLowerCase().includes(inputTextLower)
    );
  });
}

function showResults(results) {
  const feed = document.querySelector('.feed');
  const searchResults = document.createElement('div');
  searchResults.className = 'search_results';
  
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="result_notF">Nothing was found:(</div>';
  } else {
    searchResults.innerHTML = results.map(video => `
      <div class="vids_result">
        <div class="vids_result_box">
            <img class="vids_result_img" src="${video.image}" alt="${video.title}">
            <video class="player" muted loop preload="none">
                <source src="${video.url}" type="video/mp4">
            </video>
        </div>
        <h2 class="vids_result_h">${video.title}</h2>
        <div class="vids_result_descr">
            <div class="vids_result_descr_box">
                <div class="vids_result_descr_owner"> ${video.owner}</div>
                <div class="vids_result_descr_views"> ${video.views} </div>
            </div>
            <div class="vids_result_descr_time"> ${video.time}</div>
        </div>
      </div>
    `).join('');;
  }
  
  feed.innerHTML = '';
  feed.appendChild(searchResults);

    searchResults.addEventListener('mouseover', (e) => {
        const vidsResult = e.target.closest('.vids_result');
        if (vidsResult) {
            playVideo(vidsResult);
        }
    });

    searchResults.addEventListener('mouseout', (e) => {
        const vidsResult = e.target.closest('.vids_result');
        if (vidsResult) {
            stopVideo(vidsResult);
        }
    });
}

const searchBtn = document.querySelector('.header_search_btn');
const searchInput = document.querySelector('.header_search_input')

searchBtn.addEventListener('click', () => {
    const searchText = searchInput.value;
  
    if (searchText.trim().length > 1) {
        const results = searchVideos(searchText);
        showResults(results);
    } 
});

searchInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
       const searchText = e.target.value;
        if (searchText.trim().length > 1){
            const results = searchVideos(searchText);
            showResults(results);
        }
    }
})

