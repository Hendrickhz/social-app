import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  const { setUserProfile, userProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          return setUserProfile(null);
        }

        let userDoc;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });
        setUserProfile(userDoc);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
  }, [ showToast, username, setUserProfile]);

  return {loading,userProfile}
};
export default useGetUserProfileByUsername;
