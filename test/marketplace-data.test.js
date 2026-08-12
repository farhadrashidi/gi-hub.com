import assert from "node:assert/strict";
import test from "node:test";
import {
  filterMarketplaceListings,
  filterMarketplaceProducts,
  getProductBySlug,
  getSupplierBySlug,
  marketplaceCategories,
  marketplaceListings,
  marketplaceProducts,
  marketplaceSectors,
  marketplaceSuppliers,
} from "../src/assets/scripts/marketplace-data.js";

test("marketplace sectors are unique and available to filters", () => {
  assert.equal(new Set(marketplaceSectors).size, marketplaceSectors.length);
  assert.ok(marketplaceSectors.includes("Logistics"));
});

test("marketplace filters support text and sector queries", () => {
  assert.equal(filterMarketplaceListings(marketplaceListings, "freight").length, 1);
  assert.equal(filterMarketplaceListings(marketplaceListings, "", "Agriculture").length, 1);
  assert.equal(filterMarketplaceListings(marketplaceListings, "not-a-market").length, 0);
});

test("products have unique SEO slugs and valid supplier relationships", () => {
  assert.equal(new Set(marketplaceProducts.map(({ slug }) => slug)).size, marketplaceProducts.length);
  marketplaceProducts.forEach((product) => {
    assert.match(product.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(getSupplierBySlug(product.supplier));
    assert.match(product.hsCode, /^\d{4}(?:\.\d{2})?$/);
    assert.ok(product.moq > 0);
    assert.ok(product.incoterms.length > 0);
  });
});

test("supplier profiles have unique SEO slugs and verification states", () => {
  assert.equal(new Set(marketplaceSuppliers.map(({ slug }) => slug)).size, marketplaceSuppliers.length);
  marketplaceSuppliers.forEach((supplier) => {
    assert.match(supplier.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(["verified", "pending"].includes(supplier.verification));
  });
});

test("product filters support category, supplier, Incoterm, verification, HS Code and text", () => {
  assert.equal(filterMarketplaceProducts(marketplaceProducts, { category: "Agriculture" }).length, 2);
  assert.equal(filterMarketplaceProducts(marketplaceProducts, { supplier: "green-valley-trade" }).length, 2);
  assert.ok(filterMarketplaceProducts(marketplaceProducts, { incoterm: "CIF" }).length >= 1);
  assert.equal(filterMarketplaceProducts(marketplaceProducts, { query: "0802.22" })[0].slug, "georgian-hazelnuts");
  assert.equal(filterMarketplaceProducts(marketplaceProducts, { supplier: "regional-health-supply", verified: true }).length, 0);
  assert.ok(marketplaceCategories.includes("Manufacturing"));
  assert.equal(getProductBySlug("contract-metal-fabrication").hsCode, "7326.90");
});
