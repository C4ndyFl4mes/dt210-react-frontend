import { flow, makeAutoObservable } from "mobx";
import type { IUser } from "../interfaces/IUser";
import type { IError } from "../interfaces/IError";
import AuthService from "../services/AuthService";

class UserStore {
    user: IUser | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Sätter den aktuella användaren i store.
    setUser(user: IUser) {
        this.user = user;
    }

    // Rensar den aktuella användaren från store.
    clearUser() {
        this.user = null;
    }

    // Loggar ut användaren.
    logOut = flow(function* (this: UserStore) {
        const data: { isLoggedIn: boolean } | IError = yield AuthService().logout();
        if (data && "message" in data) {
            console.error("Logout error: " + data.message);
        } else {
            this.clearUser();
            console.log("User logged out successfully");
        }
    });

    // Hämtar den aktuella användaren från backend.
    getCurrentUser = flow(function* (this: UserStore) {
        const data: IUser | IError = yield AuthService().getCurrentUser();
        if (data && "message" in data) {
            console.error("Error fetching user: " + data.message);
            this.user = null;
        } else {
            this.user = data as IUser;
            console.log("Current user: " + this.user.username);
        }
    });
}

export default new UserStore();