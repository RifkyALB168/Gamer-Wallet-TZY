// Serverless proxy GamerPower untuk production (Vercel).
// Frontend memanggil /api/gamerpower/giveaways?sort-by=date,
// fungsi ini meneruskannya ke https://www.gamerpower.com/api/giveaways?sort-by=date
export default async function handler(req, res) {
  const { path = [], ...query } = req.query;
  const sub = [].concat(path).join("/");
  const qs = new URLSearchParams(query).toString();
  const url = `https://www.gamerpower.com/api/${sub}${qs ? `?${qs}` : ""}`;

  try {
    const upstream = await fetch(url);
    const body = await upstream.text();
    res.setHeader(
      "Content-Type",
      upstream.headers.get("content-type") || "application/json"
    );
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=300");
    res.status(upstream.status).send(body);
  } catch {
    res.status(502).json({ message: "Gagal menghubungi GamerPower." });
  }
}