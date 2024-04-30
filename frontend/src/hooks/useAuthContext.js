import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
}