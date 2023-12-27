import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAddNotification from "./useAddNotification";

const useLikePost = (post) => {
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [likes, setLikes] = useState(post?.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser.uid));
  const [isUpdating, setIsUpdating] = useState(false);
  const { addNotification } = useAddNotification();
  const likePost = async () => {
    if (isUpdating) return;
    if (!authUser)
      return showToast(
        "Error",
        "You need to log in to your account to like a post.",
        "error"
      );

    setIsUpdating(true);

    try {
      const postRef = doc(firestore, "posts", post.id);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });
      if (isLiked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
        await addNotification("like", post.createdBy, post.imgURL, post.id);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };
  return { isUpdating, likes, likePost, isLiked };
};

export default useLikePost;
