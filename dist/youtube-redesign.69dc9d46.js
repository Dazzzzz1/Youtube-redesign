(function() {
    const savedTheme = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'active') document.body.classList.add('darkMode');
    else if (!savedTheme && systemPrefersDark) {
        document.body.classList.add('darkMode');
        localStorage.setItem('darkMode', 'active');
    }
    document.addEventListener('DOMContentLoaded', function() {
        const themeToggler = document.querySelectorAll('.toggler');
        const enableDark = ()=>{
            document.body.classList.add('darkMode');
            localStorage.setItem('darkMode', 'active');
        };
        const disableDark = ()=>{
            document.body.classList.remove('darkMode');
            localStorage.setItem('darkMode', null);
        };
        if (themeToggler) themeToggler.forEach((toggler)=>{
            toggler.addEventListener('click', ()=>{
                const currentTheme = localStorage.getItem('darkMode');
                currentTheme !== 'active' ? enableDark() : disableDark();
            });
        });
    });
})();

//# sourceMappingURL=youtube-redesign.69dc9d46.js.map
