import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

import frame from "../assets/Images/Greyframe.png";
import { slides } from "../assets/data";

import "../Styles/Swiper.css";

const HomeSwiper = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        effect="fade"
        loop={true}
        pagination={{
          // dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="SwiperHome"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-content">
              <p className="content-txt">
                {slide.title}
                <br />
                {slide.description}
              </p>
              <img
                className="img-slider"
                src={slide.image}
                alt={`Nature ${slide.id}`}
                loading="lazy"
              />
              <img
                className="img-frame"
                src={frame}
                alt={`Frame ${slide.id}`}
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSwiper;
