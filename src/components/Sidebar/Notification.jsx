import {
  Box,
  Flex,
  Tooltip,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { NotificationsLogo } from "../../assets/constants";
import useGetNotifications from "../../hooks/useGetNotifications";
import NotificationItem from "./NotificationItem";

const Notification = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, notifications, numOfUnReadNotification, updateAllNotificationsAsRead } = useGetNotifications();

  if (isLoading) {
    return null;
  }
  const handleOnClose =async()=>{
    onClose();
    await updateAllNotificationsAsRead()
  }
  return (
    <>
      <Tooltip
        hasArrow
        label={"Notification"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={"full"}
          onClick={onOpen}
          justifyContent={{ base: "center", md: "flex-start" }}
          pos={"relative"}
        >
          <NotificationsLogo />
         {numOfUnReadNotification > 0 ?  <Badge
            display={{ base: "block", md: "none" }}
            pos={"absolute"}
            top={-1}
            right={0}
            px={2}
            colorScheme="red"
            borderRadius={99999}
          >
            {numOfUnReadNotification}
          </Badge>:''}
          <Box display={{ base: "none", md: "block" }}>
            Notification{" "}
           {numOfUnReadNotification > 0 ?  <Badge
              pos={"absolute"}
              px={2}
              colorScheme="red"
              borderRadius={99999}
            >
              {numOfUnReadNotification}
            </Badge>:''}
          </Box>
        </Flex>
      </Tooltip>
      <Drawer isOpen={isOpen} placement="right" onClose={handleOnClose} size={"sm"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Notifications</DrawerHeader>
          <Divider />
          <DrawerBody p={0}>
            <VStack w={"full"} gap={3} p={0}>
              {notifications.map((noti, idx) => (
                <NotificationItem key={idx} noti={noti} onClose={handleOnClose} />
              ))}
              {notifications.map((noti, idx) => (
                <NotificationItem key={idx} noti={noti} onClose={handleOnClose} />
              ))}
              {notifications.map((noti, idx) => (
                <NotificationItem key={idx} noti={noti} onClose={handleOnClose} />
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Notification;
