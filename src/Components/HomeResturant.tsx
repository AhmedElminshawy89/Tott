import { Box, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../Styles/MadeForYou.css";
import hotels from "../assets/Images/re.png";
import wave from "../assets/Images/wave33.png";

const HomeResturant = () => {
  return (
    <Box
      px={["", null, "5"]}
      backgroundColor={useColorModeValue('#eee', '#2D2D2D')}
      width={{ base: "90%", sm: "98%" }}
      m={["60px auto", null, "80px auto"]}
      borderRadius={"20px"}
    >
      <Box className="flex justify-between  px-4">
        <Text
          color={"#CA933F"}
          fontWeight={"bold"}
          fontSize={["xl", "2xl", "3xl"]}
          pt={"10px"}
        >
          Resturants
        </Text>
        <Text
          color={"#CA933F"}
          fontWeight={"bold"}
          fontSize={["xl"]}
          mb={["2", "3", "4"]}
          pt={"10px"}
          cursor={"pointer"}
        >
          See More
        </Text>
      </Box>
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
        <SwiperSlide>
          <Box>
            <Image
              src={hotels}
              alt="Green double couch with wooden legs"
              position="relative"
              className="sm:w-full sm:h-full w-[80%] h-[80%] mx-auto"
              loading="lazy"
              py={"10px"}
            />
            <Box>
              <Image
                src={wave}
                alt="Green double couch with wooden legs"
                h={["100px", "118px", "108px"]}
                loading="lazy"
                py={"10px"}
                className="absolute bottom-0 rounded-br-[18%] rounded-bl-[18%]  sm:left-0 left-[10%] sm:w-full w-[80%]"
              />
              <Text className="relative text-center bottom-4 text-2xl font-bold">
                Four Seasons{" "}
              </Text>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box>
            <Image
              src={hotels}
              alt="Green double couch with wooden legs"
              position="relative"
              className="sm:w-full sm:h-full w-[80%] h-[80%] mx-auto"
              loading="lazy"
              py={"10px"}
            />
            <Box>
              <Image
                src={wave}
                alt="Green double couch with wooden legs"
                h={["100px", "118px", "108px"]}
                loading="lazy"
                py={"10px"}
                className="absolute bottom-0 rounded-br-[18%] rounded-bl-[18%]  sm:left-0 left-[10%] sm:w-full w-[80%]"
              />
              <Text className="relative text-center bottom-4 text-2xl font-bold">
                Four Seasons{" "}
              </Text>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box>
            <Image
              src={hotels}
              alt="Green double couch with wooden legs"
              position="relative"
              className="sm:w-full sm:h-full w-[80%] h-[80%] mx-auto"
              loading="lazy"
              py={"10px"}
            />
            <Box>
              <Image
                src={wave}
                alt="Green double couch with wooden legs"
                h={["100px", "118px", "108px"]}
                loading="lazy"
                py={"10px"}
                className="absolute bottom-0 rounded-br-[18%] rounded-bl-[18%]  sm:left-0 left-[10%] sm:w-full w-[80%]"
              />
              <Text className="relative text-center bottom-4 text-2xl font-bold">
                Four Seasons{" "}
              </Text>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box>
            <Image
              src={hotels}
              alt="Green double couch with wooden legs"
              position="relative"
              className="sm:w-full sm:h-full w-[80%] h-[80%] mx-auto"
              loading="lazy"
              py={"10px"}
            />
            <Box>
              <Image
                src={wave}
                alt="Green double couch with wooden legs"
                h={["100px", "118px", "108px"]}
                loading="lazy"
                py={"10px"}
                className="absolute bottom-0 rounded-br-[18%] rounded-bl-[18%]  sm:left-0 left-[10%] sm:w-full w-[80%]"
              />
              <Text className="relative text-center bottom-4 text-2xl font-bold">
                Four Seasons{" "}
              </Text>
            </Box>
          </Box>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Box>
            <Image
              src={hotels}
              alt="Green double couch with wooden legs"
              position="relative"
              className="sm:w-full sm:h-full w-[80%] h-[80%] mx-auto"
              loading="lazy"
              py={"10px"}
            />
            <Box>
              <Image
                src={wave}
                alt="Green double couch with wooden legs"
                h={["100px", "118px", "108px"]}
                loading="lazy"
                py={"10px"}
                className="absolute bottom-0 rounded-br-[18%] rounded-bl-[18%]  sm:left-0 left-[10%] sm:w-full w-[80%]"
              />
              <Text className="relative text-center bottom-4 text-2xl font-bold">
                Four Seasons{" "}
              </Text>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box>
            <Image
              src={hotels}
              alt="Green double couch with wooden legs"
              position="relative"
              className="sm:w-full sm:h-full w-[80%] h-[80%] mx-auto"
              loading="lazy"
              py={"10px"}
            />
            <Box>
              <Image
                src={wave}
                alt="Green double couch with wooden legs"
                h={["100px", "118px", "108px"]}
                loading="lazy"
                py={"10px"}
                className="absolute bottom-0 rounded-br-[18%] rounded-bl-[18%]  sm:left-0 left-[10%] sm:w-full w-[80%]"
              />
              <Text className="relative text-center bottom-4 text-2xl font-bold">
                Four Seasons{" "}
              </Text>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box>
            <Image
              src={hotels}
              alt="Green double couch with wooden legs"
              position="relative"
              className="sm:w-full sm:h-full w-[80%] h-[80%] mx-auto"
              loading="lazy"
              py={"10px"}
            />
            <Box>
              <Image
                src={wave}
                alt="Green double couch with wooden legs"
                h={["100px", "118px", "108px"]}
                loading="lazy"
                py={"10px"}
                className="absolute bottom-0 rounded-br-[18%] rounded-bl-[18%]  sm:left-0 left-[10%] sm:w-full w-[80%]"
              />
              <Text className="relative text-center bottom-4 text-2xl font-bold">
                Four Seasons{" "}
              </Text>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box>
            <Image
              src={hotels}
              alt="Green double couch with wooden legs"
              position="relative"
              className="sm:w-full sm:h-full w-[80%] h-[80%] mx-auto"
              loading="lazy"
              py={"10px"}
            />
            <Box>
              <Image
                src={wave}
                alt="Green double couch with wooden legs"
                h={["100px", "118px", "108px"]}
                loading="lazy"
                py={"10px"}
                className="absolute bottom-0 rounded-br-[18%] rounded-bl-[18%]  sm:left-0 left-[10%] sm:w-full w-[80%]"
              />
              <Text className="relative text-center bottom-4 text-2xl font-bold">
                Four Seasons{" "}
              </Text>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default HomeResturant;
