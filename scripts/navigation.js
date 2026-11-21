const hamburger = document.querySelector('#menu');
const navMenu = document.querySelector('nav');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
}

