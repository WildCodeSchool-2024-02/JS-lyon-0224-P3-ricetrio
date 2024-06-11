import "./App.css";
import NavBar from "./components/Navbar";
import Forget from "./pages/Forget/Forget";
import EmblaCarousel from "./components/Home/EmblaCarousel";

function App() {
  return (
    <main className="container">
      <header>
        <NavBar />
      </header>
      <EmblaCarousel />
      <Forget />
    </main>
  );
}

export default App;
