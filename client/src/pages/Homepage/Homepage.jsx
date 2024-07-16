import NavBar from "../../components/Navbar/Navbar";
import CarouselWrapper from "../../components/Home/CarouselWrapper";
import FilterSection from "../../components/Home/FilterSection";
import Searchbar from "../../components/Searchbar/Searchbar";

function Homepage() {
  return (
    <div>
      <NavBar />
      <CarouselWrapper />
      <Searchbar />
      <FilterSection />
    </div>
  );
}

export default Homepage;
