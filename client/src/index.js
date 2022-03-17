import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Room from './components/Room';
import RoomIndex from './components/RoomIndex';
import rootReducer from './redux/reducers';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";

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