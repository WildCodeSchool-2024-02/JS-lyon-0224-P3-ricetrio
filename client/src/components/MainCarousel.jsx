import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import japan from "../assets/images/japan";
import moutain from "../assets/images/moutain";
import ricegirl from "../assets/images/ricegirl"; 
import vietnam from "../assets/images/vietnam" ;

export default class DemoCarousel extends Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img src={japan} alt="null"/>
                    <p className="legend">Izakaya in Japan</p>
                </div>
                <div>
                    <img src={moutain} alt="null" />
                    <p className="legend">Moutain in somewhere</p>
                </div>
                <div>
                    <img src={ricegirl} alt="null"/>
                    <p className="legend">Smiling rice girl</p>
                </div>
                <div>
                    <img src={vietnam} alt="null" />
                    <p className="legend">Somewhere in Vietnam</p>
                </div>
            </Carousel>
        );
    }
});

const container = document.querySelector('.demo-carousel');
const root = createRoot(container);
root.render(<DemoCarousel />);