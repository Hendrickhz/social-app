import {
  Box,
  Flex,
  Tooltip,
  useDisclosure,
 
  
} from "@chakra-ui/react";
import { RiUserFollowLine } from "react-icons/ri";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import SuggestedUsersModal from "../SuggestedUsers/SuggestedUsersModal";
import { useAuthStore } from "../../store/authStore";
const FollowUsers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
 const authUser= useAuthStore(state=>state.user);
 if(!authUser){
  return ''
 }
  return (
    <>
      {" "}
      <Tooltip
        hasArrow
        label={"Follow Users"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          gap={4}
          onClick={onOpen}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={"full"}
          display={{ base: "flex", lg: "none" }}
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <RiUserFollowLine size={25} />
          <Box display={{ base: "none", md: "block" }}>Folllow Users</Box>
        </Flex>
      </Tooltip>{" "}
    <SuggestedUsersModal isOpen={isOpen} onClose={onClose} suggestedUsers={suggestedUsers} isLoading={isLoading}/>
    </>
  );
};

export default FollowUsers;
