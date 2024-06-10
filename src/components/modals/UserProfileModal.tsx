import { DrawerHeader, ModalCloseButton, ModalBody, Avatar, Text, Box, Input } from "@chakra-ui/react";
import { UserProfileModalProps } from "../../utils/customTypes";
import { useContext, useRef } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useCustomToast } from "../../hooks/useCustomToast";
import { AppContext } from "../../store/context/appContext";
import { LoaderContext } from "../../store/context/loaderContext";

const UserProfileModal = ({ userName, userEmail, userProfilePicture }: UserProfileModalProps) => {
  const { userDetails, setUserDetails } = useContext(AppContext);
  const { enableLoader, disableLoader } = useContext(LoaderContext);
  userProfilePicture = userProfilePicture ? (userProfilePicture.includes("http") ? userProfilePicture : `${import.meta.env.VITE_SERVER_HOST}/${userProfilePicture}`) : "";
  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const toast = useCustomToast();
  const allowedFileSize = import.meta.env.VITE_ALLOWED_FILE_SIZE_IN_MB || "2";

  const { mutate: mutateSignup } = useMutation({
    mutationFn: (profilePicturePath: string) =>
      axiosInstance.post(
        `/api/user/changeProfilePicture`,
        { profilePicture: profilePicturePath },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
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
      data.data.result.token = userDetails?.token;
      localStorage.setItem("user", JSON.stringify(data.data.result));
      setUserDetails(data.data.result);
      toast({
        title: data.data.message,
        status: "success",
      });
    },
  });

  const handleChangeProfilePicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if ((e.target.files.length > 0 && e.target.files[0].type === "image/jpeg") || e.target.files[0].type === "image/png") {
        const file = e.target.files[0];
        if ((file.size / 1024 / 1024).toFixed(1) <= allowedFileSize) {
          const formData = new FormData();
          formData.append("files", file);
          try {
            enableLoader();
            const { data } = await axios.post("/api/file/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              baseURL: import.meta.env.VITE_SERVER_HOST,
            });

            if (data.status) {
              //updating user details with new profile picture
              mutateSignup(data.result[0]);
            } else {
              disableLoader();
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
          if (profilePicInputRef.current) {
            profilePicInputRef.current.value = "";
          }
          toast({
            title: "Invalid file type",
            description: "Please select a JPEG or PNG only",
            status: "warning",
          });
        }
      }
    }
  };

  const handleOnCameraClick = () => {
    if (profilePicInputRef.current) {
      profilePicInputRef.current.click();
    }
  };

  return (
    <>
      <DrawerHeader>
        <ModalCloseButton color="appPrimaryColor" />
      </DrawerHeader>
      <ModalBody display={"flex"} flexDir={"column"} alignItems={"start"} justifyContent={"center"}>
        <Avatar name={userName} src={userProfilePicture} size={"2xl"} alignSelf={"center"} position="relative">
          {userDetails?.email === userEmail && (
            <>
              <Box
                as={"i"}
                position="absolute"
                zIndex="1"
                bgColor={"appListItemBgColor"}
                display={"flex"}
                justifyContent={"center"}
                alignItems="center"
                rounded="50%"
                w={"2em"}
                h={"2em"}
                right={0}
                bottom={0}
                className="fa-solid fa-camera text-[0.4em] text-appTextColor"
                onClick={handleOnCameraClick}
              ></Box>
              <Input display="none" type="file" ref={profilePicInputRef} onChange={handleChangeProfilePicture} />
            </>
          )}
        </Avatar>
        <Box my={10}>
          <Box display={"flex"} fontSize={"lg"}>
            <Text fontWeight={"700"} textColor="appHoverColor">
              Name:
            </Text>
            <Text fontWeight={"400"} ml={2} textTransform={"capitalize"} textColor="appTextColor">
              {userName}
            </Text>
          </Box>

          <Box display={"flex"} fontSize={"lg"}>
            <Text fontWeight={"700"} textColor="appHoverColor">
              Email:
            </Text>
            <Text fontWeight={"400"} ml={2} textTransform={"capitalize"} textColor="appTextColor">
              {userEmail}
            </Text>
          </Box>
        </Box>
      </ModalBody>
    </>
  );
};
export default UserProfileModal;
