import "./App.css";
import Inscription from "./pages/SignUp/Inscription";
import Signin from "./pages/SignIn/Signin";
import Forget from "./pages/Forget/Forget";

function App() {
  return (
    <main className="container">
      <Inscription />
      <Signin />
      <Forget />
    </main>
  );
}

export default App;
