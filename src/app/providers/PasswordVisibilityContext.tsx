import {createContext} from "react";

type Ctx = {
    visible: boolean;
    toggle: () => void;
    setVisible: (v: boolean) => void;
};

export const PasswordVisibilityContext = createContext<Ctx | null>(null);