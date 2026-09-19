import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const sourceRoot = join(projectRoot, 'src');
const outputRoot = join(projectRoot, 'out');

const locales = [
  { code: 'en', lang: 'en', dir: 'ltr', label: 'English' },
  { code: 'ka', lang: 'ka', dir: 'ltr', label: 'ქართული' },
  { code: 'ru', lang: 'ru', dir: 'ltr', label: 'Русский' },
  { code: 'zh', lang: 'zh', dir: 'ltr', label: '中文' },
  { code: 'ar', lang: 'ar', dir: 'rtl', label: 'العربية' },
  { code: 'tr', lang: 'tr', dir: 'ltr', label: 'Türkçe' }
];

const pages = [
  'index.html',
  'marketplace.html',
  'categories.html',
  'building-natural-stone.html',
  'suppliers.html',
  'supplier-profile.html',
  'rfq.html',
  'investments.html',
  'unique-land.html',
  'about.html',
  'contact.html'
];

const pageNames = {
  en: {
    'index.html': 'GI-Hub | Global Trade & Investment Marketplace',
    'marketplace.html': 'Marketplace | GI-Hub',
    'categories.html': 'Categories | GI-Hub',
    'building-natural-stone.html': 'Iranian Natural Stone | GI-Hub',
    'suppliers.html': 'Suppliers | GI-Hub',
    'supplier-profile.html': 'Valinezhad Supplier Profile | GI-Hub',
    'rfq.html': 'Post an RFQ | GI-Hub',
    'investments.html': 'Investments | GI-Hub',
    'unique-land.html': 'Georgian Unique Land | GI-Hub',
    'about.html': 'About GI-Hub | Georgian Investors Hub',
    'contact.html': 'Contact | GI-Hub'
  },
  ka: {
    'index.html': 'GI-Hub | გლობალური ვაჭრობისა და ინვესტიციების მარკეტპლეისი',
    'marketplace.html': 'მარკეტპლეისი | GI-Hub',
    'categories.html': 'კატეგორიები | GI-Hub',
    'building-natural-stone.html': 'ირანული ბუნებრივი ქვა | GI-Hub',
    'suppliers.html': 'მომწოდებლები | GI-Hub',
    'supplier-profile.html': 'Valinezhad-ის პროფილი | GI-Hub',
    'rfq.html': 'RFQ-ის განთავსება | GI-Hub',
    'investments.html': 'ინვესტიციები | GI-Hub',
    'unique-land.html': 'Georgian Unique Land | GI-Hub',
    'about.html': 'GI-Hub-ის შესახებ | Georgian Investors Hub',
    'contact.html': 'კონტაქტი | GI-Hub'
  },
  ru: {
    'index.html': 'GI-Hub | Глобальная торговая и инвестиционная площадка',
    'marketplace.html': 'Маркетплейс | GI-Hub',
    'categories.html': 'Категории | GI-Hub',
    'building-natural-stone.html': 'Иранский натуральный камень | GI-Hub',
    'suppliers.html': 'Поставщики | GI-Hub',
    'supplier-profile.html': 'Профиль поставщика Valinezhad | GI-Hub',
    'rfq.html': 'Разместить RFQ | GI-Hub',
    'investments.html': 'Инвестиции | GI-Hub',
    'unique-land.html': 'Georgian Unique Land | GI-Hub',
    'about.html': 'О GI-Hub | Georgian Investors Hub',
    'contact.html': 'Контакты | GI-Hub'
  },
  zh: {
    'index.html': 'GI-Hub | 全球贸易与投资市场',
    'marketplace.html': '市场 | GI-Hub',
    'categories.html': '分类 | GI-Hub',
    'building-natural-stone.html': '伊朗天然石材 | GI-Hub',
    'suppliers.html': '供应商 | GI-Hub',
    'supplier-profile.html': 'Valinezhad 供应商档案 | GI-Hub',
    'rfq.html': '提交 RFQ | GI-Hub',
    'investments.html': '投资 | GI-Hub',
    'unique-land.html': 'Georgian Unique Land | GI-Hub',
    'about.html': '关于 GI-Hub | Georgian Investors Hub',
    'contact.html': '联系我们 | GI-Hub'
  },
  ar: {
    'index.html': 'GI-Hub | سوق التجارة والاستثمار العالمي',
    'marketplace.html': 'السوق | GI-Hub',
    'categories.html': 'الفئات | GI-Hub',
    'building-natural-stone.html': 'الحجر الطبيعي الإيراني | GI-Hub',
    'suppliers.html': 'الموردون | GI-Hub',
    'supplier-profile.html': 'ملف مورد Valinezhad | GI-Hub',
    'rfq.html': 'إرسال طلب عرض سعر | GI-Hub',
    'investments.html': 'الاستثمارات | GI-Hub',
    'unique-land.html': 'Georgian Unique Land | GI-Hub',
    'about.html': 'عن GI-Hub | Georgian Investors Hub',
    'contact.html': 'اتصل بنا | GI-Hub'
  },
  tr: {
    'index.html': 'GI-Hub | Küresel Ticaret ve Yatırım Pazaryeri',
    'marketplace.html': 'Pazaryeri | GI-Hub',
    'categories.html': 'Kategoriler | GI-Hub',
    'building-natural-stone.html': 'İran Doğal Taşı | GI-Hub',
    'suppliers.html': 'Tedarikçiler | GI-Hub',
    'supplier-profile.html': 'Valinezhad Tedarikçi Profili | GI-Hub',
    'rfq.html': 'Teklif Talebi Gönder | GI-Hub',
    'investments.html': 'Yatırımlar | GI-Hub',
    'unique-land.html': 'Georgian Unique Land | GI-Hub',
    'about.html': 'GI-Hub Hakkında | Georgian Investors Hub',
    'contact.html': 'İletişim | GI-Hub'
  }
};

const descriptions = {
  en: 'Source verified products, connect with suppliers, submit RFQs and discover investment opportunities across Georgia and the Caucasus.',
  ka: 'მოიძიეთ შემოწმებული პროდუქტები, დაუკავშირდით მომწოდებლებს, გამოაგზავნეთ RFQ და აღმოაჩინეთ საინვესტიციო შესაძლებლობები საქართველოში და კავკასიაში.',
  ru: 'Находите проверенные продукты, связывайтесь с поставщиками, отправляйте RFQ и открывайте инвестиционные возможности в Грузии и на Кавказе.',
  zh: '寻找经过核验的产品，联系供应商，提交 RFQ，并发现格鲁吉亚及高加索地区的投资机会。',
  ar: 'اعثر على منتجات موثوقة، وتواصل مع الموردين، وأرسل طلبات عروض الأسعار، واكتشف فرص الاستثمار في جورجيا والقوقاز.',
  tr: 'Doğrulanmış ürünleri bulun, tedarikçilerle bağlantı kurun, teklif talepleri gönderin ve Gürcistan ile Kafkasya’daki yatırım fırsatlarını keşfedin.'
};

const publicPagePath = (locale, page) => `${locale}/${page === 'index.html' ? '' : page}`;

const hreflangLinks = (page) => locales.map(function (locale) {
  return `  <link rel="alternate" hreflang="${locale.lang}" href="https://gi-hub.com/${publicPagePath(locale.code, page)}">`;
}).concat(`  <link rel="alternate" hreflang="x-default" href="https://gi-hub.com/${publicPagePath('en', page)}">`).join('\n');

const localizeDocument = (source, locale, page) => {
  const canonical = `https://gi-hub.com/${publicPagePath(locale.code, page)}`;
  let html = source.replace(/<html lang="[^"]*"([^>]*)>/, `<html lang="${locale.lang}" dir="${locale.dir}" data-locale="${locale.code}"$1>`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${pageNames[locale.code][page]}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${descriptions[locale.code]}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">\n${hreflangLinks(page)}`);
  html = html.replace(/(["'(=])assets\//g, '$1../assets/');
  return html;
};

const escapeXml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

await Promise.all(locales.flatMap(function (locale) {
  return pages.map(async function (page) {
    const source = await readFile(join(sourceRoot, page), 'utf8');
    const localeRoot = join(outputRoot, locale.code);
    await mkdir(localeRoot, { recursive: true });
    await writeFile(join(localeRoot, page), localizeDocument(source, locale, page), 'utf8');
  });
}));

const sitemapEntries = locales.flatMap(function (locale) {
  return pages.map(function (page) {
    return `  <url><loc>${escapeXml(`https://gi-hub.com/${publicPagePath(locale.code, page)}`)}</loc></url>`;
  });
}).join('\n');

await writeFile(join(outputRoot, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`, 'utf8');
await writeFile(join(outputRoot, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: https://gi-hub.com/sitemap.xml\n`, 'utf8');
