import type { IPost } from "../../interfaces/IPost";
import { observer } from "mobx-react-lite";
import UserStore from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";

// Komponent för att visa enskilda inlägg i listan över inlägg. Innehåller även knappar för att visa, redigera och ta bort inlägg.
export default observer(function Post({ post, setEditPost, setDeletePost }: { post: IPost, setEditPost: React.Dispatch<React.SetStateAction<IPost | null>>, setDeletePost: React.Dispatch<React.SetStateAction<IPost | null>> }) {
    const navigate = useNavigate();

    return (
        <article className="flex flex-col shadow p-2 rounded-md w-full bg-gray-50 wrap-break-word">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p>{post.content.slice(0, 100)}...</p>
            {
                post.createdAt && post.authorUsername && (
                    <small>Posted by <span className="font-semibold">{post.authorUsername}</span> on <span className="font-semibold">{new Date(post.createdAt).toLocaleString()}</span></small>
                )
            }
            <div className="flex gap-x-2 mt-2 ms-auto">
                <button className="bg-gray-500 text-xs text-white px-2 py-1 rounded hover:brightness-95 active:brightness-90 cursor-pointer" onClick={() => navigate(`/posts/${post.postId}`)}>View</button>
                {
                    post.authorId === UserStore.user?.userId && (
                        <button className="bg-blue-500 text-xs text-white px-2 py-1 rounded hover:brightness-95 active:brightness-90 cursor-pointer" onClick={() => setEditPost(post)}>Edit</button>
                    )
                }
                {
                    (post.authorId === UserStore.user?.userId || UserStore.user?.role === "Admin") && (
                        <button className="bg-red-500 text-xs text-white px-2 py-1 rounded hover:brightness-95 active:brightness-90 cursor-pointer" onClick={() => setDeletePost(post)}>Delete</button>
                    )
                }
            </div>

        </article>
    );
});