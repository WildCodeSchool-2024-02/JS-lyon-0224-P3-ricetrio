import "./App.css";
import NavBar from "./components/Navbar";
import Forget from "./pages/Forget/Forget";

function App() {
  return (
    <main className="container">
      <header>
        <NavBar />
      </header>
      <footer>
        Développé par la&nbsp;
        <a
          href="https://www.wildcodeschool.com/"
          className="wcs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wild Code School
        </a>
      </footer>
      <Forget />
    </main>
  );
}

export default App;
