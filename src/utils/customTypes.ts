export type FormType = {
  label: string;
  isRequired: boolean;
  placeHolder: string;
  inputType: string;
  id: string;
  onChange: (value: string) => void;
};
