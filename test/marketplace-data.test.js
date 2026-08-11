import assert from "node:assert/strict";
import test from "node:test";
import { filterMarketplaceListings, marketplaceListings, marketplaceSectors } from "../src/assets/scripts/marketplace-data.js";

test("marketplace sectors are unique and available to filters", () => {
  assert.equal(new Set(marketplaceSectors).size, marketplaceSectors.length);
  assert.ok(marketplaceSectors.includes("Logistics"));
});

test("marketplace filters support text and sector queries", () => {
  assert.equal(filterMarketplaceListings(marketplaceListings, "freight").length, 1);
  assert.equal(filterMarketplaceListings(marketplaceListings, "", "Agriculture").length, 1);
  assert.equal(filterMarketplaceListings(marketplaceListings, "not-a-market").length, 0);
});
