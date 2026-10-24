const API_BASE = "/api/gamerpower";

export async function getGiveaways({ signal } = {}) {
  const response = await fetch(`${API_BASE}/giveaways?sort-by=date`, { signal });

  if (!response.ok) {
    throw new Error(`Gagal mengambil data GamerPower (HTTP ${response.status}).`);
  }

  const data = await response.json();

  // untuk mencegah error bila respons bukan array, misal respons error dari API
  // berguna bila API GamerPower sedang down atau ada masalah lain
  if (!Array.isArray(data)) {
    throw new Error(
      data?.status_message ||
        data?.message ||
        "Format data dari GamerPower tidak sesuai."
    );
  }

  return data.filter((item) => {
    const status = String(item?.status ?? "Active").toLowerCase();
    return status === "active";
  });
}