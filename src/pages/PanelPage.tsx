import PostForm from "../components/base/PostForm";
import { useNavigate } from "react-router-dom";

// Panel-sidan
export default function Panel() {
    const navigate = useNavigate();
    return (
        <>
            <h1 className="text-2xl font-bold mb-4 text-center">Panel</h1>
            <section className="flex flex-col items-center">
                <PostForm post={{ title: "", content: "" }} isEditing={false} setEditPost={() => { }} onSuccess={() => { navigate("/posts")}} />
            </section>
        </>
    );
}