import { Box, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../Styles/MadeForYou.css";
import BosxRecommended from "./Boxes/BosxRecommended";

const Recommended = () => {
  const numberOfSlides = 12;

  const generateSlides = () => {
    const slides = [];
    for (let i = 0; i < numberOfSlides; i++) {
      slides.push(
        <SwiperSlide key={i}>
          <BosxRecommended />
        </SwiperSlide>
      );
    }
    return slides;
  };

  return (
    <Box
      mt={["60px", null, "80px"]}
      px={["4", null, "5"]}
      mb={["60px", null, "80px"]}
    >
      <Text
        color={"#CA933F"}
        fontWeight={"bold"}
        fontSize={["xl", "2xl", "3xl"]}
        mb={["4", "6", "8"]}
      >
        Highly Recommended Tours
      </Text>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          363: { slidesPerView: 1, spaceBetween: 10 },
          576: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          992: { slidesPerView: 4, spaceBetween: 20 },
          1200: { slidesPerView: 5, spaceBetween: 30 },
          1400: { slidesPerView: 6, spaceBetween: 30 },
        }}
        className="mySwiper"
      >
        {generateSlides()}
      </Swiper>
    </Box>
  );
};

export default Recommended;
