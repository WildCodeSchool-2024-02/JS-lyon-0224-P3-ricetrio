import { Outlet } from "react-router-dom";
import styles from "./app.module.css";

function App() {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
}

export default App;
