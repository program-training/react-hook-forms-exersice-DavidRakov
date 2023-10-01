import { FC } from "react";

type InputProps = {
  label: string;
  placeholder: string;
  type?: string | "text";
  validation: Record<string, unknown>;
  error: string | null;
};

const Input: FC<InputProps> = ({
  label,
  type,
  placeholder,
  validation,
  error,
}) => {
  return (
    <>
      <label>{label}</label>
      <br />
      <input type={type} placeholder={placeholder} {...validation} />
      <p>{error}</p>
    </>
  );
};

export default Input;
