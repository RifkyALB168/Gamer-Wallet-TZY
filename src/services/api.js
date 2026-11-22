import { clearAccessToken, getAccessToken } from "./authSession.js";

const API_BASE = (import.meta.env?.VITE_API_BASE_URL || "/api/v1").replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export async function apiRequest(path, { method = "GET", body, token, signal } = {}) {
  const timeout = AbortSignal.timeout(10000);
  const response = await fetch(API_BASE + path, {
    method,
    headers: {
      Accept: "application/json",
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  });

  if (response.status === 401 && token && getAccessToken() === token) clearAccessToken();

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const message = Array.isArray(error?.message) ? error.message.join(" ") : error?.message;
    throw new ApiError(response.status, message || "Permintaan ke server gagal.");
  }

  return response.status === 204 ? undefined : response.json();
}
