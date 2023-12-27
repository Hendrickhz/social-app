import { doc, updateDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";
import { firestore, storage } from "../firebase/firebase";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useUserProfileStore from "../store/userProfileStore";
const useEditProfile = () => {
  const showToast = useShowToast();
  const [isUpdating, setIsUpdating] = useState(false); // for loading

  const authUser = useAuthStore((state) => state.user); // Retrieve authenticated user information from global state

  // Custom hooks to update global state with the edited user information
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  const userProfile= useUserProfileStore(state=>state.userProfile)
  const handleEditProfile = async (inputs, selectedFile) => {
    if (isUpdating || !authUser) return; // Check if the profile is already updating or if there is no authenticated user

    setIsUpdating(true);

    // Create a reference to the storage and the user document in Firestore
    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userRef = doc(firestore, "users", authUser.uid);
    let URL = "";

    try {
      if (selectedFile) {
        // If a new profile picture is selected, upload it to storage and get the download URL
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }
      // Create an updated user object with the edited information
      const updatedUser = {
        ...userProfile,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };
      // Update the user document in Firestore with the new information
      await updateDoc(userRef, updatedUser);

      localStorage.setItem("user-info", JSON.stringify(updatedUser)); // Update the local storage

      //update the global states
      setAuthUser(updatedUser);

     
      setUserProfile(updatedUser);

      showToast("Success", "User profile is updated successfully.", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };
  // Return the handleEditProfile function and the isUpdating state for external use
  return { handleEditProfile, isUpdating };
};

export default useEditProfile;
