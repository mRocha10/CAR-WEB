document.addEventListener("DOMContentLoaded", async () => {
  const groupId = document.body.getAttribute("data-category-id") || "";
  const taxonomyTitle = document.getElementById("group-title");
  const taxonomyBreadcrumb = document.getElementById("group-title-breadcrumb");
  const taxonomyIntro = document.getElementById("group-intro");
  const subgroupList = document.getElementById("group-subgroups");
  const productsGrid = document.getElementById("group-products");

  if (!groupId || !taxonomyTitle || !taxonomyIntro || !subgroupList || !productsGrid) {
    return;
  }

  try {
    const res = await fetch("../../data/componentes-catalogo.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Unable to load components catalog");
    const data = await res.json();

    const group = data.taxonomy.find((item) => item.id === groupId);
    const products = data.products.filter((item) => item.categoriaId === groupId);

    if (!group) {
      taxonomyTitle.textContent = "Component Group";
      taxonomyIntro.textContent = "This component group is not available.";
      productsGrid.innerHTML = "<p>No products found for this group.</p>";
      return;
    }

    document.title = `${group.nombre} Components | Engine Starters`;
    setMeta("description", `${group.justificacion} Browse compatible products, specs, and technical references.`);
    setMeta("property", "og:title", `${group.nombre} Components | Engine Starters`);
    setMeta("property", "og:description", group.justificacion);
    setMeta("name", "twitter:title", `${group.nombre} Components | Engine Starters`);
    setMeta("name", "twitter:description", group.justificacion);

    taxonomyTitle.textContent = group.nombre;
    if (taxonomyBreadcrumb) taxonomyBreadcrumb.textContent = group.nombre;
    taxonomyIntro.textContent = group.justificacion;
    subgroupList.innerHTML = group.subgrupos.map((subgroup) => `<li>${escapeHtml(subgroup)}</li>`).join("");

    if (!products.length) {
      productsGrid.innerHTML = "<p>No products available in this group yet.</p>";
      return;
    }

    productsGrid.innerHTML = products.map((product) => `
      <article class="components-showcase-card">
        <div class="components-card-top">
          <h3>${escapeHtml(product.nombre)}</h3>
          <a class="components-view-all" href="../componente.html?id=${encodeURIComponent(product.id)}">View product</a>
        </div>
        <p class="components-card-kicker">${escapeHtml(product.subgrupo)}</p>
        <img src="${escapeAttribute(product.imagenes && product.imagenes[0] ? product.imagenes[0] : '../../images/types/sedan.webp')}" alt="${escapeAttribute(product.nombre)}" class="components-showcase-image" loading="lazy">
        <ul class="components-points">
          <li>SKU: ${escapeHtml(product.sku)}</li>
          <li>Stock: ${escapeHtml(String(product.stock))}</li>
          <li>Compatibility entries: ${product.compatibilidades ? product.compatibilidades.length : 0}</li>
        </ul>
        <p>${escapeHtml(product.descripcionCorta)}</p>
        <p class="components-price">${formatPrice(product.precio, product.moneda)}</p>
      </article>
    `).join("");
  } catch (error) {
    console.error(error);
    productsGrid.innerHTML = "<p>Error loading this components group.</p>";
  }
});

function formatPrice(value, currency) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency || "EUR"
  }).format(Number(value || 0));
}

function setMeta(kind, key, value) {
  let selector = kind === "property" ? `meta[property="${key}"]` : `meta[name="${key}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(kind, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return String(value || "").replace(/"/g, "&quot;");
}
