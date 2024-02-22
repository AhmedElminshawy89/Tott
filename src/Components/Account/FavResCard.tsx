import {
  Card,
  CardBody,
  Stack,
  Image,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import res from "../../assets/Images/res.png";
import { DeleteIcon } from "@chakra-ui/icons";

const FavResCard = () => {
  return (
    <Card maxW="300px" backgroundColor={"#2D2D2D"} p={2} marginTop={4}>
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
            >
              See Details
            </Button>
            <Button
              backgroundColor={"transparent"}
              variant={"outline"}
              border={"1px solid red"}
              className="xl:flex-1"
            >
              <DeleteIcon className="mr-2 text-sm" /> Remove
            </Button>
          </Box>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default FavResCard;
