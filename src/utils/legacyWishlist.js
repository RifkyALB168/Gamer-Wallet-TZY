const STORAGE_KEY = "gw:wishlist:v1";
const CHEAPSHARK_ID = /^[1-9]\d{0,15}$/;

export function readLegacyWishlist() {
  try {
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(items)) return { ids: [], unsupported: 0 };

    const ids = new Set();
    let unsupported = 0;
    for (const item of items) {
      const value = item?.id;
      const id = Number.isSafeInteger(value) ? String(value) : value;
      if (typeof id === "string" && CHEAPSHARK_ID.test(id)) ids.add(id);
      else unsupported++;
    }
    return { ids: [...ids], unsupported };
  } catch {
    return { ids: [], unsupported: 0 };
  }
}
