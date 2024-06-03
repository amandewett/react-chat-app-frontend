import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import CustomFormInput from "./Form";
import { LoaderContext } from "../../store/context/loaderContext";
import { useMutation } from "@tanstack/react-query";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../store/context/chatContext";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { enableLoader, disableLoader, isLoading } = useContext(LoaderContext);
  const toast = useCustomToast();
  const navigate = useNavigate();
  const { setUserDetails } = useContext(ChatContext);

  const { mutate: mutateLoginApi } = useMutation({
    mutationFn: (postData: any) => axiosInstance.post(`/api/user/login`, postData),
    onSettled: () => {
      disableLoader();
    },
    onError(error: any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
      });
    },
    onSuccess(data: any) {
      resetForm();
      toast({
        title: "Success",
        description: data.data.message,
        status: "success",
      });
      //store data in local storage
      const userDetails = {
        ...data.data.result,
        token: data.data.token,
      };
      storeDataToLocalStorage(userDetails);
      navigate(`/chat`);
    },
  });

  const storeDataToLocalStorage = (data: any) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUserDetails(data);
  };

  const onSubmitHandler = async () => {
    //validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill all the required fields",
        status: "error",
      });
      return;
    }

    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      toast({
        title: "Error",
        description: "Invalid email",
        status: "error",
      });
      return;
    }

    enableLoader();
    mutateLoginApi({ email, password });
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitHandler();
  };

  return (
    <>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <VStack spacing="5px">
          <CustomFormInput isRequired={true} label="Email" inputType="email" value={email} placeHolder="Enter your email" id="email" onChange={(value) => setEmail(value)} />
          <FormControl isRequired id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                placeholder="Enter your password"
                value={password}
                type={isPasswordVisible ? "text" : "password"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <InputRightElement width={"4.5rem"}>
                <Button h="1.75rem" size="sm" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                  {isPasswordVisible ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button colorScheme="amberScheme" width={"100%"} isLoading={isLoading} disabled={isLoading} style={{ marginTop: 15 }} onClick={onSubmitHandler} type="submit">
            Login
          </Button>

          <Button
            colorScheme="red"
            variant={"solid"}
            disabled={isLoading}
            width={"100%"}
            style={{ marginTop: 15 }}
            onClick={() => {
              setEmail(`user2@yopmail.com`);
              setPassword(`123456`);
            }}
          >
            Login as guest user
          </Button>
        </VStack>
      </form>
    </>
  );
};
export default Login;
