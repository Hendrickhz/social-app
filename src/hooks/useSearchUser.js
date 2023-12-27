import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
const useSearchUser = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const [searchUsers, setSearchUsers] = useState([]);
  const clearSearchUsers = () => {
    setSearchUsers([]);
  };
  const handleSearchUser = async (inputValue) => {
    setIsLoading(true);
    clearSearchUsers();
    try {
      const q = query(
        collection(firestore, "users"),
        or(
          where("username", "==", inputValue),
          where("fullName", "==", inputValue)
        )
      );

      const userSnapShot = await getDocs(q);
      if (userSnapShot.empty)
        return showToast("Error", "User not found", "error");
      let results = [];
      userSnapShot.forEach((doc) => {
        results.push(doc.data());
      });

      setSearchUsers(results);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSearchUser, isLoading, searchUsers, clearSearchUsers };
};

export default useSearchUser;
