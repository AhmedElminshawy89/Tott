import { useState } from "react";
import { Avatar, Box, Divider, Flex, Grid, Heading, Image, Text, Input } from "@chakra-ui/react";
import cover from '../../assets/Images/cover.jpg';
import me from '../../assets/Images/me.jpg';
import Admins from "./Admins";

const ProfilePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const friends = [
    { name: "Ahmed", isAdmin: true },
    { name: "Mohamed", isAdmin: false },
    { name: "Elsaied", isAdmin: true },
    { name: "Ibrahim", isAdmin: true },
    { name: "Elsayed", isAdmin: true },
  ];

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={4}>
      <Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }} gap={8}>
        <Box>
          <Image src={cover} alt="Cover Photo" className="w-full h-auto rounded-lg mb-4 md:mb-0" />
          <Flex justify="center" mb={4}>
            <Avatar size="xl" name="Ahmed Elminshawy" src={me} mt={-12} />
          </Flex>
          <Heading size="lg" textAlign="center">Ahmed Elminshawy</Heading>
          <Text fontSize="md" color="gray.500" textAlign="center">Super Admin</Text>
          <Divider mt={4} mb={6} />
        </Box>

        <Box>
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
          {filteredFriends.map((friend, index) => (
            <Flex key={index} align="center" mb={2}>
              <Avatar size="sm" name={friend.name} />
              <Box ml={3}>
                <Text fontWeight="bold">{friend.name}</Text>
                <Text fontSize="sm" color="gray.500">{friend.isAdmin ? "Admin" : "Regular"}</Text>
              </Box>
            </Flex>
          ))}
        </Box>
      </Grid>
      <Admins />
    </Box>
  );
};

export default ProfilePage;
