import { useMutation } from "@tanstack/react-query";
import http from "utils/http";
import { Endpoints } from "enums/endpoints";
import { AuthSignUpInput } from "../../types/signUp";

export const useSignUp = () => {
	return useMutation<any, Error, AuthSignUpInput>(async (createInput) => {
		const { data } = await http.post(Endpoints.SIGNUP, createInput);
		return data;
	});
};
