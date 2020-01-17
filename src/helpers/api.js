import {domain} from "config/domains"

const ajax = function _ajax(method, url, params, scb, ecb) {
  const xhr = new XMLHttpRequest();
  if (method === 'GET') {
    if (url.indexOf('?') < 0) {
      url += '?';
    } else {
      url += '&';
    }
    for (const key in params) {
      url = `${url + key}=${params[key]}&`;
    }
  }

  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  params && params.token && xhr.setRequestHeader('Authorization', params.token);

  xhr.onreadystatechange = function (oEvent) {
    if (xhr.status === 0) {
      ecb &&
      ecb(xhr.status, 'Server is not responding. Please try again later');
    }
  };

  xhr.addEventListener(
      'load',
      () => {
        if (xhr.readyState !== 4 || xhr.status !== 200) {
          let text;
          try {
            text = JSON.parse(xhr.responseText);
          } catch (e) {
            text = xhr.responseText;
          }
          ecb && ecb(text, xhr.status);
        } else {
          let text;
          try {
            text = JSON.parse(xhr.responseText);
          } catch (e) {
            text = xhr.responseText;
          }
          scb && scb(text);
        }
      },
      false,
  );

  const str = JSON.stringify(params);
  xhr.send(str);
};

const http = {
  domain: domain,
  request: (method, url, query) => {
    return new Promise((resolve, reject) => {
      ajax(
          method,
          `${domain}${url}`,
          query,
          res => {
            resolve(res);
          },
          (e, code) => {
            e = e || {}

            if (code === 401) {
              return window.location = '/';
            }

            reject(e);
          },
      );
    });
  },
  get: (url, query) => http.request('GET', url, query),
  post: (url, query) => http.request('POST', url, query),
  put: (url, query) => http.request('PUT', url, query),
  delete: (url, query) => http.request('DELETE', url, query),
};

export default http;
