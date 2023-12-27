import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constants";
import useSearchUser from "../../hooks/useSearchUser";
import { useRef } from "react";
import SuggestedUser from "./../SuggestedUsers/SuggestedUser";
const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, handleSearchUser, searchUsers, clearSearchUsers } = useSearchUser();
  const inputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchUser(inputRef.current.value);
    console.log(searchUsers);
  };
  const handleOnClose=()=>{
    clearSearchUsers();
    onClose()
  }
  return (
    <>
      {" "}
      <Tooltip
        hasArrow
        label={"Search"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={"full"}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>
      {/* Search modal box  */}
      <Modal
        isOpen={isOpen}
        
        motionPreset="slideInTop"
        onClose={handleOnClose}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
        <ModalContent>
          <ModalHeader>Search Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input ref={inputRef} type="text" />
                <FormHelperText></FormHelperText>
                <Flex justifyContent={"flex-end"}>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    mr={3}
                    isLoading={isLoading}
                  >
                    Search
                  </Button>
                </Flex>
              </FormControl>
            </form>
       

          {searchUsers.length > 0 ? (
            <>
              <VStack gap={4} py={2}>
              {searchUsers.map((user) => (
                <SuggestedUser isOpen={isOpen} onClose={onClose} key={user.uid} user={user} />
              ))}
              </VStack>
            </>
          ) : null}   </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
