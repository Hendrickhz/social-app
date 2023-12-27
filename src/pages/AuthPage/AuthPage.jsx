import { Box, Container, Flex, Image, Link, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} p={0}>
       <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* left side  */}
          <Box  display={{ base:"none", md:'block'}}>
          <Image src="/auth.png" alt="instagram cover image" h={650} />
        </Box>
        {/* right side  */}
        <VStack spacing={4} align={"stretch"}>
            <AuthForm/>
            <Box textAlign={"center"}>Get the app.</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Link href="https://l.instagram.com/?u=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.instagram.android%26referrer%3Dig_mid%253DD5658EB9-030B-4A05-8EF2-A6EC5AE3C3B1%2526utm_campaign%253DloginPage%2526utm_content%253Dlo%2526utm_source%253Dinstagramweb%2526utm_medium%253Dbadge%2526original_referrer%253Dhttps%25253A%25252F%25252Fwww.google.com%25252F&e=AT1RWX1D-tieLoCE4u1xKvzFR1YMjs33qxUGpnxKN9dxKS40t8VfUvRC8kNkB0XBpAtbs56kaOGKejmVDssZT5KHvShB0GN2TCMTcXiGt4VTfnfqy-bgu0hUhyP-H4lQgE8cpmS2dyhV71qwdsag10ioEjAhy5QjQqPBWg" target="blank">
                <Image src="/playstore.png" alt="playstore logo" h={"10"}/>
              </Link>
              <Link href="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1920%2C1030" target="blank">
                <Image src="/microsoft.png" alt="microsoft logo" h={"10"}/>
              </Link>
            </Flex>
        </VStack>
       </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
