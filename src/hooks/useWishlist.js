import { useSyncExternalStore } from "react";
import { ApiError, apiRequest } from "../services/api.js";
import { getAccessToken, subscribeSession } from "../services/authSession.js";

const PATH = "/wishlist-items";
const kosong = {
  items: [],
  status: "guest",
  busy: null,
  error: null,
  actionError: null,
  importResult: null,
};
const listeners = new Set();
let snapshot = kosong;
let session = null;

function publish(changes) {
  snapshot = { ...snapshot, ...changes };
  listeners.forEach((listener) => listener());
}

function request(current, path = "", options) {
  return apiRequest(PATH + path, {
    ...options,
    token: current.token,
    signal: current.controller.signal,
  });
}

function pesanError(error, fallback) {
  return error instanceof ApiError && error.status < 500 ? error.message : fallback;
}

async function load(current) {
  try {
    const items = await request(current);
    if (!Array.isArray(items)) throw new Error("Respons wishlist tidak valid.");
    if (session === current) publish({ items, status: "ready", error: null });
  } catch (error) {
    if (session === current) {
      publish({ status: "error", error: pesanError(error, "Wishlist gagal dimuat. Coba lagi.") });
    }
  }
}

function syncSession() {
  const token = getAccessToken();
  if (token === (session?.token ?? null)) return;

  session?.controller.abort();
  session = token ? { token, controller: new AbortController() } : null;
  publish({ ...kosong, status: session ? "loading" : "guest" });
  if (session) void load(session);
}

const unsubscribeSession = subscribeSession(syncSession);
import.meta.hot?.dispose(() => {
  unsubscribeSession();
  session?.controller.abort();
  session = null;
});

function subscribe(listener) {
  listeners.add(listener);
  syncSession();
  return () => listeners.delete(listener);
}

function refresh() {
  if (!session || snapshot.busy || snapshot.status === "loading") return;
  publish({ status: "loading", error: null, actionError: null });
  return load(session);
}

async function runAction(action, busy = "save") {
  const current = session;
  if (!current || snapshot.status !== "ready" || snapshot.busy) return false;

  publish({ busy, actionError: null, importResult: null });
  try {
    await action(current);
    return current === session;
  } catch (error) {
    if (current === session) {
      publish({ actionError: pesanError(error, "Perubahan wishlist gagal disimpan. Coba lagi.") });
    }
    return false;
  } finally {
    if (current === session) publish({ busy: null });
  }
}

async function add(current, gameId) {
  const item = await request(current, "", { method: "POST", body: { gameId } });
  if (current === session) publish({ items: [item, ...snapshot.items] });
}

async function remove(current, id) {
  await request(current, "/" + id, { method: "DELETE" });
  if (current === session) publish({ items: snapshot.items.filter((item) => item.id !== id) });
}

function toggle(gameId) {
  return runAction(async (current) => {
    const item = snapshot.items.find((entry) => entry.gameId === String(gameId));
    try {
      if (item) await remove(current, item.id);
      else await add(current, String(gameId));
    } catch (error) {
      if (error.status === 409 || (item && error.status === 404)) await load(current);
      else throw error;
    }
  });
}

function hapus(id) {
  return runAction(async (current) => {
    try {
      await remove(current, id);
    } catch (error) {
      if (error.status !== 404) throw error;
      if (current === session) publish({ items: snapshot.items.filter((item) => item.id !== id) });
    }
  });
}

function ubahCatatan(id, note) {
  return runAction(async (current) => {
    const changed = await request(current, "/" + id, { method: "PATCH", body: { note } });
    if (current === session) {
      publish({ items: snapshot.items.map((item) => item.id === id ? changed : item) });
    }
  });
}

function imporWishlist(ids) {
  return runAction(async (current) => {
    const result = { imported: 0, skipped: 0, failed: 0 };
    let needsRefresh = false;
    for (const gameId of ids) {
      if (current !== session) return;
      if (snapshot.items.some((item) => item.gameId === gameId)) {
        result.skipped++;
        continue;
      }
      try {
        await add(current, gameId);
        result.imported++;
      } catch (error) {
        if (current !== session) return;
        if (error.status === 409) {
          result.skipped++;
          needsRefresh = true;
        } else {
          result.failed++;
        }
      }
    }
    if (current !== session) return;
    if (needsRefresh) await load(current);
    if (current === session) publish({ importResult: result });
  }, "import");
}

const readSnapshot = () => snapshot;

export function useWishlist() {
  const state = useSyncExternalStore(subscribe, readSnapshot);
  const totalUsd = state.items.reduce((total, item) => total + Math.round(item.priceUsd * 100), 0) / 100;
  return {
    ...state,
    totalUsd,
    ada: (gameId) => state.items.some((item) => item.gameId === String(gameId)),
    toggle,
    hapus,
    ubahCatatan,
    imporWishlist,
    refresh,
  };
}
