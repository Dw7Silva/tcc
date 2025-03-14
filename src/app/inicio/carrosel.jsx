"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // Adiciona as setas
    prevArrow: <button>Anterior</button>, // Personaliza a seta anterior
    nextArrow: <button>Próximo</button>, // Personaliza a seta próxima
  };

  return (
    <Slider {...settings}>
      <div><h3>Slide 1</h3></div>
      <div><h3>Slide 2</h3></div>
      <div><h3>Slide 3</h3></div>
    </Slider>
  );
};

export default Carousel;
