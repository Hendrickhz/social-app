import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { loading, error, login } = useLogin();
  return (
    <>
      <Input
        placeholder="Email"
        type="email"
        fontSize={14}
        size={"sm"}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        placeholder="Password"
        type="password"
        fontSize={14}
        size={"sm"}
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
      {!loading && error?.message && (
        <>
          <Alert status="error">
            <AlertIcon />
            <Flex direction={"column"}>
              <AlertTitle fontSize={"small"}>Login Failed!</AlertTitle>
              <AlertDescription fontSize={"small"}>
                {error?.message}
              </AlertDescription>
            </Flex>
          </Alert>
        </>
      )}
      <Button
        isLoading={loading}
        colorScheme="blue"
        width={"full"}
        onClick={() => login(inputs)}
      >
        Log In
      </Button>
    </>
  );
};

export default Login;
