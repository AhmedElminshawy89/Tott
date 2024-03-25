import {
  Card,
  CardBody,
  Stack,
  Image,
  Text,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import pool from "../../assets/Images/pool 1.png";
import date from "../../assets/Images/date.png";

const PlansCard = () => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      backgroundColor={useColorModeValue('#eee', '#2D2D2D')}
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
            color={useColorModeValue('black', 'white')}          >
            Hilton Alexandria Corniche
          </Text>

          <Text py="2" fontSize={"16px"} color={useColorModeValue('black', 'white')}>
            Room type : Twin Room with Sea View
          </Text>
          <Flex gap={8} flexWrap={{ base: "wrap", lg: "nowrap" }}>
            <Box className="border-2 border-main-400 rounded-md p-1" >
              <Text color={useColorModeValue('black', 'white')}>Check In</Text>
              <Text color={useColorModeValue('black', 'white')} className="flex gap-2">
                <Image src={date} w={5} h={5} />
                Tue, 10 OCT
              </Text>
            </Box>
            <Box className="border-2 border-main-400 rounded-md p-1">
              <Text color={useColorModeValue('black', 'white')}>Check Out</Text>
              <Text color={useColorModeValue('black', 'white')} className="flex gap-2">
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
