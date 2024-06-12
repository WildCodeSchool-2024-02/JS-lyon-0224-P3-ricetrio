import "./App.module.css";
import NavBar from "./components/Navbar/Navbar";
import Forget from "./pages/Forget/Forget";
import EmblaCarousel from "./components/Home/EmblaCarousel";
import VideoSection from "./components/Home/VideoSection";

function App() {
  return (
    <main className="container">
      <header>
        <NavBar />
      </header>
      <EmblaCarousel />
      <VideoSection />
      <Forget />
    </main>
  );
}

export default App;
