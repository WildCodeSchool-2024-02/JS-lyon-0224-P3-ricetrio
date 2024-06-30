import NavBar from "../../components/Navbar/Navbar";
import MainCarousel from "../../components/Home/MainCarousel";
import FilterSection from "../../components/Home/FilterSection";

function Homepage() {
  return (
    <div>
      <NavBar />
      <MainCarousel />
      <FilterSection />
    </div>
  );
}

export default Homepage;
