import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import * as postActions from './store/posts';
import * as commentActions from './store/comments';



const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.getState = store.getState;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.postActions = postActions;
  window.commentActions = commentActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}


const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (sessionStorage.getItem("currentUser") === null || sessionStorage.getItem("X-CSRF-Token") === null) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}



