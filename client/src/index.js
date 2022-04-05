import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Room from './components/Room';
import RoomIndex from './components/RoomIndex';
import Login from './components/auth/Login';
import rootReducer from './redux/reducers';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));


// const ENDPOINT = "http://127.0.0.1:3001";

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const socket = socketIOClient(ENDPOINT);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <Switch>
          <Header>
            <Route exact path='/' component={RoomIndex} />
            <Route path="/room/:id" socket={socket} component={Room} />
            <Route path="/login" component={Login} />
          </Header>
        </Switch>
    </BrowserRouter>
  </Provider>,
document.getElementById('root')
);