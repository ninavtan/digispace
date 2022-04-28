import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Room from './components/Room';
import RoomIndex from './components/RoomIndex';
import DigiSpaceIndex from './components/DigiSpace-Index';
import Profile from './components/Profile';
import rootReducer from './redux/reducers';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from "react-router-dom";
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';
import socketIOClient from "socket.io-client";

export const history = createBrowserHistory();

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));


const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const socket = socketIOClient(ENDPOINT);

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const onRedirectCallback = (appState) => {
  history.replace(appState?.returnTo || window.location.pathname);
};


ReactDOM.render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Header>
            <Route exact path='/' component={RoomIndex} />
            <Route path="/room/:id" socket={socket} component={Room} />
            <Route path="/profile"
            component={Profile} />
            <ProtectedRoute path="/allrooms" component={DigiSpaceIndex} />

            {/* <Route path="/allrooms" component={DigiSpaceIndex}/> */}
            
          </Header>
        </Switch>
      </Router>
      </Provider>
    </Auth0Provider>,
document.getElementById('root')
);