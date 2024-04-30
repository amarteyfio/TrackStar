import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, passwordConfirm) => {
        setIsPending(true);
        setError("");

        try {
            const response = await fetch("http://localhost:4000/api/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, passwordConfirm})
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

    return { signup, error, isPending };
}
