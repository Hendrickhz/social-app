import {
  Avatar,
  Box,
  Button,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import useFollowOrUnFollowUser from "../../hooks/useFollowOrUnfollowUser";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const FollowingUser = ({ id, isOpen, onClose }) => {
  const { userProfile, isLoading } = useGetUserProfileById(id);
  const { isFollowing, handleFollowUnFollowUser } = useFollowOrUnFollowUser(id);
 const authUser= useAuthStore(state=>state.user);
 const isAuthUserProfile= authUser.uid==id
  const navigate = useNavigate();
  const handleOnFollowButton = async () => {
    await handleFollowUnFollowUser();
  };
  const handleClick = () => {
    if (isOpen) {
      onClose();
    }
    navigate(`/${userProfile?.username}`);
  };
  if (isLoading) {
    return (
      <Flex gap={2} w={"full"} justifyContent={"flex-start"}>
        <SkeletonCircle size="10" />

        <VStack alignItems={"flex-start"} gap={2} mx={"auto"} flex={1}>
          <Skeleton height="12px" width="100px" />
          <Skeleton height="12px" width="50px" />
        </VStack>
      </Flex>
    );
  }
  if (isFollowing || isAuthUserProfile) {
    return (
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Box onClick={handleClick}>
          <Flex gap={2} w={"full"} justifyContent={"flex-start"}>
            <Avatar
              name={userProfile?.username}
              src={userProfile?.profilePicURL}
              size={"sm"}
            />
            <VStack spacing={1} fontWeight={"bold"} alignItems={"flex-start"}>
              <Text fontSize={12}>{userProfile?.username}</Text>
              <Text fontSize={11} color={"gray.500"}>
                {userProfile?.fullName}
              </Text>
            </VStack>
          </Flex>
        </Box>
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
          {isFollowing ? "Unfollow" : ""}
        </Button>
      </Flex>
    );
  }
};

export default FollowingUser;
