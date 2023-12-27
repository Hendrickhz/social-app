import {
  Avatar,
  Box,
  Divider,
  Flex,
  GridItem,
  Image,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "./../FeedPosts/PostFooter";
import { useAuthStore } from "../../store/authStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import useTimeAgo from "../../hooks/useTimeAgo";


const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authUser = useAuthStore((state) => state.user);
  const profileUser = useUserProfileStore((state) => state.userProfile);
  const isVisitingOtherUserProfile = authUser?.uid !== profileUser.uid;

  const deletePostFromPostStore = usePostStore((state) => state.deletePost);
  const deletePostFromUserProfile = useUserProfileStore(
    (state) => state.deletePost
  );

  const currentPost= post;

  const [isDeleting, setIsDeleting] = useState(false);
  const showToast = useShowToast();

 const {timeAgo}= useTimeAgo();
//  if(!profileUser || !authUser){
//   return "loading."
//  }
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      //deleting post image from storage
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);

      const userRef = doc(firestore, "users", authUser.uid);

      await deleteDoc(doc(firestore, "posts", post.id));

      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      //deleting from user interface
      deletePostFromPostStore(post.id);
      deletePostFromUserProfile(post.id);

      showToast("Success", "The post is deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <GridItem
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        cursor={"pointer"}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          right={0}
          left={0}
          bottom={0}
          zIndex={0}
          transition={"all 0.3s ease"}
          bg={"blackAlpha.700"}
          justifyContent={"center"}
        >
          <Flex justifyContent={"center"} alignItems={"center"} gap={50}>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post?.likes.length}
              </Text>
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post?.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post?.imgURL}
          alt="profile post photo"
          objectFit={"cover"}
          h={"100%"}
          w={"full"}
        />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: "3xl", md: "5xl" }}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent p={0} w={{ base: "80%", md: "90%", lg: "80%" }} >
          <ModalCloseButton top={-10} size={"lg"} right={-10} />
          <ModalBody p={0} m={0} w={"full"}>
            <Flex
              gap={0}
              mx={"auto"}
              direction={{ base: "column", md: "row" }}
              w={{ base: "100%", sm: "100%", md: "full" }}
              h={{base:"73%",md:'50vh',lg:'75vh',xl:'90vh'}}
            >
              <Box
                display={{ base: "flex", md: "none" }}
                p={3}
                alignItems={"center"}
                gap={4}
              >
                <Avatar
                  src={profileUser.profilePicURL}
                  name={profileUser.username}
                  size={"sm"}
                />
                <Text fontWeight={"bold"}>{profileUser.username}</Text>
              </Box>
              <Box
                flex={1.5}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                w={"full"}
              >
                <Img
                  src={post?.imgURL}
                  alt="profile post img"
                  objectFit={"cover"}
                  w={"full"}
                  h={"full"}
                />
              </Box>
              <Flex
                pos={"relative"}
                px={5}
                flex={1}
                flexDirection={"column"}
                alignItems={"flex-start"}
                w="full"
                display={{ base: "none", md: "block" }}
              >
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  w={"full"}
                  pt={4}
                >
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src={profileUser.profilePicURL}
                      name={profileUser.username}
                      size={"sm"}
                    />
                    <Text fontWeight={"bold"}>{profileUser.username}</Text>
                  </Flex>
                  {isVisitingOtherUserProfile ? null : (
                    <Box p={1} _hover={{ bg: "whiteAlpha.300", color: "red" }}>
                      <MdDelete
                        onClick={handleDelete}
                        size={20}
                        cursor={"pointer"}
                      />
                    </Box>
                  )}
                </Flex>
                <Divider my={4} />
                <VStack gap={2} maxH={"450px"} overflowY={"auto"}>
                <Flex w={'full'} gap={4} >
                  <Avatar
                      src={profileUser.profilePicURL}
                      name={profileUser.username}
                      size={"sm"}
                    />
                    <Flex direction={"column"} gap={1}>
                      <Text gap={2} lineHeight={4}>
                        <Text as={"span"} fontSize={14} mr={2} fontWeight={700}>
                          {profileUser.username}
                        </Text>
                        <Text as={"span"} fontSize={14}>
                          {post?.caption}
                        </Text>
                      </Text>
                      <Text fontSize={12} color={"gray"}>
                        {timeAgo(post.createdAt)}
                      </Text>
                    </Flex>
                  </Flex>
                
               {post.comments.map(comment=><Comment postId={post.id} comment={comment} key={comment.commentId}/>)}
                 
                </VStack>
                <Box
                  pos={"absolute"}
                  bottom={0}
                  left={0}
                  right={0}
                  p={5}
                  pb={0}
                >
                  <PostFooter post={currentPost} isProfilePage={true} />
                </Box>
              </Flex>
              <Box
               display={{ base: "block", md: "none" }}
                p={3}>
                <PostFooter post={currentPost} isProfilePage={true} />
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
