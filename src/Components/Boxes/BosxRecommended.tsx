import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import img from "../../assets/Images/madeforyou1.png";
import { useState } from "react";

const BoxRecommended = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  // boxShadow='3px 1px 12px 4px #444'
  return (
    <Card
      maxW="sm"
      borderRadius="30px"
      my={"15px"}
      backgroundColor="#2D2D2D"
      border="1px solid #CA933F"
    >
      <CardBody>
        <Image
          src={img}
          alt="Green double couch with wooden legs"
          borderRadius="xl"
          position="relative"
          height={{ base: "150px", sm: "160px", md: "115px" }}
          w="100%"
          loading="lazy"
        />
        <Button
          position={"absolute"}
          top={"20px"}
          right={"10px"}
          backgroundColor={"transparent"}
          _hover={isClicked ? {} : { bg: "transparent" }}
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="44"
            viewBox="0 0 47 44"
            fill="none"
          >
            <path
              d="M20.9847 36.3411L20.984 36.3405C15.931 32.0509 11.7783 28.5209 8.88314 25.2049C5.99216 21.8938 4.41666 18.8637 4.41666 15.5833C4.41666 10.2256 8.89978 6 14.6875 6C17.9557 6 21.0921 7.4268 23.1314 9.65122L23.5 10.0532L23.8685 9.65122C25.9079 7.4268 29.0443 6 32.3125 6C38.1002 6 42.5833 10.2256 42.5833 15.5833C42.5833 18.8637 41.0078 21.8938 38.1168 25.2049C35.2216 28.5209 31.069 32.0509 26.016 36.3405L26.0153 36.3411L23.5 38.4847L20.9847 36.3411Z"
              fill={`${isClicked ? "red" : "white"}`}
              stroke="none"
            />
          </svg>
        </Button>
        <Stack mt="3" spacing="2">
          <Heading color="white" size="md">
            Living room Sofa
          </Heading>
          <Text color="white">
            This sofa is perfect for modern tropical spaces
          </Text>
          <Text color="white" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default BoxRecommended;
