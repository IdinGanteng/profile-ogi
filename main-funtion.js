// PARALLAX EFFECT HERO BG + SMALL PARALLAX
const heroBg = document.querySelector(".hero-bg");
const smallParallaxEls = document.querySelectorAll("[data-parallax-small]");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || window.pageYOffset;

  if (heroBg) {
    heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }

  smallParallaxEls.forEach((el) => {
    const speed = 0.15;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// REVEAL ON SCROLL
const observerOptions = {
  threshold: 0.4,
};

const revealCallback = (entries, observer) => {
  entries.forEach((entry) => {
    const el = entry.target;

    if (entry.isIntersecting) {
      el.classList.add("visible");
      // Kalau mau hanya sekali:
      // observer.unobserve(el);
    }
  });
};

const observer = new IntersectionObserver(revealCallback, observerOptions);

document
  .querySelectorAll(".fade-on-scroll, .slide-up-on-scroll, .world-item")
  .forEach((el) => {
    observer.observe(el);
  });

// SIMPLE NEWSLETTER SUBMIT (dummy, tanpa backend)
const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector("input[type='email']");
    const email = emailInput.value.trim();
    if (!email) return;
    alert(`Thanks! We'll notify ${email} about updates.`);
    newsletterForm.reset();
  });
}

// BACKSOUND AUDIO CONTROL
const bgMusic = document.getElementById("bgMusic");
const audioToggle = document.getElementById("audioToggle");

// state awal (kita anggap default: ingin suara ON)
let isMuted = false;

// FUNGSI: update teks tombol sesuai mute / unmute
function updateAudioButton() {
  if (!audioToggle) return;

  if (isMuted || bgMusic.muted || bgMusic.volume === 0) {
    audioToggle.textContent = "🔇 Mute";
    audioToggle.classList.add("is-paused");
  } else {
    audioToggle.textContent = "🔊 Music On";
    audioToggle.classList.remove("is-paused");
  }
}

// Coba autoplay SEGERA saat halaman load
if (bgMusic) {
  const startAutoPlay = async () => {
    try {
      // pastikan tidak mute di awal
      bgMusic.muted = false;
      bgMusic.volume = 1;

      await bgMusic.play(); // coba play langsung
      isMuted = false;
      updateAudioButton();
    } catch (err) {
      // Kalau autoplay diblokir, kita fallback:
      // - musik belum jalan
      // - tombol menunjukkan "klik untuk play"
      console.log("Autoplay audio diblokir browser:", err);
      isMuted = true;
      bgMusic.muted = true;
      updateAudioButton();
    }
  };

  window.addEventListener("load", () => {
    // tanpa delay besar, langsung coba play
    startAutoPlay();
  });
}

// Toggle MUTE / UNMUTE melalui tombol
if (audioToggle && bgMusic) {
  audioToggle.addEventListener("click", async () => {
    // kalau audio belum pernah diputar dan browser blokir autoplay,
    // klik pertama akan coba play
    if (bgMusic.paused) {
      try {
        bgMusic.muted = false;
        bgMusic.volume = 0.5;
        await bgMusic.play();
        isMuted = false;
        updateAudioButton();
        return;
      } catch (err) {
        console.log("Tidak bisa mulai audio:", err);
      }
    }

    // Jika sudah jalan, kita hanya mute/unmute
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    updateAudioButton();
  });
}

// Inisialisasi teks tombol saat awal (kalau butuh)
updateAudioButton();
