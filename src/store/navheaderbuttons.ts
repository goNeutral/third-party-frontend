import { atom } from "jotai";

interface NavHeaderButton {
    name: string;
    component: JSX.Element;
}

export const navHeaderButtonsAtom = atom<NavHeaderButton[]>([]);