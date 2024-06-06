import { FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { MyInputProps } from "../../utils/customTypes";

const MyInput = ({
  children,
  value,
  onChange,
  type = "text",
  placeholder = "Enter text",
  isFormLabelVisible = false,
  formLabelText = "",
  isRequired = false,
  hasRightElement = false,
  ...restProps
}: MyInputProps) => {
  ``;
  return (
    <FormControl isRequired={isRequired}>
      {isFormLabelVisible && <FormLabel>{formLabelText}</FormLabel>}
      <InputGroup>
        <Input autoComplete="off" value={value} onChange={onChange} type={type} placeholder={placeholder} _focusVisible={{ borderColor: "primaryColor", borderWidth: 2 }} {...restProps} />
        {hasRightElement && <InputRightElement>{children}</InputRightElement>}
      </InputGroup>
    </FormControl>
  );
};
export default MyInput;
