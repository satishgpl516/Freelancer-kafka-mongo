import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ReduxPromise from "redux-promise";
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import reducers from './reducers/index';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


ReactDOM.render(<Provider store = {createStoreWithMiddleware(reducers)} >
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
