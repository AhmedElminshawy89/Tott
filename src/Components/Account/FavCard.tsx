import {
  Card,
  CardBody,
  Stack,
  Image,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import pool from "../../assets/Images/pool 1.png";
import { DeleteIcon } from "@chakra-ui/icons";

const FavCard = () => {
  return (
    <Card maxW="300px" backgroundColor={"#2D2D2D"} p={2} marginTop={4} color={'#fff'}>
      <Image
        height={{ base: "190px", sm: "210px", md: "195px" }}
        w="100%"
        src={pool}
        alt="Caffe Latte"
      />
      <Stack>
        <CardBody>
          <Text
            size="md"
            fontSize={"26px"}
            className="text-main-400"
            textAlign={"center"}
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
              color={'#fff'}
              _hover={{bg:'transparent'}}
            >
              See Details
            </Button>
            <Button
              backgroundColor={"transparent"}
              variant={"outline"}
              border={"1px solid red"}
              className="xl:flex-1"
              color={'#fff'}
              _hover={{bg:'transparent'}}
            >
              <DeleteIcon className="mr-2 text-sm text-red-500" /> Remove
            </Button>
          </Box>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default FavCard;
