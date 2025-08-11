document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn")
    const menuIcon = document.getElementById("menu-icon")
    const mobileMenu = document.getElementById("mobile-menu")

    // Mobile menu functionality
    if (menuBtn && menuIcon && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            menuIcon.classList.toggle('rotate-90');
            const isOpen = mobileMenu.classList.toggle("menu-open")

            menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false")

            if (isOpen) {
                menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"></path>`
            } else {
                menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"></path>`
            }
        })
    }

})

// Select all nav links (both desktop and mobile)
const navLinks = document.querySelectorAll('.nav-link');

// Load active link from localStorage if exists
const savedActive = localStorage.getItem('activeNav');
if (savedActive) {
    setActive(savedActive);
} else {
    // default to Home if nothing saved
    setActive(navLinks[0].textContent.trim());
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const text = link.textContent.trim();
        setActive(text);
        localStorage.setItem('activeNav', text);
    });
});

function setActive(text) {
    navLinks.forEach(l => {
        if (l.textContent.trim() === text) {
            l.classList.add('active');
        } else {
            l.classList.remove('active');
        }
    });
}
