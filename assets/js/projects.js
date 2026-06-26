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
    description:
      "Custom water retention pond built for local church.",
    image: "projects/completed/church-retention-pond/photos/church-retention-pond_construction.jpeg",
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
function card(p) {
  const id = p.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `
    <article class="card project-card" id="${id}">
      <img src="${esc(p.image)}" alt="${esc(p.title)} project image">
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
      //  <p class="folder-note">
      //    <b>Asset folder:</b><br>
      //    ${esc(p.folder)}photos/<br>
      //    ${esc(p.folder)}videos/
      //  </p>
      </div>
    </article>
  `;
}
function renderFeatured() {
  const el = document.querySelector("[data-featured-projects]");
  if (el) el.innerHTML = projects.slice(0, 3).map(card).join("");
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
