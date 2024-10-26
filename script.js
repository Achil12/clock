let clickSound = new Audio('click.mp3'); // Ganti 'click.mp3' dengan nama file audio yang Anda miliki.

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('time').textContent = timeString;

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const dayName = days[now.getDay()];
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const dateString = `${dayName}, ${day}.${month}.${year}`;
    document.getElementById('date').textContent = dateString;

    clickSound.play();
}

setInterval(updateClock, 1000);
updateClock();

const toggleButton = document.getElementById('toggleMode');
const fullscreenButton = document.getElementById('toggleFullscreen');
let isDarkMode = false;
let isFullscreen = false;

// Cek preferensi tema saat halaman dimuat
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
    toggleButton.textContent = 'Ubah ke Light Mode';
} else {
    toggleButton.textContent = 'Ubah ke Dark Mode';
}

toggleButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    toggleButton.textContent = isDarkMode ? 'Ubah ke Light Mode' : 'Ubah ke Dark Mode';
});

// Fungsi untuk toggle fullscreen
fullscreenButton.addEventListener('click', function() {
    if (!isFullscreen) {
        document.documentElement.requestFullscreen().then(() => {
            isFullscreen = true;
            fullscreenButton.textContent = 'Keluar dari Fullscreen'; // Update tombol
        }).catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => {
                isFullscreen = false;
                fullscreenButton.textContent = 'Masuk Fullscreen'; // Update tombol
            });
        }
    }
});

// Mencegah scroll
window.addEventListener('wheel', function(e) {
    e.preventDefault();
}, { passive: false });

window.addEventListener('scroll', function(e) {
    window.scrollTo(0, 0);
}, { passive: false });

document.addEventListener('keydown', function(e) {
    if (['ArrowUp', 'ArrowDown', 'Space'].includes(e.key)) {
        e.preventDefault();
    }
});
