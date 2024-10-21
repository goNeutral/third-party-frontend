import { atom } from "recoil";

export const userAuthAtom = atom<AuthState>({
    key: "userAuth",
    default: {
        isAuthenticated: false,
        user: null,
        loading: true,
    },
})