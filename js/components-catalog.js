document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname.toLowerCase();
  if (!path.endsWith("/subpages/components.html") && !path.endsWith("/subpages/componente.html")) return;

  const data = await loadCatalog();
  if (!data) return;

  if (path.endsWith("/subpages/components.html")) {
    initCatalogPage(data);
  } else {
    initProductPage(data);
  }
});

async function loadCatalog() {
  try {
    const res = await fetch("../data/componentes-catalogo.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Unable to load components catalog");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

function initCatalogPage(data) {
  const taxonomyGrid = document.getElementById("taxonomy-grid");
  const catalogGrid = document.getElementById("catalogo-grid");
  const summary = document.getElementById("filtro-resumen");
  if (!taxonomyGrid || !catalogGrid || !summary) return;

  buildTaxonomy(data.taxonomy, taxonomyGrid);
  setupFilterOptions(data);

  const applyBtn = document.getElementById("filtro-aplicar");
  const clearBtn = document.getElementById("filtro-limpiar");
  const searchInput = document.getElementById("filtro-q");

  const run = () => {
    const filtered = filterProducts(data.products, getFilters());
    renderProducts(filtered, data, catalogGrid);
    summary.textContent = `${filtered.length} result${filtered.length === 1 ? "" : "s"}`;
  };

  applyBtn?.addEventListener("click", run);
  clearBtn?.addEventListener("click", () => {
    clearFilters();
    run();
  });
  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") run();
  });

  document.getElementById("filtro-marca")?.addEventListener("change", () => {
    updateModelOptions(data);
    run();
  });
  ["filtro-modelo", "filtro-anio", "filtro-categoria", "filtro-precio"].forEach((id) => {
    document.getElementById(id)?.addEventListener("change", run);
  });
  searchInput?.addEventListener("input", () => {
    if ((searchInput.value || "").length === 0) run();
  });

  taxonomyGrid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-category-id]");
    if (!card) return;
    const categoryId = card.getAttribute("data-category-id") || "";
    const categorySelect = document.getElementById("filtro-categoria");
    if (categorySelect) categorySelect.value = categoryId;
    run();
  });

  run();
}

function setupFilterOptions(data) {
  const marcaEl = document.getElementById("filtro-marca");
  const modeloEl = document.getElementById("filtro-modelo");
  const anioEl = document.getElementById("filtro-anio");
  const catEl = document.getElementById("filtro-categoria");

  if (marcaEl) {
    data.vehicles.forEach((v) => {
      marcaEl.appendChild(new Option(v.marca, v.marca));
    });
  }
  if (catEl) {
    data.taxonomy.forEach((c) => {
      catEl.appendChild(new Option(c.nombre, c.id));
    });
  }
  if (anioEl) {
    const years = new Set();
    data.vehicles.forEach((v) => v.modelos.forEach((m) => m.anios.forEach((y) => years.add(y))));
    Array.from(years).sort((a, b) => b - a).forEach((y) => anioEl.appendChild(new Option(y, y)));
  }
  if (modeloEl) modeloEl.innerHTML = '<option value="">All</option>';
}

function updateModelOptions(data) {
  const marca = document.getElementById("filtro-marca")?.value || "";
  const modeloEl = document.getElementById("filtro-modelo");
  if (!modeloEl) return;
  modeloEl.innerHTML = '<option value="">All</option>';
  if (!marca) return;
  const vehicle = data.vehicles.find((v) => v.marca === marca);
  if (!vehicle) return;
  vehicle.modelos.forEach((m) => modeloEl.appendChild(new Option(m.nombre, m.nombre)));
}

function getFilters() {
  return {
    q: (document.getElementById("filtro-q")?.value || "").trim().toLowerCase(),
    marca: document.getElementById("filtro-marca")?.value || "",
    modelo: document.getElementById("filtro-modelo")?.value || "",
    anio: document.getElementById("filtro-anio")?.value || "",
    categoria: document.getElementById("filtro-categoria")?.value || "",
    precioMax: Number(document.getElementById("filtro-precio")?.value || 0),
  };
}

function clearFilters() {
  ["filtro-q", "filtro-marca", "filtro-modelo", "filtro-anio", "filtro-categoria", "filtro-precio"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

function filterProducts(products, filters) {
  return products.filter((p) => {
    const haystack = `${p.nombre} ${p.descripcionCorta} ${p.subgrupo}`.toLowerCase();
    const matchesQ = !filters.q || haystack.includes(filters.q);
    const matchesCat = !filters.categoria || p.categoriaId === filters.categoria;
    const matchesPrice = !filters.precioMax || p.precio <= filters.precioMax;
    const matchesVehicle = (!filters.marca && !filters.modelo && !filters.anio) || p.compatibilidades.some((c) => {
      const text = c.toLowerCase();
      const byMarca = !filters.marca || text.includes(filters.marca.toLowerCase());
      const byModelo = !filters.modelo || text.includes(filters.modelo.toLowerCase());
      const byAnio = !filters.anio || text.includes(filters.anio);
      return byMarca && byModelo && byAnio;
    });
    return matchesQ && matchesCat && matchesPrice && matchesVehicle;
  });
}

function renderProducts(products, data, mount) {
  mount.innerHTML = "";
  products.forEach((p) => {
    const category = data.taxonomy.find((t) => t.id === p.categoriaId);
    const card = document.createElement("article");
    card.className = "components-showcase-card";
    card.innerHTML = `
      <div class="components-card-top">
        <h3>${p.nombre}</h3>
        <a class="components-view-all" href="componente.html?id=${encodeURIComponent(p.id)}">View product</a>
      </div>
      <p class="components-card-kicker">${category ? category.nombre : "Component"}</p>
      <img src="${p.imagenes[0]}" alt="${p.nombre}" class="components-showcase-image" loading="lazy">
      <ul class="components-points">
        <li>SKU: ${p.sku}</li>
        <li>Subgroup: ${p.subgrupo}</li>
        <li>Compatibility entries: ${p.compatibilidades.length}</li>
      </ul>
      <p>${p.descripcionCorta}</p>
      <p class="components-price">${formatPrice(p.precio, p.moneda)}</p>
    `;
    mount.appendChild(card);
  });
}

function buildTaxonomy(taxonomy, mount) {
  mount.innerHTML = "";
  taxonomy.forEach((item) => {
    const el = document.createElement("article");
    el.className = "components-taxonomy-card";
    el.setAttribute("data-category-id", item.id);
    el.innerHTML = `
      <h3>${item.nombre}</h3>
      <p>${item.justificacion}</p>
      <p><strong>Subgroups:</strong> ${item.subgrupos.join(", ")}</p>
    `;
    mount.appendChild(el);
  });
}

function initProductPage(data) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const p = data.products.find((x) => x.id === id) || data.products[0];
  if (!p) return;

  const category = data.taxonomy.find((t) => t.id === p.categoriaId);
  setText("prod-breadcrumb-group", category?.nombre || "Components");
  setText("prod-title", p.nombre);
  setText("prod-subtitle", p.descripcionCorta);
  setText("prod-price", `${formatPrice(p.precio, p.moneda)} ${p.precioAnterior ? `<span class="old-price">${formatPrice(p.precioAnterior, p.moneda)}</span>` : ""}`);
  setText("prod-desc", p.descripcionLarga);
  setText("prod-stock", `In stock: ${p.stock} units`);
  setText("prod-category", category?.nombre || "");
  setText("prod-subgroup", p.subgrupo);

  fillList("prod-specs", Object.entries(p.especificaciones).map(([k, v]) => `<strong>${toLabel(k)}:</strong> ${v}`));
  fillList("prod-compat", p.compatibilidades);
  fillImages("prod-gallery", p.imagenes, p.nombre);
  setImage("prod-diagram", p.diagrama, `Technical diagram of ${p.nombre}`);
  fillLinks("prod-pdfs", p.pdfs);
  fillLinks("prod-videos", p.videos);
  fillReviews("prod-reviews", p.resenas);

  const related = data.products.filter((x) => p.relacionados.includes(x.id));
  const mount = document.getElementById("prod-related");
  if (mount) {
    mount.innerHTML = related.map((r) => `
      <article class="related-card">
        <h4>${r.nombre}</h4>
        <p>${r.descripcionCorta}</p>
        <a href="componente.html?id=${encodeURIComponent(r.id)}">View product</a>
      </article>
    `).join("");
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = value || "";
}

function fillList(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = items.map((i) => `<li>${i}</li>`).join("");
}

function fillImages(id, images, altBase) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = images.map((img, idx) => `<img loading="lazy" src="${img}" alt="${altBase} image ${idx + 1}">`).join("");
}

function setImage(id, src, alt) {
  const el = document.getElementById(id);
  if (!el) return;
  el.src = src;
  el.alt = alt;
}

function fillLinks(id, links) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!links || !links.length) {
    el.innerHTML = "<li>Not available</li>";
    return;
  }
  el.innerHTML = links.map((l) => `<li><a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.titulo}</a></li>`).join("");
}

function fillReviews(id, reviews) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!reviews || !reviews.length) {
    el.innerHTML = "<p>No reviews yet for this component.</p>";
    return;
  }
  el.innerHTML = reviews.map((r) => `
    <article class="review-item">
      <p><strong>${r.autor}</strong> · ${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</p>
      <p>${r.comentario}</p>
    </article>
  `).join("");
}

function formatPrice(value, currency) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: currency || "EUR" }).format(value || 0);
}

function toLabel(key) {
  const map = {
    material: "Material",
    dimensiones: "Dimensions",
    norma: "Standard",
    peso: "Weight",
    sensorDesgaste: "Wear Sensor",
    rosca: "Thread",
    voltaje: "Voltage",
    espesor: "Thickness",
  };
  return map[key] || key;
}
