import { use, useEffect, useState } from "react";
import type { IPost } from "../interfaces/IPost";
import PostService from "../services/PostService";
import type { IError } from "../interfaces/IError";
import Post from "../components/base/Post";
import Overlay from "../components/base/Overlay";
import ConfirmDeletion from "../components/base/ConfirmDeletion";
import PostForm from "../components/base/PostForm";

export default function Posts() {
    const [posts, setPosts] = useState<Array<IPost> | null>(null);
    const [serverError, setServerErrors] = useState<IError | null>(null);
    const [editPost, setEditPost] = useState<IPost | null>(null);
    const [deletePost, setDeletePost] = useState<IPost | null>(null);

    const getPosts = async () => {
        const posts: Array<IPost> | IError = await PostService().getAll();
        if (Array.isArray(posts)) {
            setServerErrors(null);
            setPosts(posts);
        } else {
            posts as IError;
            setServerErrors(posts);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    if (posts === null && !serverError) {
        return (
            <>
                <h1 className="text-2xl font-bold text-center mb-2">Posts</h1>
                <section className="flex flex-col gap-y-6">
                    <p className="text-center">Loading...</p>
                </section>
            </>
        );
    } else {
        return (
            <>
                <h1 className="text-2xl font-bold text-center mb-2">Posts</h1>
                <section className="flex flex-col gap-y-6 max-w-200 mx-auto">
                    {
                        serverError && (
                            <p className="text-center text-red-600">{(serverError as IError).message}</p>
                        )
                    }
                    {
                        posts && posts.length === 0 && (
                            <p className="text-center">No posts yet.</p>
                        )
                    }
                    {
                        !serverError && posts && posts.map(post => (
                            <Post post={post} key={post.postId} setEditPost={setEditPost} setDeletePost={setDeletePost} />
                        ))
                    }
                </section>
                {
                    deletePost && !editPost && (
                        <Overlay component={
                            <ConfirmDeletion 
                                post={deletePost}
                                setDeletePost={setDeletePost}
                                onSuccess={getPosts}
                            />}
                        />
                    )
                }
                {
                    editPost && !deletePost && (
                        <Overlay component={
                            <PostForm post={editPost}
                                isEditing={true}
                                setEditPost={setEditPost}
                                onSuccess={getPosts}
                            />}
                        />
                    )
                }
            </>
        );
    }
}