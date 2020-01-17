import {h, render, hydrate} from 'preact'
import {Provider} from 'unistore/preact'
import './styles/index.css';
import Router from './components/Router/router'
import createStore from './store/store'
import {BrowserRouter} from 'react-router-dom';

if (typeof window !== "undefined") {
  const app = document.getElementById('root');
  const store = createStore(window.__STATE__);

  hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
      </Provider>,
      app
  );
}