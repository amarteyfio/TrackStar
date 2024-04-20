import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className = "navbar">
            <h1>TrackStar</h1>
            <div className="links">
                <Link to= "/">Home</Link>
                <Link to= "">UserName</Link>
                <button>Log Out</button>
            </div>
        </nav>
    );
}
export default Navbar;