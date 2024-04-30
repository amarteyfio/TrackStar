import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import Tracker from "./pages/Tracker";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/login"/>}
          </Route>
          <Route path="/trackers/:tracker">
            <Tracker />
          </Route>
          <Route path="/signup">
            {!user ? <Signup /> : <Redirect to="/"/>}
          </Route>
          <Route path="/login">
            {!user ? <Login /> : <Redirect to="/"/>}
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
