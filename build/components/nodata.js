'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFound = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nodata = require('../assets/nodata.svg');

var _nodata2 = _interopRequireDefault(_nodata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NotFound = exports.NotFound = function NotFound() {
  return _react2["default"].createElement(
    'div',
    null,
    _react2["default"].createElement('img', { src: _nodata2["default"], alt: '暂无数据' }),
    _react2["default"].createElement(
      'p',
      null,
      '\u6682\u65E0\u6570\u636E'
    )
  );
};