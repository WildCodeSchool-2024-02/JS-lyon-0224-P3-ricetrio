import "./App.css";
import NavBar from "./components/Navbar";
import Forget from "./pages/Forget/Forget";
import Inscription from "./pages/SignUp/Inscription";
import Signin from "./pages/SignIn/Signin";

function App() {
  return (
    <main className="container">
      <header>
        <NavBar />
      </header>
      <Inscription />
      <Signin />
      <Forget />
    </main>
  );
}

export default App;
