import { Box, Button, Flex, Link, Tooltip, useDisclosure } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { InstagramLogo, InstagramMobileLogo } from "../../assets/constants";

import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SideBarItems from "./SideBarItems";
import LogoutModal from "../AuthForm/LogoutModal";
const Sidebar = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box
        h={"100vh"}
        pos={"sticky"}
        top={0}
        left={0}
        borderRight={"1px solid"}
        borderColor={"whiteAlpha.300"}
        py={8}
        px={{ base: 2, md: 4 }}
      >
        <Flex direction={"column"} gap={10} h={"full"} w={"full"}>
          <Flex justifyContent={{ base: "center", md: "flex-start" }}>
            <Link
              to={"/"}
              pl={2}
              as={RouterLink}
              display={{ base: "none", md: "block" }}
              cursor={"pointer"}
            >
              <InstagramLogo />
            </Link>
            <Link
              to={"/"}
              p={2}
              as={RouterLink}
              display={{ base: "block", md: "none" }}
              w={10}
              _hover={{ bg: "whiteAlpha.200" }}
              borderRadius={"4px"}
              cursor={"pointer"}
            >
              <InstagramMobileLogo />
            </Link>
          </Flex>
          <Flex direction={"column"} gap={5}>
         <SideBarItems/>
          </Flex>
          {/* logout  */}
          <Tooltip
            hasArrow
            label={"Logout"}
            placement="right"
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}
          >
            <Flex
              onClick={onOpen}
              gap={4}
              _hover={{ bg: "whiteAlpha.400" }}
              borderRadius={6}
              p={2}
              w={"full"}
              mt={"auto"}
              justifyContent={{ base: "center", md: "flex-start" }}
              alignItems={"center"}
            >
              <BiLogOut size={25} />
              <Button
                variant={"ghost"}
                _hover={{ bg: "transparent" }}
                isLoading={isLoggingOut}
                display={{ base: "none", md: "block" }}
                onClick={onOpen}
              >
                Logout
              </Button>
            </Flex>
          </Tooltip>
        </Flex>
      </Box>
      <LogoutModal isLoggingOut={isLoggingOut} onClose={onClose} isOpen={isOpen} handleLogout={handleLogout}/>
    </>
  );
};

export default Sidebar;
