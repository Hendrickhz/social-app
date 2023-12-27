import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";
import { useAuthStore } from "../store/authStore";
import { collection, query, where } from "firebase/firestore";
const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const login = useAuthStore((state) => state.login);
  const signup = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.fullName
    ) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    const usersRef = collection(firestore, "users"); // Create a reference to the users collection

    const q = query(usersRef, where("username", "==", inputs.username)); // Create a query against the collection.

    const querySnapshot = await getDocs(q); //Executing query
    if (!querySnapshot.empty) {
      showToast("Error", "Username already exists.", "error");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }
      if (newUser) {
        const usersRef = doc(firestore, "users", newUser.user.uid);
        const docSnap = await getDoc(usersRef);

        if (docSnap.exists()) {
          localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
          login(docSnap.data());
        } else {
          const userDoc = {
            uid: newUser.user.uid,
            email: inputs.email,
            username: inputs.username,
            fullName: inputs.fullName,
            bio: "",
            profilePicURL: "",
            followers: [],
            following: [],
            posts: [],
            createdAt: Date.now(),
          };
          await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
          localStorage.setItem("user-info", JSON.stringify(userDoc));
          login(userDoc);
        }
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
