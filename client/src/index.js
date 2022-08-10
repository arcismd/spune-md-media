import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/styles/styles.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago'
import ro from 'javascript-time-ago/locale/ro.json'

TimeAgo.addDefaultLocale(ro)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);