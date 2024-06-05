import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast({
    isClosable: true,
    duration: 2000,
    variant: "solid",
    position: "top-right",
  });
  return toast;
};

export { useCustomToast };
