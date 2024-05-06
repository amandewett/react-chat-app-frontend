import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import Form from "./Form";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const profilePickerDetails = (file: any | null) => {};

  const onSubmitHandler = () => {};

  return (
    <>
      <VStack spacing="5px">
        <Form
          isRequired={true}
          label="Email"
          inputType="email"
          placeHolder="Enter your email"
          id="email"
          onChange={(value) => setEmail(value)}
        />
        <Form
          isRequired={true}
          label="Name"
          inputType="text"
          placeHolder="Enter your name"
          id="name"
          onChange={(value) => setName(value)}
        />
        <FormControl isRequired id="password">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Enter your password"
              type={isPasswordVisible ? "text" : "password"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <InputRightElement width={"4.5rem"}>
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired={false} id="pic">
          <FormLabel>Profile picture</FormLabel>
          <Input
            type={"file"}
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              profilePickerDetails(
                e.target.files !== null ? e.target.files : null
              )
            }
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width={"100%"}
          style={{ marginTop: 15 }}
          onClick={onSubmitHandler}
        >
          Sign up
        </Button>
      </VStack>
    </>
  );
};
export default Signup;
