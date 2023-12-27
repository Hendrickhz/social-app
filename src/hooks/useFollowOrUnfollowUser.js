import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAddNotification from "./useAddNotification";

const useFollowOrUnFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false); // for loading
  const [isFollowing, setIsFollowing] = useState(false); // whether auth user follow the user or not

  const authUser = useAuthStore((state) => state.user); //get current auth user info

  const setAuthUserState = useAuthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore(); // info of user profile that the auth user is looking

  const showToast = useShowToast(); //toast func
  const {addNotification}=useAddNotification()
  const handleFollowUnFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentAuthUserRef = doc(firestore, "users", authUser.uid); //ref of current auth user to the firebase
      const userToFollowOrUnFollowRef = doc(firestore, "users", userId); //ref of other user

      // * updating the firebase (database)
      //updating auth user's following list
      await updateDoc(currentAuthUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });
      console.log("Updated currentAuthUser following list");
      //updating other user's followers list

      if(isFollowing){
        await updateDoc(userToFollowOrUnFollowRef, {
          followers: 
           arrayRemove(authUser.uid)
          
        });
      }else{
        await updateDoc(userToFollowOrUnFollowRef, {
          followers: 
           arrayUnion(authUser.uid)
          
        });
        await addNotification('follow',userId)
      }
   
      console.log("Updated other user's followers list");

      // * updating the interface (global states)
      if (isFollowing) {
        //unfollow user
        setAuthUserState({
          ...authUser,
          following: authUser.following.filter((uid) => uid !== userId),
        });

        if (userProfile) {
          //checking if auth user is looking at someone profile
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter(
              (uid) => uid !== authUser.uid
            ),
          });
        }

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: authUser.following.filter((uid) => uid !== userId),
          })
        );
        setIsFollowing(false);
      } else {
        //follow user
        setAuthUserState({
          ...authUser,
          following: [...authUser.following, userId],
        });
      
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, authUser.uid],
          });
        }
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: [...authUser.following, userId],
          })
        );
        setIsFollowing(true);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      const following = authUser.following.includes(userId);
      setIsFollowing(following);
    }
  }, [authUser, userId, isFollowing]);
  return { isUpdating, isFollowing, handleFollowUnFollowUser };
};

export default useFollowOrUnFollowUser;
