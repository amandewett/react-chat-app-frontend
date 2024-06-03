import { FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { MyInputType } from "../../utils/customTypes";

const MyInput = ({
  children,
  value,
  onChange,
  type = "text",
  placeHolder = "Enter text",
  isFormLabelVisible = false,
  formLabelText = "",
  isRequired = false,
  hasRightElement = false,
}: MyInputType) => {
  return (
    <FormControl isRequired={isRequired}>
      {isFormLabelVisible && <FormLabel>{formLabelText}</FormLabel>}
      <InputGroup>
        <Input autoComplete="off" value={value} onChange={onChange} type={type} placeholder={placeHolder} _focusVisible={{ borderColor: "primaryColor", borderWidth: 2 }} />
        {hasRightElement && <InputRightElement>{children}</InputRightElement>}
      </InputGroup>
    </FormControl>
  );
};
export default MyInput;
