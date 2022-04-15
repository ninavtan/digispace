import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Room from './components/Room';
import RoomIndex from './components/RoomIndex';
import DigiSpaceIndex from './components/DigiSpace-Index';
// import Login from './components/auth/Login';
import Profile from './components/Profile';
import NavBar from './components/nav-bar';
import rootReducer from './redux/reducers';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth0ProviderWithHistory from './components/auth/auth0-provider-with-history';
import socketIOClient from "socket.io-client";
import { Nav, Navbar } from 'react-bootstrap';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));


const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const socket = socketIOClient(ENDPOINT);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Auth0ProviderWithHistory>
        <Switch>
          <Header>
            <Route exact path='/' component={RoomIndex} />
            <Route path="/room/:id" socket={socket} component={Room} />
            <Route path="/profile"
            component={Profile} />
            <Route path="/allrooms" component={DigiSpaceIndex}/>
            
          </Header>
        </Switch>
        </Auth0ProviderWithHistory>
    </BrowserRouter>
  </Provider>,
document.getElementById('root')
);