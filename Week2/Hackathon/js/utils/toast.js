export const showToast = (message, type = "info") => {
    const toast = document.createElement("div");

    const colors = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500",
        warning: "bg-yellow-500"
    };

    toast.className = `
        fixed bottom-5 right-5 px-4 py-3 text-white rounded shadow-lg z-50 opacity-90
        transition-all duration-300 ease-in-out
        ${colors[type] || colors.info}
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Fade out
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-10px)";
    }, 2500);

    // Remove from DOM
    setTimeout(() => {
        toast.remove();
    }, 3000);
};
