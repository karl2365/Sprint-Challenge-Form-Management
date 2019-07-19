import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Login from "./components/login";
import Meals from "./components/Meals";
import "./styles.css";
import{ useLocalStorage} from './hooks/useLocalStorage'; 

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
  const [token, setToken] = useLocalStorage('token');

  return (
    <div className="App" style={{ padding: 30 }}>
 
      <Route exact path="/" render={(props) => <Login {...props} setToken={setToken} token={token} /> } />
      <PrivateRoute exact path="/meals" component={Meals} />
    
 
    </div>
  );
}

export default App;
