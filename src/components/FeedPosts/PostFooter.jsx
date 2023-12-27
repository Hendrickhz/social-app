import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";
import useAddComment from "../../hooks/useAddComment";
import useLikePost from "../../hooks/useLikePost";
import Comment from "../Comment/Comment";
import useUserProfileStore from "../../store/userProfileStore";
import { useAuthStore } from "../../store/authStore";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
  const { likes, likePost, isLiked } = useLikePost(post);
  const inputRef = useRef();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const { isCommenting, addComment } = useAddComment();
  const authUser= useAuthStore(state=>state.user)
  const handleLikeClick = async () => {
    await likePost();
  };
  const handleCommentLogo = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleComment = async () => {
    await addComment(post?.id, inputRef.current.value,post.createdBy,post.imgURL);
    inputRef.current.value = "";
  };
  if (post == null) {
    return "loading";
  }

  return (
    <>
      <Flex direction={"column"} gap={1} my={4} mt={"auto"}>
        {!authUser ? (
          ""
        ) : (
          <Flex alignItems={"center"} gap={4} mb={1} pt={0}>
            <Box
              p={0}
              m={0}
              bg={"transparent"}
              _hover={{ bg: "transparent" }}
              onClick={handleLikeClick}
              fontSize={18}
              cursor={"pointer"}
            >
              {isLiked ? <UnlikeLogo /> : <NotificationsLogo />}
            </Box>
            <Box cursor={"pointer"} onClick={handleCommentLogo}>
              <CommentLogo />
            </Box>
          </Flex>
        )}
        {likes > 0 ? (
          <Text fontWeight={600} fontSize={"sm"}>
            {likes} {likes > 1 ? "likes" : "like"}
          </Text>
        ) : null}
        {isProfilePage ? (
          <>
            <Text fontWeight={700} fontSize={"sm"}>
              {userProfile?.username}{" "}
              <Text ml={2} as={"span"} fontWeight={400}>
                {post?.caption}
              </Text>
            </Text>
            <Text
              onClick={onOpen}
              cursor={"pointer"}
              color={"gray.500"}
              fontSize={"sm"}
            >
              {post.comments.length == 0
                ? null
                : post.comments.length == 1
                ? `View 1 comment`
                : post.comments.length < 4
                ? `View ${post.comments.length} comments`
                : `View all ${post.comments.length} comments`}
            </Text>
          </>
        ) : (
          <>
            <Text fontWeight={700} fontSize={"sm"}>
              {creatorProfile?.username}{" "}
              <Text ml={2} as={"span"} fontWeight={400}>
                {post?.caption}
              </Text>
            </Text>
            <Text
              onClick={onOpen}
              cursor={"pointer"}
              color={"gray.500"}
              fontSize={"sm"}
            >
              {post.comments.length == 0
                ? null
                : post.comments.length == 1
                ? `View 1 comment`
                : post.comments.length < 4
                ? `View ${post.comments.length} comments`
                : `View all ${post.comments.length} comments`}
            </Text>
          </>
        )}

        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
          <InputGroup>
            <Input
              ref={inputRef}
              variant={"flushed"}
              placeholder="Add a comment"
            />
            <InputRightElement>
              <Button
                color={"blue.500"}
                bg={"transparent"}
                _hover={{ color: "white" }}
                fontSize={14}
                fontWeight={600}
                isLoading={isCommenting}
                onClick={handleComment}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} minH={"500px"}>
              {post.comments.map((comment) => (
                <Comment
              
                  postId={post.id}
                  comment={comment}
                  key={comment.commentId}
                />
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostFooter;
