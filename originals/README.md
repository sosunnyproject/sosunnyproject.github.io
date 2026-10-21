# originals/

Full-resolution source images kept for archiving. **Not loaded by the site**: nothing here is
under `content/` or `static/`, so Vite never imports or copies it.

Paths mirror `content/`: `originals/portfolio/<post>/<file>` is the source of
`content/portfolio/<post>/<file>`.

How the web versions were made (sharp):

- Any jpg/png over 1 MB or wider than 2400px was resized to fit 2400×2400 (never enlarged).
- JPEG: quality 80, mozjpeg, progressive. PNG: max compression, palette (q90) if still large.
- Large opaque PNG photos (> 600 KB) were converted to `.jpg` with the same base name, and the
  post's markdown was updated to match. The original `.png` is here.
- If a compressed file came out bigger than the original, the original was kept as is.

To re-export one image, run sharp on the file here and write it to the same path under `content/`.
