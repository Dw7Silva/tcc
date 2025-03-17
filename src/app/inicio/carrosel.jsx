"use client";

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const Carousel = ({ images }) => {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Splide
        options={{ perPage: 1, gap: "1rem", autoplay: true, interval: 5000 }}
        style={{ margin: "0 auto" }}
      >
        {images.map((img, index) => (
          <SplideSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              style={{ borderRadius: "10px" }} // Adicione esta linha
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Carousel;