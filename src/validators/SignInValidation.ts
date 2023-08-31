import * as Yup from "yup";

export const signInValidation = Yup.object().shape({
	email: Yup.string().required("Email is required"),
	password: Yup.string()
		.required("Password is required")
		.min(5, "Password must be at least 8 characters")
		.max(40, "Password must not exceed 40 characters"),
});
