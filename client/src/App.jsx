import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./contexts/UserContext";
import { FavoritesProvider } from "./contexts/FavoriteContext";
import "./app.css";

function App() {
  const [auth, setAuth] = useState(null);

  return (
    <UserProvider>
      <FavoritesProvider>
        <main>
          <Outlet context={{ auth, setAuth }} />
        </main>
        <ToastContainer
          // Classe CSS pour le style des toasts
          toastClassName="toastBody"
          // Classe CSS pour le style du conteneur de toasts
          className="toastStyle"
          // Position du toast dans la fenêtre
          position="bottom-right"
          // Durée d'affichage du toast avant de disparaître (en millisecondes)
          autoClose={5000}
          // Afficher ou non la barre de progression du toast
          hideProgressBar={false}
          // Afficher le toast le plus récent au-dessus des plus anciens
          newestOnTop={false}
          // Permet de fermer le toast en cliquant dessus
          closeOnClick
          // Direction du texte (de droite à gauche ou de gauche à droite)
          rtl={false}
          // Pause lors de la perte de focus
          pauseOnFocusLoss
          // Permet de faire glisser le toast pour le fermer
          draggable
          // Pause lors du survol du toast
          pauseOnHover
          // Thème des toasts (clair ou sombre)
          theme="dark"
          // Transition du toast (effet de transition)
          transition:Bounce // Effet de transition pour les toasts
        />
      </FavoritesProvider>
    </UserProvider>
  );
}

export default App;
