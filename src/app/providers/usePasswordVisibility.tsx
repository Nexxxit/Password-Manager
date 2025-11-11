import {useContext} from "react";
import {PasswordVisibilityContext} from "@/app/providers/PasswordVisibilityContext.tsx";

export function usePasswordVisibility() {
    const ctx = useContext(PasswordVisibilityContext);
    if (!ctx) {
        throw new Error("usePasswordVisibility должен быть использован в PasswordVisibilityProvider");
    }
    return ctx;
}