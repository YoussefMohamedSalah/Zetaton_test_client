import { useMutation } from "@tanstack/react-query";
import http from "utils/http";
import { Endpoints } from "enums/endpoints";
import { AuthSignInInput } from "../../types/signIn";

export const useSignIn = () => {
	return useMutation<any, Error, AuthSignInInput>(async (createInput) => {
		const { data } = await http.post(Endpoints.SIGNIN, createInput);
		return data;
	});
};
