## Crawl books → generate seed SQL

This script crawls book metadata from **Google Books API**, downloads cover images, and overwrites:

- `data/src/main/resources/db/media/media.sql`
- `data/src/main/resources/db/product/product.sql`

It also saves images into:

- `data/images/books/`

### Run

From repo root:

```bash
node tools/crawl-books.mjs
```

### Environment variables

- **`GOOGLE_BOOKS_API_URL`**: default `https://www.googleapis.com/books/v1/volumes`
- **`GOOGLE_BOOKS_API_KEY`**: optional (recommended if you hit rate limits)
- **`BOOK_COUNT`**: default `20`
- **`IMAGES_DIR`**: default `data/images/books`
- **`MEDIA_FILE_BASE_PATH`**: default `/images/books` (this is written to `media.file_path`)
- **`OUTPUT_MEDIA_SQL`**: default `data/src/main/resources/db/media/media.sql`
- **`OUTPUT_PRODUCT_SQL`**: default `data/src/main/resources/db/product/product.sql`

### Notes

- The `media` service reads **`media.file_path` directly** from filesystem. Make sure your runtime (Docker/K8s/local)
  mounts the same images directory as `MEDIA_FILE_BASE_PATH` (e.g. `/images/books/...`).

