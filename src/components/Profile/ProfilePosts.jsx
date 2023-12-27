import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";

import ProfilePost from "./ProfilePost";
import useGetPostsFromUserProfile from "../../hooks/useGetPostsFromUserProfile";

const ProfilePosts = () => {
  const { isLoading, posts } = useGetPostsFromUserProfile();

  if (isLoading) {
    return (
      <Grid
        gap={1}
        columnGap={1}
        gridTemplateColumns={{ sm: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
      >
        {[0, 1, 2, 3, 4, 5].map((_, idx) => (
          <VStack key={idx} w={"full"} alignItems={"flex-start"}>
            <Skeleton w={"full"}>
              <Box h={"300px"}>Contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      </Grid>
    );
  }
  if (posts.length == 0 && !isLoading) {
    return (
      <>
        <NoPostFound />
      </>
    );
  }
  return (
    <Grid
      gap={1}
      columnGap={1}
      gridTemplateColumns={{ sm: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
    >
      {posts.map((post) => (
        <ProfilePost key={post.id} post={post} />
      ))}
    </Grid>
  );
};

export default ProfilePosts;
const NoPostFound = () => (
  <Flex
    w={"full"}
    justifyContent={"center"}
    alignItems={"flex-start"}
    mx={"auto"}
    mt={5}
  >
    <Text fontSize={18}>No Post Found.</Text>
  </Flex>
);
