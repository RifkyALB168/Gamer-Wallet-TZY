/**
 * Deskripsi singkat game dan tiga sorotan isinya.
 *
 * @param {object} props
 * @param {string} props.judul judul lengkap game
 * @param {string} props.deskripsi
 * @param {Array<{ ikon: string, judul: string, teks: string }>} props.sorotan
 */
export function GameAbout({ judul, deskripsi, sorotan }) {
  return (
    <section
      aria-labelledby="judul-tentang-game"
      className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5"
    >
      <h2 id="judul-tentang-game" className="text-lg font-semibold">
        Tentang {judul}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-stone-400">{deskripsi}</p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {sorotan.map((item) => (
          <li key={item.judul} className="rounded-xl border border-stone-800 bg-stone-950/40 p-3">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <span aria-hidden="true" className="text-emerald-400">
                {item.ikon}
              </span>
              {item.judul}
            </p>
            <p className="mt-1 text-xs text-stone-500">{item.teks}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default GameAbout;
