export const marketplaceListings = Object.freeze([
  {
    company: "Caucasus Food Export",
    sector: "Food & beverage",
    offering: "Private-label food and beverage export coordination",
    markets: "Georgia, GCC, EU",
    verification: "Export-ready profile",
  },
  {
    company: "Black Sea Logistics Network",
    sector: "Logistics",
    offering: "Freight coordination, warehousing and customs support",
    markets: "Georgia, Caucasus, Central Asia",
    verification: "Service capability reviewed",
  },
  {
    company: "Caucasus Industrial Supply",
    sector: "Manufacturing",
    offering: "Industrial sourcing and contract manufacturing introductions",
    markets: "Georgia, Iran, Türkiye",
    verification: "Supply capability reviewed",
  },
  {
    company: "Green Valley Trade",
    sector: "Agriculture",
    offering: "Agricultural products and export partnership sourcing",
    markets: "Georgia, EU, Middle East",
    verification: "Export-ready profile",
  },
  {
    company: "Regional Health Supply",
    sector: "Health & wellness",
    offering: "Health product distribution and market-entry support",
    markets: "Georgia, Caucasus, international",
    verification: "Service capability reviewed",
  },
  {
    company: "Caucasus Market Entry",
    sector: "Business services",
    offering: "Commercial representation and distributor discovery",
    markets: "Georgia, Iran, EU",
    verification: "Service capability reviewed",
  },
]);

export const marketplaceSectors = Object.freeze([
  ...new Set(marketplaceListings.map(({ sector }) => sector)),
]);

export function filterMarketplaceListings(listings, query = "", sector = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return listings.filter((listing) => {
    const searchableText = Object.values(listing).join(" ").toLocaleLowerCase();
    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
    const matchesSector = !sector || listing.sector === sector;

    return matchesQuery && matchesSector;
  });
}
