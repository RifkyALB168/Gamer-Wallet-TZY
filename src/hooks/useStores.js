import { useEffect, useState } from "react";
import { fetchStores } from "../services/cheapshark";

// Ambil daftar toko sekali saat halaman dibuka.
// Kalau gagal, daftar dibiarkan kosong supaya halaman tetap jalan.
export function useStores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    let aktif = true;
    fetchStores().then(
      (data) => aktif && setStores(data),
      () => aktif && setStores([]),
    );
    return () => {
      aktif = false;
    };
  }, []);

  return stores;
}

export default useStores;
