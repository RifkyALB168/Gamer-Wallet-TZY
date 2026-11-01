import { useEffect, useState } from "react";

// Tunda perubahan nilai sampai pengguna berhenti mengetik.
// Dipakai supaya API tidak dipanggil di setiap huruf.
export function useDebounce(nilai, jeda = 500) {
  const [nilaiTertunda, setNilaiTertunda] = useState(nilai);

  useEffect(() => {
    const timer = setTimeout(() => setNilaiTertunda(nilai), jeda);
    // Ketikan baru membatalkan timer lama
    return () => clearTimeout(timer);
  }, [nilai, jeda]);

  return nilaiTertunda;
}

export default useDebounce;
