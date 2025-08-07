// tabs
const tabs = [
    { id: 1, name: 'Offers' },
    { id: 2, name: 'Burgers' },
    { id: 3, name: 'Fries' },
    { id: 4, name: 'Snacks' },
    { id: 5, name: 'Salads' },
    { id: 6, name: 'Cold drinks' },
    { id: 7, name: 'Happy Meal®' },
    { id: 8, name: 'Desserts' },
    { id: 9, name: 'Hot drinks' },
    { id: 10, name: 'Sauces' },
    { id: 11, name: 'Orbit®' }
];

const tabsContainer = document.getElementById("tabsContainer");

// Render tabs
tabsContainer.innerHTML = tabs.map((tab, index) => `
  <a href="#"
     data-id="${tab.id}"
     class="tab-btn text-white font-bold text-lg px-5 py-1 rounded-full ${index === 0 ? 'bg-[#03081F]' : ''}">
     ${tab.name}
  </a>
`).join("");

// Handle click
const tabButtons = document.querySelectorAll(".tab-btn");

tabButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        tabButtons.forEach(b => b.classList.remove("bg-[#03081F]")); // remove bg from all
        this.classList.add("bg-[#03081F]"); // add to clicked
    });
});

// reviews
const reviewsData = [
    {
        name: "St Glx",
        location: "South London",
        image: "./assets/reviews/customer.png",
        date: "24th September, 2023",
        rating: 5,
        comment:
            "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying."
    },
    {
        name: "St Glx",
        location: "South London",
        image: "./assets/reviews/customer.png",
        date: "24th September, 2023",
        rating: 5,
        comment:
            "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying."
    },
    {
        name: "St Glx",
        location: "South London",
        image: "./assets/reviews/customer.png",
        date: "24th September, 2023",
        rating: 5,
        comment:
            "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying."
    },
    {
        name: "St Glx",
        location: "South London",
        image: "./assets/reviews/customer.png",
        date: "24th September, 2023",
        rating: 5,
        comment:
            "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying."
    },
    {
        name: "St Glx",
        location: "South London",
        image: "./assets/reviews/customer.png",
        date: "24th September, 2023",
        rating: 5,
        comment:
            "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying."
    },
];
const container = document.getElementById("reviewsContainer");

const reviewsHTML = reviewsData.map((review) => {
    const starsHTML = Array.from({ length: review.rating })
        .map(() => `<img src="./assets/reviews/Star.png" alt="Star">`)
        .join("");

    return `
    <div class="swiper-slide bg-white px-6 py-8 rounded-sm">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="${review.image}" alt="customer">
          <img src="./assets/reviews/bar.png" alt="bar">
          <span>
            <h6 class="font-semibold">${review.name}</h6>
            <p class="text-[#FC8A06] text-xs sm:text-base">${review.location}</p>
          </span>
        </div>
        <div class="flex flex-col items-end justify-end gap-1">
          <div class="flex items-center gap-1">
            ${starsHTML}
          </div>
          <div class="flex items-center gap-3">
            <img src="./assets/reviews/Time Span.png" alt="time" class="w-6 h-auto hidden sm:inline-block">
            <span class="text-xs sm:text-base">${review.date}</span>
          </div>
        </div>
      </div>
      <p class="pt-8">${review.comment}</p>
    </div>
  `;
}).join("");

container.innerHTML = reviewsHTML;


new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: ".custom-swiper-next",
        prevEl: ".custom-swiper-prev"
    },
    breakpoints: {
        1024: { slidesPerView: 2 },
        1536: { slidesPerView: 3 }
    }
});

// similar restros
const restaurants = [
    { image: "./assets/restros/mac.png", alt: "mac" },
    { image: "./assets/restros/johns.png", alt: "johns" },
    { image: "./assets/restros/kfc.png", alt: "kfc" },
    { image: "./assets/restros/texas.png", alt: "texas" },
    { image: "./assets/restros/king.png", alt: "king" },
    { image: "./assets/restros/shaurma.png", alt: "shaurma" }
];

const restroContainer = document.getElementById("restroContainer");

restroContainer.innerHTML = restaurants
    .map(
        (restro) => `
    <div>
      <img src="${restro.image}" alt="${restro.alt}" class="cursor-pointer">
    </div>
  `
    )
    .join("");





