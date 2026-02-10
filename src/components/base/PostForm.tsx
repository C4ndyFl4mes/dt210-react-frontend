import { useState } from "react";
import type { IPost } from "../../interfaces/IPost";
import type { IValidationError } from "../../interfaces/IValidationError";
import { Validation } from "../../utils/Validation";
import type { IError } from "../../interfaces/IError";
import PostService from "../../services/PostService";

// Formulärskomponenten som används både för att skapa nya inlägg och redigera befintliga.
export default function PostForm({ post, isEditing, setEditPost, onSuccess }: { post: IPost, isEditing: boolean, setEditPost: React.Dispatch<React.SetStateAction<IPost | null>>, onSuccess: () => void }) {
    const [fields, setFields] = useState<IPost>(post);
    const [validationErrors, setValidationErrors] = useState<{} | IValidationError>({})
    const [serverErrors, setServerErrors] = useState<IError | null>(null);

    // Hanterar formulärets submit, både för att skapa och redigera inlägg. Validerar först fälten och gör sedan anrop till backend. Visar eventuella validerings- eller serverfel.
    const handleFormSubmit = async () => {
        const errors: {} | IValidationError = await Validation.validatePostForm(fields);
        setValidationErrors(errors);

        if (Object.keys(errors).length === 0) {
            const data: IPost | IError = isEditing ? await PostService().put(fields) : await PostService().post(fields);
            if (data && "message" in data) {
                data as IError;
                setServerErrors(data);
            } else {
                data as IPost;
                setServerErrors(null);
                if (isEditing) {
                    setEditPost(data);
                    setEditPost(null);
                }
                onSuccess();
            }
        }
    }

    return (
        <form className="max-w-md w-full p-6 max-h-fit mt-[10vh] bg-white rounded-lg shadow-md flex flex-col gap-y-4">
            {
                isEditing ? (<legend>Edit <span className="font-semibold">{post.title}</span></legend>) : (<legend>Create new post</legend>)
            }
            <div className="flex flex-col gap-y-2">
                <label htmlFor="post-title" className="block text-sm font-medium text-gray-700">
                    Title:
                </label>
                <input
                    type="text"
                    name="post-title"
                    id="post-title"
                    value={fields.title}
                    onChange={(e) => setFields({ ...fields, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {(validationErrors as IValidationError).title && (
                    <span className="block text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
                        {(validationErrors as IValidationError).title}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="post-content" className="block text-sm font-medium text-gray-700">
                    Content:
                </label>
                <textarea
                    name="post-content"
                    id="post-content"
                    value={fields.content}
                    onChange={(e) => setFields({ ...fields, content: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                ></textarea>
                {(validationErrors as IValidationError).content && (
                    <span className="block text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
                        {(validationErrors as IValidationError).content}
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
            <div className="pt-2 flex flex-wrap justify-end gap-2">
                {
                    isEditing && (
                        <button
                            type="button"
                            onClick={() => setEditPost(null)}
                            className="bg-gray-300 px-4 py-2 rounded cursor-pointer hover:brightness-95 active:brightness-90"
                        >
                            Cancel
                        </button>
                    )
                }
                <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:brightness-95 active:brightness-90 cursor-pointer"
                >
                    {isEditing ? "Save Changes" : "Create Post"}
                </button>
            </div>
        </form>
    )
}