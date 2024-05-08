import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import Form from "./Form";
import { LoaderContext } from "../../store/context/loaderContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { enableLoader, disableLoader } = useContext(LoaderContext);
  const toast = useCustomToast();
  const navigate = useNavigate();

  const { mutate: loginMutate } = useMutation({
    mutationFn: (postData: any) => axios.post(`/api/user/login`, postData),
    onSettled: () => {
      disableLoader();
    },
    onError(error: any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
      });
      // console.log(`==> ${JSON.stringify(error.response.data)}`);
    },
    onSuccess(data: any) {
      resetForm();
      toast({
        title: "Success",
        description: data.data.message,
        status: "success",
      });
      navigate(`/chat`);
      // console.log(`--> ${JSON.stringify(data.data)}`);
    },
  });

  const onSubmitHandler = () => {
    enableLoader();
    loginMutate({ email, password });
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <VStack spacing="5px">
        <Form
          isRequired={true}
          label="Email"
          inputType="email"
          value={email}
          placeHolder="Enter your email"
          id="email"
          onChange={(value) => setEmail(value)}
        />
        <FormControl isRequired id="password">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              id="password"
              placeholder="Enter your password"
              value={password}
              type={isPasswordVisible ? "text" : "password"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <InputRightElement width={"4.5rem"}>
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="blue"
          width={"100%"}
          style={{ marginTop: 15 }}
          onClick={onSubmitHandler}
        >
          Login
        </Button>
        <Button
          colorScheme="red"
          variant={"solid"}
          width={"100%"}
          style={{ marginTop: 15 }}
          onClick={() => {
            setEmail(`guest@chat.com`);
            setPassword(`1234567890`);
          }}
        >
          Login as guest user
        </Button>
      </VStack>
    </>
  );
};
export default Login;
