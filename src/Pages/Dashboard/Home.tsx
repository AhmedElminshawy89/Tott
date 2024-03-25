import {
  // Avatar,
  Box,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { FaCity, FaPlaceOfWorship } from "react-icons/fa";

import { MdCategory, MdOutlineRateReview } from "react-icons/md";
import { useFetchPlaceQuery } from "../../app/feature/PlaceSlice";
import { useFetchCityQuery } from "../../app/feature/CitySlice";
import { useFetchCategoryQuery } from "../../app/feature/CategorySlice";
import { useFetchReviewQuery } from "../../app/feature/ReviewSlice";
import DashboardHomeSkeleton from "./DashboardHomeSkeleton";
const Dashboard = () => {
  const { data,isLoading,error } = useFetchPlaceQuery("");
  const { data:dataCity } = useFetchCityQuery("");
  const { data:dataCategory } = useFetchCategoryQuery("");
  const { data:datareview } = useFetchReviewQuery("");
  if(error) return <h1>Error</h1>
  if(isLoading) return <DashboardHomeSkeleton/>
  return (
    <Box>
      <Box className="flex items-center justify-between flex-wrap gap-8">
        <Box className="bg-white flex-1 p-4 rounded-xl shadow-xl">
          <Flex alignItems={"center"} gap={8} justifyContent={"space-between"}>
            <Box>
              <Text className=" text-[#67748e] text-2xl font-semibold">
                Categoris
              </Text>
              <Text className="text-[#344767] text-lg font-medium">{dataCategory?.Categories?.data?.length}</Text>
            </Box>
            <Box className="bg-gradient-to-br from-[#ca933f] to-[#cfb285] shadow-lg p-2 rounded-lg">
              <MdCategory className="text-4xl text-white" />
            </Box>
          </Flex>
        </Box>
        <Box className="bg-white flex-1 p-4 rounded-xl shadow-xl">
          <Flex alignItems={"center"} gap={8} justifyContent={"space-between"}>
            <Box>
              <Text className=" text-[#67748e] text-2xl font-semibold">
                Cities
              </Text>
              <Text className="text-[#344767] text-lg font-medium">{dataCity?.Cities?.data?.length}</Text>
            </Box>
            <Box className="bg-gradient-to-br from-[#ca933f] to-[#cfb285] shadow-lg p-2 rounded-lg">
              <FaCity className="text-4xl text-white" />
            </Box>
          </Flex>
        </Box>
        <Box className="bg-white flex-1 p-4 rounded-xl shadow-xl">
          <Flex alignItems={"center"} gap={8} justifyContent={"space-between"}>
            <Box>
              <Text className=" text-[#67748e] text-2xl font-semibold">
                Places
              </Text>
              <Text className="text-[#344767] text-lg font-medium">{data?.Places?.data?.length}</Text>
            </Box>
            <Box className="bg-gradient-to-br from-[#ca933f] to-[#cfb285] shadow-lg p-2 rounded-lg">
              <FaPlaceOfWorship className="text-4xl text-white" />
            </Box>
          </Flex>
        </Box>
        <Box className="bg-white flex-1 p-4 rounded-xl shadow-xl">
          <Flex alignItems={"center"} gap={8} justifyContent={"space-between"}>
            <Box>
              <Text className=" text-[#67748e] text-2xl font-semibold">
                Review
              </Text>
              <Text className="text-[#344767] text-lg font-medium">{datareview?.Rating?.data?.length}</Text>
            </Box>
            <Box className="bg-gradient-to-br from-[#ca933f] to-[#cfb285] shadow-lg p-2 rounded-lg">
              <MdOutlineRateReview className="text-4xl text-white" />
            </Box>
          </Flex>
        </Box>
      </Box>
      <TableContainer
        bg={"white"}
        borderRadius={"10px"}
        p={2}
        color={"#000"}
        fontSize={"18px"}
        my={12}
      >
        <Table variant="solid" border={'1px solid #eee'}>
          <TableCaption>Places</TableCaption>
          <Thead bg={'gray.100'}>
            <Tr>
              <Th>ID</Th>
              <Th>Place Name</Th>
              <Th>Describtion</Th>
              <Th>Image</Th>
              <Th>City Id</Th>
              <Th>Category Name</Th>
              <Th>Longitude</Th>
              <Th>Latitude</Th>
            </Tr>
          </Thead>
          <Tbody>
          {data && data.Places && data.Places.data && data.Places.data.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.Places.data.map((userData: any, i: number) => (
              <Tr key={i} border={"1px solid #eee"}>
                <Td>{userData?.id}</Td>
                <Td>{userData?.name}</Td>
                <Td>{userData?.desc}</Td>
                <Td>
                  <Avatar src={userData?.photo} />
                </Td>
                <Td>{userData?.city_id}</Td>
                <Td>{userData?.category_name}</Td>
                <Td>{userData?.longitude}</Td>
                <Td>{userData?.latitude}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={8} textAlign={"center"}>
                No data found
              </Td>
            </Tr>
          )}
          </Tbody>
          <Tfoot bg={'gray.100'}>
            <Tr>
              <Th>ID</Th>
              <Th>Place Name</Th>
              <Th>Describtion</Th>
              <Th>Image</Th>
              <Th>City Id</Th>
              <Th>Category Name</Th>
              <Th>Longitude</Th>
              <Th>Latitude</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
