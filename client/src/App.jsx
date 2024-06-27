import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./app.css";

function App() {
  const [auth, setAuth] = useState(null);

  console.log(auth);
  return (
    <main>
      <Outlet context={{ auth, setAuth }} />
    </main>
  );
}

export default App;
