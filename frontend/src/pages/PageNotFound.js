import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="error-container">
      <div className="error">
        <h1>404</h1>
        <h2>Sorry</h2>
        <p>That page cannot be found on the Server</p>
        <Link to="/">Back to the homepage...</Link>
      </div>
    </div>
  );
}

export default PageNotFound;