document.documentElement.classList.add("has-js");

const GOOGLE_FORM_URL = "https://forms.gle/uNusUQtoPZPjRyRaA";
const EVENT_DATE = new Date("2026-07-10T21:00:00+02:00");
const AUDIO_VOLUME = 0.35;

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.querySelector("#eventAudio");
  const startMusicButton = document.querySelector("[data-start-music]");
  const musicToggle = document.querySelector("#musicToggle");
  const musicIcon = document.querySelector("#musicIcon");
  const musicText = document.querySelector("#musicText");
  const toast = document.querySelector("#toast");
  const inviteSection = document.querySelector("#invitacion");
  let toastTimer;
  let audioAvailable = true;

  const showToast = (message) => {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 3200);
  };

  const setMusicState = (isPlaying) => {
    if (!musicToggle || !musicIcon || !musicText) return;
    musicToggle.hidden = false;
    musicIcon.textContent = isPlaying ? "Ⅱ" : "♪";
    const label = isPlaying ? "Pausar música" : "Reanudar música";
    musicText.textContent = label;
    musicToggle.setAttribute("aria-label", label);
  };

  const handleAudioUnavailable = () => {
    audioAvailable = false;
    if (musicToggle) musicToggle.hidden = true;
    showToast("Música no disponible");
  };

  const ensureAudioSource = async () => {
    if (!audio || !audioAvailable) return false;
    if (audio.currentSrc || audio.getAttribute("src")) return true;

    const source = audio.dataset.src;
    if (!source) return false;

    audio.src = source;
    audio.load();
    return true;
  };

  const playMusic = async ({ scrollAfter = false } = {}) => {
    if (!audio || !audioAvailable) {
      showToast("Música no disponible");
      if (scrollAfter) inviteSection?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    audio.volume = AUDIO_VOLUME;

    try {
      const hasSource = await ensureAudioSource();
      if (!hasSource) {
        handleAudioUnavailable();
        return;
      }

      await audio.play();
      setMusicState(true);
    } catch (error) {
      handleAudioUnavailable();
    } finally {
      if (scrollAfter) {
        window.setTimeout(() => inviteSection?.scrollIntoView({ behavior: "smooth" }), 360);
      }
    }
  };

  audio?.addEventListener("error", handleAudioUnavailable, { once: true });
  audio?.addEventListener("ended", () => setMusicState(false));

  startMusicButton?.addEventListener("click", () => {
    playMusic({ scrollAfter: true });
  });

  musicToggle?.addEventListener("click", () => {
    if (!audio || !audioAvailable) {
      showToast("Música no disponible");
      return;
    }

    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
      setMusicState(false);
    }
  });

  setupFormLinks(showToast);
  setupCountdown();
  setupRevealAnimations();
});

function setupFormLinks(showToast) {
  const buttons = document.querySelectorAll("[data-rsvp-form]");
  const formUrl = GOOGLE_FORM_URL.trim();

  buttons.forEach((button) => {
    if (formUrl) {
      button.href = formUrl;
      button.target = "_blank";
      button.rel = "noopener";
      return;
    }

    button.href = "#confirmar";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("Falta configurar el enlace de Google Forms en script.js");
    });
  });
}

function setupCountdown() {
  const countdown = document.querySelector("[data-countdown]");
  const endedMessage = document.querySelector("[data-countdown-ended]");
  if (!countdown) return;

  const fields = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
  };

  const twoDigits = (value) => String(value).padStart(2, "0");

  let timer;

  const render = () => {
    const distance = EVENT_DATE.getTime() - Date.now();

    if (distance <= 0) {
      countdown.hidden = true;
      if (endedMessage) endedMessage.hidden = false;
      if (timer) window.clearInterval(timer);
      return;
    }

    const totalSeconds = Math.floor(distance / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    fields.days.textContent = twoDigits(days);
    fields.hours.textContent = twoDigits(hours);
    fields.minutes.textContent = twoDigits(minutes);
    fields.seconds.textContent = twoDigits(seconds);
  };

  render();
  timer = window.setInterval(render, 1000);
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll("[data-reveal]");
  if (!elements.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  elements.forEach((element) => observer.observe(element));
}
