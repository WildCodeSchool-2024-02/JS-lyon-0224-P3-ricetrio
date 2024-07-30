// Importation des composants nécessaires pour la page d'accueil
import NavBar from "../../components/Navbar/Navbar";
import CarouselWrapper from "../../components/Home/CarouselWrapper";
import FilterSection from "../../components/Home/FilterSection";
import Searchbar from "../../components/Searchbar/Searchbar";

// Définition du composant Homepage
function Homepage() {
  return (
    <div>
      {/* Inclusion de la barre de navigation */}
      <NavBar />
      {/* Inclusion du carrousel d'images ou de vidéos */}
      <CarouselWrapper />
      {/* Inclusion de la barre de recherche */}
      <Searchbar />
      {/* Inclusion de la section de filtrage */}
      <FilterSection />
    </div>
  );
}

// Exportation du composant Homepage
export default Homepage;
