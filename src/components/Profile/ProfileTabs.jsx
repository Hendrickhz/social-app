import { Box, Flex, Text } from "@chakra-ui/react";
import { BsGrid3X3 } from "react-icons/bs";
const ProfileTabs = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"full"}
      textTransform={"uppercase"}
      gap={{ base: 4, sm: 10 }}
    >
      <Flex
        gap={2}
        p={3}
        borderTop={"1px solid white"}
        alignItems={"center"}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <BsGrid3X3 />
        </Box>
        <Text fontSize={12} display={{ base: "none", md: "block" }}>
          Posts
        </Text>
      </Flex>
      {/* <Flex
        gap={2}
        p={3}
       
        alignItems={"center"}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <BsBookmark />
        </Box>
        <Text fontSize={12} display={{ base: "none", md: "block" }}>
          Saved
        </Text>
      </Flex>
      <Flex
        gap={2}
        p={3}
     
        alignItems={"center"}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <BsSuitHeart />
        </Box>
        <Text fontSize={12} display={{ base: "none", md: "block" }}>
          Likes
        </Text>
      </Flex> */}
    </Flex>
  );
};

export default ProfileTabs;
