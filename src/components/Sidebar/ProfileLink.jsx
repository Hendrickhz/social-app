import { Avatar, Box, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const ProfileLink = () => {
  const authUser = useAuthStore((state) => state.user);
  return (
    <>
      <Tooltip
        hasArrow
        label={"Profile"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Link
          as={RouterLink}
          to={`/${authUser?.username}`}
          display={"flex"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={"full"}
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <Avatar
            size={"sm"}
            name={authUser?.username}
            src={authUser?.profilePicURL}
          />
          <Box display={{ base: "none", md: "block" }}>Profile</Box>
        </Link>
      </Tooltip>
    </>
  );
};

export default ProfileLink;
