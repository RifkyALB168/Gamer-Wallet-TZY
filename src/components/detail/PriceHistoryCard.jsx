import { formatRupiah, usdKeRupiah } from "../../utils/formatRupiah";
import { formatTanggal } from "../../utils/formatTanggal";
import PriceIDR from "../PriceIDR";

const LEBAR = 300;
const TINGGI = 110;
const JARAK = 8;

/** Ubah riwayat harga jadi titik-titik SVG, harga tertinggi di atas. */
function buatTitik(riwayat) {
  const harga = riwayat.map((r) => r.hargaUsd);
  const maks = Math.max(...harga);
  const min = Math.min(...harga);
  const rentang = maks - min || 1;
  const langkah = riwayat.length > 1 ? LEBAR / (riwayat.length - 1) : 0;

  return riwayat.map((r, i) => ({
    x: Math.round(i * langkah),
    y: Math.round(JARAK + ((maks - r.hargaUsd) / rentang) * (TINGGI - JARAK * 2)),
  }));
}

/** Saran beli dari jarak harga sekarang ke rekor terendah. */
function saranBeli(hargaSekarang, hargaTerendah) {
  if (hargaSekarang <= hargaTerendah * 1.15) {
    return {
      judul: "Layak Beli Sekarang!",
      teks: "Harga sudah dekat rekor terendah. Diskon sebesar ini jarang muncul di luar event besar.",
      gaya: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
    };
  }
  return {
    judul: "Bisa Tunggu Diskon",
    teks: "Harga masih jauh dari rekor terendah. Simpan ke wishlist dan cek lagi saat event sale.",
    gaya: "border-amber-400/40 bg-amber-400/10 text-amber-200",
  };
}

/**
 * Riwayat harga termurah per bulan, rekor terendah, dan saran beli.
 *
 * @param {object} props
 * @param {Array<{ bulan: string, hargaUsd: number }>} props.riwayat urut dari bulan terlama
 * @param {{ hargaUsd: number, tanggal: string, toko: string }} props.hargaTerendah
 * @param {number} props.hargaSekarangUsd harga termurah hari ini
 * @param {number|null} props.rate kurs 1 USD dalam rupiah
 */
export function PriceHistoryCard({ riwayat, hargaTerendah, hargaSekarangUsd, rate }) {
  const titik = buatTitik(riwayat);
  const garis = titik.map((t) => `${t.x},${t.y}`).join(" ");
  const area = `0,${TINGGI} ${garis} ${LEBAR},${TINGGI}`;
  const saran = saranBeli(hargaSekarangUsd, hargaTerendah.hargaUsd);
  const selisih = usdKeRupiah(hargaSekarangUsd - hargaTerendah.hargaUsd, rate);
  const tengah = Math.floor((riwayat.length - 1) / 2);

  return (
    <section
      aria-labelledby="judul-riwayat"
      className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5"
    >
      <h2 id="judul-riwayat" className="text-base font-semibold">
        Riwayat Harga &amp; Analisis
      </h2>

      <div className="mt-3 rounded-xl bg-stone-950/60 p-3">
        <p className="font-mono text-[11px] uppercase text-stone-500">
          Harga terendah sepanjang masa (ATL)
        </p>
        <p className="mt-1 flex flex-wrap items-baseline gap-2">
          <PriceIDR
            usd={hargaTerendah.hargaUsd}
            rate={rate}
            className="font-mono text-2xl font-bold text-gray-100"
          />
          <span className="text-xs text-stone-500">
            di {hargaTerendah.toko} ({formatTanggal(hargaTerendah.tanggal, { month: "long", year: "numeric" })})
          </span>
        </p>
        {selisih > 0 && (
          <p className="mt-1 text-xs text-stone-400">
            Harga sekarang selisih{" "}
            <span className="font-semibold text-amber-300">+{formatRupiah(selisih)}</span> dari
            rekor terendah.
          </p>
        )}
      </div>

      <figure className="mt-4">
        <figcaption className="flex justify-between text-[11px] text-stone-500">
          <span>Tren {riwayat.length} bulan terakhir</span>
          <span className="text-emerald-300">Harga termurah per bulan</span>
        </figcaption>
        <svg
          viewBox={`0 0 ${LEBAR} ${TINGGI}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={`Grafik harga dari ${riwayat[0]?.bulan} sampai hari ini. Harga terendah di grafik ${formatRupiah(usdKeRupiah(Math.min(...riwayat.map((r) => r.hargaUsd)), rate))}.`}
          className="mt-2 h-28 w-full overflow-visible"
        >
          <defs>
            <linearGradient id="isi-riwayat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(52 211 153)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgb(52 211 153)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={area} fill="url(#isi-riwayat)" />
          <polyline
            points={garis}
            fill="none"
            stroke="rgb(52 211 153)"
            strokeWidth="2"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="mt-1 flex justify-between font-mono text-[10px] text-stone-500" aria-hidden="true">
          <span>{riwayat[0]?.bulan}</span>
          <span>{riwayat[tengah]?.bulan}</span>
          <span>Hari ini</span>
        </div>
      </figure>

      <div className={`mt-4 rounded-xl border p-3 ${saran.gaya}`}>
        <p className="text-sm font-semibold">✓ {saran.judul}</p>
        <p className="mt-1 text-xs opacity-80">{saran.teks}</p>
      </div>
    </section>
  );
}

export default PriceHistoryCard;
