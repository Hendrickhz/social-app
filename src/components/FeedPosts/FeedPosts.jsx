import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost";

import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const { isLoading, posts } = useGetFeedPosts();

  if (isLoading) {
    return [0, 1, 2, 3].map((_, idx) => {
      return (
        <VStack key={idx} gap={4} w={"full"} alignItems={"flex-start"} mb={4}>
          <Flex gap={2}>
            <SkeletonCircle size="10" />
            <VStack gap={2} alignItems={"flex-start"}>
              <Skeleton height="10px" width={"200px"} />
              <Skeleton height="10px" width={"200px"} />
            </VStack>
          </Flex>
          <Skeleton w={"full"}>
            <Box height={"500px"}>Contents wrapped</Box>
          </Skeleton>
        </VStack>
      );
    });
  }
  if (posts.length == 0) {
    return (
      <Flex w={"80%"} mx={"auto"} h={"70vh"} alignItems={"center"}>
        <Text textAlign={"center"}>
          Looks like your feed is a bit quiet! Follow some interesting users to
          spice it up.
        </Text>
      </Flex>
    );
  }
  return (
    <Container>
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </Container>
  );
};

export default FeedPosts;
