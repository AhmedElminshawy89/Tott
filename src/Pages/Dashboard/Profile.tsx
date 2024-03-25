/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { Avatar, Box, Divider, Flex, Grid, Heading, Image, Text, Input } from "@chakra-ui/react";
import cover from '../../assets/Images/cover.jpg';
import Admins from "./Admins";
import { useFetchAdminQuery } from "../../app/feature/AdminSlice";

const ProfilePage = () => {
  const { data } = useFetchAdminQuery("")
  const GetData = localStorage.getItem("AdminData");
  const adminData = GetData ? JSON.parse(GetData) : { fname: "Guest", lname: "", photo: "" };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data?.Admins?.data.filter((item: { fname: string; }) =>
    item.fname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={4}>
      <Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }} gap={8}>
        <Box>
          <Image src={cover} alt="Cover Photo" className="w-full h-auto rounded-lg mb-4 md:mb-0" />
          <Flex justify="center" mb={4}>
            <Avatar size="xl" name="Ahmed Elminshawy" src={adminData.photo} mt={-12} />
          </Flex>
          <Heading size="lg" textAlign="center">{adminData.fname}{" "}{adminData.lname}</Heading>
          <Text fontSize="md" color="gray.500" textAlign="center">Super Admin</Text>
          <Divider mt={4} mb={6} />
        </Box>
        <Box >
          <Input
            placeholder="Search Friends"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
          />
          <Flex justify="space-between" align="center">
            <Heading size="md">Admin List</Heading>
          </Flex>
          <Divider mt={2} mb={4} />
          <Box height={'245px'} overflow={'scroll'}>
          {filteredData && filteredData.map((friend: { photo: string | undefined; fname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; lname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
            <Flex key={index} align="center" mb={2}>
              <Avatar size="sm" src={friend.photo} />
              <Box ml={3}>
                <Text fontWeight="bold">{friend.fname}</Text>
                <Text fontWeight="bold">{friend.lname}</Text>
              </Box>
            </Flex>
          ))}
          </Box>
        </Box>
      </Grid>
      <Admins />
    </Box>
  );
};

export default ProfilePage;
