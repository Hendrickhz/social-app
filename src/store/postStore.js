import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  setPosts: (posts) => set({ posts }),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id == postId) {
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      }),
    })),
    deleteComment:(postId,commentId)=>
    set((state)=>({
      posts: state.posts.map(post=>{
        if(post.id == postId){
          return {...post, comments: post.comments.filter(comment=>comment.commentId!== commentId)}
        }
        return post;
      })
    }))
}));

export default usePostStore;
