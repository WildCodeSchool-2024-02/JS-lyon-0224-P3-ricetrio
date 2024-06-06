import "./App.css";
import NavBar from "./components/Navbar";
import Forget from "./pages/Forget/Forget";
import MainCarousel from "./components/Home/MainCarousel";

function App() {
  return (
    <main className="container">
      <header>
        <NavBar />
      </header>
      <MainCarousel />
      <Forget />
    </main>
  );
}

export default App;
