import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Crawl book data, download cover images, and generate SQL seed files for `media` and `book`.
 *
 * Providers:
 * - Open Library (default, no key): https://openlibrary.org/developers/api
 * - Google Books (optional): https://developers.google.com/books
 *
 * Env vars:
 * - BOOK_PROVIDER: "openlibrary" | "google" | "auto" (default: "openlibrary")
 *
 * Google Books env vars:
 * - GOOGLE_BOOKS_API_URL (default: https://www.googleapis.com/books/v1/volumes)
 * - GOOGLE_BOOKS_API_KEY (optional)
 *
 * Output env vars:
 * - BOOK_COUNT (default: 20)
 * - OUTPUT_MEDIA_SQL (default: data/src/main/resources/db/media/media.sql)
 * - OUTPUT_PRODUCT_SQL (default: data/src/main/resources/db/product/product.sql)
 * - IMAGES_DIR (default: data/images/books)
 * - MEDIA_FILE_BASE_PATH (default: /images/books)  <-- written to media.file_path
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const GOOGLE_BOOKS_API_URL =
  process.env.GOOGLE_BOOKS_API_URL || "https://www.googleapis.com/books/v1/volumes";
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY || "";
const BOOK_PROVIDER = (process.env.BOOK_PROVIDER || "openlibrary").toLowerCase().trim();

const OPEN_LIBRARY_SEARCH_URL =
  process.env.OPEN_LIBRARY_SEARCH_URL || "https://openlibrary.org/search.json";
const OPEN_LIBRARY_COVERS_BASE =
  process.env.OPEN_LIBRARY_COVERS_BASE || "https://covers.openlibrary.org/b/id";

const BOOK_COUNT = Number.parseInt(process.env.BOOK_COUNT || "20", 10);
if (!Number.isFinite(BOOK_COUNT) || BOOK_COUNT <= 0) {
  throw new Error("BOOK_COUNT must be a positive integer");
}

const OUTPUT_MEDIA_SQL = path.resolve(
  repoRoot,
  process.env.OUTPUT_MEDIA_SQL || "data/src/main/resources/db/media/media.sql",
);
const OUTPUT_PRODUCT_SQL = path.resolve(
  repoRoot,
  process.env.OUTPUT_PRODUCT_SQL || "data/src/main/resources/db/product/product.sql",
);
const IMAGES_DIR = path.resolve(repoRoot, process.env.IMAGES_DIR || "data/images/books");
const MEDIA_FILE_BASE_PATH = (process.env.MEDIA_FILE_BASE_PATH || "/images/books").replace(
  /\/+$/,
  "",
);

const DEFAULT_QUERIES = [
  "tiểu thuyết hay",
  "văn học việt nam",
  "nguyễn nhật ánh",
  "paulo coelho",
  "self help",
  "tư duy",
  "kinh doanh",
  "thiếu nhi",
  "trinh thám",
  "kỹ năng sống",
  "tâm lý học",
  "phát triển bản thân",
  "lịch sử",
  "khoa học",
  "triết học",
];

function sqlString(value) {
  if (value == null) return "NULL";
  const s = String(value).replace(/'/g, "''");
  return `'${s}'`;
}

function slugify(input) {
  const s = String(input || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  return s || "book";
}

function toPublishDate(publishedDateRaw) {
  const s = String(publishedDateRaw || "").trim();
  if (!s) return "2020-01-01 00:00:00";
  const m = s.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/);
  if (!m) return "2020-01-01 00:00:00";
  const yyyy = m[1];
  const mm = m[2] || "01";
  const dd = m[3] || "01";
  return `${yyyy}-${mm}-${dd} 00:00:00`;
}

function guessMediaTypeByUrl(url) {
  const u = String(url || "").toLowerCase();
  if (u.endsWith(".png")) return "image/png";
  if (u.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Bookstore-Microservices-Project seed crawler",
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed ${res.status} ${res.statusText}: ${text.slice(0, 300)}`);
  }
  return await res.json();
}

async function downloadToFile(url, absPath) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Bookstore-Microservices-Project seed crawler",
    },
  });
  if (!res.ok) throw new Error(`Download failed ${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.promises.mkdir(path.dirname(absPath), { recursive: true });
  await fs.promises.writeFile(absPath, buf);
  const contentType = res.headers.get("content-type") || "";
  return { contentType, size: buf.byteLength };
}

function pickBestThumbnail(imageLinks) {
  if (!imageLinks) return "";
  return (
    imageLinks.extraLarge ||
    imageLinks.large ||
    imageLinks.medium ||
    imageLinks.small ||
    imageLinks.thumbnail ||
    imageLinks.smallThumbnail ||
    ""
  );
}

function stripHtml(s) {
  return String(s || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function searchVolumes(query, maxResults = 40, startIndex = 0) {
  const params = new URLSearchParams();
  params.set("q", query);
  params.set("printType", "books");
  params.set("maxResults", String(Math.min(40, Math.max(1, maxResults))));
  params.set("startIndex", String(Math.max(0, startIndex)));
  params.set("langRestrict", "vi");
  params.set("orderBy", "relevance");
  if (GOOGLE_BOOKS_API_KEY) params.set("key", GOOGLE_BOOKS_API_KEY);
  const url = `${GOOGLE_BOOKS_API_URL}?${params.toString()}`;
  return await fetchJson(url);
}

async function searchOpenLibrary(query, limit = 100, page = 1) {
  const params = new URLSearchParams();
  params.set("q", query);
  params.set("limit", String(Math.min(100, Math.max(1, limit))));
  params.set("page", String(Math.max(1, page)));
  // Prefer Vietnamese; OpenLibrary uses ISO 639-2/3 codes in `language` array (e.g. "vie")
  params.set("language", "vie");
  const url = `${OPEN_LIBRARY_SEARCH_URL}?${params.toString()}`;
  return await fetchJson(url);
}

function moneyFromSaleInfo(saleInfo) {
  const amount = saleInfo?.listPrice?.amount ?? saleInfo?.retailPrice?.amount;
  if (typeof amount !== "number" || !Number.isFinite(amount)) return null;
  // Google Books often in USD; for seed, convert roughly to VND if currency not VND.
  const currency = saleInfo?.listPrice?.currencyCode || saleInfo?.retailPrice?.currencyCode || "";
  if (currency === "VND") return Math.round(amount);
  return Math.round(amount * 25000);
}

function clampInt(n, min, max, fallback) {
  const v = Number.isFinite(n) ? Math.trunc(n) : fallback;
  return Math.max(min, Math.min(max, v));
}

async function main() {
  console.log(`Provider: ${BOOK_PROVIDER}`);
  console.log(`Google Books API: ${GOOGLE_BOOKS_API_URL}`);
  console.log(`OpenLibrary search: ${OPEN_LIBRARY_SEARCH_URL}`);
  console.log(`Target count: ${BOOK_COUNT}`);
  console.log(`Images dir: ${IMAGES_DIR}`);
  console.log(`Output media.sql: ${OUTPUT_MEDIA_SQL}`);
  console.log(`Output product.sql: ${OUTPUT_PRODUCT_SQL}`);
  console.log(`MEDIA file_path base: ${MEDIA_FILE_BASE_PATH}`);

  const picked = [];
  const seen = new Set(); // ISBN13 preferred; else provider-specific id

  async function collectFromGoogle() {
    for (const q of DEFAULT_QUERIES) {
      if (picked.length >= BOOK_COUNT) break;
      const data = await searchVolumes(q, 40, 0);
      const items = Array.isArray(data?.items) ? data.items : [];
      for (const it of items) {
        if (picked.length >= BOOK_COUNT) break;
        const volumeInfo = it?.volumeInfo || {};
        const industryIds = Array.isArray(volumeInfo?.industryIdentifiers)
          ? volumeInfo.industryIdentifiers
          : [];
        const isbn13 =
          industryIds.find((x) => x?.type === "ISBN_13")?.identifier ||
          industryIds.find((x) => x?.type === "ISBN13")?.identifier ||
          "";
        const dedupeKey = isbn13 || it?.id || "";
        if (!dedupeKey || seen.has(dedupeKey)) continue;

        const title = String(volumeInfo?.title || "").trim();
        const authors = Array.isArray(volumeInfo?.authors) ? volumeInfo.authors : [];
        const authorName = authors.filter(Boolean).join(", ").trim();
        const thumb = pickBestThumbnail(volumeInfo?.imageLinks);
        if (!title || !thumb) continue;

        seen.add(dedupeKey);
        picked.push({
          provider: "google",
          it,
          volumeInfo,
          isbn13,
          authorName,
          thumb,
        });
      }
    }
  }

  async function collectFromOpenLibrary() {
    for (const q of DEFAULT_QUERIES) {
      if (picked.length >= BOOK_COUNT) break;
      const data = await searchOpenLibrary(q, 100, 1);
      const docs = Array.isArray(data?.docs) ? data.docs : [];
      for (const d of docs) {
        if (picked.length >= BOOK_COUNT) break;
        const title = String(d?.title || "").trim();
        const authorName = Array.isArray(d?.author_name) ? d.author_name.filter(Boolean).join(", ") : "";
        const isbn13 = Array.isArray(d?.isbn) ? String(d.isbn.find((x) => String(x).length === 13) || "") : "";
        const dedupeKey = isbn13 || d?.key || d?.cover_edition_key || "";
        const coverId = d?.cover_i;
        if (!title || !coverId) continue;
        if (!dedupeKey || seen.has(dedupeKey)) continue;
        const thumb = `${OPEN_LIBRARY_COVERS_BASE}/${coverId}-L.jpg`;

        seen.add(dedupeKey);
        picked.push({
          provider: "openlibrary",
          it: d,
          volumeInfo: {
            title,
            authors: authorName ? authorName.split(", ").filter(Boolean) : [],
            pageCount: d?.number_of_pages_median,
            publishedDate: d?.first_publish_year ? String(d.first_publish_year) : "",
            description: d?.first_sentence?.join?.(" ") || d?.first_sentence || "",
            ratingsCount: d?.ratings_count || 0,
          },
          isbn13,
          authorName,
          thumb,
        });
      }
    }
  }

  if (BOOK_PROVIDER === "google") {
    await collectFromGoogle();
  } else if (BOOK_PROVIDER === "openlibrary") {
    await collectFromOpenLibrary();
  } else {
    // auto: try google, fallback to openlibrary (handles 429/quota)
    try {
      await collectFromGoogle();
    } catch (e) {
      console.warn(`Google provider failed, falling back to OpenLibrary: ${String(e?.message || e)}`);
      await collectFromOpenLibrary();
    }
  }

  if (picked.length < BOOK_COUNT) {
    console.warn(`Only picked ${picked.length}/${BOOK_COUNT}. Try changing BOOK_PROVIDER or add API key.`);
  }

  const books = picked.slice(0, BOOK_COUNT);

  // Download images + build records
  const mediaRows = [];
  const bookRows = [];

  for (let idx = 0; idx < books.length; idx++) {
    const id = idx + 1;
    const mediaId = id;
    const { volumeInfo, isbn13, authorName, thumb } = books[idx];

    const title = String(volumeInfo?.title || "").trim();
    const subtitle = String(volumeInfo?.subtitle || "").trim();
    const fullTitle = subtitle ? `${title} - ${subtitle}` : title;
    const pageCount = clampInt(Number(volumeInfo?.pageCount), 40, 2000, 250);
    const publishedDate = toPublishDate(volumeInfo?.publishedDate);
    const descriptionPlain = stripHtml(volumeInfo?.description || "");
    const shortDescription = descriptionPlain.slice(0, 140) || `Sách ${title}`;
    const htmlDescription = descriptionPlain ? `<p>${descriptionPlain}</p>` : `<p>Sách ${title}</p>`;

    const slug = slugify(`${title}-${authorName || "author"}`).slice(0, 80);
    const fileName = `${slug}.jpg`;
    const absImagePath = path.join(IMAGES_DIR, fileName);

    // Upgrade to higher resolution if possible
    const imgUrl = String(thumb).replace("zoom=1", "zoom=2").replace("zoom=0", "zoom=2");
    let mediaType = guessMediaTypeByUrl(imgUrl);
    try {
      const { contentType } = await downloadToFile(imgUrl, absImagePath);
      if (contentType) mediaType = contentType.split(";")[0].trim();
    } catch (e) {
      // fallback: store URL-derived type, still create rows
      console.warn(`Image download failed for "${title}": ${String(e?.message || e)}`);
    }

    const caption = `Bìa sách ${title}`;
    const filePath = `${MEDIA_FILE_BASE_PATH}/${fileName}`;

    mediaRows.push({
      id: mediaId,
      caption,
      fileName,
      filePath,
      mediaType,
    });

    const saleInfo = books[idx].provider === "google" ? books[idx].it?.saleInfo || {} : {};
    const money = books[idx].provider === "google" ? moneyFromSaleInfo(saleInfo) : null;
    const price = money ?? (90000 + (idx % 10) * 10000); // stable fallback

    bookRows.push({
      id,
      name: title,
      title: authorName ? `${title} - ${authorName}` : title,
      title_without_series: title,
      slug,
      short_description: shortDescription,
      description: htmlDescription,
      specification: "Bìa mềm",
      num_pages: pageCount,
      is_published: true,
      is_visible_individually: true,
      is_featured: idx < 6,
      is_allowed_to_order: true,
      publish_date: publishedDate,
      isbn13: isbn13 || null,
      ratings_count: clampInt(Number(volumeInfo?.ratingsCount), 0, 200000, 0),
      price,
      availability: 100,
      dimensions: "13 x 20.5 cm",
      discount_percentage: 10.0,
      item_weight: 0.4,
      weight: 400,
      size: "Vừa",
      author_name: authorName || "N/A",
      thumbnail_media_id: mediaId,
      publisher_Id: null,
      brand_id: null,
      stock_quantity: 100,
      meta_title: `Sách ${title}`,
      meta_keyword: slug.replace(/-/g, ", "),
      meta_description: shortDescription,
      package_dimensions: "14x21x3 cm",
    });
  }

  const mediaSql =
    `-- Table: media\n` +
    `-- Description: Crawled images for book covers (Google Books)\n\n` +
    `INSERT INTO media (id, caption, file_name, file_path, media_type) VALUES\n` +
    mediaRows
      .map(
        (m) =>
          `  (${m.id}, ${sqlString(m.caption)}, ${sqlString(m.fileName)}, ${sqlString(
            m.filePath,
          )}, ${sqlString(m.mediaType)})`,
      )
      .join(",\n") +
    ";\n";

  const productSql =
    `-- Table: book\n` +
    `-- Description: Crawled product data (Google Books)\n\n` +
    `INSERT INTO book (\n` +
    `    id,\n` +
    `    name,\n` +
    `    title,\n` +
    `    title_without_series,\n` +
    `    slug,\n` +
    `    short_description,\n` +
    `    description,\n` +
    `    specification,\n` +
    `    num_pages,\n` +
    `    is_published,\n` +
    `    is_visible_individually,\n` +
    `    is_featured,\n` +
    `    is_allowed_to_order,\n` +
    `    publish_date,\n` +
    `    isbn13,\n` +
    `    ratings_count,\n` +
    `    price,\n` +
    `    availability,\n` +
    `    dimensions,\n` +
    `    discount_percentage,\n` +
    `    item_weight,\n` +
    `    weight,\n` +
    `    size,\n` +
    `    author_name,\n` +
    `    thumbnail_media_id,\n` +
    `    publisher_Id,\n` +
    `    brand_id,\n` +
    `    stock_quantity,\n` +
    `    meta_title,\n` +
    `    meta_keyword,\n` +
    `    meta_description,\n` +
    `    package_dimensions\n` +
    `) VALUES\n` +
    bookRows
      .map((b) => {
        return (
          `  (\n` +
          `    ${b.id},\n` +
          `    ${sqlString(b.name)},\n` +
          `    ${sqlString(b.title)},\n` +
          `    ${sqlString(b.title_without_series)},\n` +
          `    ${sqlString(b.slug)},\n` +
          `    ${sqlString(b.short_description)},\n` +
          `    ${sqlString(b.description)},\n` +
          `    ${sqlString(b.specification)},\n` +
          `    ${b.num_pages},\n` +
          `    ${b.is_published}, ${b.is_visible_individually}, ${b.is_featured}, ${b.is_allowed_to_order},\n` +
          `    ${sqlString(b.publish_date)},\n` +
          `    ${b.isbn13 ? sqlString(b.isbn13) : "NULL"},\n` +
          `    ${b.ratings_count},\n` +
          `    ${b.price},\n` +
          `    ${b.availability},\n` +
          `    ${sqlString(b.dimensions)},\n` +
          `    ${b.discount_percentage},\n` +
          `    ${b.item_weight},\n` +
          `    ${b.weight},\n` +
          `    ${sqlString(b.size)},\n` +
          `    ${sqlString(b.author_name)},\n` +
          `    ${b.thumbnail_media_id},\n` +
          `    NULL, NULL,\n` +
          `    ${b.stock_quantity},\n` +
          `    ${sqlString(b.meta_title)},\n` +
          `    ${sqlString(b.meta_keyword)},\n` +
          `    ${sqlString(b.meta_description)},\n` +
          `    ${sqlString(b.package_dimensions)}\n` +
          `  )`
        );
      })
      .join(",\n") +
    ";\n";

  await fs.promises.mkdir(path.dirname(OUTPUT_MEDIA_SQL), { recursive: true });
  await fs.promises.mkdir(path.dirname(OUTPUT_PRODUCT_SQL), { recursive: true });
  await fs.promises.writeFile(OUTPUT_MEDIA_SQL, mediaSql, "utf8");
  await fs.promises.writeFile(OUTPUT_PRODUCT_SQL, productSql, "utf8");

  console.log(`Done. Wrote ${mediaRows.length} media rows and ${bookRows.length} book rows.`);
}

await main();

