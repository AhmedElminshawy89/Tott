import {
  Card,
  CardBody,
  Stack,
  Image,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import pool from "../../assets/Images/pool 1.png";
import date from "../../assets/Images/date.png";

const PlansCard = () => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      backgroundColor={"#2D2D2D"}
      color={'#fff'}
      p={2}
      marginTop={4}
    >
      <Image
        maxW={{ base: "100%", sm: "300px" }}
        className="img-plan"
        src={pool}
        alt="Caffe Latte"
        h={"180px"}
        my={"auto"}
      />

      <Stack>
        <CardBody>
          <Text
            size="md"
            fontSize={"30px"}
            fontWeight="800"
            className="text-main-400"
          >
            Hilton Alexandria Corniche
          </Text>

          <Text py="2" fontSize={"16px"}>
            Room type : Twin Room with Sea View
          </Text>
          <Flex gap={8} flexWrap={{ base: "wrap", lg: "nowrap" }}>
            <Box className="border-2 border-main-400 rounded-md p-1">
              <Text>Check In</Text>
              <Text className="flex gap-2">
                <Image src={date} w={5} h={5} />
                Tue, 10 OCT
              </Text>
            </Box>
            <Box className="border-2 border-main-400 rounded-md p-1">
              <Text>Check Out</Text>
              <Text className="flex gap-2">
                <Image src={date} w={5} h={5} />
                Tue, 10 OCT
              </Text>
            </Box>
          </Flex>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default PlansCard;
