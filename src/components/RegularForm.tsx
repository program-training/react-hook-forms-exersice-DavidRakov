import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
interface FormData {
  username: string;
  email: string;
  password: string;
}

function RegularForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange", criteriaMode: "all" });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert(JSON.stringify(data));
    console.log(data);
  };

  const validation = {
    username: register("username", {
      required: "this field is required",
      minLength: {
        value: 2,
        message: "מינימום 2 תווים",
      },
    }),
    email: register("email", {
      required: "required an email",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Must be a valid email",
      },
    }),
    password: register("password", {
      validate: {
        length: (v) =>
          v.length >= 8 && v.length <= 20
            ? true
            : "The password must be at least 8 characters long and a maximum of 20 characters",
        uppercase: (v) => /(?=.*[A-Z])/.test(v) || "חסרה אות גדולה",
        lowercase: (value) => /(?=.*[a-z])/.test(value) || "חסרה אות קטנה",
        digit: (value) => /(?=.*\d)/.test(value) || "חסר מספר",
        specialChar: (value) =>
          /(?=.*[!@#$%^&*-])/.test(value) || "חסר תו מיוחד",
      },
      required: "required a password",
    }),
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>React Hook Form</h1>
      <Input
        label="username"
        placeholder="Enter UserName"
        validation={validation.username}
        error={errors.username?.message || null}
      />
      <Input
        label="email"
        placeholder="Enter Email"
        type="email"
        validation={validation.email}
        error={errors.email?.message || null}
      />
      <Input
        label="password"
        placeholder="Enter Password"
        type="password"
        validation={validation.password}
        error={errors.password?.message || null}
      />
      {isValid && <button type="submit">Submit</button>}
    </form>
  );
}

export default RegularForm;
