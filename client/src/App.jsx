import "./App.css";
import Forget from "./pages/Forget/Forget";
import MainCarousel from "./components/MainCarousel";

function App() {
  return (
    <main className="container">
      <MainCarousel />
      <Forget />
    </main>
  );
}

export default App;
