"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFound = void 0;

var _react = _interopRequireDefault(require("react"));

var _nodata = _interopRequireDefault(require("../assets/nodata.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NotFound = function NotFound() {
  return _react["default"].createElement("div", null, _react["default"].createElement("img", {
    src: _nodata["default"],
    alt: '暂无数据'
  }), _react["default"].createElement("p", null, "\u6682\u65E0\u6570\u636E"));
};

exports.NotFound = NotFound;