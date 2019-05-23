'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterCaptial = exports.multiColumns = exports.orgCol = exports.roleMultiCol = exports.selectedUserCol = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var selectedUserCol = exports.selectedUserCol = [{ key: 'serialNumber', title: '序号', dataIndex: 'number', width: 100, render: function render(text, record, index) {
    return _react2["default"].createElement(
      'span',
      null,
      index + 1
    );
  } }, { key: 'type', title: '类型', dataIndex: 'type', width: 100 }, { key: 'recivingObj', title: '接收对象', dataIndex: 'reciving', width: 250 }];

var roleMultiCol = exports.roleMultiCol = [{ key: 'rolename', title: '角色名', dataIndex: 'roleName', width: 100 }, { key: 'rolecode', title: '角色编码', dataIndex: 'roleCode' }];

var orgCol = exports.orgCol = [{ key: 'orgName', title: '姓名', dataIndex: 'orgName', width: 150 }, { key: 'orgMail', title: '账号(邮箱)', dataIndex: 'orgMail', width: 150 }, { key: 'orgPhone', title: '手机', dataIndex: 'orgPhone' }];

var multiColumns = exports.multiColumns = [{ key: 'name', title: '姓名', dataIndex: 'username', width: 100 }, { key: 'dept', title: '部门', dataIndex: 'dept', width: 200 }, { key: 'account', title: '账号(邮箱)', dataIndex: 'email', width: 200 }, { key: 'phone', title: '手机号码', dataIndex: 'mobile', width: 150 }];

var filterCaptial = exports.filterCaptial = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];