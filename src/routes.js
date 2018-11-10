import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated , logout } from "./services/auth";

//import os components
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Panel from "./components/Panel";
import Cups from "./components/Cups";

//Para rotas protegidas
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/panel" component={Panel} />
      <PrivateRoute path="/cups" component={Cups} />
      <PrivateRoute path="/logout" component={ () => {
          const out = logout();
          if(out){
            return <Redirect to='/' />
          }
        }
      }/>
    </Switch>
  </BrowserRouter>
);

export default Routes;
