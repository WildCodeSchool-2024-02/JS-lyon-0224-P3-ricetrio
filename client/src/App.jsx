import { Outlet } from "react-router-dom";
import { useState } from "react";
import { UserProvider } from "./contexts/UserContext";
import "./app.css";

function App() {
  const [auth, setAuth] = useState(null);

  return (
    <UserProvider>
      <main>
        <Outlet context={{ auth, setAuth }} />
      </main>
    </UserProvider>
  );
}

export default App;
