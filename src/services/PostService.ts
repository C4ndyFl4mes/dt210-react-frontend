import Axios, { type AxiosError, type AxiosResponse } from "axios";
import { handleAxiosError, handleSuccess } from "../utils/ErrorHandler";
import type { IPost } from "../interfaces/IPost";
import type { IError } from "../interfaces/IError";

export default function PostService() {
    const client = Axios.create({
        baseURL: 'http://localhost:5179/api/posts',
        withCredentials: true
    });
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Hämtar ett enskilt inlägg.
    async function get(id: number): Promise<IPost | IError> {
        try {
            const res: AxiosResponse<IPost> = await client.get<IPost>(`/${id}`, config);
            return handleSuccess<IPost>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occured while fetching the post." };
        }
    }

    // Hämtar alla inlägg.
    async function getAll(): Promise<Array<IPost> | IError> {
        try {
            const res: AxiosResponse<Array<IPost>> = await client.get<Array<IPost>>("/", config);
            return handleSuccess<Array<IPost>>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occured while fetching posts." };
        }
    }

    // Skicka ett inlägg.
    async function post(post: IPost): Promise<IPost | IError> {
        try {
            const res: AxiosResponse<IPost> = await client.post<IPost>("/", post, config);
            return handleSuccess<IPost>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occured while sending the post." };
        }
    }

    // Ändra ett inlägg.
    async function put(post: IPost): Promise<IPost | IError> {
        try {
            const res: AxiosResponse<IPost> = await client.put<IPost>(`/${post.postId!}`, post, config);
            return handleSuccess<IPost>(res);
        } catch (error: unknown) {
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while editing post." };
        }
    }

    // Radera ett inlägg.
    async function del(id: number): Promise<IPost | IError> {
        try {
            const res: AxiosResponse<IPost> = await client.delete<IPost>(`/${id}`, config);
            return handleSuccess(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred while deleting post." };
        }
    }

    return { get, getAll, post, put, del };
}