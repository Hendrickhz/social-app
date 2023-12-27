import {
  Container,
  Flex,
  Link,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import { useParams } from "react-router-dom";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { Link as RouterLink } from "react-router-dom";
import { PageLayoutSpinner } from "../../layouts/PageLayout/PageLayout";
const ProfilePage = () => {
  const { username } = useParams();
  const { loading, userProfile } = useGetUserProfileByUsername(username);

  const userNotFound = !loading && userProfile == null;
  if (loading) {
    return <PageLayoutSpinner />;
  }

  if (userNotFound) {
    return <UserNotFound />;
  }
  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        mx={"auto"}
        w={"full"}
        flexDirection={"column"}
      >
        {loading && <ProfileHeaderSkeleton />}
        {!loading && userProfile && <ProfileHeader />}
      </Flex>
      <Flex
        w={"full"}
        mx={"auto"}
        px={{ base: 2, sm: 4 }}
        flexDirection={"column"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

export default ProfilePage;
const UserNotFound = () => {
  return (
    <Flex
      flexDir="column"
      h={"100vh"}
      justifyContent={"center"}
      textAlign={"center"}
      mx={"auto"}
    >
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link
        as={RouterLink}
        to={"/"}
        color={"blue.500"}
        w={"max-content"}
        mx={"auto"}
      >
        Go home
      </Link>
    </Flex>
  );
};

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size="24" />

      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />
      </VStack>
    </Flex>
  );
};
