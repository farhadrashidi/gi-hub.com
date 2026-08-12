import {
  filterMarketplaceProducts,
  getProductBySlug,
  getSupplierBySlug,
  marketplaceCategories,
  marketplaceIncoterms,
  marketplaceProducts,
  marketplaceSuppliers,
} from "./marketplace-data.js";

const elements = {
  search: document.querySelector("[data-marketplace-search]"),
  category: document.querySelector("[data-marketplace-category]"),
  supplier: document.querySelector("[data-marketplace-supplier]"),
  incoterm: document.querySelector("[data-marketplace-incoterm]"),
  verified: document.querySelector("[data-marketplace-verified]"),
  favoritesOnly: document.querySelector("[data-marketplace-favorites]"),
  clear: document.querySelector("[data-marketplace-clear]"),
  results: document.querySelector("[data-marketplace-results]"),
  count: document.querySelector("[data-marketplace-count]"),
  favoriteCount: document.querySelector("[data-marketplace-favorite-count]"),
  empty: document.querySelector("[data-marketplace-empty]"),
  pagination: document.querySelector("[data-marketplace-pagination]"),
  detail: document.querySelector("[data-marketplace-detail]"),
  form: document.querySelector("[data-marketplace-form]"),
  formStatus: document.querySelector("[data-marketplace-form-status]"),
};

const PAGE_SIZE = 6;
const FAVORITES_KEY = "gi-hub-marketplace-favorites";
const originalTitle = document.title;
let currentPage = 1;
let favorites = loadFavorites();

function loadFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    return new Set(stored.filter((slug) => getProductBySlug(slug)));
  } catch {
    return new Set();
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
  } catch {
    // The catalog remains usable when storage is unavailable or blocked.
  }
}

function createElement(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function appendOptions(select, items, getValue, getLabel = getValue) {
  items.forEach((item) => {
    const option = createElement("option", "", getLabel(item));
    option.value = getValue(item);
    select.append(option);
  });
}

function marketplaceUrl(type, slug) {
  const url = new URL(window.location.href);
  url.searchParams.delete("product");
  url.searchParams.delete("supplier");
  url.searchParams.set(type, slug);
  url.hash = "b2b-marketplace";
  return `${url.pathname}${url.search}${url.hash}`;
}

function verificationBadge(supplier) {
  const verified = supplier.verification === "verified";
  const badge = createElement("span", `inline-flex rounded-full px-3 py-1 text-xs font-black ${verified ? "bg-green-950 text-green-200 ring-1 ring-green-500/50" : "bg-amber-950 text-amber-200 ring-1 ring-amber-500/50"}`);
  badge.textContent = verified ? "✓ Verified supplier" : "Verification pending";
  if (verified && supplier.verifiedAt) badge.title = `Profile reviewed ${supplier.verifiedAt}`;
  return badge;
}

function createProductCard(product) {
  const supplier = getSupplierBySlug(product.supplier);
  const card = createElement("article", "flex flex-col rounded border border-white/20 bg-gray-800 p-5 shadow-sm");
  const top = createElement("div", "flex items-start justify-between gap-3");
  const category = createElement("p", "text-xs font-black uppercase tracking-[0.15em] text-red-300", product.category);
  const favorite = createElement("button", "shrink-0 rounded p-2 text-xl leading-none text-red-200 hover:bg-white/10 focus:outline-2 focus:outline-offset-2 focus:outline-white");
  const isFavorite = favorites.has(product.slug);
  favorite.type = "button";
  favorite.textContent = isFavorite ? "♥" : "♡";
  favorite.setAttribute("aria-label", `${isFavorite ? "Remove" : "Add"} ${product.name} ${isFavorite ? "from" : "to"} favorites`);
  favorite.setAttribute("aria-pressed", String(isFavorite));
  favorite.addEventListener("click", () => toggleFavorite(product.slug));
  top.append(category, favorite);

  const title = createElement("h4", "mt-2 text-xl font-black text-white");
  const productLink = createElement("a", "hover:text-red-200 hover:underline", product.name);
  productLink.href = marketplaceUrl("product", product.slug);
  productLink.addEventListener("click", handleDetailLink);
  title.append(productLink);

  const supplierLine = createElement("p", "mt-3 text-sm text-gray-300", "Supplied by ");
  const supplierLink = createElement("a", "font-black text-white underline decoration-dotted hover:text-red-200", supplier.company);
  supplierLink.href = marketplaceUrl("supplier", supplier.slug);
  supplierLink.addEventListener("click", handleDetailLink);
  supplierLine.append(supplierLink);

  const facts = createElement("dl", "mt-4 grid grid-cols-2 gap-3 border-y border-white/10 py-4 text-sm");
  [["HS Code", product.hsCode], ["MOQ", `${product.moq.toLocaleString()} ${product.moqUnit}`], ["Origin", product.origin], ["Incoterms", product.incoterms.join(", ")]].forEach(([term, value]) => {
    const group = createElement("div");
    group.append(createElement("dt", "text-gray-400", term), createElement("dd", "mt-1 font-bold text-white", value));
    facts.append(group);
  });
  const description = createElement("p", "mt-4 grow text-sm text-gray-300", product.description);
  const footer = createElement("div", "mt-5 flex items-center justify-between gap-3");
  footer.append(verificationBadge(supplier));
  const view = createElement("a", "text-sm font-black text-red-300 hover:text-white hover:underline", "View product →");
  view.href = marketplaceUrl("product", product.slug);
  view.addEventListener("click", handleDetailLink);
  footer.append(view);
  card.append(top, title, supplierLine, facts, description, footer);
  return card;
}

function toggleFavorite(slug) {
  favorites.has(slug) ? favorites.delete(slug) : favorites.add(slug);
  saveFavorites();
  renderProducts();
  renderRoute();
}

function getFilteredProducts() {
  let products = filterMarketplaceProducts(marketplaceProducts, {
    query: elements.search.value,
    category: elements.category.value,
    supplier: elements.supplier.value,
    incoterm: elements.incoterm.value,
    verified: elements.verified.checked,
  });
  if (elements.favoritesOnly.checked) products = products.filter(({ slug }) => favorites.has(slug));
  return products;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  currentPage = Math.min(currentPage, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  elements.results.replaceChildren(...filtered.slice(start, start + PAGE_SIZE).map(createProductCard));
  elements.count.textContent = `${filtered.length} ${filtered.length === 1 ? "product" : "products"} found${filtered.length ? ` · showing ${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)}` : ""}`;
  elements.favoriteCount.textContent = `${favorites.size} saved ${favorites.size === 1 ? "favorite" : "favorites"}`;
  elements.empty.classList.toggle("hidden", filtered.length !== 0);
  renderPagination(pageCount);
}

function renderPagination(pageCount) {
  elements.pagination.replaceChildren();
  if (pageCount <= 1) return;
  for (let page = 1; page <= pageCount; page += 1) {
    const button = createElement("button", `min-w-10 rounded px-3 py-2 text-sm font-black ${page === currentPage ? "bg-red-700 text-white" : "bg-white text-gray-900 hover:bg-red-100"}`, String(page));
    button.type = "button";
    button.setAttribute("aria-label", `Go to marketplace page ${page}`);
    if (page === currentPage) button.setAttribute("aria-current", "page");
    button.addEventListener("click", () => {
      currentPage = page;
      renderProducts();
      elements.count.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    elements.pagination.append(button);
  }
}

function detailShell(label, title) {
  const shell = createElement("article", "rounded border border-red-400/40 bg-gray-800 p-5 shadow-xl sm:p-7");
  const close = createElement("a", "float-right rounded px-3 py-2 text-sm font-black text-red-200 hover:bg-white/10 hover:text-white", "Close ×");
  close.href = `${window.location.pathname}#b2b-marketplace`;
  close.addEventListener("click", handleDetailLink);
  shell.append(close, createElement("p", "text-sm font-black uppercase tracking-[0.18em] text-red-300", label), createElement("h3", "mt-2 pr-20 text-3xl font-black text-white", title));
  return shell;
}

function renderProductDetail(product) {
  const supplier = getSupplierBySlug(product.supplier);
  const shell = detailShell("Product", product.name);
  shell.append(createElement("p", "mt-4 max-w-3xl text-gray-200", product.description));
  const facts = createElement("dl", "mt-6 grid gap-4 rounded bg-gray-900 p-5 sm:grid-cols-2 lg:grid-cols-4");
  [["HS Code", product.hsCode], ["Minimum order", `${product.moq.toLocaleString()} ${product.moqUnit}`], ["Incoterms", product.incoterms.join(", ")], ["Country of origin", product.origin]].forEach(([term, value]) => {
    const group = createElement("div");
    group.append(createElement("dt", "text-sm text-gray-400", term), createElement("dd", "mt-1 font-black text-white", value));
    facts.append(group);
  });
  const supplierRow = createElement("div", "mt-6 flex flex-wrap items-center gap-4");
  const supplierLink = createElement("a", "font-black text-red-200 underline hover:text-white", supplier.company);
  supplierLink.href = marketplaceUrl("supplier", supplier.slug);
  supplierLink.addEventListener("click", handleDetailLink);
  supplierRow.append(createElement("span", "text-gray-300", "Supplier:"), supplierLink, verificationBadge(supplier));
  const actions = createElement("div", "mt-6 flex flex-wrap gap-3");
  const favorite = createElement("button", "rounded border border-red-300 px-5 py-3 font-black text-white hover:bg-white/10", favorites.has(product.slug) ? "♥ Remove favorite" : "♡ Save favorite");
  favorite.type = "button";
  favorite.addEventListener("click", () => toggleFavorite(product.slug));
  const inquire = createElement("a", "rounded bg-red-700 px-5 py-3 font-black text-white hover:bg-red-800", "Inquire about this product");
  inquire.href = "#marketplace-request";
  actions.append(favorite, inquire);
  shell.append(facts, supplierRow, actions);
  return shell;
}

function renderSupplierDetail(supplier) {
  const shell = detailShell("Supplier profile", supplier.company);
  const headingRow = createElement("div", "mt-4 flex flex-wrap items-center gap-3");
  headingRow.append(verificationBadge(supplier), createElement("span", "text-sm text-gray-300", supplier.location));
  shell.append(headingRow, createElement("p", "mt-5 max-w-3xl text-gray-200", supplier.description));
  const facts = createElement("dl", "mt-6 grid gap-4 rounded bg-gray-900 p-5 sm:grid-cols-3");
  [["Sector", supplier.sector], ["Export markets", supplier.markets.join(", ")], ["Review date", supplier.verifiedAt || "Pending review"]].forEach(([term, value]) => {
    const group = createElement("div");
    group.append(createElement("dt", "text-sm text-gray-400", term), createElement("dd", "mt-1 font-black text-white", value));
    facts.append(group);
  });
  const products = marketplaceProducts.filter(({ supplier: slug }) => slug === supplier.slug);
  shell.append(facts, createElement("h4", "mt-7 text-xl font-black text-white", `Products and services (${products.length})`));
  const links = createElement("ul", "mt-3 grid gap-2 sm:grid-cols-2");
  products.forEach((product) => {
    const link = createElement("a", "block rounded border border-white/20 p-3 font-bold text-red-200 hover:bg-white/10 hover:text-white", product.name);
    link.href = marketplaceUrl("product", product.slug);
    link.addEventListener("click", handleDetailLink);
    const item = createElement("li");
    item.append(link);
    links.append(item);
  });
  shell.append(links);
  return shell;
}

function updateSeo(item, type) {
  document.title = item ? `${item.name || item.company} | GI-Hub Marketplace` : originalTitle;
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = item
      ? `${item.description} ${type === "product" ? `HS Code ${item.hsCode}.` : `Based in ${item.location}.`}`
      : "Explore GI-Hub B2B marketplace products and supplier capabilities across Georgia and the Caucasus, including HS Codes, MOQ and Incoterms.";
  }
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = item ? new URL(marketplaceUrl(type, item.slug), window.location.origin).href.replace(/#.*$/, "") : `${window.location.origin}${window.location.pathname}`;
  document.querySelector("[data-marketplace-schema]")?.remove();
  if (!item) return;
  const schema = document.createElement("script");
  schema.type = "application/ld+json";
  schema.dataset.marketplaceSchema = "";
  schema.textContent = JSON.stringify(type === "product" ? {
    "@context": "https://schema.org", "@type": "Product", name: item.name, description: item.description, sku: item.hsCode, countryOfOrigin: item.origin, url: canonical.href,
    brand: { "@type": "Organization", name: getSupplierBySlug(item.supplier).company },
  } : { "@context": "https://schema.org", "@type": "Organization", name: item.company, description: item.description, address: item.location, url: canonical.href });
  document.head.append(schema);
}

function renderRoute() {
  const params = new URLSearchParams(window.location.search);
  const product = getProductBySlug(params.get("product"));
  const supplier = getSupplierBySlug(params.get("supplier"));
  elements.detail.replaceChildren();
  if (product) elements.detail.append(renderProductDetail(product));
  if (!product && supplier) elements.detail.append(renderSupplierDetail(supplier));
  elements.detail.classList.toggle("hidden", !product && !supplier);
  updateSeo(product || supplier, product ? "product" : supplier ? "supplier" : "");
}

function handleDetailLink(event) {
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  history.pushState({}, "", event.currentTarget.href);
  renderRoute();
  document.getElementById("b2b-marketplace")?.scrollIntoView({ behavior: "smooth" });
}

function configureCatalog() {
  appendOptions(elements.category, marketplaceCategories, (value) => value);
  appendOptions(elements.supplier, marketplaceSuppliers, ({ slug }) => slug, ({ company }) => company);
  appendOptions(elements.incoterm, marketplaceIncoterms, (value) => value);
  [elements.search, elements.category, elements.supplier, elements.incoterm, elements.verified, elements.favoritesOnly].forEach((control) => {
    control.addEventListener(control === elements.search ? "input" : "change", () => { currentPage = 1; renderProducts(); });
  });
  elements.clear.addEventListener("click", () => {
    elements.search.value = "";
    elements.category.value = "";
    elements.supplier.value = "";
    elements.incoterm.value = "";
    elements.verified.checked = false;
    elements.favoritesOnly.checked = false;
    currentPage = 1;
    renderProducts();
    elements.search.focus();
  });
  window.addEventListener("popstate", renderRoute);
  renderProducts();
  renderRoute();
}

function configureInquiryForm() {
  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = Array.from(elements.form.querySelectorAll("input, select, textarea"));
    const isValid = elements.form.checkValidity();
    fields.forEach((field) => field.setAttribute("aria-invalid", String(!field.validity.valid)));
    if (!isValid) {
      elements.formStatus.className = "mt-4 text-sm font-bold text-red-700";
      elements.formStatus.textContent = "Please complete the required fields using a valid business email.";
      elements.form.querySelector(":invalid").focus();
      return;
    }
    const data = new FormData(elements.form);
    const subject = `B2B Marketplace Inquiry — ${data.get("company")}`;
    const body = [`Role: ${data.get("role")}`, `Company: ${data.get("company")}`, `Business email: ${data.get("email")}`, `Target market: ${data.get("market")}`, "", "Product or requirement:", data.get("requirement")].join("\n");
    elements.formStatus.className = "mt-4 text-sm font-bold text-green-800";
    elements.formStatus.textContent = "Your email application is opening with a prefilled inquiry. Review it before sending.";
    window.location.href = `mailto:info@gi-hub.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

if (Object.values(elements).every(Boolean)) {
  configureCatalog();
  configureInquiryForm();
}
