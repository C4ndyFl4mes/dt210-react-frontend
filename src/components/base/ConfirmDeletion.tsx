import { useState } from "react";
import type { IError } from "../../interfaces/IError";
import type { IPost } from "../../interfaces/IPost";
import PostService from "../../services/PostService";

export default function ConfirmDeletion({ post, setDeletePost, onSuccess }: { post: IPost, setDeletePost: React.Dispatch<React.SetStateAction<IPost | null>>, onSuccess: () => void }) {
    const [serverError, setServerError] = useState<IError | null>(null);

    const handleDelete = async () => {
        const data: IPost | IError = await PostService().del(post.postId!);
        if (data && "message" in data) {
            data as IError;
            setServerError(data);
        } else {
            setServerError(null);
            setDeletePost(null);
            onSuccess();
        }
    }

    return (
        <div className="bg-white max-h-fit mt-[10vh] p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete the post titled <span className="font-semibold">{post.title}</span>?</p>
            {serverError && (
                <span className="block text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
                    {serverError.message}
                </span>
            )}
            <div className="flex justify-end mt-4">
                <button className="bg-gray-300 px-4 py-2 rounded mr-2 hover:brightness-95 active:brightness-90 cursor-pointer" onClick={() => setDeletePost(null)}>Cancel</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:brightness-95 active:brightness-90 cursor-pointer" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}