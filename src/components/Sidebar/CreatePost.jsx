import {
  Box,
  Button,
  CloseButton,
  Flex,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import { useAuthStore } from "../../store/authStore";
import usePostStore from "../../store/postStore";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "./../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useLocation } from "react-router-dom";
import useUserProfileStore from "../../store/userProfileStore";
const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const fileRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedImg, handleImg, setSelectedImg } = usePreviewImg();
  const showToast = useShowToast();
  const { loading, handleCreatePost } = useCreatePost();
  const handlePostCreateBtnClick = async () => {
    try {
      await handleCreatePost(selectedImg, caption);
      onClose();
      setCaption("");
      setSelectedImg(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
          cursor={"pointer"}
          w={"full"}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        motionPreset="slideInTop"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <Input ref={fileRef} type="file" hidden onChange={handleImg} />

            <BsFillImageFill
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={26}
              onClick={() => fileRef.current.click()}
            />
            {selectedImg && (
              <>
                <Flex mt={5} pos={"relative"} w={"full"}>
                  <Img src={selectedImg} alt="Selected image" />
                  <CloseButton
                    pos={"absolute"}
                    top={0}
                    right={0}
                    onClick={() => setSelectedImg("")}
                  />
                </Flex>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              onClick={handlePostCreateBtnClick}
              mr={3}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

// Hook for handling the creation of a post
function useCreatePost() {
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const { pathname } = useLocation();
  //to update data from the stores
  const addPostsToPostStore = usePostStore((state) => state.addPost);
  const {addPost} = useUserProfileStore();

  const handleCreatePost = async (selectedImg, caption) => {
    if (loading) return; //to prevent multiple actions
    if (!selectedImg) throw new Error("Please select an image.");
    setLoading(true);
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };
    try {
      const newPostDocRef = await addDoc(
        collection(firestore, "posts"),
        newPost
      );
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imgRef = ref(storage, `posts/${newPostDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(newPostDocRef.id) }); // update user's posts array in firebase db
      await uploadString(imgRef, selectedImg, "data_url"); //storing img to the firebase storage

      const downloadURL = await getDownloadURL(imgRef); // Get the download URL of the stored image

      await updateDoc(newPostDocRef, { imgURL: downloadURL }); // updating post doc with image string value in the firebase db
      newPost.imgURL = downloadURL;

      if ( userProfile.uid === authUser.uid) {
        addPostsToPostStore({ ...newPost, id: newPostDocRef.id });
        console.log('added 1')
      }

      if (userProfile && pathname !== "/" && userProfile.uid === authUser.uid) {
        addPost( newPostDocRef.id);console.log(newPostDocRef.id)
        console.log('added 2')
        console.log(userProfile)

      }

      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      return showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  return { handleCreatePost, loading };
}
