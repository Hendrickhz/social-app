import { Avatar, Button, Flex,  Text, useDisclosure } from "@chakra-ui/react"
import useLogout from "../../hooks/useLogout"
import { useAuthStore } from "../../store/authStore"
import { Link } from "react-router-dom"
import LogoutModal from "../AuthForm/LogoutModal"

const SuggestedHeader = () => {
  const user= useAuthStore(state=>state.user)
  const {handleLogout,isLoggingOut}= useLogout()
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
          <Link to={`${user?.username}`}>
            <Avatar size={"sm"} name={user?.username} src={user?.profilePicURL} />
          </Link>
          <Link to={`${user?.username}`}>
            <Text fontWeight={"bold"} fontSize={12}>{user?.username}</Text>
          </Link>
        </Flex>
        <Button onClick={onOpen}
        //  isLoading={isLoggingOut} onClick={handleLogout}
          bg={"transparent"} _hover={{bg:"transparent"}} color={"blue.400"} cursor={"pointer"} fontSize={14} fontWeight={600} textDecoration={"none"} >
            Logout
        </Button>
      </Flex>
     <LogoutModal isLoggingOut={isLoggingOut} onClose={onClose} isOpen={isOpen} handleLogout={handleLogout}/>
    </>
  )
}

export default SuggestedHeader
