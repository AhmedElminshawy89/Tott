import {
  Card,
  CardBody,
  Stack,
  Image,
  Text,
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import res from "../../assets/Images/res.png";
import { DeleteIcon } from "@chakra-ui/icons";

const FavResCard = () => {
  return (
    <Card maxW="300px" backgroundColor={useColorModeValue('#eee', '#2D2D2D')}
      p={2} marginTop={4} color={'#fff'}>
      <Image
        height={{ base: "190px", sm: "210px", md: "195px" }}
        w="100%"
        src={res}
        alt="Caffe Latte"
      />
      <Stack>
        <CardBody>
          <Text
            size="md"
            fontSize={"26px"}
            color={useColorModeValue('black', 'white')} textAlign={"center"}
            marginTop={"-15px"}
          >
            Kato Dool
          </Text>
          <Box className="flex flex-wrap mt-5 gap-4 justify-center ">
            <Button
              backgroundColor={"transparent"}
              variant={"outline"}
              border={"1px solid #CA933F"}
              className="xl:flex-1"
              color={useColorModeValue('black', 'white')} _hover={{ bg: 'transparent' }}
            >
              See Details
            </Button>
            <Button
              backgroundColor={"transparent"}
              variant={"outline"}
              border={"1px solid red"}
              className="xl:flex-1"
              color={useColorModeValue('black', 'white')} _hover={{ bg: 'transparent' }}
            >
              <DeleteIcon className="mr-2 text-sm text-red-500" /> Remove
            </Button>
          </Box>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default FavResCard;
