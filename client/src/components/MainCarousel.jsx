import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import japan from "../assets/images/japan.png";
import moutain from "../assets/images/mountain.png";
import ricegirl from "../assets/images/ricegirl.png";
import vietnam from "../assets/images/vietnam.png";

function CarouselPage() {
  return (
    <Carousel>
      <div>
        <img src={japan} alt="null" />
        <p className="legend">Izakaya in Japan</p>
      </div>
      <div>
        <img src={moutain} alt="null" />
        <p className="legend">Moutain in somewhere</p>
      </div>
      <div>
        <img src={ricegirl} alt="null" />
        <p className="legend">Smiling rice girl</p>
      </div>
      <div>
        <img src={vietnam} alt="null" />
        <p className="legend">Somewhere in Vietnam</p>
      </div>
    </Carousel>
  );
}

export default CarouselPage;
