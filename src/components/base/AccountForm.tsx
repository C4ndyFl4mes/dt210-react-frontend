import { useEffect, useState } from "react";
import { Validation } from "../../utils/Validation";
import type { IValidationError } from "../../interfaces/IValidationError";
import AuthService from "../../services/AuthService";
import type { IError } from "../../interfaces/IError";
import type { IUser } from "../../interfaces/IUser";
import UserStore from "../../stores/UserStore";

export default function AccountForm({ regOrLogin }: { regOrLogin: boolean }) {
    const [fields, setFields] = useState({
        username: "",
        password: ""
    });
    const [validationErrors, setValidationErrors] = useState<{} | IValidationError>({})
    const [serverErrors, setServerErrors] = useState<IError | null>(null);

    const clearFields = () => {
        setFields({
            username: "",
            password: ""
        });
        setValidationErrors({});
        setServerErrors(null);
    }

    const handleFormSubmit = async () => {
        const errors: {} | IValidationError = await Validation.validateAccountForm(fields);
        setValidationErrors(errors);

        if (Object.keys(errors).length === 0) {
            const data: IUser | IError = regOrLogin ? await AuthService().login(fields) : await AuthService().register(fields);
            if (data && "message" in data) {
                data as IError;
                setServerErrors(data);
            } else {
                data as IUser;
                UserStore.setUser(data);
                clearFields();
            }
        }
    }

    // Rensar formuläret och eventuella felmeddelanden när användaren byter mellan login och register.
    useEffect(clearFields, [regOrLogin]);

    return (
        <form className="max-w-md w-full p-6 bg-white rounded-lg shadow-md flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username:
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    value={fields.username}
                    onChange={(e) => setFields({ ...fields, username: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {(validationErrors as IValidationError).username && (
                    <span className="block text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
                        {(validationErrors as IValidationError).username}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    value={fields.password}
                    onChange={(e) => setFields({ ...fields, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {(validationErrors as IValidationError).password && (
                    <span className="block text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
                        {(validationErrors as IValidationError).password}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-y-2">
                {serverErrors && (
                    <span className="block text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
                        {serverErrors.message}
                    </span>
                )}
            </div>
            <div className="pt-2">
                <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:brightness-95 active:brightness-90 cursor-pointer"
                >
                    {regOrLogin ? "Login" : "Register"}
                </button>
            </div>
        </form>
    );
}