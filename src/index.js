import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/main.scss';
import reportWebVitals from './reportWebVitals';
import AppRouter from './Router/AppRouter';
import './Firebase/firebaseConfig';
import database from './Firebase/firebaseConfig';
import { databaseDefault } from './Firebase/dbInitialize'
import configureStore from './Store/configureStore'
import { Provider } from 'react-redux'


database.ref().set(databaseDefault);

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
