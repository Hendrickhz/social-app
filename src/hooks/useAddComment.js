import { useState } from "react";
import useShowToast from "./useShowToast";
import { useAuthStore } from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";
import { v4 as uuidv4 } from 'uuid';
import useAddNotification from "./useAddNotification";

const useAddComment = () => {
  const showToast = useShowToast();
  const [isCommenting, setIsCommenting] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const addCommentToPostStore = usePostStore((state) => state.addComment);
  const {addNotification}=useAddNotification()
  const addComment = async (postId, comment,postCreatedUser,postImgURL) => {
    setIsCommenting(true);

    const newComment = {
      commentId: uuidv4(),
      comment,
      postId,
      commentUserId: authUser.uid,
      createdAt: Date.now(),
    };
    try {
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });
      addCommentToPostStore(postId, newComment);
      addNotification('comment',postCreatedUser,postImgURL,postId)
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };

  return { isCommenting, addComment };
};

export default useAddComment;
