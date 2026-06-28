const projects = [
  {
    title: "Modern Luxury Residence",
    category: "Completed",
    sector: "Residential",
    location: "Mission, TX",
    year: "2026",
    size: "4,200 sq ft",
    status: "Completed",
    description:
      "Custom residence featuring efficient construction, premium finishes, and storm-conscious detailing.",
    image: "projects/completed/modern-luxury-residence/photos/cover.svg",
    folder: "projects/completed/modern-luxury-residence/",
    url: "projects.html#modern-luxury-residence",
  },
  {
    title: "Retail Plaza Development",
    category: "Completed",
    sector: "Commercial",
    location: "McAllen, TX",
    year: "2026",
    size: "42,000 sq ft",
    status: "Completed",
    description:
      "Multi-tenant retail center with site work, utilities, parking, storefront systems, and tenant-ready spaces.",
    image: "projects/completed/retail-plaza-development/photos/cover.svg",
    folder: "projects/completed/retail-plaza-development/",
    url: "projects.html#retail-plaza-development",
  },
  {
    title: "Warehouse Expansion",
    category: "In Progress",
    sector: "Industrial",
    location: "Edinburg, TX",
    year: "2026",
    size: "85,000 sq ft",
    status: "In Progress",
    description:
      "Steel-framed industrial addition planned for loading, storage, office buildout, and utility upgrades.",
    image: "projects/in-progress/warehouse-expansion/photos/cover.svg",
    folder: "projects/in-progress/warehouse-expansion/",
    url: "projects.html#warehouse-expansion",
  },
  {
    title: "RGV Infrastructure Corridor",
    category: "Future",
    sector: "Infrastructure",
    location: "Rio Grande Valley, TX",
    year: "Future",
    size: "TBD",
    status: "Planning",
    description:
      "Future civil project placeholder ready for roadwork, drainage, access, and utility coordination assets.",
    image: "projects/future/rgv-infrastructure-corridor/photos/cover.svg",
    folder: "projects/future/rgv-infrastructure-corridor/",
    url: "projects.html#rgv-infrastructure-corridor",
  },
  {
    title: "Church Water Retention Pond",
    category: "Completed",
    sector: "Commercial",
    location: "Rio Grande Valley, TX",
    year: "2026",
    size: "TBD",
    status: "Completed",
    description: "Custom water retention pond built for local church.",
    image:
      "projects/completed/church-retention-pond/photos/church-retention-pond_construction.jpeg",
    folder: "projects/completed/church-retention-pond/",
    url: "projects.html#church-retention-pond",
  },
];

function esc(v) {
  return String(v || "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c],
  );
}

function projectId(p) {
  return p.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function projectMedia(p) {
  return (p.media && p.media.length ? p.media : [{ type: "image", src: p.image }]).map(
    (item, index) => ({
      type: item.type || "image",
      src: item.src || item.image || p.image,
      thumb: item.thumb || item.poster || item.src || item.image || p.image,
      poster: item.poster || item.thumb || p.image,
      alt: item.alt || `${p.title} media ${index + 1}`,
      caption: item.caption || p.title,
    }),
  );
}

function mediaMarkup(item, className = "") {
  if (item.type === "video") {
    return `<video class="${className}" src="${esc(item.src)}" poster="${esc(item.poster)}" controls preload="metadata" playsinline aria-label="${esc(item.alt)}"></video>`;
  }
  return `<img class="${className}" src="${esc(item.src)}" alt="${esc(item.alt)}">`;
}

function mediaPreviewMarkup(item, className = "") {
  return `
    <img class="${className}" src="${esc(item.thumb)}" alt="${esc(item.alt)}">
    ${item.type === "video" ? '<span class="play-icon main-play-icon">▶</span>' : ""}
  `;
}

function card(p) {
  const id = projectId(p);
  const media = projectMedia(p);
  const first = media[0];
  return `
    <article class="card project-card" id="${id}">
      <button class="project-media-main" type="button" data-project-id="${esc(id)}" data-media-index="0" aria-label="Open ${esc(p.title)} gallery">
        ${mediaPreviewMarkup(first, "project-main-media")}
        <span class="media-badge">View gallery</span>
      </button>
      <div class="project-thumbnails" aria-label="${esc(p.title)} gallery thumbnails">
        ${media
          .map(
            (item, index) => `
              <button class="project-thumbnail" type="button" data-project-id="${esc(id)}" data-media-index="${index}" aria-label="Open ${esc(item.alt)}">
                <img src="${esc(item.thumb)}" alt="">
                ${item.type === "video" ? '<span class="play-icon">▶</span>' : ""}
              </button>`,
          )
          .join("")}
      </div>
      <div class="card-body">
        <span class="tag">${esc(p.category)} • ${esc(p.sector)}</span>
        <h4>${esc(p.title)}</h4>
        <p>${esc(p.description)}</p>
        <div class="meta">
          <div><b>Location</b>${esc(p.location)}</div>
          <div><b>Year</b>${esc(p.year)}</div>
          <div><b>Size / Scope</b>${esc(p.size)}</div>
          <div><b>Status</b>${esc(p.status)}</div>
        </div>
      </div>
    </article>
  `;
}

function renderFeatured() {
  const el = document.querySelector("[data-featured-projects]");
  if (el) el.innerHTML = projects.slice(0, 3).map(card).join("");
}

function openGallery(projectIdValue, mediaIndexValue) {
  const project = projects.find((p) => projectId(p) === projectIdValue);
  if (!project) return;
  const media = projectMedia(project);
  let activeIndex = Number(mediaIndexValue) || 0;
  const modal = document.getElementById("galleryModal");
  const stage = document.getElementById("galleryStage");
  const title = document.getElementById("galleryTitle");
  const caption = document.getElementById("galleryCaption");
  const thumbs = document.getElementById("galleryThumbs");

  function drawMedia() {
    const item = media[activeIndex];
    stage.innerHTML = mediaMarkup(item, "gallery-media");
    title.textContent = project.title;
    caption.textContent = item.caption;
    thumbs.innerHTML = media
      .map(
        (thumb, index) => `
          <button class="gallery-thumb ${index === activeIndex ? "active" : ""}" type="button" data-gallery-index="${index}" aria-label="Show ${esc(thumb.alt)}">
            <img src="${esc(thumb.thumb)}" alt="">
            ${thumb.type === "video" ? '<span class="play-icon">▶</span>' : ""}
          </button>`,
      )
      .join("");
    thumbs.querySelectorAll("button").forEach((button) => {
      button.onclick = () => {
        activeIndex = Number(button.dataset.galleryIndex);
        drawMedia();
      };
    });
  }

  drawMedia();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeGallery() {
  const modal = document.getElementById("galleryModal");
  const stage = document.getElementById("galleryStage");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (stage) stage.innerHTML = "";
}

function initGallery() {
  if (!document.getElementById("galleryModal")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="gallery-modal" id="galleryModal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="galleryTitle">
        <div class="gallery-backdrop" data-close-gallery></div>
        <div class="gallery-window">
          <button class="gallery-close" type="button" data-close-gallery aria-label="Close gallery">×</button>
          <div class="gallery-stage" id="galleryStage"></div>
          <div class="gallery-info">
            <h3 id="galleryTitle"></h3>
            <p id="galleryCaption"></p>
            <div class="gallery-thumbs" id="galleryThumbs"></div>
          </div>
        </div>
      </div>`,
    );
  }
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-project-id][data-media-index]");
    if (trigger) openGallery(trigger.dataset.projectId, trigger.dataset.mediaIndex);
    if (event.target.closest("[data-close-gallery]")) closeGallery();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeGallery();
  });
}

function renderProjectPage() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  const filters = document.getElementById("filters");
  const search = document.getElementById("searchInput");
  const count = document.getElementById("resultsCount");
  let active = "All";
  const cats = ["All", ...new Set(projects.map((p) => p.category))];
  function drawFilters() {
    filters.innerHTML = cats
      .map(
        (c) =>
          `<button class="filter-btn ${c === active ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`,
      )
      .join("");
    filters.querySelectorAll("button").forEach(
      (b) =>
        (b.onclick = () => {
          active = b.dataset.cat;
          drawFilters();
          draw();
        }),
    );
  }
  function draw() {
    const term = (search.value || "").toLowerCase();
    const visible = projects.filter(
      (p) =>
        (active === "All" || p.category === active) &&
        Object.values(p).join(" ").toLowerCase().includes(term),
    );
    count.textContent = `${visible.length} project${visible.length === 1 ? "" : "s"} shown`;
    grid.innerHTML =
      visible.map(card).join("") ||
      '<div class="card"><div class="card-body"><h4>No matching projects</h4><p>Try another filter or search term.</p></div></div>';
  }
  search.addEventListener("input", draw);
  drawFilters();
  draw();
}

renderFeatured();
renderProjectPage();
initGallery();
