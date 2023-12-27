import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  SkeletonCircle,
  Skeleton,
  Flex,
  Text,
} from "@chakra-ui/react";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsersModal = ({
  isOpen,
  onClose,
  isLoading,
  suggestedUsers,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Suggested Users</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          {isLoading ? (
            <VStack gap={4}>
              {[0, 1, 2].map((_, idx) => (
                <VStack w={"full"} p={0} m={0} key={idx}>
                  <Flex gap={2} w={"full"} justifyContent={"flex-start"}>
                    <SkeletonCircle size="10" />

                    <VStack
                      alignItems={"flex-start"}
                      gap={2}
                      mx={"auto"}
                      flex={1}
                    >
                      <Skeleton height="12px" width="100px" />
                      <Skeleton height="12px" width="50px" />
                    </VStack>
                  </Flex>
                </VStack>
              ))}
            </VStack>
          ) : (
            <VStack gap={4} maxH={"450px"} overflowY={"auto"}>
              {suggestedUsers.length == 0 ? (
                <Text>There is no suggested user at the moment.</Text>
              ) : (
                <>
                  {" "}
                  {suggestedUsers.map((user) => (
                    <SuggestedUser key={user.uid} user={user} />
                  ))}
                </>
              )}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuggestedUsersModal;
