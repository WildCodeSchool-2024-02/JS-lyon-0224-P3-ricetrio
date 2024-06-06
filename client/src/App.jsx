import "./App.css";
import Inscription from "./pages/SignUp/Inscription";
import Signin from "./pages/SignIn/Signin";

function App() {
  return (
    <main className="container">
      <Inscription />
      <Signin />
    </main>
  );
}

export default App;
