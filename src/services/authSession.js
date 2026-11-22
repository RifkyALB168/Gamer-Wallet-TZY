const SESSION_KEY = "gw:access-token";
const listeners = new Set();

function readToken() {
  try {
    return sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

let accessToken = readToken();

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token) {
  if (token === accessToken) return;
  accessToken = token;
  try {
    if (token) sessionStorage.setItem(SESSION_KEY, token);
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Sesi tetap berjalan di memori jika browser memblokir storage.
  }
  listeners.forEach((listener) => listener());
}

export function clearAccessToken() {
  setAccessToken(null);
}

export function subscribeSession(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
