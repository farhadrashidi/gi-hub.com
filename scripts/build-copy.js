import { cp, mkdir } from "node:fs/promises";

const files = [
  "index.html",
  "robots.txt",
  "sitemap.xml",
  "assets/scripts/index.js",
  "assets/scripts/marketplace-data.js",
  "assets/scripts/marketplace.js",
  "assets/images/favicon.svg",
  "assets/images/tbilisi-global-network-hero-960.webp",
  "assets/images/tbilisi-global-network-hero-1672.webp",
  "assets/images/iran-georgia-business-development-centre.jpg",
  "assets/images/iran-georgia-auto-motor-sports-club.png",
  "assets/images/georgian-nabnoosh-int.jpg",
  "assets/images/health-line.jpg",
];

await Promise.all(files.map(async (file) => {
  const destination = `out/${file}`;
  await mkdir(destination.slice(0, destination.lastIndexOf("/")), { recursive: true });
  await cp(`src/${file}`, destination);
}));
