import  { useState } from "react";
import useShowToast from "./useShowToast";
import { useAuthStore } from "../store/authStore";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useAddNotification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);

  const addNotification = async (type, userId, postImgURL = null,postId=null) => {
    if (isLoading || !authUser) return;

    setIsLoading(true);
    const newNotification = {
      type,
      performedUserId: authUser.uid,
      createdAt: Date.now(),
      read: false,
      postImgURL,
      postId,
    };
    if (authUser.uid == userId) return;
    try {
      const notificationsRef = doc(firestore, "notifications", userId);

      // Check if the document for the user exists
      const docSnap = await getDoc(notificationsRef);

      if (docSnap.exists()) {
        // Update the existing document with the new notification
        await updateDoc(notificationsRef, {
          notifications: arrayUnion(newNotification),
        });
      } else {
        // Create a new document with the user's notifications array
        await setDoc(notificationsRef, { notifications: [newNotification] });
      }
      console.log("added notification");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };
  return { addNotification, isLoading };
};

export default useAddNotification;
