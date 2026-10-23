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
 * Ubah respons mentah Frankfurter menjadi bentuk yang dipakai aplikasi.
 * @param {any} payload
 * @param {string} targetCurrency
 * @returns {{ base: string, target: string, date: string, rate: number } | null}
 */
export function normalizeRate(payload, targetCurrency) {
  if (!payload || typeof payload !== "object") return null;
  const rates = payload.rates;
  if (!rates || typeof rates !== "object") return null;

  const rate = rates[targetCurrency];
  if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0)
    return null;

  return {
    base: payload.base ?? null,
    target: targetCurrency,
    date: payload.date ?? null,
    rate,
  };
}

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
 * Ambil kurs terbaru, memakai cache bila masih segar.
 * @param {object} [options]
 * @param {string} [options.from]
 * @param {string} [options.to]
 * @param {number} [options.ttl] masa berlaku cache dalam milidetik
 * @param {boolean} [options.force] lewati cache dan panggil jaringan
 * @returns {Promise<{ base: string, target: string, date: string, rate: number, cached: boolean }>}
 */
export async function fetchLatestRate({
  from = "USD",
  to = "IDR",
  ttl = DEFAULT_TTL,
  force = false,
} = {}) {
  const key = `latest:${from}:${to}`;

  if (!force) {
    const cached = readFreshCache(key, ttl);
    if (cached) return { ...cached, cached: true };
  }

  const payload = await request("latest", { from, to });
  const normalized = normalizeRate(payload, to);
  if (!normalized) {
    throw new Error(`Kurs ${from} ke ${to} tidak tersedia`);
  }

  writeCache(key, normalized);
  return { ...normalized, cached: false };
}

/**
 * Ambil kurs pada tanggal tertentu. Tidak memakai cache karena tanggal lampau tidak berubah.
 * @param {string} date tanggal format YYYY-MM-DD
 * @param {{ from?: string, to?: string }} [options]
 */
export async function fetchRateOnDate(date, { from = "USD", to = "IDR" } = {}) {
  const payload = await request(date, { from, to });
  const normalized = normalizeRate(payload, to);
  if (!normalized) {
    throw new Error(`Kurs ${from} ke ${to} pada ${date} tidak tersedia`);
  }
  return { ...normalized, cached: false };
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
