import { atom } from "recoil";

interface NavHeaderButton {
    name: string;
    component: JSX.Element;
}

export const navHeaderButtonsAtom = atom<NavHeaderButton[]>({
    key: "navHeaderButtons",
    default: [],
});