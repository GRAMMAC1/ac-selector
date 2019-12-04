"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestGet = requestGet;

function requestGet(url) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var data = option;
  var paramArr2 = {};

  for (var k in data) {
    paramArr2[k] = data[k];
  }

  var param = new URLSearchParams(paramArr2).toString();

  if (param.length > 0) {
    if (url.indexOf('?') >= 0) {
      url = url + '&' + param;
    } else {
      url = url + '?' + param;
    }
  }

  var _option = {
    method: 'GET',
    // *GET, POST, PUT, DELETE, etc.
    cache: 'default',
    // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include',
    // include, same-origin, *omit
    // headers: {
    //   'content-type': 'application/json',
    //   'withCredentials': true
    // },
    mode: 'cors' // no-cors, cors, *same-origin

  };
  return fetch(url, _option).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject('Get Network Response Was Wrong.');
    }
  }).then(function (data) {
    // console.log(data);
    return data;
  })["catch"](function (error) {
    console.error(error);
    throw error;
  });
}