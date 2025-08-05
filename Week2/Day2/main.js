let button = document.getElementById("read");

button.addEventListener('click', () => {
    document.querySelectorAll('.single-box').forEach(e => {
        e.classList.remove('bg-[#f0f4fa]');
    });
    document.querySelectorAll('.dot').forEach(e => {
        e.classList.add('hidden');
    });
    document.getElementById('num').innerText = '0';
})
