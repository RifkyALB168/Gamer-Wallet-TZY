import "./index.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import FreeGames from "./pages/FreeGames";
import BudgetPlanner from "./pages/BudgetPlanner";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/free-games" element={<FreeGames />} />
        <Route path="/budget" element={<BudgetPlanner />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
