import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Login from "./components/login";
import Friends from "./components/friends";
import "./styles.css";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

function App() {
  return (
    <div className="App" style={{ padding: 30 }}>
 
      <Route exact path="/" component={Login} />
      <PrivateRoute exact path="/friends" component={Friends} />
    
 
    </div>
  );
}

export default App;
