import "./index.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import FreeGames from "./pages/FreeGames";
import BudgetPlanner from "./pages/BudgetPlanner";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import GameDetail from "./pages/GameDetail";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

function GameDetailRoute() {
  const { gameId } = useParams();
  return <GameDetail gameId={gameId} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/free-games" element={<FreeGames />} />
        <Route path="/budget" element={<BudgetPlanner />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/game/:gameId" element={<GameDetailRoute />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
