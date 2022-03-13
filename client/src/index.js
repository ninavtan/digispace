import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { io } from "socket.io-client";

import rootReducer from './redux/reducers';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

// Redux Devtools Configuration
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App store={store}/>
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

