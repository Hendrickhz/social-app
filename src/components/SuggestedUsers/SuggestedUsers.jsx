import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Link,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import { useAuthStore } from "../../store/authStore";
import SuggestedUsersModal from "./SuggestedUsersModal";

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstThreeSuggestedUsers = suggestedUsers.slice(0, 3);
  const authUser = useAuthStore((state) => state.user);
  if (isLoading && !authUser) {
    return (
      <VStack py={8} px={6} gap={4}>
        <SuggestedHeader />
        {[0, 1, 2].map((_, idx) => (
          <VStack w={"full"} p={0} m={0} key={idx}>
            <Flex gap={2} w={"full"} justifyContent={"flex-start"}>
              <SkeletonCircle size="10" />

              <VStack alignItems={"flex-start"} gap={2} mx={"auto"} flex={1}>
                <Skeleton height="12px" width="100px" />
                <Skeleton height="12px" width="50px" />
              </VStack>
            </Flex>
          </VStack>
        ))}
      </VStack>
    );
  }

  return (
    <>
      <VStack py={8} px={6} gap={4} pos={"sticky"} top={0}>
        <SuggestedHeader />

        {firstThreeSuggestedUsers?.length !== 0 ? (
          <>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              w={"full"}
            >
              <Text fontWeight={"bold"} fontSize={14} color={"gray.500"}>
                Suggested for you
              </Text>
              <Text
                cursor={"pointer"}
                fontWeight={"bold"}
                fontSize={14}
                _hover={{ color: "gray.400" }}
                onClick={onOpen}
                
              >
                See all
              </Text>
            </Flex>
            <>
              {firstThreeSuggestedUsers.map((user) => (
                <SuggestedUser key={user.uid} user={user} />
              ))}
            </>
          </>
        ) : (
          <Alert borderRadius={4} status="info">
            <AlertIcon />
            <Text fontSize={12}>
              There is no suggested users at the moment.
            </Text>
          </Alert>
        )}

        <Box
          fontSize={12}
          color={"gray.500"}
          fontWeight={"bold"}
          alignSelf={"flex-start"}
        >
          {" "}
          &copy; 2023 built by
          <Link
            href="https://github.com/Hendrickhz"
            target="_blank"
            color={"blue.500"}
            _hover={{ textDecoration: "underline" }}
            transition={"0.3s ease"}
          >
            {" "}
            Hendrick
          </Link>
        </Box>
      </VStack>
      <SuggestedUsersModal isLoading={isLoading} isOpen={isOpen} onClose={onClose} suggestedUsers={suggestedUsers}/>
    </>
  );
};

export default SuggestedUsers;
