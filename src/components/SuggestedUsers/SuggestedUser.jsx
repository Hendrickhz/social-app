import { Avatar, Box, Button, Flex, Text, VStack } from "@chakra-ui/react";

import {  useNavigate } from "react-router-dom";
import useFollowOrUnFollowUser from "../../hooks/useFollowOrUnfollowUser";
import { useAuthStore } from "../../store/authStore";

const SuggestedUser = ({ user, onClose, isOpen = false }) => {
  const authUser = useAuthStore((state) => state.user);
  const { isFollowing, handleFollowUnFollowUser } = useFollowOrUnFollowUser(
    user?.uid
  );

  const navigate = useNavigate();
  const handleOnFollowButton = async () => {
    await handleFollowUnFollowUser();
  };
  const handleClick = () => {
    if (isOpen) {
      onClose();
    }
    navigate(`/${user?.username}`);
  };
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Box onClick={handleClick} cursor={"pointer"}>
        <Flex alignItems={"center"} gap={2}>
          <Avatar src={user?.profilePicURL} name={user?.username} size={"sm"} />
          <VStack spacing={1} fontWeight={"bold"} alignItems={"flex-start"}>
            <Text fontSize={12}>{user?.username}</Text>
            <Text fontSize={11} color={"gray.500"}>
              {user?.fullName}
            </Text>
          </VStack>
        </Flex>
      </Box>
      {authUser.uid !== user?.uid ? (
        <Button
          fontSize={13}
          fontWeight={"600"}
          color={"blue.500"}
          bg={"transparent"}
          _hover={{ color: "white" }}
          onClick={handleOnFollowButton}
          p={0}
          h={"max-content"}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      ) : null}
    </Flex>
  );
};

export default SuggestedUser;
