import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import useFollowOrUnFollowUser from "../../hooks/useFollowOrUnfollowUser";
import { useAuthStore } from "../../store/authStore";
import useTimeAgo from "../../hooks/useTimeAgo";

const PostHeader = ({ creatorProfile, postCreatedAt }) => {
  const { isFollowing, handleFollowUnFollowUser } = useFollowOrUnFollowUser(
    creatorProfile?.uid
  );
  const authUser = useAuthStore((state) => state.user);
  const isAuthUserPost = authUser.uid == creatorProfile?.uid;
  const { timeAgo } = useTimeAgo();
  const handleOnFollowButton = async () => {
    await handleFollowUnFollowUser();
  };
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      my={2}
      w={"full"}
    >
      <Flex gap={2} alignItems={"center"}>
        <Avatar size={"sm"} src={creatorProfile?.profilePicURL} />
        <Flex fontWeight={"bold"} fontSize={12}>
          <span>{creatorProfile?.username}</span>
          <Box color={"gray.500"}>. {timeAgo(postCreatedAt)}</Box>
        </Flex>
      </Flex>
      {isAuthUserPost ? null : (
        <Button
          onClick={handleOnFollowButton}
          bg={"transparent"}
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          cursor={"pointer"}
        >
          <Text
            fontWeight={"bold"}
            fontSize={12}
            color={"blue.500"}
            transition={".2s ease-in-out"}
            _hover={{ color: "white" }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Text>
        </Button>
      )}
    </Flex>
  );
};

export default PostHeader;
