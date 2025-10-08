const burger = document.querySelector('.header__burger');
const dimmed = document.querySelector('.wrapper__dimmed');
const sidebar = document.querySelector('.sidebar__active');
burger.addEventListener('click', ()=>{
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        sidebar.classList.add('closed');
        dimmed.style.display = 'none';
    } else {
        sidebar.classList.remove('closed');
        sidebar.classList.add('open');
        dimmed.style.display = 'block';
    }
});
dimmed.addEventListener('click', ()=>{
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        dimmed.style.display = 'none';
    }
});

//# sourceMappingURL=Youtube-redesign.f0cb0847.js.map
