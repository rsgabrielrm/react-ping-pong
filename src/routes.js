import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated , logout } from "./services/auth";

//import os components
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Panel from "./components/Panel";
import Matches from "./components/Matches";
import EditMatche from "./components/Matches/EditMatche";
import Cups from "./components/Cups";
import EditCup from "./components/Cups/EditCup";
import Players from "./components/Players";
import Details from "./components/Players/Details";

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
      <PrivateRoute exact path="/matches" component={Matches} />
      <PrivateRoute path="/matches/:id/edit" component={EditMatche} />
      <PrivateRoute path="/cups" component={Cups} />
      <PrivateRoute path="/cup/:id/matches" component={Matches} />
      <PrivateRoute path="/cup/:id/players" component={Players} />
      <PrivateRoute path="/cup/:id/edit/:name" component={EditCup} />
      <PrivateRoute exact path="/players" component={Players} />
      <PrivateRoute path="/player/:id/" component={Details} />
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
