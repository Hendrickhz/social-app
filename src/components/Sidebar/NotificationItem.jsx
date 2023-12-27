import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import useTimeAgo from "../../hooks/useTimeAgo";
const NotificationItem = ({ noti, onClose }) => {
  const navigate = useNavigate();
  const { userProfile } = useGetUserProfileById(noti.performedUserId);
  const onProfileClick = () => {
    navigate(`/${userProfile.username}`);
    onClose();
  };
  const {timeAgo}=useTimeAgo()

  return (
    <>
      <Flex
        alignItems={"center"}
        w={"full"}
        gap={3}
        py={2}
        px={6}
        bg={noti.read ? "" : "gray.500"}
      >
        {noti.postImgURL !== null ? (
          <Image w={12} h={12} src={noti.postImgURL} />
        ) : (
          <Avatar
            name={userProfile?.username}
            src={userProfile?.profilePicURL}
          />
        )}

        <Text fontSize={14}>
          <Text
            cursor={"pointer"}
            onClick={onProfileClick}
            mr={2}
            fontWeight={"bold"}
            as={"span"}
          >
            {userProfile?.username}
          </Text>
          {noti.type == "follow"
            ? "started following you."
            : noti.type == "like"
            ? " liked your post."
            : "commented in your post."}
            {" "}
         <Text as={'span'} color={'gray'}> {timeAgo(noti?.createdAt)}</Text>
        </Text>
      </Flex>
    </>
  );
};

export default NotificationItem;
