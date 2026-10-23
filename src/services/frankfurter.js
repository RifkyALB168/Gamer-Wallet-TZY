// API Frankfurter (ECB reference rates). https://frankfurter.dev
const CACHE_PREFIX = "gw:frankfurter:";
const DEFAULT_TTL = 1000 * 60 * 60 * 12; // 12 jam
const REQUEST_TIMEOUT = 8000; // 8 detik
const HOSTS = ["https://api.frankfurter.dev/v1", "https://api.frankfurter.app"];

export const FALLBACK_USD_IDR = 16000; // backup currency
