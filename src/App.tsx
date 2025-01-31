import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CatViewer from "./CatViewer";
import WorkingHours from "./WorkingHours";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className=" fixed top-0 left-0 bg-gray-100  p-4 flex flex-col gap-8">
          <ul>
            <li>
              <Link to="/cat-viewer">CatViewer</Link>
            </li>
            <li>
              <Link to="/working-hour">WorkingHours</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/cat-viewer">
            <CatViewer />
          </Route>
          <Route path="/working-hour">
            <WorkingHours />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
