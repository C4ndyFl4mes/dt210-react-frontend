import * as Yup from "yup";
import type { IAuth } from "../interfaces/IAuth";
import type { IValidationError } from "../interfaces/IValidationError";
import type { IPost } from "../interfaces/IPost";

export class Validation {
    static accountSchema = Yup.object({
        username: Yup.string().required("Username is required").min(3, "Username must be at least 3 characters").max(28, "Username cannot be longer than 28 characters."),
        password: Yup.string().required("Password is required").min(16, "Password must be at least 16 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    });

    static postSchema = Yup.object({
        title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters").max(50, "Title cannot be longer than 50 characters."),
        content: Yup.string().required("Content is required").min(3, "Content must be at least 3 characters").max(500, "Content cannot be longer than 500 characters.")
    });

    static async validateAccountForm(fields: IAuth): Promise<{} | IValidationError> {
        try {
            await this.accountSchema.validate(fields, { abortEarly: false });
            return {};
        } catch (errors: unknown) {
            const validationErrors: IValidationError = {};
            if (errors instanceof Yup.ValidationError) {
                errors.inner.forEach(error => {
                    validationErrors[error.path!] = error.message; // Lagrar endast det sista felmeddelandet för varje fält.
                });
            }
            return validationErrors;
        }
    }

    static async validatePostForm(fields: IPost): Promise<{} | IValidationError> {
        try {
            await this.postSchema.validate(fields, { abortEarly: false });
            return {};
        } catch (errors: unknown) {
            const validationErrors: IValidationError = {};
            if (errors instanceof Yup.ValidationError) {
                errors.inner.forEach(error => {
                    validationErrors[error.path!] = error.message; // Lagrar endast det sista felmeddelandet för varje fält.
                });
            }
            return validationErrors;
        }
    }
}