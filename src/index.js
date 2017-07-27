import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './redux/store';
import {Provider} from 'react-redux';
import { BrowserRouter} from 'react-router-dom';

// window.Stripe.setPublishableKey('pk_test_whARiNEk3t0lFoVpZPtg9iZi');

let initialState = {
    users:{
        current_user:false,
        new_user:false
    }
};

let store = configureStore(initialState);

injectTapEventPlugin();

ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
