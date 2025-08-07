import React from "react";
import Slider from "react-slick";
import "./TestimonialCarousel2.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const slides = [
  {
    img: "/universities/img7.webp",
    name: "Farruh Sobirov",
    quote: "Acedemix made my dream of studying abroad a reality! From helping me choose the ideal university to guiding me through the visa application process, their team was by my side every step of the way. Thanks to their unwavering support, I’m now thriving at Vistula University."
  },
  {
    img: "/universities/img10.png",
    name: "Sharipov Ziyodullokhon",
    quote: "Academix transformed my aspiration to study overseas into a tangible achievement! Their expert advisors walked me through everything—from narrowing down the best-fit university to navigating the visa paperwork—and now I’m flourishing at Istanbul Aydin University thanks to their exceptional guidance."
  }
];

    const truncateWords = (text, limit = 40) => {
    const words = text.split(/\s+/);
    return words.length > limit
        ? words.slice(0, limit).join(" ") + "…"
        : text;
    };

export default function TestimonialCarousel2() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  return (
    <section className="carouselWrapper-cardTesti2">
      <Slider {...settings}>
        {slides.map(({ img, name, quote }, i) => (
          <div className="testimonialCard-cardTesti2" key={i}>
            <div
              className="bgHolder-cardTesti2"
              style={{ backgroundImage: `url(${img})`, backgroundSize: "50%", backgroundRepeat: "no-repeat"  }}
            >
              <div className="overlay-cardTesti2">
                <h3 className="studentName-cardTesti2">{name}</h3>
                <p className="studentQuote-cardTesti2">{truncateWords(quote, 25)}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}