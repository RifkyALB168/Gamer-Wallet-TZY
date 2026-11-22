export default function WishlistStatus({ status, error, actionError, refresh }) {
  if (status === "guest") {
    return <p className="mb-4 text-sm text-stone-400">Masuk ke akun untuk menyimpan game ke Wishlist.</p>;
  }
  if (status === "loading") {
    return <p role="status" className="mb-4 text-sm text-stone-400">Memuat Wishlist akun…</p>;
  }
  if (status === "error" || actionError) {
    return (
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-red-300">
        <p role="alert">{error || actionError}</p>
        {status === "error" && (
          <button type="button" onClick={refresh} className="rounded px-2 py-1 underline focus-visible:outline-2">
            Muat ulang Wishlist
          </button>
        )}
      </div>
    );
  }
  return null;
}
