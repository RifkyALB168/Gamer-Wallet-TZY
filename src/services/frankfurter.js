// API Frankfurter (ECB reference rates). https://frankfurter.dev
const CACHE_PREFIX = "gw:frankfurter:";
const DEFAULT_TTL = 1000 * 60 * 60 * 12; // 12 jam
const REQUEST_TIMEOUT = 8000; // 8 detik
const HOSTS = ["https://api.frankfurter.dev/v1", "https://api.frankfurter.app"];

export const FALLBACK_USD_IDR = 16000; // backup currency

/**
 * Baca cache dari localStorage. Aman dipanggil di lingkungan tanpa localStorage.
 * @param {string} key
 * @returns {{ value: any, savedAt: number } | null}
 */
function readCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !("value" in parsed))
      return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Tulis cache ke localStorage. Gagal (kuota penuh / mode privat) tidak fatal.
 * @param {string} key
 * @param {any} value
 */
function writeCache(key, value) {
  try {
    localStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ value, savedAt: Date.now() }),
    );
  } catch {
    /* cache lokal gagal ditulis: lewati, hasil tetap dipakai di memori */
  }
}

/**
 * Ambil nilai cache selama belum melewati TTL.
 * @param {string} key
 * @param {number} ttl
 */
export function readFreshCache(key, ttl = DEFAULT_TTL) {
  const cached = readCache(key);
  if (!cached) return null;
  if (Date.now() - cached.savedAt > ttl) return null;
  return cached.value;
}

