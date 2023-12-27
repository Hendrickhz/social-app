import { Box, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
const HomeLink = () => {
  return (
    <>
      <Tooltip
        hasArrow
        label={"Home"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Link
          as={RouterLink}
          to={"/"}
          display={"flex"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={"full"}
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <AiFillHome size={25} />
          <Box display={{ base: "none", md: "block" }}>Home</Box>
        </Link>
      </Tooltip>
    </>
  );
};

export default HomeLink;
