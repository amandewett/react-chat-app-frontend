export type FormType = {
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
