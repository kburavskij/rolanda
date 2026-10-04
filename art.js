const artworkData = {
  "poros-palaiminimas": {
    title: "POROS PALAIMINIMAS",
    materials: "100 cm*100 cm drobė, aliejiniai dažai, aukso folija, kristalai (≈35 000 vnt), rėmas",
    related: ["Apie Šri Jantrą galite sužinoti"],
    status: "Paveikslas yra privačioje kolekcijoje.",
    palette: ["#d3bea4", "#a4b5b0", "#386578", "#d8c793"],
  },
  "himnas-meilei": {
    title: "HIMNAS MEILEI",
    materials: "100 cm*100 cm drobė, aliejiniai dažai, kristalai (≈20 000 vnt), rėmas",
    related: ["Apie Himnas Meilei galite sužinoti"],
    price: "Nuo 13 000 Eur*",
    palette: ["#a9b59e", "#d7c4a1", "#53766d", "#7e9a91"],
  },
  tyrumas: {
    title: "TYRUMAS",
    materials: "100 cm*100 cm drobė, aliejiniai dažai, kristalai (≈2 000 vnt), Himnas Meilei auksinis ženkliukas (Ø 3 cm), rėmas",
    related: ["Apie Šri Jantrą galite sužinoti", "Apie Himnas Meilei galite sužinoti"],
    price: "Nuo 13 000 Eur*",
    palette: ["#b7a489", "#e3d9bb", "#657e75", "#c5aa7b"],
  },
  "gyvenimo-dziaugsmo-energija": {
    title: "GYVENIMO DŽIAUGSMO ENERGIJA",
    materials: "100 cm*100 cm drobė, aliejiniai dažai, kristalai (≈ 900 vnt), Himnas Meilei auksinis ženkliukas (Ø 3 cm), rėmas",
    related: ["Apie Šri Jantrą galite sužinoti", "Apie Himnas Meilei galite sužinoti"],
    price: "Nuo 13 000 Eur*",
    palette: ["#718a6d", "#d5c6a8", "#4b6b5c", "#baa06d"],
  },
  "vyriskos-energijos-aktyvavimas": {
    title: "VYRIŠKOS ENERGIJOS AKTYVAVIMAS",
    materials: "100 cm*100 cm drobė, aliejiniai dažai, kristalai (≈7 000 vnt), Himnas Meilei auksinis ženkliukas (Ø 3 cm), rėmas",
    related: ["Apie Šri Jantrą galite sužinoti", "Apie Himnas Meilei galite sužinoti"],
    status: "Paveikslas yra privačioje kolekcijoje.",
    palette: ["#d6c8aa", "#8d9e8c", "#4e6d62", "#c7a96f"],
  },
  "dieviskoji-moteriska-energija": {
    title: "DIEVIŠKOJI MOTERIŠKA ENERGIJA",
    materials: "150 cm*150 cm drobė, aliejiniai dažai, kristalai (≈15 000 vnt), rėmas",
    related: ["Apie Šri Jantrą galite sužinoti"],
    status: "Paveikslas yra privačioje kolekcijoje.",
    palette: ["#8ea18c", "#d5bba0", "#6c7e68", "#e1d1b7"],
  },
  "gausa-per-vyriska-energija": {
    title: "GAUSA PER VYRIŠKĄ ENERGIJĄ",
    materials: "150 cm*150 cm drobė, aliejiniai dažai, kristalai (≈9 000 vnt), rėmas",
    related: [],
    price: "Nuo 13 000 Eur*",
    palette: ["#c5ad92", "#7b8e78", "#b28d67", "#d9c7a8"],
  },
  "pinigai-dieviskame-sraute": {
    title: "PINIGAI DIEVIŠKAME SRAUTE",
    materials: "100 cm*100 cm drobė, aliejiniai dažai, kristalai (≈8 000 vnt), rėmas",
    related: ["Apie Šri Jantrą galite sužinoti"],
    price: "Nuo 13 000 Eur*",
    palette: ["#a6aa8e", "#d6c39e", "#527268", "#bb9c6f"],
  },
  "moteriskos-energijos-aktyvavimas": {
    title: "MOTERIŠKOS ENERGIJOS AKTYVAVIMAS",
    materials: "100 cm*100 cm drobė, aliejiniai dažai, kristalai (≈5 000 vnt), Himnas Meilei auksinis ženkliukas (Ø 3 cm), rėmas",
    related: ["Apie Šri Jantrą galite sužinoti", "Apie Himnas Meilei galite sužinoti"],
    status: "Paveikslas yra privačioje kolekcijoje.",
    palette: ["#cbbda6", "#a9b7a0", "#536f65", "#d8c7a8"],
  },
};

const galleryLabels = ["Kūrinys", "Detalė", "Tekstūra", "Kompozicija", "Kūrinys aplinkoje"];
const params = new URLSearchParams(window.location.search);
const requestedPiece = params.get("piece");
const piece = artworkData[requestedPiece] || artworkData["poros-palaiminimas"];
const pieceSlug = requestedPiece && artworkData[requestedPiece] ? requestedPiece : "poros-palaiminimas";

const detailSection = document.querySelector(".art-detail-section");
const detailInner = document.querySelector("[data-artwork-page]");
const title = document.querySelector("#art-title");
const materials = document.querySelector("#art-materials");
const related = document.querySelector("#art-related");
const status = document.querySelector("#art-status");
const priceBlock = document.querySelector("#art-price-block");
const price = document.querySelector("#art-price");
const priceNote = document.querySelector("#art-price-note");
const contact = document.querySelector("#art-contact");
const mainImage = document.querySelector("#art-main-image");
const mainLabel = document.querySelector("#art-main-label");
const thumbnails = document.querySelector("#art-thumbnails");
const count = document.querySelector("#art-gallery-count");
const previousButton = document.querySelector("#art-gallery-prev");
const nextButton = document.querySelector("#art-gallery-next");

let activeView = 0;
let touchStartX = null;

const setPalette = (element) => {
  if (!element) return;
  element.style.setProperty("--piece-base", piece.palette[0]);
  element.style.setProperty("--piece-light", piece.palette[1]);
  element.style.setProperty("--piece-dark", piece.palette[2]);
  element.style.setProperty("--piece-accent", piece.palette[3]);
  element.dataset.piece = pieceSlug;
};

const setVisible = (element, visible) => {
  if (element) element.hidden = !visible;
};

const setView = (index) => {
  activeView = (index + galleryLabels.length) % galleryLabels.length;
  if (mainImage) {
    mainImage.dataset.view = String(activeView);
    mainImage.setAttribute("aria-label", `${piece.title}, ${galleryLabels[activeView]}`);
  }
  if (mainLabel) mainLabel.textContent = `image placeholder · ${activeView + 1} / ${galleryLabels.length}`;
  if (count) count.textContent = `${activeView + 1} / ${galleryLabels.length}`;
  thumbnails?.querySelectorAll(".art-thumbnail").forEach((button, index) => {
    const selected = index === activeView;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
};

const moveView = (step) => setView(activeView + step);

if (detailSection) detailSection.dataset.piece = pieceSlug;
if (detailInner) detailInner.dataset.piece = pieceSlug;
if (title) title.textContent = piece.title;
if (materials) materials.textContent = piece.materials;
if (status) {
  status.textContent = piece.status || "";
  setVisible(status, Boolean(piece.status));
}
if (price) price.textContent = piece.price || "";
setVisible(priceBlock, Boolean(piece.price));
setVisible(priceNote, Boolean(piece.price));
setVisible(contact, Boolean(piece.price));
document.title = `${piece.title} | Rolanda Aleknaite`;

if (related) {
  piece.related.forEach((text, index) => {
    const line = document.createElement("p");
    line.className = "art-related-line";
    line.append(document.createTextNode(`${text} `));

    const link = document.createElement("a");
    link.className = "art-inline-link";
    link.href = "./#apie";
    link.textContent = "čia.";
    link.setAttribute("aria-label", `${text} čia`);
    line.append(link);
    related.append(line);

    if (index < piece.related.length - 1) line.classList.add("art-related-line-spaced");
  });
}

setPalette(mainImage);

galleryLabels.forEach((label, index) => {
  const button = document.createElement("button");
  button.className = "art-thumbnail";
  button.type = "button";
  button.setAttribute("aria-label", `${piece.title}, ${label}`);
  button.setAttribute("aria-pressed", "false");

  const image = document.createElement("span");
  image.className = "piece-image art-thumbnail-image";
  image.dataset.view = String(index);
  image.setAttribute("aria-hidden", "true");
  setPalette(image);

  const labelElement = document.createElement("span");
  labelElement.className = "piece-thumbnail-label";
  labelElement.textContent = "image placeholder";
  image.append(labelElement);
  button.append(image);
  button.addEventListener("click", () => setView(index));
  thumbnails?.append(button);
});

previousButton?.addEventListener("click", () => moveView(-1));
nextButton?.addEventListener("click", () => moveView(1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") moveView(-1);
  if (event.key === "ArrowRight") moveView(1);
});

const galleryMain = document.querySelector(".art-gallery-main");
galleryMain?.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0]?.clientX ?? null;
}, { passive: true });

galleryMain?.addEventListener("touchend", (event) => {
  if (touchStartX === null) return;
  const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
  const delta = touchEndX - touchStartX;
  touchStartX = null;
  if (Math.abs(delta) < 45) return;
  moveView(delta > 0 ? -1 : 1);
});

setView(0);
