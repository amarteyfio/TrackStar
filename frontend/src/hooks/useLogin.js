import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsPending(true);
        setError("");

        try {
            const response = await fetch("http://localhost:4000/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            //get response
            const json = await response.json();

            //check for errors
            if (!response.ok) {
                setIsPending(false);
                setError(json.error)
            }
            if (response.ok)
            {
                localStorage.setItem('user', JSON.stringify(json));
                // Update auth context
                dispatch({ type: 'LOGIN', payload: json });

                setIsPending(false);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsPending(false);
        }
    }

    return { login, error, isPending };
}
