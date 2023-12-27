import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const showToast = useShowToast();

  const loginUser = useAuthStore((state) => state.login);
  const navigate=useNavigate()
  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      showToast("Error", "Please fill all the fields.", "error");
    }
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
        if(userCred){

          const usersRef = doc(firestore, "users", userCred.user.uid);
          const docSnap = await getDoc(usersRef);
          
          localStorage.setItem('user-info',JSON.stringify(docSnap.data()))
          loginUser(docSnap.data());
          navigate('/')

        }else{
          showToast("Login Failed", "User credentials do not match.", "error");
        }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { loading, error, login };
};

export default useLogin;
