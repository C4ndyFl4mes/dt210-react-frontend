import { flow, makeAutoObservable } from "mobx";
import type { IUser } from "../interfaces/IUser";
import type { IError } from "../interfaces/IError";
import AuthService from "../services/AuthService";

class UserStore {
    user: IUser | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: IUser) {
        this.user = user;
    }

    clearUser() {
        this.user = null;
    }

    logOut = flow(function* (this: UserStore) {
        const data: boolean | IError = yield AuthService().logout();
        if (data === true) {
            this.clearUser();
            console.log("User logged out successfully");
        } else if (typeof data === "object" && "message" in data) {
            console.error("Logout error: " + data.message);
        }
    });

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