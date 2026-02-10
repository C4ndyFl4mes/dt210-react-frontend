import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AccountPage from "./pages/AccountPage";
import PostsPage from "./pages/PostsPage";
import SinglePostPage from "./pages/SinglePostPage";
import PanelPage from "./pages/PanelPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Router.
export default createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <AccountPage />
            },
            {
                path: "/posts",
                element: <PostsPage />
            },
            {
                path: "/posts/:id",
                element: <SinglePostPage />
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/panel",
                        element: <PanelPage />
                    }
                ]
            }

        ]
    }
]);