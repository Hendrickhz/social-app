import {
  Avatar,
  
  Button,
  
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,

  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import useTimeAgo from "../../hooks/useTimeAgo";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuthStore } from "../../store/authStore";
import useDeleteComment from "../../hooks/useDeleteComment";

const Comment = ({ comment ,postId}) => {
  const { isLoading, userProfile } = useGetUserProfileById(
    comment.commentUserId
  );
  const { timeAgo } = useTimeAgo();
  const authUser = useAuthStore((state) => state.user);
  const isAuthUserComment = comment.commentUserId == authUser.uid;

  const {isDeleting,deleteComment}= useDeleteComment();
  const handleDelete=async()=>{
    deleteComment(postId,comment.commentId)
  }
  if (isLoading) {
    return <LoadingComment />;
  }
  return (
    <Flex gap={4} w={"full"} justifyContent={"flex-start"}>
      <Avatar
        size={"sm"}
        src={userProfile.profilePicURL}
        name={userProfile.username}
      />
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex direction={"column"} gap={1} flex={1}>
          <Text gap={2} lineHeight={4}>
            <Text as={"span"} fontSize={14} mr={2} fontWeight={700}>
              {userProfile.username}
            </Text>
            <Text as={"span"} fontSize={14}>
              {comment.comment}
            </Text>
          </Text>
          <Text fontSize={12} color={"gray"}>
            {timeAgo(comment.createdAt)}
          </Text>
        </Flex>
        {isAuthUserComment ? (
        <Menu>
        <MenuButton size={'sm'} as={IconButton}icon={<BsThreeDotsVertical />}   aria-label='Options'>
          
        </MenuButton>
        <MenuList p={0} m={0}>
          <MenuItem m={0} p={0} size={'sm'} as={Button} onClick={handleDelete} isLoading={isDeleting} >Delete Comment</MenuItem>
         
         
        </MenuList>
      </Menu>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default Comment;

const LoadingComment = () => {
  return (
    <Flex gap={4} w={"full"} justifyContent={"flex-start"}>
      <SkeletonCircle size={10} />
      <VStack alignItems={"flex-start"} gap={2} mx={"auto"} flex={1}>
        <Skeleton height="12px" width="100px" />
        <Skeleton height="12px" width="50px" />
      </VStack>
    </Flex>
  );
};
