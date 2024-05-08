import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast({
    isClosable: true,
    duration: 2000,
  });
  return toast;
};

export { useCustomToast };
