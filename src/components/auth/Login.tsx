import { Box, Button, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { LoaderContext } from "../../store/context/loaderContext";
import { useMutation } from "@tanstack/react-query";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../store/context/appContext";
import axiosInstance from "../../utils/axiosInstance";
import MyInput from "../MyInputs/MyInput";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { LoginProps } from "../../utils/customTypes";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { enableLoader, disableLoader, isLoading } = useContext(LoaderContext);
  const toast = useCustomToast();
  const navigate = useNavigate();
  const { setUserDetails } = useContext(AppContext);

  const { mutate: mutateLoginApi } = useMutation({
    mutationFn: (postData: any) => axiosInstance.post(`/api/user/login`, postData),
    onSettled: () => {
      disableLoader();
    },
    onError(error: any) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
    },
    onSuccess(data: any) {
      const res: LoginProps = data.data.result;
      resetForm();
      toast({
        title: data.data.message,
        status: "success",
      });
      storeDataToLocalStorage(res);
      navigate(`/chat`);
    },
  });

  const storeDataToLocalStorage = (data: LoginProps) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUserDetails(data);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <VStack spacing="5px">
          <MyInput isRequired={true} formLabelText="Email" isFormLabelVisible={true} value={email} type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
          <MyInput
            isRequired={true}
            formLabelText="Password"
            isFormLabelVisible={true}
            value={password}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            hasRightElement={true}
          >
            <Box onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? <ViewIcon /> : <ViewOffIcon />}</Box>
          </MyInput>

          <Button
            bgColor={"appPrimaryColor"}
            textColor="appBgColor"
            _hover={{ bgColor: "appHoverColor" }}
            width={"100%"}
            isLoading={isLoading}
            disabled={isLoading}
            style={{ marginTop: 15 }}
            onClick={() => {
              handleSubmit;
            }}
            type="submit"
          >
            Login
          </Button>

          <Button
            variant={"solid"}
            disabled={isLoading}
            _hover={{ bgColor: "appListItemBgColor", textColor: "appPrimaryColor" }}
            bgColor={"appGrayColor"}
            textColor="appBgColor"
            width={"100%"}
            style={{ marginTop: 15 }}
            onClick={() => {
              setEmail(`guestuser@yopmail.com`);
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
