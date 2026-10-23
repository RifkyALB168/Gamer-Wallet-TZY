import { useCallback, useEffect, useMemo, useState } from "react";
import {
  buatTimelineTabungan,
  hitungBulanMenabung,
  hitungRingkasanBudget,
} from "../utils/tabungan";

const STORAGE_KEY = "gw:budget:v1"; // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
const DEFAULT_NOMINAL = 200_000;

/** Baca simpanan budget dari localStorage. */
function bacaSimpanan() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}
