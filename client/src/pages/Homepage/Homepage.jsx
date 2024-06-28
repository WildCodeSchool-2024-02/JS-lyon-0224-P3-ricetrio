import NavBar from "../../components/Navbar/Navbar";
import FilmSection from "../../components/Home/FilmSection";
import SecondCarousel from "../../components/Home/SecondCarousel";

function Homepage() {
  return (
    <div>
      <NavBar />
      <SecondCarousel />
      <FilmSection />
    </div>
  );
}

export default Homepage;
