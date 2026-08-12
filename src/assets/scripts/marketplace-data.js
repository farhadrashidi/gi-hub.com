export const marketplaceSuppliers = Object.freeze([
  {
    slug: "caucasus-food-export",
    company: "Caucasus Food Export",
    sector: "Food & beverage",
    location: "Tbilisi, Georgia",
    markets: ["Georgia", "GCC", "EU"],
    verification: "verified",
    verifiedAt: "2026-05-18",
    description: "Private-label food and beverage export coordination for regional and international buyers.",
  },
  {
    slug: "black-sea-logistics-network",
    company: "Black Sea Logistics Network",
    sector: "Logistics",
    location: "Batumi, Georgia",
    markets: ["Georgia", "Caucasus", "Central Asia"],
    verification: "verified",
    verifiedAt: "2026-04-09",
    description: "Freight coordination, warehousing, customs support, and multimodal delivery services.",
  },
  {
    slug: "caucasus-industrial-supply",
    company: "Caucasus Industrial Supply",
    sector: "Manufacturing",
    location: "Rustavi, Georgia",
    markets: ["Georgia", "Iran", "Türkiye"],
    verification: "verified",
    verifiedAt: "2026-06-02",
    description: "Industrial sourcing and contract-manufacturing introductions for qualified buyers.",
  },
  {
    slug: "green-valley-trade",
    company: "Green Valley Trade",
    sector: "Agriculture",
    location: "Kakheti, Georgia",
    markets: ["Georgia", "EU", "Middle East"],
    verification: "verified",
    verifiedAt: "2026-03-22",
    description: "Agricultural products and export partnership sourcing from Georgian producers.",
  },
  {
    slug: "regional-health-supply",
    company: "Regional Health Supply",
    sector: "Health & wellness",
    location: "Tbilisi, Georgia",
    markets: ["Georgia", "Caucasus", "International"],
    verification: "pending",
    verifiedAt: null,
    description: "Health-product distribution and market-entry support across the Caucasus.",
  },
  {
    slug: "caucasus-market-entry",
    company: "Caucasus Market Entry",
    sector: "Business services",
    location: "Tbilisi, Georgia",
    markets: ["Georgia", "Iran", "EU"],
    verification: "verified",
    verifiedAt: "2026-01-30",
    description: "Commercial representation and distributor discovery for companies entering Georgia.",
  },
]);

export const marketplaceProducts = Object.freeze([
  { slug: "private-label-fruit-juice", name: "Private-label Fruit Juice", category: "Food & beverage", supplier: "caucasus-food-export", hsCode: "2009.89", moq: 1200, moqUnit: "cartons", incoterms: ["EXW", "FCA", "CIF"], origin: "Georgia", description: "Shelf-stable fruit juice available for private-label export programs." },
  { slug: "georgian-mineral-water", name: "Georgian Mineral Water", category: "Food & beverage", supplier: "caucasus-food-export", hsCode: "2201.10", moq: 20, moqUnit: "pallets", incoterms: ["EXW", "FCA", "CIF"], origin: "Georgia", description: "Natural Georgian mineral water for wholesale and distribution partners." },
  { slug: "black-sea-freight-coordination", name: "Black Sea Freight Coordination", category: "Logistics", supplier: "black-sea-logistics-network", hsCode: "9965.11", moq: 1, moqUnit: "shipment", incoterms: ["FCA", "CPT", "CIP"], origin: "Georgia", description: "Port-to-destination freight coordination for commercial shipments." },
  { slug: "bonded-warehouse-service", name: "Bonded Warehouse Service", category: "Logistics", supplier: "black-sea-logistics-network", hsCode: "9967.19", moq: 5, moqUnit: "pallets", incoterms: ["EXW", "FCA"], origin: "Georgia", description: "Short- and medium-term bonded warehousing with customs coordination." },
  { slug: "contract-metal-fabrication", name: "Contract Metal Fabrication", category: "Manufacturing", supplier: "caucasus-industrial-supply", hsCode: "7326.90", moq: 100, moqUnit: "units", incoterms: ["EXW", "FCA", "DAP"], origin: "Georgia", description: "Made-to-specification metal components for industrial buyers." },
  { slug: "industrial-packaging-components", name: "Industrial Packaging Components", category: "Manufacturing", supplier: "caucasus-industrial-supply", hsCode: "3923.90", moq: 5000, moqUnit: "units", incoterms: ["EXW", "FCA", "CPT"], origin: "Georgia", description: "Standard and custom packaging components for manufacturing operations." },
  { slug: "georgian-hazelnuts", name: "Georgian Hazelnuts", category: "Agriculture", supplier: "green-valley-trade", hsCode: "0802.22", moq: 10, moqUnit: "tonnes", incoterms: ["FCA", "FOB", "CIF"], origin: "Georgia", description: "Export-grade shelled hazelnuts sourced from Georgian producers." },
  { slug: "bulk-wine-grapes", name: "Bulk Wine Grapes", category: "Agriculture", supplier: "green-valley-trade", hsCode: "0806.10", moq: 20, moqUnit: "tonnes", incoterms: ["EXW", "FCA"], origin: "Georgia", description: "Seasonal wine-grape supply from partner vineyards in Kakheti." },
  { slug: "wellness-product-distribution", name: "Wellness Product Distribution", category: "Health & wellness", supplier: "regional-health-supply", hsCode: "2106.90", moq: 500, moqUnit: "units", incoterms: ["FCA", "CIP", "DAP"], origin: "Georgia", description: "Regional distribution support for compliant wellness products." },
  { slug: "medical-consumables-sourcing", name: "Medical Consumables Sourcing", category: "Health & wellness", supplier: "regional-health-supply", hsCode: "9018.90", moq: 1000, moqUnit: "units", incoterms: ["FCA", "CIP", "DAP"], origin: "Georgia", description: "Buyer-led sourcing support for general medical consumables." },
  { slug: "distributor-discovery-georgia", name: "Distributor Discovery — Georgia", category: "Business services", supplier: "caucasus-market-entry", hsCode: "9983.99", moq: 1, moqUnit: "engagement", incoterms: ["N/A"], origin: "Georgia", description: "Structured distributor research, screening, and introduction support." },
  { slug: "commercial-representation", name: "Commercial Representation", category: "Business services", supplier: "caucasus-market-entry", hsCode: "9983.99", moq: 3, moqUnit: "months", incoterms: ["N/A"], origin: "Georgia", description: "Local commercial representation for approved international businesses." },
]);

export const marketplaceCategories = Object.freeze([...new Set(marketplaceProducts.map(({ category }) => category))]);
export const marketplaceIncoterms = Object.freeze([...new Set(marketplaceProducts.flatMap(({ incoterms }) => incoterms))].sort());

export function getSupplierBySlug(slug) {
  return marketplaceSuppliers.find((supplier) => supplier.slug === slug);
}

export function getProductBySlug(slug) {
  return marketplaceProducts.find((product) => product.slug === slug);
}

export function filterMarketplaceProducts(products, filters = {}) {
  const query = (filters.query || "").trim().toLocaleLowerCase();
  return products.filter((product) => {
    const supplier = getSupplierBySlug(product.supplier);
    const searchable = [product.name, product.category, product.hsCode, product.origin, product.description, supplier?.company, ...(product.incoterms || [])].join(" ").toLocaleLowerCase();
    return (!query || searchable.includes(query))
      && (!filters.category || product.category === filters.category)
      && (!filters.supplier || product.supplier === filters.supplier)
      && (!filters.incoterm || product.incoterms.includes(filters.incoterm))
      && (!filters.verified || supplier?.verification === "verified");
  });
}

// Backward-compatible capability listings retained for existing consumers and tests.
export const marketplaceListings = Object.freeze(marketplaceSuppliers.map((supplier) => ({
  company: supplier.company,
  sector: supplier.sector,
  offering: supplier.description,
  markets: supplier.markets.join(", "),
  verification: supplier.verification === "verified" ? "Verified supplier profile" : "Verification pending",
})));
export const marketplaceSectors = Object.freeze([...new Set(marketplaceListings.map(({ sector }) => sector))]);
export function filterMarketplaceListings(listings, query = "", sector = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return listings.filter((listing) => (!normalizedQuery || Object.values(listing).join(" ").toLocaleLowerCase().includes(normalizedQuery)) && (!sector || listing.sector === sector));
}
