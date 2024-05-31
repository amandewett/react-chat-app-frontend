import { ReactNode } from "react";

export type DefaultReactComponentType = {
  children?: ReactNode;
};

export type FormType = DefaultReactComponentType & {
  label: string;
  isRequired: boolean;
  placeHolder: string;
  inputType: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
};

export type SignupComponentType = {
  handleTabChange: (index: number) => void;
};
