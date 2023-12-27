import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import { useAuthStore } from "../../store/authStore";

const HomePage = () => {
  const authUser= useAuthStore(state=>state.user);
  if(!authUser){
    return <Flex justifyContent={'center'} alignItems={'center'} w={'100vw'} h={'100vh'}>
      <Spinner size={'lg'}/>
    </Flex>
  }
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20} >
        {/* feed posts on the left  */}
        <Box flex={2} py={10}>
          <FeedPosts/>
        </Box>
        {/* suggested users on the right  */}
        <Box
          flex={3}
        
          top={0}
          display={{ base: "none", lg: "block" }}
          maxW={"300px"}
        ><SuggestedUsers/></Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
