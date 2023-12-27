import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import useShowToast from "./useShowToast";
import usePostStore from "../store/postStore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const { posts, setPosts } = usePostStore();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      const authUserRef = doc(firestore, "users", authUser.uid);
      const userSnapShot = await getDoc(authUserRef);
      const userData = userSnapShot.data();
      if (authUser.following.length == 0 && userData.posts.length == 0) {
        setPosts([]);
        setIsLoading(false);
        return;
      }
      let q;
      if (authUser.following.length == 0) {
         q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", authUser.uid)
        );
      } else {
         q = query(
          collection(firestore, "posts"),
          or(
            where("createdBy", "in", authUser.following),
            where("createdBy", "==", authUser.uid)
          )
        );
      }

      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];
        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });

        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) getFeedPosts();
  }, [authUser, setPosts, showToast, setUserProfile]);
  return { isLoading, posts };
};

export default useGetFeedPosts;
