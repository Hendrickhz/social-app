import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import useShowToast from "./useShowToast";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const getSuggestedUsers = async () => {
     
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, "users");

        const q = query(
          usersRef,
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          orderBy("uid")
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          return setSuggestedUsers([]);
        }
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        setSuggestedUsers(users);
        console.log("suggested users updated");
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) {
      getSuggestedUsers();
    }
  }, [authUser, showToast]);
 
  return { suggestedUsers, isLoading };
};

export default useGetSuggestedUsers;
