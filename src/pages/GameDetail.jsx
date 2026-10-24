import GameAbout from "../components/detail/GameAbout";
import GameHero from "../components/detail/GameHero";
import MiniBudgetCard from "../components/detail/MiniBudgetCard";
import PriceHistoryCard from "../components/detail/PriceHistoryCard";
import StorePriceTable from "../components/detail/StorePriceTable";
import { ID_GAME_CONTOH } from "../data/mockGameDetail";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { useGameDetail } from "../hooks/useGameDetail";
import { useWishlist } from "../hooks/useWishlist";
import { usdKeRupiah } from "../utils/formatRupiah";
import { urutkanDeal } from "../utils/dealToko";

/** Kerangka abu-abu selama data dimuat, bentuknya mengikuti tata letak asli. */
function KerangkaDetail() {
  const blok = "animate-pulse rounded-2xl bg-stone-900";
  return (
    <div role="status" aria-label="Memuat detail game">
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <div className={`${blok} mx-auto aspect-[2/3] w-full max-w-[220px]`} />
        <div className="space-y-3">
          <div className={`${blok} h-5 w-1/2`} />
          <div className={`${blok} h-10 w-3/4`} />
          <div className={`${blok} h-28`} />
          <div className={`${blok} h-16`} />
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className={`${blok} h-96`} />
        <div className={`${blok} h-96`} />
      </div>
    </div>
  );
}

/** Pesan gagal memuat beserta tombol untuk mencoba lagi. */
function GagalMuat({ pesan, onCobaLagi }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-center">
      <p className="font-semibold text-red-200">Detail game gagal dimuat</p>
      <p className="mt-1 text-sm text-red-200/80">{pesan}</p>
      <button
        type="button"
        onClick={onCobaLagi}
        className="mt-4 rounded-xl bg-stone-800 px-4 py-2 text-sm font-semibold text-gray-100 hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-emerald-400"
      >
        Coba lagi
      </button>
    </div>
  );
}

/**
 * Halaman Detail Game: bandingkan harga antar toko, lihat riwayat harga,
 * dan simpan game ke wishlist.
 *
 * @param {object} props
 * @param {string} [props.gameId] ID game, nanti diisi dari parameter URL router
 */
export function GameDetail({ gameId = ID_GAME_CONTOH }) {
  const { game, loading, error, cobaLagi } = useGameDetail(gameId);
  const { rate, date } = useExchangeRate();
  const { ada, toggle } = useWishlist();

  const deals = game ? urutkanDeal(game.deals) : [];
  const dealTermurah = deals[0];
  const judulLengkap = game ? `${game.judul}: ${game.edisi}` : "";

  let isi;
  if (loading) {
    isi = <KerangkaDetail />;
  } else if (error || !dealTermurah) {
    isi = <GagalMuat pesan={error ?? "Belum ada toko yang menjual game ini."} onCobaLagi={cobaLagi} />;
  } else {
    isi = (
      <>
        <GameHero
          game={game}
          dealTermurah={dealTermurah}
          rate={rate}
          tanggalKurs={date}
          inWishlist={ada(game.id)}
          onToggleWishlist={() =>
            toggle({
              id: game.id,
              judul: judulLengkap,
              cover: game.thumb,
              hargaUsd: dealTermurah.hargaUsd,
            })
          }
        />

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <StorePriceTable deals={deals} rate={rate} judulGame={judulLengkap} />
            <GameAbout judul={judulLengkap} deskripsi={game.deskripsi} sorotan={game.sorotan} />
          </div>

          <aside className="space-y-6" aria-label="Analisis harga dan budget">
            <PriceHistoryCard
              riwayat={game.riwayatHarga}
              hargaTerendah={game.hargaTerendah}
              hargaSekarangUsd={dealTermurah.hargaUsd}
              rate={rate}
            />
            <MiniBudgetCard hargaIdr={usdKeRupiah(dealTermurah.hargaUsd, rate)} />
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4">
              <p className="text-sm font-semibold">Garansi Harga Transparan</p>
              <p className="mt-1 text-xs text-stone-500">
                Harga diambil langsung dari toko resmi dan dikonversi dengan kurs ECB harian, tanpa
                mark-up atau biaya tersembunyi.
              </p>
            </div>
          </aside>
        </div>
      </>
    );
  }

  return (
    <main className="min-h-screen bg-stone-950 px-4 py-8 text-gray-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-stone-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <a href="/search" className="hover:text-stone-200">
                ← Katalog Game
              </a>
            </li>
            {game && (
              <>
                <li aria-hidden="true">/</li>
                <li>{game.kategori}</li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-stone-300">
                  {judulLengkap}
                </li>
              </>
            )}
          </ol>
        </nav>

        {isi}
      </div>
    </main>
  );
}

export default GameDetail;
