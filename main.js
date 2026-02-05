// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
const iconSunMobile = document.getElementById('icon-sun-mobile');
const iconMoonMobile = document.getElementById('icon-moon-mobile');
const menuToggleBtn = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const iconMenu = document.getElementById('icon-menu');
const iconClose = document.getElementById('icon-close');
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scroll-top');
const revealElements = document.querySelectorAll('.reveal');

// --- Theme Logic ---
function getInitialTheme() {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return true;
    }
    return false;
}

let isDark = getInitialTheme();

function updateThemeUI() {
    if (isDark) {
        document.documentElement.classList.add('dark');
        iconSun.classList.remove('hidden');
        iconMoon.classList.add('hidden');
        iconSunMobile.classList.remove('hidden');
        iconMoonMobile.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        iconSun.classList.add('hidden');
        iconMoon.classList.remove('hidden');
        iconSunMobile.classList.add('hidden');
        iconMoonMobile.classList.remove('hidden');
    }
}

function toggleTheme() {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeUI();
}

// Initialize Theme
updateThemeUI();
themeToggleBtn.addEventListener('click', toggleTheme);
themeToggleMobileBtn.addEventListener('click', toggleTheme);


// --- Mobile Menu Logic ---
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('translate-x-full');
        iconMenu.classList.add('hidden');
        iconClose.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
        mobileMenu.classList.add('translate-x-full');
        iconMenu.classList.remove('hidden');
        iconClose.classList.add('hidden');
        document.body.style.overflow = ''; // Unlock scroll
    }
}

menuToggleBtn.addEventListener('click', toggleMenu);

// Close menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});


// --- Header Scroll Logic ---
function handleScroll() {
    if (window.scrollY > 20) {
        header.classList.add('glass-nav', 'shadow-sm', 'py-3');
        header.classList.remove('py-5');
    } else {
        header.classList.remove('glass-nav', 'shadow-sm', 'py-3');
        header.classList.add('py-5');
    }
}
window.addEventListener('scroll', handleScroll);


// --- Reveal on Scroll Logic ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => observer.observe(el));


// --- Footer Year & Scroll Top ---
document.getElementById('year').textContent = new Date().getFullYear();

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// flip Image logic 
const card = document.getElementById("flipCard");
const inner = document.getElementById("flipInner");

card.addEventListener("click", () => {
    if (inner.style.transform === "rotateY(180deg)") {
        inner.style.transform = "rotateY(0deg)";
    } else {
        inner.style.transform = "rotateY(180deg)";
    }
});