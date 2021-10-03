import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './common/App';
import {Provider} from "react-redux"
import store from "./redux/index"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);