import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import './index.css';
// import App from './App';
import Header from './features/Header';
import Home from './features/Home';
import Room from './features/Room';
import RoomIndex from './features/RoomIndex';
import { io } from "socket.io-client";

import rootReducer from './redux/reducers';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

// Redux Devtools Configuration
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      
        <Switch>
        <Header>
          <Route exact path='/' component={RoomIndex} />
          <Route path="/room/:id" component={Room} />
          </Header>
        </Switch>
      
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

