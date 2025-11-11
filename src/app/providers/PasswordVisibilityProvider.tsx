import React, {useState} from "react";
import {PasswordVisibilityContext} from "@/app/providers/PasswordVisibilityContext.tsx";

export function PasswordVisibilityProvider({children}: { children: React.ReactNode }) {
    const [visible, setVisible] = useState(false);
    const toggle = () => setVisible((v) => !v);
    return (
        <PasswordVisibilityContext.Provider value={{visible, toggle, setVisible}}>
            {children}
        </PasswordVisibilityContext.Provider>
    );
}