import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import Form from "./Form";
import { useCustomToast } from "../../hooks/useCustomToast";
import axios from "axios";
import { LoaderContext } from "../../store/context/loaderContext";
import { useMutation } from "@tanstack/react-query";
import { SignupComponentType } from "../../utils/customTypes";

const Signup = ({ handleTabChange }: SignupComponentType) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const profilePictureRef = useRef<any>(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const toast = useCustomToast();
  const { enableLoader, disableLoader, isLoading } = useContext(LoaderContext);
  const { mutate: mutateSignup } = useMutation({
    mutationFn: (postData: any) =>
      axios.post(`/api/user/signup`, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
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
      toast({
        title: "Success",
        description: data.data.message,
        status: "success",
      });
      resetForm();
      handleTabChange(0);
      // console.log(`--> ${JSON.stringify(data.data)}`);
    },
  });

  const profilePickerDetails = async (files: any | null) => {
    if (files[0].type === "image/jpeg" || files[0].type === "image/png") {
      const formData = new FormData();
      formData.append("files", files[0]);
      try {
        enableLoader();
        const { data } = await axios.post("/api/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        disableLoader();
        if (data.status) {
          setProfilePicture(data.result[0]);
          toast({
            title: `File uploaded successfully`,
            status: "success",
          });
        } else {
          toast({
            title: `File upload failed`,
            status: "error",
          });
        }

        return;
      } catch (e: any) {
        disableLoader();
        toast({
          title: `Error`,
          description: JSON.stringify(e.response.data.message),
          status: "error",
        });
        throw e;
      }
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a JPEG or PNG only",
        status: "warning",
      });
    }
  };

  const onSubmitHandler = () => {
    //validation
    if (!name || !email || !password) {
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
    if (profilePicture !== "") {
      mutateSignup({ name, email, password, profilePicture });
    } else {
      mutateSignup({ name, email, password });
    }
  };

  const resetForm = () => {
    setEmail("");
    setName("");
    setPassword("");
    setProfilePicture("");
    profilePictureRef.current!.value = "";
  };

  return (
    <>
      <VStack spacing="5px">
        <Form isRequired={true} label="Name" value={name} inputType="text" placeHolder="Enter your name" id="name" onChange={(value) => setName(value)} />
        <Form isRequired={true} label="Email" inputType="email" value={email} placeHolder="Enter your email" id="signupEmail" onChange={(value) => setEmail(value)} />
        <FormControl isRequired id="password">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              id="signupPassword"
              value={password}
              placeholder="Enter your password"
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
        <FormControl isRequired={false} id="pic">
          <FormLabel>Profile picture</FormLabel>
          <Input type="file" p={1.5} ref={profilePictureRef} accept="image/*" onChange={(e: React.ChangeEvent<HTMLInputElement>) => profilePickerDetails(e.target.files)} />
        </FormControl>
        <Button colorScheme="blue" width={"100%"} disabled={isLoading} isLoading={isLoading} style={{ marginTop: 15 }} onClick={onSubmitHandler}>
          Sign up
        </Button>
      </VStack>
    </>
  );
};
export default Signup;
