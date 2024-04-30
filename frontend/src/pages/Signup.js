import { useState} from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { useHistory } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const { signup, error, isPending } = useSignup();
    const history = useHistory();


    //handle submit
    const handleSubmit = async (e) => {
        console.log(email);
        e.preventDefault();

        //signup user
        await signup(email, password,passwordConfirm);
        
        //redirect
        history.push('/');
    }

    return (
        <div className="signup">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    required
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <button disabled = {isPending}>Signup</button>
                {error && <div className="auth-error">{error}</div>}
            </form>
            <p>Already have an account? <Link to="../login">Login Now!</Link></p>
        </div>
    )
}

export default Signup;
