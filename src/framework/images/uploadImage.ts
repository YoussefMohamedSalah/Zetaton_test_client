
import { useMutation } from "@tanstack/react-query";
import http from "utils/http";
import { Endpoints } from "enums/endpoints";


export const useUploadImage = () => {
    return useMutation<any, Error, any>(async (createInput) => {
        console.log(createInput)
        const { data } = await http.post(Endpoints.UPLOAD_IMAGE, createInput, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    });
};


export const uploadImageInput = (file:File): FormData => {
    const formData = new FormData();
    formData.append("file", file);
    return formData;
};