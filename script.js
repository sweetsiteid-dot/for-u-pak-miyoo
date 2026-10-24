/* =========================
   ELEMENTS
========================= */

const openBtn = document.getElementById("openBtn");
const opening = document.getElementById("opening");
const mainContent = document.getElementById("mainContent");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const memoryBtn = document.getElementById("memoryBtn");

const heartsContainer = document.querySelector(".hearts");

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");


/* =========================
   MUSIC SETTINGS
========================= */

if (music) {
    music.volume = 0.65;
}

function updateMusicButton() {
    if (!musicBtn || !music) return;

    musicBtn.textContent = music.paused
        ? "🎵 Play Music"
        : "⏸ Pause Music";
}

if (music) {
    music.addEventListener("play", updateMusicButton);
    music.addEventListener("pause", updateMusicButton);
}


/* =========================
   OPEN WEBSITE
========================= */

if (openBtn) {
    openBtn.addEventListener("click", async () => {

        /* Try to play background music */

        if (music) {
            try {
                await music.play();
            } catch (error) {
                console.log(
                    "Musik belum bisa diputar. Coba tekan tombol Play Music.",
                    error
                );
            }
        }

        /* GREY HEARTS AND STARS */

        const icons = ["🩶", "🤍", "✨", "⭐", "♡"];

        for (let i = 0; i < 65; i++) {

            const item = document.createElement("div");

            item.textContent =
                icons[Math.floor(Math.random() * icons.length)];

            item.classList.add("falling");

            item.style.left = Math.random() * 100 + "vw";

            item.style.fontSize =
                Math.random() * 18 + 16 + "px";

            item.style.animationDuration =
                Math.random() * 2 + 2 + "s";

            item.style.animationDelay =
                Math.random() * 1.5 + "s";

            document.body.appendChild(item);

            setTimeout(() => {
                item.remove();
            }, 6000);
        }

        /* OPENING TRANSITION */

        openBtn.disabled = true;

        opening.style.transition = "opacity 1s ease";
        opening.style.opacity = "0";

        setTimeout(() => {

            opening.style.display = "none";
            mainContent.style.display = "block";

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

            mainContent.style.animation = "fadeUp 1s ease";

        }, 1000);

    });
}


/* =========================
   MEMORY BUTTON
========================= */

if (memoryBtn) {
    memoryBtn.addEventListener("click", () => {

        const memories = document.getElementById("memories");

        if (memories) {
            memories.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });
}


/* =========================
   MUSIC BUTTON
========================= */

if (musicBtn && music) {

    musicBtn.addEventListener("click", async () => {

        if (music.paused) {

            try {
                await music.play();
            } catch (error) {
                console.log("Musik gagal diputar:", error);
            }

        } else {

            music.pause();

        }

        updateMusicButton();

    });

}


/* =========================
   PHOTO SLIDER
========================= */

let currentSlide = 0;
let sliderInterval;

function showSlide(index) {

    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });

}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function startSlider() {

    if (sliderInterval) {
        clearInterval(sliderInterval);
    }

    sliderInterval = setInterval(nextSlide, 3500);

}

/* Allow tapping dots to change photos */

dots.forEach((dot, index) => {

    dot.style.cursor = "pointer";

    dot.addEventListener("click", () => {
        showSlide(index);
        startSlider();
    });

});

/* Initialize slider */

showSlide(0);
startSlider();


/* =========================
   FLOATING HEARTS
========================= */

function createHeart() {

    if (!heartsContainer) return;

    const heart = document.createElement("div");

    const icons = ["🩶", "🤍", "♡"];

    heart.classList.add("heart");

    heart.textContent =
        icons[Math.floor(Math.random() * icons.length)];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
        Math.random() * 15 + 15 + "px";

    heart.style.animationDuration =
        Math.random() * 5 + 8 + "s";

    heart.style.opacity =
        Math.random() * 0.3 + 0.1;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 14000);

}

/* Create floating hearts periodically */

setInterval(createHeart, 900);


/* =========================
   INITIAL SETTINGS
========================= */

updateMusicButton();

/* Create a few hearts at the beginning */

for (let i = 0; i < 8; i++) {

    setTimeout(() => {
        createHeart();
    }, i * 300);

}
