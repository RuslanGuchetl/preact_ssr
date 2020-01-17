import createStore from "../src/store/store";
import {StaticRouter} from "react-router-dom";
import Router from "../src/components/Router/router";
import {Provider} from 'unistore/preact'
const {h} = require("preact");
const render = require("preact-render-to-string");

const index = {
  HTMLShell: (html, state) => `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="/main.css">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <title> SSR Preact App </title>
        </head>
        <body>
            <div id="root">${html}</div>
			      <script>window.__STATE__=${JSON.stringify(state).replace(/<|>/g, '')}</script>
            <script src="/app.js"></script>
        </body>
    </html>`,
  parseReq: (req) => {
    const context = {};
    const token = req && req.cookies && req.cookies.token;
    const url = req && req.url;
    const cookies = req && req.cookies;
    return {count: 0, url, token, cookies, context}
  },
  renderServerSideHTML: async (req, res) => {
    const createdStore = index.parseReq(req);
    const contextUrl = createdStore.context && createdStore.context.url;
    const store = createStore(createdStore);
    let state = store.getState();

    let html = render(
        <Provider store={store}>
          <StaticRouter
              location={createdStore.url}
              context={createdStore.context}
          >
            <Router reqCookies={createdStore.cookies}/>
          </StaticRouter>
        </Provider>
    );
    if (contextUrl) {
      return res.redirect(301, contextUrl);
    }

    return (index.HTMLShell(html, state))
  }
};

module.exports = index;