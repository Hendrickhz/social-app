import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={"4px"} p={5}>
        <VStack spacing={4}>
          <Image
            src="/logo.png"
            alt="instagram logo"
            h={24}
            cursor={"pointer"}
          />
          {isLogin ? <Login /> : <Signup />}
          {/* ---------- OR -------------  */}
          <Flex
            gap={1}
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            w={"full"}
          >
            <Box bg={"gray.400"} h={"1px"} flex={2} />
            <Text mx={1} fontSize={14}>
              OR
            </Text>
            <Box bg={"gray.400"} h={"1px"} flex={2} />
          </Flex>
          {/* ---------- OR -------------  */}

          <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={"4px"} p={5}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={1}>
          <Box>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box
            color={"blue.500"}
            fontWeight={"600"}
            cursor={"pointer"}
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Sign up" : "Login"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
