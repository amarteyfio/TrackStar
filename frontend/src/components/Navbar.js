import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";


const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return ( 
        <nav className = "navbar">
            <Link to="/"><h1>TrackStar</h1></Link>
            <div className="links">
            {user && (
                <div>
                    <span>{user.email}</span>
                    <button onClick={handleClick}>Log Out</button>
                </div>
            )}
            {!user && (
                <Link to= "/login">Login</Link>
            )}    
            </div>
        </nav>
    );
}
export default Navbar;