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

/**
 * Bersihkan seluruh cache kurs. Dipakai tombol "Update kurs" dan pengujian.
 */
export function clearRateCache() {
  try {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith(CACHE_PREFIX),
    );
    keys.forEach((k) => localStorage.removeItem(k));
  } catch {
    /* abaikan */
  }
}

/**
 * Buat URL endpoint Frankfurter.
 * @param {"latest" | string} endpoint tanggal (YYYY-MM-DD) atau "latest"
 * @param {{ from: string, to: string, amount?: number }} options
 */
export function buildUrl(endpoint, { from, to, amount = 1 }) {
  const host = HOSTS[0];
  const params = new URLSearchParams({ from, to });
  if (amount !== 1) params.set("amount", String(amount));
  return `${host}/${endpoint}?${params.toString()}`;
}

/**
/**
 * Panggil satu endpoint Frankfurter dengan timeout dan fallback host.
 * @param {string} endpoint
 * @param {{ from: string, to: string, amount?: number }} options
 * @returns {Promise<any>}
 */
async function request(endpoint, options) {
  let lastError = null;

  for (const host of HOSTS) {
    const params = new URLSearchParams({ from: options.from, to: options.to });
    if (options.amount && options.amount !== 1) {
      params.set("amount", String(options.amount));
    }
    const url = `${host}/${endpoint}?${params.toString()}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`Frankfurter respond ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timer); // reset Timeout react
    }
  }

  throw lastError ?? new Error("Gagal menghubungi Frankfurter");
}
/**
 * Daftar mata uang Frankfurter.
 * @returns {Promise<Array<{ kode: string, nama: string }>>}
 */
export async function fetchCurrencies() {
  const key = "currencies";
  const cached = readFreshCache(key, DEFAULT_TTL);
  if (cached) return cached;

  const payload = await request("currencies", { from: "USD", to: "IDR" });
  const list = Object.entries(payload ?? {}).map(([kode, nama]) => ({
    kode,
    nama,
  }));
  writeCache(key, list);
  return list;
}
