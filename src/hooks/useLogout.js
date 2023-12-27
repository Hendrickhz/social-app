import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [signOut, loading] = useSignOut(auth);
  const showToast = useShowToast();
const navigate= useNavigate()
  const logout= useAuthStore((state)=>state.logout)
  const handleLogout = async () => {
    try {
      const success = await signOut();
      if (success) {
        alert("You are sign out");
        localStorage.removeItem("user-info")
        showToast("Success","You are logged out successfully.","success")
        console.log("logged out")
        logout();
        navigate('/auth')
      }
    } catch (error) {
        showToast("Error",error.message,"error")
    }
  };
  return {handleLogout,isLoggingOut:loading};
};

export default useLogout;
