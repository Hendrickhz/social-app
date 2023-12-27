import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";

const EditProfile = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    bio: "",
  });
  const authUser = useAuthStore((state) => state.user);
  const fileRef = useRef(null);
  const { selectedImg, handleImg } = usePreviewImg();
  const { isUpdating, handleEditProfile } = useEditProfile();
 
  return (
    <>
      {authUser && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent mx={3}>
            <ModalHeader />
            <ModalCloseButton />
            <ModalBody>
              {/* Container Flex */}
              <Flex >
                <Stack
                  spacing={4}
                  w={"full"}
                  maxW={"md"}
                  p={6}
                  my={0}
                >
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", sm: "3xl" }}
                  >
                    Edit Profile
                  </Heading>
                  <FormControl>
                    <Stack direction={["column", "row"]} spacing={6}>
                      <Center>
                        <Avatar
                          size="xl"
                          src={selectedImg || authUser?.profilePicURL}
                          border={"2px solid white "}
                        />
                      </Center>
                      <Center w="full">
                        <Button
                          w="full"
                          onClick={() => fileRef.current.click()}
                        >
                          Edit Profile Picture
                        </Button>
                        <Input
                          onChange={handleImg}
                          ref={fileRef}
                          hidden
                          type="file"
                        />
                      </Center>
                    </Stack>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize={"sm"}>Full Name</FormLabel>
                    <Input
                      value={inputs.fullName || authUser.fullName}
                      onChange={(e) =>
                        setInputs({ ...inputs, fullName: e.target.value })
                      }
                      placeholder={"Full Name"}
                      size={"sm"}
                      type={"text"}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize={"sm"}>Username</FormLabel>
                    <Input
                      value={inputs.username || authUser.username}
                      onChange={(e) =>
                        setInputs({ ...inputs, username: e.target.value })
                      }
                      placeholder={"Username"}
                      size={"sm"}
                      type={"text"}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize={"sm"}>Bio</FormLabel>
                    <Input
                      value={inputs.bio || authUser.bio}
                      onChange={(e) =>
                        setInputs({ ...inputs, bio: e.target.value })
                      }
                      placeholder={"Bio"}
                      size={"sm"}
                      type={"text"}
                    />
                  </FormControl>

                  <Stack spacing={6} direction={["column", "row"]}>
                    <Button
                      bg={"red.400"}
                      color={"white"}
                      w="full"
                      size="sm"
                      _hover={{ bg: "red.500" }}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      size="sm"
                      w="full"
                      _hover={{ bg: "blue.500" }}
                      onClick={()=>handleEditProfile(inputs,selectedImg)}
                      isLoading={isUpdating}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default EditProfile;
