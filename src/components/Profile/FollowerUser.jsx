import {
  Avatar,
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { useNavigate } from "react-router-dom";
const FollowerUser = ({ id, isOpen, onClose }) => {
  const { userProfile, isLoading } = useGetUserProfileById(id);
  const navigate = useNavigate();

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
  return (
 
        <Flex cursor={'pointer'}  onClick={handleClick} gap={2} w={"full"} justifyContent={"flex-start"}>
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
   
  );
};

export default FollowerUser;
