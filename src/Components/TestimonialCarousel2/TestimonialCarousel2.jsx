import React from "react";
import Slider from "react-slick";
import "./TestimonialCarousel2.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const slides = [
  {
    img: "https://www.oxfordscholastica.com/wp-content/uploads/2023/07/cambridge-college.jpg",
    name: "Bekzod Tursunov",
    quote:
      "Studycare jamoasi hayratlanarli! Ularning professionalligi va tafsilotlarga eʼtibori mening arizamning muvoffaqiyatli bo‘lishini taʼminladi. Men Studycare Uzbekistan’ni chet elda o‘qishni rejalashtirayotgan har bir kishiga tavsiya qilaman. rejalashtirayotgan har bir kishiga tavsiya qilaman. rejalashtirayotgan har bir kishiga tavsiya qilaman. rejalashtirayotgan har bir kishiga tavsiya qilaman.",
  },
  {
    img: "https://www.oxfordscholastica.com/wp-content/uploads/2023/07/cambridge-college.jpg",
    name: "Sabina Karimova",
    quote:
      "Ular talabalarga mos stipendiya topishda yordamlashdi hamda intervyuga tayyorlab qo‘ydilar. Natijada men UCL’ga qabul qilindim.",
  },
  // ...istalgancha slayd
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
              style={{ backgroundImage: `url(${img})` }}
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