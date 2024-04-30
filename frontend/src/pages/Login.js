import { useState} from "react"
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useHistory } from "react-router-dom";



const Login =  () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isPending} = useLogin();
    const history = useHistory();
    


    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await login(email, password);
        // Clear form after successful signup
        history.push('/');
    }

    return(
        <div className="signup">
            <h2>Login</h2>
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
                <button disabled={isPending}>Login</button>
                {error && <div className="auth-error">{error}</div>}
            </form>
            <p>Don't have an Account? <Link to="./signup">Sign Up Now!</Link></p>
        </div>
    )
}

export default Login;