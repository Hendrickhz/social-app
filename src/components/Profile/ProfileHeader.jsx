import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import { useAuthStore } from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowOrUnFollowUser from "../../hooks/useFollowOrUnfollowUser";
import FollowerUser from "./FollowerUser";
import FollowingUser from "./FollowingUser";
import useGetPostsFromUserProfile from "../../hooks/useGetPostsFromUserProfile";

const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  console.log(userProfile)
  const authUser = useAuthStore((state) => state.user);
  const isVisitingOwnProfileAndAuth =
    authUser && userProfile.username == authUser.username;
  const isVisitingOtherProfileAndAuth =
    authUser && userProfile.username !== authUser.username;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isFollowing, isUpdating, handleFollowUnFollowUser } =
    useFollowOrUnFollowUser(userProfile.uid);
  const {posts}= useGetPostsFromUserProfile()
  const {
    isOpen: isOpenFollowers,
    onOpen: onOpenFollowers,
    onClose: onCloseFollowers,
  } = useDisclosure();
  const {
    isOpen: isOpenFollowing,
    onOpen: onOpenFollowing,
    onClose: onCloseFollowing,
  } = useDisclosure();
  return (
    <Flex
      flexDirection={{ base: "column", sm: "row" }}
      py={10}
      gap={{ base: 4, sm: 3, md: 10 }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        mx={"auto"}
        alignSelf={"flex-start"}
        justifySelf={"center"}
      >
        <Avatar
          name="Hendrick"
          alt="Hendrick"
          src={userProfile.profilePicURL}
        />
      </AvatarGroup>
      <VStack flex={1} alignItems={"start"} gap={2} mx={"auto"}>
        <Flex
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
          gap={4}
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>
            {userProfile.username}
          </Text>
          {isVisitingOwnProfileAndAuth && (
            <Flex gap={4} justifyContent={"center"} alignItems={"center"}>
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.800" }}
                size={{ base: "xs", md: "sm" }}
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            </Flex>
          )}
          {isVisitingOtherProfileAndAuth && (
            <Flex gap={4} justifyContent={"center"} alignItems={"center"}>
              <Button
                bg={"blue.500"}
                color={"white"}
                _hover={{ bg: "blue.600" }}
                size={{ base: "xs", md: "sm" }}
                isLoading={isUpdating}
                onClick={handleFollowUnFollowUser}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text size={{ base: "xs", md: "sm" }}>
            <Text as={"span"} mr={1} fontWeight={"bold"}>
              {posts.length}
            </Text>
            Posts
          </Text>
          <Text
            size={{ base: "xs", md: "sm" }}
            onClick={onOpenFollowers}
            cursor={"pointer"}
          >
            <Text as={"span"} mr={1} fontWeight={"bold"}>
              {userProfile.followers.length}
            </Text>
            Followers
          </Text>
          <Text
            size={{ base: "xs", md: "sm" }}
            onClick={onOpenFollowing}
            cursor={"pointer"}
          >
            <Text as={"span"} mr={1} fontWeight={"bold"}>
              {userProfile.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Text size={{ base: "xs", md: "sm" }} fontWeight={"bold"}>
          {userProfile.fullName}
        </Text>
        <Text size={{ base: "xs", md: "sm" }}>{userProfile.bio}</Text>
      </VStack>
      <EditProfile isOpen={isOpen} onClose={onClose} />
      <FollowersListModal
        isOpen={isOpenFollowers}
        onClose={onCloseFollowers}
        followersIdArray={userProfile.followers}
      />
      <FollowingListModal
        isOpen={isOpenFollowing}
        onClose={onCloseFollowing}
        followingIdArray={userProfile.following}
      />
    </Flex>
  );
};

export default ProfileHeader;

const FollowersListModal = ({ isOpen, onClose, followersIdArray }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Followers List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={3}>
            {followersIdArray.length > 0 ? (
              followersIdArray.map((follower, idx) => (
                <FollowerUser
                  id={follower}
                  key={idx}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              ))
            ) : (
              <Text>There is no follower at the moment.</Text>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const FollowingListModal = ({ isOpen, onClose, followingIdArray }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Following List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={3}>
            {followingIdArray?.length > 0 ? (
              followingIdArray?.map((follower) => (
                <FollowingUser
                  id={follower}
                  key={follower}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              ))
            ) : (
              <Text>There is no following at the moment.</Text>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
