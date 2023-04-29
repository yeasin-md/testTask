import "./App.css";
import { Typography } from "@mui/material";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { EditForm, Form, MultipleSelect } from "./components/exportIndex";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Form} />
          <Route exact path="/edit-form/:uId" component={EditForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
