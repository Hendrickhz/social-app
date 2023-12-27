import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore"
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";


const useGetPostsFromUserProfile = () => {
    const [isLoading,setIsLoading]= useState(false)
  const userProfile= useUserProfileStore(state=>state.userProfile);
  const showToast= useShowToast();
  const {posts,setPosts}=usePostStore()

  useEffect(()=>{
    const getPostsFromUserProfile= async()=>{
        if(!userProfile) return;
        setIsLoading(true);
        setPosts([])
        try {
        const q= query(collection(firestore,"posts"),where('createdBy','==',userProfile.uid));
           const querySnapshot=  await getDocs(q);
           const postsArray=[];

           querySnapshot.forEach(doc=>
            postsArray.push({...doc.data(),id:doc.id}));
            postsArray.sort((a,b)=> b.createdAt- a.createdAt)
            setPosts(postsArray)
        } catch (error) {
            showToast('Error',error.message,'error');
            setPosts([])
        }finally{
            setIsLoading(false)
        }
        
    }
    getPostsFromUserProfile()
  },[setPosts, showToast, userProfile])

 return {posts,isLoading}
}


export default useGetPostsFromUserProfile