import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Image,
  // Badge,
  // StarIcon,
} from "@chakra-ui/react";
const property = {
  imageUrl: "https://bit.ly/2Z4KKcF",
  imageAlt: "Rear view of modern home with pool",
  title: "Modern home in city center in the heart of historic Los Angeles",
  formattedPrice: "$1,900.00",
  reviewCount: 34,
  rating: 4,
};
import c1 from "../../assets/Images/c4.png";
const BoxCities = () => {
  return (
    <Box
      className=" relative"
      maxW="sm"
      borderWidth="2px"
      borderRadius="3xl"
      overflow="hidden"
      bg={"#2D2D2D"}
      color={"#fff"}
      borderStyle={"solid"}
      borderColor={"#CA933F"}
    >
      <Image src={c1} alt={property.imageAlt} />
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
          color={"#CA933F"}
          fontSize={"21px"}
        >
          {property.title}
        </Box>
        <Box
          mt="3"
          fontWeight="semibold"
          as="span"
          lineHeight="tight"
          noOfLines={4}
        >
          Enjoy gorgeous views of the Mediterranean Sea and historic
          surroundings at Hilton Alexandria Corniche. Set in the heart of the
          city, our hotel is steps from the Corniche beachfront walkway and
          minutes to Alexandria National Museum, Souk El-Attarine and Montazah
          Palace Gardens. Read more..
        </Box>
        <Box display="flex" mt="2" alignItems="center" gap={"4px"}>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} color={i < property.rating ? "#CA933F" : ""} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
        <Button
          display={"block"}
          mx={"auto"}
          mt={"25px"}
          width="80%"
          color="#fff"
          backgroundColor="#CA933F"
          borderRadius="20px"
          _hover={{ backgroundColor: "#bf8a3a" }}
        >
          {/* Show Prices */}
          Show Details
        </Button>
      </Box>
    </Box>
  );
};

export default BoxCities;

// <Box>
// {property.formattedPrice}
// <Box as='span' color='gray.600' fontSize='sm'>
//   / wk
// </Box>
// </Box>

{
  /* <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge> */
}
{
  /* <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box> */
}
