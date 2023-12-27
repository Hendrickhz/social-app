import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useAuthStore } from "../store/authStore";

const useGetNotifications = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();
  const [notifications, setNotifications] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const [numOfUnReadNotification, setNumOfUnReadNotification] = useState(0);

  useEffect(() => {
    const getNotifications = async (userId) => {
      setIsLoading(true);
      try {
        const notificationRef = doc(firestore, "notifications", userId);
        const docSnap = await getDoc(notificationRef);
        let notificationData;
        let unReadNotifications;
        if (docSnap.exists()) {
          notificationData = docSnap.data();
          const sortedNotifications = notificationData.notifications.sort(
            (a, b) => b.createdAt - a.createdAt
          );

          unReadNotifications = sortedNotifications.filter(
            (noti) => noti.read == false
          );
          setNumOfUnReadNotification(unReadNotifications.length);
          setNotifications(sortedNotifications);
        } else {
          return;
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) {
      getNotifications(authUser.uid);
      const unsubscribe = onSnapshot(
        doc(firestore, "notifications", authUser.uid),
        () => {
          getNotifications(authUser.uid);
        }
      );

      return () => unsubscribe();
    }
  }, [authUser, showToast]);

  const updateAllNotificationsAsRead = async () => {
    if (numOfUnReadNotification == 0) return;
    try {
      const notificationRef = doc(firestore, "notifications", authUser.uid);
      const docSnap = await getDoc(notificationRef);

      if (docSnap.exists()) {
        const notificationsArray = docSnap.data().notifications;

        // Update each notification as read
        const updatedNotifications = notificationsArray.map((notification) => ({
          ...notification,
          read: true,
        }));

        // Update the document with the modified notifications array
        await updateDoc(notificationRef, {
          notifications: updatedNotifications,
        });
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return {
    isLoading,
    notifications,
    numOfUnReadNotification,
    updateAllNotificationsAsRead,
  };
};

export default useGetNotifications;
