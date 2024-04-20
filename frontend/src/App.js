import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import Tracker from "./pages/Tracker";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/trackers/:tracker">
            <Tracker />
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
