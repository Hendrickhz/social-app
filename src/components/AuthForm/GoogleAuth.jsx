import { Flex, Image, Text } from "@chakra-ui/react"
import { auth, firestore } from "../../firebase/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import useShowToast from "../../hooks/useShowToast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthStore } from "../../store/authStore";

const GoogleAuth = ({prefix}) => {
  const [signInWithGoogle, error] = useSignInWithGoogle(auth);
  const showToast=useShowToast()
const loginUser= useAuthStore(state=>state.login)
  const handleGoogleAuth= async()=>{
    try {
      const newUser = await signInWithGoogle();
			if (!newUser && error) {
				return showToast("Error", error.message, "error");
				
			}
			const userRef = doc(firestore, "users", newUser.user.uid);
      console.log("it works 1")
			const userSnap = await getDoc(userRef);
      console.log("it works 2")
			if (userSnap.exists()) {
				// login
				const userDoc = userSnap.data();
        console.log("it works 4")
				localStorage.setItem("user-info", JSON.stringify(userDoc));
        console.log("it works 5")
				loginUser(userDoc)
        console.log("google login")
			} else {
				// signup
				const userDoc = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					username: newUser.user.email.split("@")[0],
					fullName: newUser.user.displayName,
					bio: "",
					profilePicURL: newUser.user.photoURL,
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        console.log("it works 6")
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
        console.log("sign up")
      }
    } catch (error) {
      showToast("Error",error.message,"error")
    }}
  
  return (
    <> <Flex
    justifyContent={"center"}
    alignItems={"center"}
    gap={1}
    cursor={"pointer"}
    w={"full"}
    onClick={handleGoogleAuth}
  >
    <Image src="/google.png" alt="google logo" w={5} />
    <Text color={"blue.500"} mx={2}>
     {prefix} with Google
    </Text>
  </Flex></>
  )
}

export default GoogleAuth