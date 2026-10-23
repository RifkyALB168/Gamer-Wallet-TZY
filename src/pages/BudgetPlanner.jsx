import { mockGames } from "../data/mockGames";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { totalHargaGameTerpilih } from "../utils/tabungan";

export function BudgetPlanner({ games: gamesAwal }) {
  const [games, setGames] = useState(() =>
    (gamesAwal ?? mockGames).map((game) => ({ ...game })),
  );
  const [pesanHitung, setPesanHitung] = useState("");
  const timelineRef = useRef(null);


  const { rate, date, loading, error, source, refresh } = useExchangeRate();
  const totalWishlist = useMemo(
    () => totalHargaGameTerpilih(games, rate ?? 0),
    [games, rate],
  );

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Kalkulator Nabung
            </h1>
          </div>
        </header>


      </div>
    </main>
  );
}

export default BudgetPlanner;
