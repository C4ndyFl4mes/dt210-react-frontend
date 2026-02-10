import { useEffect, useState } from "react";
import UserStore from "../stores/UserStore";
import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";

// Skyddar routes som kräver autentisering.
export default observer(function ProtectedRoute() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setLoading(true);
        const checkAuth = async () => {
            try {
                await UserStore.getCurrentUser(); // Hämtar den aktuella användaren från backend.
                const user = UserStore.user;
                if (!user) {
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    if (loading) {
        return (
            <p className="text-center">Loading...</p>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
});