import NavBar from "../../components/Navbar/Navbar";
import CarouselWrapper from "../../components/Home/CarouselWrapper";
import FilterSection from "../../components/Home/FilterSection";

function Homepage() {
  return (
    <div>
      <NavBar />
      <CarouselWrapper />
      <FilterSection />
    </div>
  );
}

export default Homepage;
