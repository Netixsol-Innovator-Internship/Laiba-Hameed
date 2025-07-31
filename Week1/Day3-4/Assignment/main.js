const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');

let menuOpen = false;

menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
        // Open menu
        mobileMenu.classList.remove('max-h-0', 'opacity-0', 'scale-y-95');
        mobileMenu.classList.add('max-h-60', 'opacity-100', 'scale-y-100');

        // Switch icons
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        // Close menu
        mobileMenu.classList.add('max-h-0', 'opacity-0', 'scale-y-95');
        mobileMenu.classList.remove('max-h-60', 'opacity-100', 'scale-y-100');

        // Switch icons
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target) && menuOpen) {
        menuOpen = false;
        mobileMenu.classList.add('max-h-0', 'opacity-0', 'scale-y-95');
        mobileMenu.classList.remove('max-h-60', 'opacity-100', 'scale-y-100');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
});

// ✅ Swiper for Testimonials with Navigation
const testimonialSwiper = new Swiper(".testimonialSwiper", {
    loop: true,
    speed: 1000,
    navigation: {
        nextEl: '.swiper-button-next-custom',
    },
    autoplay: {
        delay: 4000,
    },
});

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show when scrolled down
window.onscroll = function () {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove("hidden");
    } else {
        scrollToTopBtn.classList.add("hidden");
    }
};

// Scroll smoothly to top
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Theme toggle functionality
const darkToggle = document.getElementById('dark-toggle');
const lightToggle = document.getElementById('light-toggle');
// Dark mode toggle
darkToggle.addEventListener('click', () => {
    setDarkMode();
});
// Light mode toggle
lightToggle.addEventListener('click', () => {
    setLightMode();
});
