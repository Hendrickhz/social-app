import { useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const useDeleteComment = () => {
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteCommentFromPostStore = usePostStore(
    (state) => state.deleteComment
  );
  const deleteComment = async (postId, commentId) => {
    setIsDeleting(true);
    const postRef = doc(firestore, "posts", postId);
    try {
      // Get the current comments array from the post
      const postSnapshot = await getDoc(postRef);
      const currentComments = postSnapshot.data().comments || [];

      // Remove the specified commentId from the comments array
      const updatedComments = currentComments.filter(
        (comment) => comment.commentId !== commentId
      );

      // Update the post with the modified comments array
      await updateDoc(postRef, {
        comments: updatedComments,
      });
      deleteCommentFromPostStore(postId, commentId);
      showToast("Success", "The comment is successfully deleted.", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, deleteComment };
};

export default useDeleteComment;
