import Axios, { type AxiosError, type AxiosResponse } from "axios";
import { handleAxiosError, handleSuccess } from "../utils/ErrorHandler";
import type { IAuth } from "../interfaces/IAuth";
import type { IUser } from "../interfaces/IUser";
import type { IError } from "../interfaces/IError";


export default function AuthService() {
    const client = Axios.create({
        baseURL: 'https://dt210g-moment3-backend-production.up.railway.app/api/auth',
        withCredentials: true
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Registerar en ny användare.
    async function register(auth: IAuth): Promise<IUser | IError> {
        try {
            const res: AxiosResponse<IUser> = await client.post<IUser>("/register", auth, config);
            return handleSuccess<IUser>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occured during registration." };
        }
    }

    // Loggar in en användare.
    async function login(auth: IAuth): Promise<IUser | IError> {
        try {
            const res: AxiosResponse<IUser> = await client.post<IUser>("/login", auth, config);
            return handleSuccess<IUser>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occured during login." };
        }
    }

    // Loggar ut en användare.
    async function logout(): Promise<boolean | IError> {
        try {
            const res: AxiosResponse<boolean> = await client.post<boolean>("/logout", {}, config);
            return handleSuccess<boolean>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occurred during logout." };
        }
    }

    // Hämtar nuvarande inloggade användaren.
    async function getCurrentUser(): Promise<IUser | IError> {
        try {
            const res: AxiosResponse<IUser> = await client.get<IUser>("/me", config);
            return handleSuccess<IUser>(res);
        } catch (error: unknown) {
            console.log(error);
            if ((error as AxiosError).isAxiosError) {
                return handleAxiosError(error as AxiosError);
            }
            return { message: "An error occured while fetching current user." };
        }
    }

    return { register, login, logout, getCurrentUser };
}