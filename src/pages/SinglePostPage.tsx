import { useEffect, useState } from "react";
import type { IPost } from "../interfaces/IPost";
import type { IError } from "../interfaces/IError";
import PostService from "../services/PostService";
import { useParams } from "react-router-dom";

// Sida för att visa ett enskilt inlägg. Visar titel, innehåll och eventuella felmeddelanden.
export default function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState<IPost | null>(null);
    const [serverError, setServerError] = useState<IError | null>(null);

    useEffect(() => {
        const getPost = async () => {
            const post: IError | IPost = await PostService().get(id ? parseInt(id) : 0);
            if ("message" in post) {
                setServerError(post);
            } else {
                setPost(post);
            }
        }
        getPost();
    }, [id]);

    if (serverError) {
        return (
            <section className="flex flex-col items-center justify-center wrap-break-word w-full">
                <h1 className="text-2xl font-semibold text-center">Error</h1>
                {
                    serverError.statusCode === 404 ? (
                        <p className="text-center mt-4">The post you are looking for does not exist.</p>
                    ) : (
                        <p className="text-center mt-4">An unexpected error occurred. Please try again later.</p>
                    )
                }
            </section>
        )
    } else {
        return (
            <section className="flex flex-col items-center justify-center wrap-break-word w-full">
                <h1 className="text-2xl font-semibold text-center">{post?.title}</h1>
                <p className="mt-4">{post?.content}</p>
            </section>
        )
    }
}