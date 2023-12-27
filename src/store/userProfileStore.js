import {create} from 'zustand'

const useUserProfileStore= create((set)=>({
    userProfile: null,
    setUserProfile:(userProfile)=>set({userProfile}),
    addPost:(id)=>set(state=>({...state.userProfile,posts:[id,...state.userProfile.posts]})),
    deletePost: (id)=> set(state=>({...state.userProfile,posts:[state.userProfile.posts.filter(post=>post!==id)]}))
}))

export default useUserProfileStore