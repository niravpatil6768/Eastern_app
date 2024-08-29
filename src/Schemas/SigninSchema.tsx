import * as Yup from "yup";


export const SigninSchema = Yup.object({
    email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter your email"),
    password: Yup.string().min(6).max(12).required("Please enter Password")
})