"use client";

import React, { useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const Carousel = ({ images }) => {
  useEffect(() => {
    const splide = document.querySelector(".splide");
    if (splide) {
      const pagination = splide.querySelector(".splide__pagination");
      if (pagination) {
        pagination.style.marginTop = "1%";
      }

      const bullets = splide.querySelectorAll(".splide__pagination__page");
      bullets.forEach((bullet) => {
        bullet.style.width = "5px";
        bullet.style.height = "5px";
      });
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "2% 2%",

      
      }}
    >
      <Splide
        options={{
          perPage: 1,
          gap: "1rem",
          autoplay: true,
          interval: 5000,
          loop: true,
          pagination: true,
          paginationKeyboard:true,
          width: "90%",
          height: "600px",
          keyboard: true,
          breakpoints: {
            1200: {
              height: "450px",
            },
            480: {
              height: "300px",
            },
          },
        }}
        style={{ margin: "0 auto",  borderRadius: "15px" }}
      >
        {images.map((img, index) => (
          <SplideSlide key={index}>
            <img
              src={images[index]}
              alt={`Slide ${index + 1}`}
              style={{
                borderRadius: "15px",
                width: "100%",
                height: "100%",
                objectFit: "cover", 
                objectPosition: "center", 

              }}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Carousel;