// API Frankfurter (ECB reference rates). https://frankfurter.dev
const CACHE_PREFIX = "gw:frankfurter:";
const DEFAULT_TTL = 1000 * 60 * 60 * 12; // 12 jam
const REQUEST_TIMEOUT = 8000; // 8 detik
const HOSTS = ["https://api.frankfurter.dev/v1", "https://api.frankfurter.app"];

export const FALLBACK_USD_IDR = 16000; // backup currency

/**
 * Ambil nilai cache kurs. Mengembalikan null bila kosong, kadaluarsa, atau rusak.
 * @param {string} key
 * @param {number} ttl masa berlaku dalam milidetik
 */
function readCache(key, ttl) {
  try {
    const { value, savedAt } = JSON.parse(
      localStorage.getItem(CACHE_PREFIX + key),
    );
    return Date.now() - savedAt < ttl ? value : null;
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
    /* cache lokal gagal ditulis: hasil tetap dipakai di memori */
  }
}

/**
 * Panggil satu endpoint Frankfurter dengan timeout dan host cadangan.
 * @param {string} endpoint "latest" atau tanggal format YYYY-MM-DD
 * @param {{ from: string, to: string }} options
 * @returns {Promise<any>}
 */
async function request(endpoint, { from, to }) {
  let lastError = null;

  for (const host of HOSTS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(`${host}/${endpoint}?from=${from}&to=${to}`, {
        signal: controller.signal,
      });
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
 * Ubah respons mentah Frankfurter menjadi bentuk yang dipakai aplikasi.
 * Mengembalikan null bila kurs tidak ada atau nilainya tidak masuk akal.
 * @param {any} payload
 * @param {string} targetCurrency
 * @returns {{ base: string|null, target: string, date: string|null, rate: number } | null}
 */
function normalizeRate(payload, targetCurrency) {
  const rate = payload?.rates?.[targetCurrency];
  if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
    return null;
  }

  return {
    base: payload.base ?? null,
    target: targetCurrency,
    date: payload.date ?? null,
    rate,
  };
}

/**
 * Ambil kurs terbaru, memakai cache bila masih segar.
 * @param {object} [options]
 * @param {string} [options.from] default "USD"
 * @param {string} [options.to] default "IDR"
 * @param {number} [options.ttl] masa berlaku cache dalam milidetik
 * @param {boolean} [options.force] lewati cache dan panggil jaringan
 * @returns {Promise<{ base: string|null, target: string, date: string|null, rate: number, cached: boolean }>}
 */
export async function fetchLatestRate({
  from = "USD",
  to = "IDR",
  ttl = DEFAULT_TTL,
  force = false,
} = {}) {
  const key = `${from}:${to}`;

  if (!force) {
    const cached = readCache(key, ttl);
    if (cached) return { ...cached, cached: true };
  }

  const hasil = normalizeRate(await request("latest", { from, to }), to);
  if (!hasil) {
    throw new Error(`Kurs ${from} ke ${to} tidak tersedia`);
  }

  writeCache(key, hasil);
  return { ...hasil, cached: false };
}
