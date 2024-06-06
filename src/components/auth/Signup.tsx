import { Button, FormControl, FormLabel, Input, VStack, Box, Progress } from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import { useCustomToast } from "../../hooks/useCustomToast";
import { LoaderContext } from "../../store/context/loaderContext";
import { useMutation } from "@tanstack/react-query";
import { SignupComponentProps } from "../../utils/customTypes";
import axiosInstance from "../../utils/axiosInstance";
import MyInput from "../MyInputs/MyInput";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios, { AxiosProgressEvent } from "axios";

const Signup = ({ handleTabChange }: SignupComponentProps) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const profilePictureRef = useRef<any>(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const toast = useCustomToast();
  const { enableLoader, disableLoader, isLoading } = useContext(LoaderContext);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const allowedFileSize = import.meta.env.VITE_ALLOWED_FILE_SIZE_IN_MB || "2";

  const { mutate: mutateSignup } = useMutation({
    mutationFn: (postData: any) =>
      axiosInstance.post(`/api/user/signup`, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
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
      toast({
        title: data.data.message,
        status: "success",
      });
      resetForm();
      handleTabChange(0);
    },
  });

  const profilePickerDetails = async (files: any | null) => {
    if (files[0].type === "image/jpeg" || files[0].type === "image/png") {
      if ((files[0].size / 1024 / 1024).toFixed(1) <= allowedFileSize) {
        const formData = new FormData();
        formData.append("files", files[0]);
        try {
          const { data } = await axios.post("/api/file/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress(progressEvent: AxiosProgressEvent) {
              setUploadProgress(Math.round(100 * progressEvent.loaded) / progressEvent.total!);
            },
          });

          if (data.status) {
            setProfilePicture(data.result[0]);
            setUploadProgress(0);
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
          toast({
            title: `Error`,
            description: JSON.stringify(e.response.data.message),
            status: "error",
          });
          throw e;
        }
      } else {
        profilePictureRef.current!.value = "";
        toast({
          title: "Invalid file size",
          description: "Max size allowed is 2MB",
          status: "warning",
        });
      }
    } else {
      profilePictureRef.current!.value = "";
      toast({
        title: "Invalid file type",
        description: "Please select a JPEG or PNG only",
        status: "warning",
      });
    }
  };

  const resetForm = () => {
    setEmail("");
    setName("");
    setPassword("");
    setProfilePicture("");
    profilePictureRef.current!.value = "";
  };

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
  }

  return (
    <>
      <form onSubmit={handleOnSubmit} autoComplete="off" noValidate>
        <VStack spacing="5px">
          <MyInput isRequired={true} formLabelText="Name" isFormLabelVisible={true} value={name} type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
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

          <FormControl isRequired={false} id="pic">
            <FormLabel>Profile picture</FormLabel>
            <Input type="file" p={1.5} ref={profilePictureRef} accept="image/*" onChange={(e: React.ChangeEvent<HTMLInputElement>) => profilePickerDetails(e.target.files)} />
            {uploadProgress > 0 && <Progress mt={"10px"} borderRadius={"15px"} hasStripe value={uploadProgress} colorScheme="amberScheme" isAnimated />}
          </FormControl>

          <Button
            bgColor={"primaryColor"}
            width={"100%"}
            disabled={isLoading || uploadProgress > 0}
            isLoading={isLoading || uploadProgress > 0}
            style={{ marginTop: 15 }}
            type="submit"
            onClick={() => {
              handleOnSubmit;
            }}
          >
            Sign up
          </Button>
        </VStack>
      </form>
    </>
  );
};
export default Signup;
