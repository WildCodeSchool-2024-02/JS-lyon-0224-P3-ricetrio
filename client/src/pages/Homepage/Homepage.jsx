import NavBar from "../../components/Navbar/Navbar";
import MainCarousel from "../../components/Home/MainCarousel";
import FilmSection from "../../components/Home/FilmSection";

function Homepage() {
  return (
    <div>
      <NavBar />
      <MainCarousel />
      <FilmSection />
    </div>
  );
}

export default Homepage;
