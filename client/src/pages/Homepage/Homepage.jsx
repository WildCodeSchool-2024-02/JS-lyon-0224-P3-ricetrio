import NavBar from "../../components/Navbar/Navbar";
import FilmSection from "../../components/Home/FilmSection";
import CarouselWrapper from "../../components/Home/CarouselWrapper";

function Homepage() {
  return (
    <div>
      <NavBar />
      <CarouselWrapper />

      <FilmSection />
    </div>
  );
}

export default Homepage;
