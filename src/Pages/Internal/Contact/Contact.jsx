// src/Pages/Internal/Contact/Contact.jsx
import React from "react";
import "./Contact.css";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import InquiryForm from "../../../Components/InquiryForm/InquiryForm";
import TestimonialCarousel2 from "../../../Components/TestimonialCarousel2/TestimonialCarousel2";
import BackgroundGrid from "./BackgroundGrid";

export default function Contact() {
  return (
    <div className="contact-wrapper">
      {/* 1) Background grid */}
      <BackgroundGrid />

      {/* 2) Main content */}
      <div className="conBaseBox">
        <Header />

        <div style={{ marginTop: "100px" }}>
          <div id="statsHeadTit">
            <div>
              <strong>Consultation Request Form</strong>
              <span>
                Please complete the form below to request a consultation with
                our academic advisors. <br />
                We’ll contact you shortly after we receive your submission!
              </span>
            </div>
          </div>

          <div className="formCon">
            <InquiryForm />
            <TestimonialCarousel2 />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}