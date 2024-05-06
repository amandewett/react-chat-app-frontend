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

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

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
        <FormControl isRequired id="password">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Enter your password"
              value={password}
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

        <Button
          colorScheme="blue"
          width={"100%"}
          style={{ marginTop: 15 }}
          onClick={onSubmitHandler}
        >
          Login
        </Button>
        <Button
          colorScheme="red"
          variant={"solid"}
          width={"100%"}
          style={{ marginTop: 15 }}
          onClick={() => {
            setEmail(`guest@chat.com`);
            setPassword(`1234567890`);
          }}
        >
          Login as guest user
        </Button>
      </VStack>
    </>
  );
};
export default Login;
