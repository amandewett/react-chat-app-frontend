import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { FormType } from "../../utils/customTypes";

const Form = ({
  isRequired,
  label,
  onChange,
  placeHolder,
  id,
  inputType,
}: FormType) => {
  return (
    <>
      <FormControl isRequired={isRequired} id={id}>
        <FormLabel>{label}</FormLabel>
        <Input
          placeholder={placeHolder}
          type={inputType}
          onChange={(e) => onChange(e.target.value)}
        />
      </FormControl>
    </>
  );
};
export default Form;
