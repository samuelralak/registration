import React from 'react';
import { Router, Route, Switch } from 'react-router';
import history from 'history';

// route components
import AppContainer from '../../ui/App.js';
import Welcome from '../../ui/pages/Welcome';
import NotFoundPage from '../../ui/pages/Notfound'
import Join from '../../ui/pages/Join'
import Login from '../../ui/pages/Login'
import Register from '../../ui/pages/Register'
import Profile from '../../ui/pages/Profile'
import UserList from '../../ui/pages/UserList'
import Settings from '../../ui/pages/Settings'

const browserHistory = history.createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={AppContainer}/>
      <Route exact path="/welcome" component={Welcome}/>
      <Route exact path="/join" component={Join}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/userlist" component={UserList}/>
      <Route exact path="/settings" component={Settings}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>
);