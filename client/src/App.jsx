import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./contexts/UserContext";
import "./app.css";

function App() {
  const [auth, setAuth] = useState(null);

  return (
    <UserProvider>
      <main>
        <Outlet context={{ auth, setAuth }} />
      </main>
      <ToastContainer
        toastClassName="toastBody"
        className="toastStyle"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </UserProvider>
  );
}

export default App;
