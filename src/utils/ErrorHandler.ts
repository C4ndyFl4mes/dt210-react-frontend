import type { AxiosError, AxiosResponse } from "axios";
import type { IError } from "../interfaces/IError";

// Hanterar success.
export function handleSuccess<T>(response: AxiosResponse<T>): T {
    if (response.status >= 200 && response.status < 300) {
        return response.data;
    }
    throw new Error(`Unexpected status: ${response.status}`);
}

// Hanterar axios fel.
export function handleAxiosError(error: AxiosError): IError {
    const statusCode = error.response?.status;
    const message =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message ??
        "An unknown error occurred.";

    return { message, statusCode };
}