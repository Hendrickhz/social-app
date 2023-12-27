import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();

  const [user, loading] = useAuthState(auth);

  const canRenderSidebar = pathname !== "/auth" && user;

  const canRenderNavbar = !loading && pathname != "/auth" && user == null;

  const checkingUserIsAuth = !user && loading;



  if (checkingUserIsAuth) {
    return <PageLayoutSpinner />;
  }
  return (
    <>
      <Flex direction={canRenderNavbar ? "column" : "row"}>
        {/* side bar on the left */}
        {canRenderSidebar && (
          <Box w={{ base: "70px", md: "240px" }}>
            <Sidebar />
          </Box>
        )}
        {canRenderNavbar && <Navbar />}
        {/* page content on the right  */}
        <Box
          w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
          flex={1}
          mx={"auto"}
        >
          {children}
        </Box>
      </Flex>
    </>
  );
};

export default PageLayout;

 export const PageLayoutSpinner = () => {
  return (
    <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Spinner size={"xl"} />
    </Flex>
  );
};
