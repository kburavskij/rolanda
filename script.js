const galleryItems = [...document.querySelectorAll("[data-gallery-index]")];
const modal = document.querySelector("#gallery-modal");
const modalArt = document.querySelector("#modal-art");
const modalTitle = document.querySelector("#modal-title");
const modalCounter = document.querySelector("#modal-counter");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const languageTrigger = document.querySelector(".language-trigger");
const languageMenu = document.querySelector("#language-menu");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const exhibitionButton = document.querySelector("[data-show-exhibitions]");
const exhibitionMessage = document.querySelector(".exhibition-message");

let activeGalleryIndex = 0;
let lastFocusedElement = null;
let touchStartX = null;

const closeLanguageMenu = () => {
  if (!languageMenu || !languageTrigger) return;
  languageMenu.hidden = true;
  languageTrigger.setAttribute("aria-expanded", "false");
};

const closeMobileMenu = () => {
  if (!mobileNav || !menuToggle) return;
  mobileNav.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Atverti meniu");
};

const updateGalleryModal = (index) => {
  const item = galleryItems[index];
  if (!item || !modalArt || !modalTitle || !modalCounter) return;

  activeGalleryIndex = index;
  const artClass = [...item.classList].find((className) => className.startsWith("art-")) || "art-1";
  modalArt.className = `modal-art ${artClass}`;
  modalTitle.textContent = `Darbas ${index + 1}`;
  modalCounter.textContent = `${index + 1} / ${galleryItems.length}`;
};

const openGalleryModal = (index) => {
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  updateGalleryModal(index);
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close")?.focus();
};

const closeGalleryModal = () => {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus?.();
  lastFocusedElement = null;
};

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    openGalleryModal(Number(item.dataset.galleryIndex));
  });
});

modal?.querySelectorAll("[data-close-gallery]").forEach((element) => {
  element.addEventListener("click", closeGalleryModal);
});

modal?.querySelector("[data-gallery-prev]")?.addEventListener("click", () => {
  const nextIndex = (activeGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
  updateGalleryModal(nextIndex);
});

modal?.querySelector("[data-gallery-next]")?.addEventListener("click", () => {
  const nextIndex = (activeGalleryIndex + 1) % galleryItems.length;
  updateGalleryModal(nextIndex);
});

modal?.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0]?.clientX ?? null;
}, { passive: true });

modal?.addEventListener("touchend", (event) => {
  if (touchStartX === null) return;
  const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
  const delta = touchEndX - touchStartX;
  touchStartX = null;

  if (Math.abs(delta) < 45) return;
  const nextIndex = delta > 0
    ? (activeGalleryIndex - 1 + galleryItems.length) % galleryItems.length
    : (activeGalleryIndex + 1) % galleryItems.length;
  updateGalleryModal(nextIndex);
});

document.addEventListener("keydown", (event) => {
  if (modal && !modal.hidden) {
    if (event.key === "Escape") closeGalleryModal();
    if (event.key === "ArrowLeft") {
      updateGalleryModal((activeGalleryIndex - 1 + galleryItems.length) % galleryItems.length);
    }
    if (event.key === "ArrowRight") {
      updateGalleryModal((activeGalleryIndex + 1) % galleryItems.length);
    }
  }
});

menuToggle?.addEventListener("click", () => {
  const willOpen = mobileNav?.hidden ?? true;
  closeLanguageMenu();
  if (mobileNav) mobileNav.hidden = !willOpen;
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Uždaryti meniu" : "Atverti meniu");
});

document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

languageTrigger?.addEventListener("click", () => {
  const willOpen = languageMenu?.hidden ?? true;
  closeMobileMenu();
  if (languageMenu) languageMenu.hidden = !willOpen;
  languageTrigger.setAttribute("aria-expanded", String(willOpen));
});

document.querySelectorAll(".language-option").forEach((option) => {
  option.addEventListener("click", () => {
    const selectedLanguage = option.dataset.language || "LT";
    const code = document.querySelector(".language-code");
    if (code) code.textContent = selectedLanguage;
    document.querySelectorAll(".language-option").forEach((item) => {
      item.classList.toggle("is-selected", item === option);
    });
    if (languageTrigger) {
      languageTrigger.setAttribute("aria-label", `Kalbos pasirinkimas: ${selectedLanguage}`);
    }
    closeLanguageMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".language-picker")) closeLanguageMenu();
  if (!event.target.closest(".site-header") && mobileNav && !mobileNav.hidden) closeMobileMenu();
});

exhibitionButton?.addEventListener("click", () => {
  if (!exhibitionMessage) return;
  exhibitionMessage.hidden = !exhibitionMessage.hidden;
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (formStatus) {
    formStatus.textContent = "Ačiū. Tai yra statinė demonstracija, todėl žinutė neišsiųsta į serverį.";
  }
  form.reset();
});

const sections = [...document.querySelectorAll("main section[id]")];
const sectionLinks = [...document.querySelectorAll("[data-section-link]")];

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.sectionLink === entry.target.id);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

  sections.forEach((section) => sectionObserver.observe(section));
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // The page still works when service workers are unavailable.
    });
  });
}
