import { Box, Image, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../Styles/MadeForYou.css";
import siwa from "../assets/Images/siwa2.png";
import alex from "../assets/Images/Default.png";
import cairo from "../assets/Images/Group 3.png";
import aswan from "../assets/Images/Group 4.png";
import { Link } from "react-router-dom";

const HomeCities = () => {
  return (
    <Box
      px={["1", "3", "5"]}
      bg={"#2D2D2D"}
      width={{ base: "90%", sm: "98%" }}
      m={["60px auto", null, "80px auto"]}
      borderRadius={"20px"}
      p={2}
    >
      <Text
        color={"#CA933F"}
        fontWeight={"bold"}
        fontSize={["xl", "2xl", "3xl"]}
      >
        Cities
      </Text>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        breakpoints={{
          363: { slidesPerView: 1, spaceBetween: 0 },
          576: { slidesPerView: 2, spaceBetween: 0 },
          768: { slidesPerView: 3, spaceBetween: 0 },
          992: { slidesPerView: 4, spaceBetween: 0 },
          1200: { slidesPerView: 5, spaceBetween: 0 },
          1400: { slidesPerView: 6, spaceBetween: 0 },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <Box as={Link} to={"/cities"}>
            <Image
              src={alex}
              alt="Green double couch with wooden legs"
              position="relative"
              h={"80%"}
              w={{ base: "70%", sm: "80%" }}
              mx={"auto"}
              loading="lazy"
              py={"10px"}
            />
          </Box>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Box as={Link} to={"/cities"}>
            <Image
              src={aswan}
              alt="Green double couch with wooden legs"
              position="relative"
              h={"80%"}
              w={{ base: "70%", sm: "80%" }}
              mx={"auto"}
              loading="lazy"
              py={"10px"}
            />
          </Box>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Box as={Link} to={"/cities"}>
            <Image
              src={cairo}
              alt="Green double couch with wooden legs"
              position="relative"
              h={"80%"}
              w={{ base: "70%", sm: "80%" }}
              mx={"auto"}
              loading="lazy"
              py={"10px"}
            />
          </Box>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Box as={Link} to={"/cities"}>
            <Image
              src={siwa}
              alt="Green double couch with wooden legs"
              position="relative"
              h={"80%"}
              w={{ base: "70%", sm: "80%" }}
              mx={"auto"}
              loading="lazy"
              py={"10px"}
            />
          </Box>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Box as={Link} to={"/cities"}>
            <Image
              src={alex}
              alt="Green double couch with wooden legs"
              position="relative"
              h={"80%"}
              w={{ base: "70%", sm: "80%" }}
              mx={"auto"}
              loading="lazy"
              py={"10px"}
            />
          </Box>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Box as={Link} to={"/cities"}>
            <Image
              src={alex}
              alt="Green double couch with wooden legs"
              position="relative"
              h={"80%"}
              w={{ base: "70%", sm: "80%" }}
              mx={"auto"}
              loading="lazy"
              py={"10px"}
            />
          </Box>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Box as={Link} to={"/cities"}>
            <Image
              src={alex}
              alt="Green double couch with wooden legs"
              position="relative"
              h={"80%"}
              w={{ base: "70%", sm: "80%" }}
              mx={"auto"}
              loading="lazy"
              py={"10px"}
            />
          </Box>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Box as={Link} to={"/cities"}>
            <Image
              src={alex}
              alt="Green double couch with wooden legs"
              position="relative"
              h={"80%"}
              w={{ base: "70%", sm: "80%" }}
              mx={"auto"}
              loading="lazy"
              py={"10px"}
            />
          </Box>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Box as={Link} to={"/cities"}>
            <Image
              src={alex}
              alt="Green double couch with wooden legs"
              position="relative"
              h={"80%"}
              w={{ base: "70%", sm: "80%" }}
              mx={"auto"}
              loading="lazy"
              py={"10px"}
            />
          </Box>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Box as={Link} to={"/cities"}>
            <Image
              src={alex}
              alt="Green double couch with wooden legs"
              position="relative"
              h={"80%"}
              w={{ base: "70%", sm: "80%" }}
              mx={"auto"}
              loading="lazy"
              py={"10px"}
            />
          </Box>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Box as={Link} to={"/cities"}>
            <Image
              src={alex}
              alt="Green double couch with wooden legs"
              position="relative"
              h={"80%"}
              w={{ base: "70%", sm: "80%" }}
              mx={"auto"}
              loading="lazy"
              py={"10px"}
            />
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default HomeCities;
