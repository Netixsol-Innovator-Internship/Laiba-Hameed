document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const toggleBtn = document.getElementById("themeToggle");
    const toggleIcon = document.getElementById("toggleIcon");

    // Load saved theme or default to light
    let theme = localStorage.getItem("theme") || "light";
    html.className = theme;

    const updateIcon = () => {
        toggleIcon.textContent = theme === "dark" ? "🌞" : "🌙";
    };
    updateIcon();

    toggleBtn.addEventListener("click", () => {
        theme = theme === "light" ? "dark" : "light";
        html.className = theme;
        localStorage.setItem("theme", theme);
        updateIcon();
    });

    const updateReadButtonState = () => {
        const unreadCount = parseInt(document.getElementById('num').innerText);
        const readBtn = document.getElementById('read');

        if (unreadCount === 0) {
            readBtn.classList.add('cursor-not-allowed', 'opacity-50');
        } else {
            readBtn.classList.remove('pointer-events-none', 'opacity-50');
        }
    };

    // Mark all as read
    const button = document.getElementById("read");

    button.addEventListener("click", () => {
        document.querySelectorAll(".single-box.unseen").forEach(e => {
            e.classList.remove("bg-[#f0f4fa]", "dark:bg-gray-700", "unseen");
        });

        document.querySelectorAll(".dot").forEach(e => {
            e.classList.add("hidden");
            e.classList.remove("inline-block");
        });

        document.getElementById("num").innerText = "0";
        updateReadButtonState();
    });

    // Individual notification click
    document.querySelectorAll(".single-box.unseen").forEach(notification => {
        notification.addEventListener("click", () => {
            if (notification.classList.contains("unseen")) {
                notification.classList.remove("bg-[#f0f4fa]", "dark:bg-gray-700", "unseen");

                const dot = notification.querySelector(".dot");
                if (dot) {
                    dot.classList.remove("inline-block");
                    dot.classList.add("hidden");
                }

                let count = parseInt(document.getElementById("num").innerText);
                if (count > 0) {
                    document.getElementById("num").innerText = count - 1;
                    updateReadButtonState();
                }
            }
        });
    });

    updateReadButtonState(); // Initial check on load
});
