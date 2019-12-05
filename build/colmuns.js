"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectedUser = exports.selectData = exports.filterCaptial = exports.multiColumns = exports.orgCol = exports.roleMultiCol = exports.selectedUserCol = void 0;

var _react = _interopRequireDefault(require("react"));

var lang = _interopRequireWildcard(require("./lang"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var selectedUserCol = {
  zh_CN: [{
    key: 'serialNumber',
    title: '序号',
    dataIndex: 'number',
    width: 100,
    render: function render(text, record, index) {
      return _react["default"].createElement("span", null, index + 1);
    }
  }, {
    key: 'type',
    title: '类型',
    dataIndex: 'type',
    width: 100
  }, {
    key: 'recivingObj',
    title: '接收对象',
    dataIndex: 'reciving',
    width: 250
  }],
  zh_TW: [{
    key: 'serialNumber',
    title: '序號',
    dataIndex: 'number',
    width: 100,
    render: function render(text, record, index) {
      return _react["default"].createElement("span", null, index + 1);
    }
  }, {
    key: 'type',
    title: '類型',
    dataIndex: 'type',
    width: 100
  }, {
    key: 'recivingObj',
    title: '接收對象',
    dataIndex: 'reciving',
    width: 250
  }],
  en_US: [{
    key: 'serialNumber',
    title: 'SN',
    dataIndex: 'number',
    width: 100,
    render: function render(text, record, index) {
      return _react["default"].createElement("span", null, index + 1);
    }
  }, {
    key: 'type',
    title: 'Type',
    dataIndex: 'type',
    width: 100
  }, {
    key: 'recivingObj',
    title: 'Receiving Object',
    dataIndex: 'reciving',
    width: 250
  }]
};
exports.selectedUserCol = selectedUserCol;

var roleMultiCol = function roleMultiCol(locale) {
  return [{
    key: 'rolename',
    title: lang[locale].roleId,
    dataIndex: 'roleName',
    width: 100
  }, {
    key: 'rolecode',
    title: lang[locale].roleName,
    dataIndex: 'roleCode'
  }];
};

exports.roleMultiCol = roleMultiCol;
var orgCol = {
  zh_CN: [{
    key: 'orgName',
    title: '姓名',
    dataIndex: 'username',
    width: 150
  }, {
    key: 'orgMail',
    title: '账号(邮箱)',
    dataIndex: 'email',
    width: 150
  }, {
    key: 'orgPhone',
    title: '手机',
    dataIndex: 'mobile',
    width: 131
  }],
  zh_TW: [{
    key: 'orgName',
    title: '姓名',
    dataIndex: 'username',
    width: 150
  }, {
    key: 'orgMail',
    title: '賬號(郵箱)',
    dataIndex: 'email',
    width: 150
  }, {
    key: 'orgPhone',
    title: '手機',
    dataIndex: 'mobile',
    width: 131
  }],
  en_US: [{
    key: 'orgName',
    title: 'Name',
    dataIndex: 'username',
    width: 150
  }, {
    key: 'orgMail',
    title: 'Account(Email)',
    dataIndex: 'email',
    width: 150
  }, {
    key: 'orgPhone',
    title: 'Cellphone Number',
    dataIndex: 'mobile',
    width: 131
  }]
}; // export const multiColumns = [
//   { key: 'name', title: '姓名', dataIndex: 'username', width: 100 },
//   { key: 'orgName', title: '部门', dataIndex: 'orgName', width: 200 },
//   { key: 'account', title: '账号(邮箱)', dataIndex: 'email', width: 200 },
//   { key: 'phone', title: '手机号码', dataIndex: 'mobile', width: 150 }
// ]

exports.orgCol = orgCol;
var multiColumns = {
  zh_CN: [{
    key: 'name',
    title: '姓名',
    dataIndex: 'username',
    width: 100
  }, {
    key: 'orgName',
    title: '部门',
    dataIndex: 'orgName',
    width: 200
  }, {
    key: 'account',
    title: '账号(邮箱)',
    dataIndex: 'email',
    width: 200
  }, {
    key: 'phone',
    title: '手机号码',
    dataIndex: 'mobile',
    width: 150
  }],
  zh_TW: [{
    key: 'name',
    title: '姓名',
    dataIndex: 'username',
    width: 100
  }, {
    key: 'orgName',
    title: '部門',
    dataIndex: 'orgName',
    width: 200
  }, {
    key: 'account',
    title: '賬號(郵箱)',
    dataIndex: 'email',
    width: 200
  }, {
    key: 'phone',
    title: '手機號碼',
    dataIndex: 'mobile',
    width: 150
  }],
  en_US: [{
    key: 'name',
    title: 'Name',
    dataIndex: 'username',
    width: 100
  }, {
    key: 'orgName',
    title: 'Department',
    dataIndex: 'orgName',
    width: 200
  }, {
    key: 'account',
    title: 'Account(Email)',
    dataIndex: 'email',
    width: 200
  }, {
    key: 'phone',
    title: 'Cellphone Number',
    dataIndex: 'mobile',
    width: 150
  }]
};
exports.multiColumns = multiColumns;
var filterCaptial = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
exports.filterCaptial = filterCaptial;
var selectData = [{
  key: '1249795575075072',
  orgId: '1249795575075072',
  orgName: 'zbl公司222',
  type: '组织',
  typeCode: 2,
  reciving: 'zbl公司222'
}, {
  key: '1249799305859328',
  orgId: '1249799305859328',
  orgName: 'zbl部门1',
  type: '组织',
  typeCode: 2,
  reciving: 'zbl部门1'
}, {
  key: '12',
  ruleCode: '12',
  ruleName: '修改人5',
  type: '规则',
  typeCode: 3,
  reciving: 'zbl部门1'
}];
exports.selectData = selectData;
var selectedUser = [{
  key: 'a1e8075a-93c3-4552-9a06-e05128ee34b7',
  orgName: '未知部门',
  email: 'zhaojian770627@163.com',
  username: 'zhaojianc',
  mobile: '18601913836',
  type: '用户',
  userid: 'a1e8075a-93c3-4552-9a06-e05128ee34b7',
  typeCode: 0,
  reciving: 'zhaojianc'
}];
exports.selectedUser = selectedUser;