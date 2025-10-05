import {videos} from './storage.json';

function playVideo(elem) {
    const video = elem.querySelector('.player');
    const img = elem.querySelector('.vids-result__img');
    
    img.style.opacity = '0';
    video.style.opacity = '1';
    video.play();
}

function stopVideo(elem) {
    const video = elem.querySelector('.player');
    const img = elem.querySelector('.vids-result__img');
   
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
    const singleChannel = document.querySelector('.single-channel');
  
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
  
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="result--notfound">Nothing was found:(</div>';
  } else {
    searchResults.innerHTML = results.map(video => `
      <div class="vids-result">
        <div class="vids-result__wrapper">
            <img class="vids-result__img" src="${video.image}" alt="${video.title}">
            <video class="player" muted loop preload="none">
                <source src="${video.url}" type="video/mp4">
            </video>
        </div>
        <h2 class="vids-result__h">${video.title}</h2>
        <div class="vids-result__descr">
            <div class="vids-result__descr__wrapper">
                <div class="vids-result__descr__owner"> ${video.owner}</div>
                <div class="vids-result__descr__views"> ${video.views} </div>
            </div>
            <div class="vids-result__descr__time"> ${video.time}</div>
        </div>
      </div>
    `).join('');;
  }
  
  if (document.querySelector('.feed')){
    feed.innerHTML = '';
    feed.appendChild(searchResults);
  } else if (document.querySelector('.single-channel')){
        singleChannel.innerHTML = '';
        singleChannel.appendChild(searchResults);
  }
  
    searchResults.addEventListener('mouseover', (e) => {
        const vidsResult = e.target.closest('.vids-result');
        if (vidsResult) {
            playVideo(vidsResult);
        }
    });

    searchResults.addEventListener('mouseout', (e) => {
        const vidsResult = e.target.closest('.vids-result');
        if (vidsResult) {
            stopVideo(vidsResult);
        }
    });
}

const searchBtn = document.querySelector('.search__btn');
const searchInput = document.querySelector('.search__input');
const search = document.querySelector('.header__search');

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
            search.style.border = 'none';
            const results = searchVideos(searchText);
            showResults(results);
        } else{
            search.style.border = '2px solid red';
        }
    }
})

