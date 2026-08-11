import {
  filterMarketplaceListings,
  marketplaceListings,
  marketplaceSectors,
} from "./marketplace-data.js";

const searchInput = document.querySelector("[data-marketplace-search]");
const sectorSelect = document.querySelector("[data-marketplace-sector]");
const results = document.querySelector("[data-marketplace-results]");
const count = document.querySelector("[data-marketplace-count]");
const emptyState = document.querySelector("[data-marketplace-empty]");
const requestForm = document.querySelector("[data-marketplace-form]");
const formStatus = document.querySelector("[data-marketplace-form-status]");

function createListingCard(listing) {
  const card = document.createElement("article");
  card.className = "rounded border border-white/20 bg-gray-800 p-5";

  const sector = document.createElement("p");
  sector.className = "text-xs font-black uppercase tracking-[0.15em] text-red-300";
  sector.textContent = listing.sector;

  const company = document.createElement("h4");
  company.className = "mt-2 text-xl font-black text-white";
  company.textContent = listing.company;

  const offering = document.createElement("p");
  offering.className = "mt-3 text-gray-200";
  offering.textContent = listing.offering;

  const market = document.createElement("p");
  market.className = "mt-4 text-sm font-bold text-gray-300";
  market.textContent = `Markets: ${listing.markets}`;

  const verification = document.createElement("p");
  verification.className = "mt-2 text-sm font-bold text-green-300";
  verification.textContent = listing.verification;

  card.append(sector, company, offering, market, verification);
  return card;
}

function renderListings() {
  const filteredListings = filterMarketplaceListings(
    marketplaceListings,
    searchInput.value,
    sectorSelect.value,
  );

  results.replaceChildren(...filteredListings.map(createListingCard));
  count.textContent = `${filteredListings.length} ${filteredListings.length === 1 ? "listing" : "listings"} available`;
  emptyState.classList.toggle("hidden", filteredListings.length !== 0);
}

function configureMarketplaceSearch() {
  marketplaceSectors.forEach((sector) => {
    const option = document.createElement("option");
    option.value = sector;
    option.textContent = sector;
    sectorSelect.append(option);
  });

  searchInput.addEventListener("input", renderListings);
  sectorSelect.addEventListener("change", renderListings);
  renderListings();
}

function configureInquiryForm() {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = Array.from(requestForm.querySelectorAll("input, select, textarea"));
    const isValid = requestForm.checkValidity();

    fields.forEach((field) => field.setAttribute("aria-invalid", String(!field.validity.valid)));

    if (!isValid) {
      formStatus.className = "mt-4 text-sm font-bold text-red-700";
      formStatus.textContent = "Please complete the required fields using a valid business email.";
      requestForm.querySelector(":invalid").focus();
      return;
    }

    const data = new FormData(requestForm);
    const subject = `B2B Marketplace Inquiry — ${data.get("company")}`;
    const body = [
      `Role: ${data.get("role")}`,
      `Company: ${data.get("company")}`,
      `Business email: ${data.get("email")}`,
      `Target market: ${data.get("market")}`,
      "",
      "Product or requirement:",
      data.get("requirement"),
    ].join("\n");

    formStatus.className = "mt-4 text-sm font-bold text-green-800";
    formStatus.textContent = "Your email application is opening with a prefilled inquiry. Review it before sending.";
    window.location.href = `mailto:info@gi-hub.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

if (searchInput && sectorSelect && results && count && emptyState && requestForm && formStatus) {
  configureMarketplaceSearch();
  configureInquiryForm();
}
