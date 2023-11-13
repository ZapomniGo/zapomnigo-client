// import * as Yup from "yup";
// import { UserData } from "./types";

// export const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   username: Yup.string().required("Username is required"),
//   password: Yup.string()
//     .matches(/^(?=.*[!@#$%^&*()_+}{"':;?/>,.<|\[\]~`])/, 'Password must contain at least one special symbol')
//     .matches(/^(?=.*[0-9])/, 'Password must contain at least one number')
//     .matches(/^(?=.*[A-Z])/, 'Password must contain at least one capital letter')
//     .matches(/^(?=.*[a-z])/, 'Password must contain at least one non-capital letter')
//     .min(8, "Password must be at least 8 characters")
//     .required("Password is required"),
//   repeatPassword: Yup.string()
//     .oneOf([Yup.ref("password"), undefined], "Passwords do not match")
//     .required("Repeat Password is required"),
//   organisation: Yup.string(),
//   gender: Yup.string(),
//   age: Yup.number()
//     .min(5, "Age must be at least 5")
//     .max(99, "Age must be at most 99"),
//   email: Yup.string()
//     .required("Email is required")
//     .email("Invalid email format"),
// });


// export const initialFormValues: UserData = {
//   name: "",
//   username: "",
//   password: "",
//   repeatPassword: "",
//   organisation: "",
//   gender: "",
//   age: 0,
//   email: "",
// };
