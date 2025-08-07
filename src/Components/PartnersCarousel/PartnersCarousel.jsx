import React from "react";
import "./PartnersCarousel.css";

/*  Logolarni import qiling.
    File nomlarini o'zingizdagi papkaga moslang.
*/

import img1 from '/universities/img1.svg';
import img2 from '/universities/img2.svg';
import img3 from '/universities/img3.svg';
import img4 from '/universities/img4.webp';
import img5 from '/universities/img5.webp';
import img6 from '/universities/img6.webp';
import img7 from '/universities/img7.webp';
import img8 from '/universities/img8.png';

const logos = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
];

export default function PartnersCarousel() {
  /* Logolarni ikki marta qaytarib, uzluksiz aylanish hosil qilamiz */
  const seamless = [...logos, ...logos];

  return (
    <section className="partners-wrapper" data-intro-next>
      <div className="partners-track">
        {seamless.map((logo, i) => (
          <div className="partner-slide" key={i}>
            <img src={logo} alt="University logo" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
