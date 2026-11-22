import { useState } from "react";
import { Link } from "react-router-dom";
import PriceIDR from "../PriceIDR";

const tombol = "rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-[#00E292] disabled:opacity-60";

export default function WishlistItem({ item, rate, busy, onRemove, onSaveNote }) {
  const [editing, setEditing] = useState(false);
  const inputId = `note-${item.id}`;

  async function simpanCatatan(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (await onSaveNote(item.id, data.get("note"))) setEditing(false);
  }

  return (
    <li className="px-4 py-4 sm:px-6">
      <div className="flex items-start gap-3 sm:items-center sm:gap-4">
        <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-[#23242C] sm:size-16">
          {item.coverUrl && (
            <img src={item.coverUrl} alt="" loading="lazy" className="size-full object-cover" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-sm font-semibold sm:text-base">
            <Link to={`/game/${item.gameId}`} className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-[#00E292]">
              {item.title}
            </Link>
          </h3>
          <p className="mt-1 break-words whitespace-pre-wrap text-xs text-[#9CA3AF]">
            {item.note || "Belum ada catatan"}
          </p>
        </div>
        <PriceIDR usd={item.priceUsd} rate={rate} className="shrink-0 font-mono text-sm font-bold text-[#00E292] sm:text-base" />
      </div>

      {editing ? (
        <form onSubmit={simpanCatatan} className="mt-3 space-y-2">
          <label htmlFor={inputId} className="block text-sm font-medium">Catatan untuk {item.title}</label>
          <textarea
            id={inputId}
            name="note"
            rows={2}
            maxLength={500}
            defaultValue={item.note}
            disabled={busy}
            className="block w-full rounded-lg border border-[#343640] bg-[#14151B] px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-[#00E292]"
          />
          <div className="flex gap-2">
            <button type="submit" disabled={busy} className={`${tombol} bg-[#00E292] text-[#14151B]`}>
              Simpan catatan
            </button>
            <button type="button" disabled={busy} onClick={() => setEditing(false)} className={tombol}>
              Batal
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-2 flex justify-end gap-2">
          <button type="button" disabled={busy} onClick={() => setEditing(true)} className={`${tombol} bg-[#23242C]`}>
            Edit catatan
          </button>
          <button type="button" disabled={busy} onClick={() => onRemove(item.id)} aria-label={`Hapus ${item.title} dari Wishlist`} className={`${tombol} text-red-300 hover:bg-red-500/10`}>
            Hapus
          </button>
        </div>
      )}
    </li>
  );
}
