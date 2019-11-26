'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTreeItem = exports.getKeyId = exports.getRoleId = exports.getUserId = exports.deSelectType = exports.deSelect = exports.mapOtherList = exports.mapUserList = exports.transferToMenu = exports.multiSelectType = exports.setOtherReciving = exports.setUserReciving = exports.addFullAttr = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.resetChecked = resetChecked;
exports.setChecked = setChecked;
exports.setLabel = setLabel;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tinperBee = require('tinper-bee');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var SubMenu = _tinperBee.Menu.SubMenu;

// 重置_checked属性为false && 为表格添加key
function resetChecked(list, type) {
  if (!Array.isArray(list)) {
    throw new Error('the parameter must be `Array`');
  }
  var res = [].concat(_toConsumableArray(list));
  for (var i = 0; i < res.length; i++) {
    res[i].key = res[i][type];
    res[i]._checked = false;
  }
  return res;
}

// 设置_checked属性为true
function setChecked(source, ref, type) {
  var res = [],
      tempRes = [].concat(_toConsumableArray(source));
  for (var i = 0; i < tempRes.length; i++) {
    for (var j = 0; j < ref.length; j++) {
      if (tempRes[i][type] === ref[j][type]) {
        tempRes[i]._checked = true;
      }
    }
  }
  res = [].concat(_toConsumableArray(tempRes));
  return res;
}
// 非正式环境数据不全,补全用户列表为空的问题
var addFullAttr = exports.addFullAttr = function addFullAttr() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var res = data.map(function (t, i) {
    return {
      key: t.key ? t.key : 'userid-' + i,
      _checked: t._checked,
      userid: t.userid ? t.userid : 'userid-' + i,
      username: t.username ? t.username : '未知姓名',
      email: t.email ? t.email : '未知邮箱',
      mobile: t.mobile ? t.mobile : '未知号码',
      orgName: t.orgName ? t.orgName : '未知部门'
    };
  });
  return res;
};

// 为传进来的数据设置key和reciving,可以在右侧展示
var setUserReciving = exports.setUserReciving = function setUserReciving(source) {
  var res = source.map(function (t) {
    return _extends({}, t, {
      key: t.userid,
      reciving: t.orgName ? t.username + '(' + t.orgName + ')' : t.username
    });
  });
  return res;
};

var setOtherReciving = exports.setOtherReciving = function setOtherReciving(source) {
  var res = source.map(function (t) {
    switch (t.typeCode) {
      case 1:
        return _extends({}, t, {
          reciving: t.roleName,
          key: t.roleId
        });
      case 2:
        return _extends({}, t, {
          reciving: t.orgName,
          key: t.orgId
        });
      case 3:
        return _extends({}, t, {
          reciving: t.ruleName,
          key: t.ruleCode + '&' + t.ruleName
        });
      default:
        return {};
    }
  });
  return res;
};

// 根据activeKey设置不同的标签
function setLabel(key) {
  switch (key) {
    case '1':
      return '用户';
    case '2':
      return '角色';
    case '3':
      return '组织';
    case '4':
      return '规则';
  }
}

var multiSelectType = exports.multiSelectType = {
  type: 'checkbox'
};

var transferToMenu = exports.transferToMenu = function transferToMenu(treeData) {
  var subMenu = [],
      arr = [];
  if (!(treeData instanceof Array)) {
    arr.push(treeData);
    treeData = arr.concat();
  }
  treeData.forEach(function (value, key) {
    if ('attrs' in value) {
      var k = value.id + '&' + value.name;
      var v = value.name;
      subMenu.push(_react2["default"].createElement(
        SubMenu,
        { key: k, title: _react2["default"].createElement(
            'span',
            null,
            v
          ) },
        value.attrs ? transferToMenu(value.attrs) : null
      ));
    } else {
      var k = value.id + '&' + value.name;
      var v = value.name;
      subMenu.push(_react2["default"].createElement(
        _tinperBee.Menu.Item,
        { key: k },
        v
      ));
    }
  });
  return subMenu;
};

var mapUserList = exports.mapUserList = function mapUserList() {
  var userList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var res = [];
  res = userList.map(function (t) {
    return {
      type: t.type,
      typeCode: t.typeCode,
      userid: t.userid,
      username: t.username,
      mobile: t.mobile,
      email: t.email,
      orgName: t.orgName
    };
  });
  return res;
};

var mapOtherList = exports.mapOtherList = function mapOtherList() {
  var otherList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var res = [];
  res = otherList.map(function (t) {
    switch (t.typeCode) {
      case 1:
        return {
          type: t.type,
          typeCode: t.typeCode,
          roleId: t.roleId,
          roleName: t.roleName,
          roleCode: t.roleCode
        };
      case 2:
        return {
          type: t.type,
          typeCode: t.typeCode,
          orgId: t.orgId,
          orgName: t.orgName
        };
      case 3:
        return {
          type: t.type,
          typeCode: t.typeCode,
          ruleCode: t.ruleCode,
          ruleName: t.ruleName,
          uri: t.uri
        };
      default:
        return [];
    }
  });
  return res;
};

/**
 * @description 选人逻辑统一处理,当前类型的人先清除，统一添加
 * @param data 数据源
 * @param typeCode 清除类型
 */
var deSelect = exports.deSelect = function deSelect() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var typeCode = arguments[1];

  var res = [];
  res = data.filter(function (t) {
    if (t.typeCode !== typeCode) {
      return t;
    }
  });
  return res;
};
var deSelectType = exports.deSelectType = function deSelectType() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var type = arguments[1];

  var res = [];
  res = data.filter(function (t) {
    if (t.type !== type) {
      return t;
    }
  });
  return res;
};

var getUserId = exports.getUserId = function getUserId() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var res = data.map(function (t) {
    return t.userid;
  });
  return res;
};

var getRoleId = exports.getRoleId = function getRoleId() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var res = data.map(function (t) {
    return t.roleId;
  });
  return res;
};
var getKeyId = exports.getKeyId = function getKeyId() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var res = data.map(function (t) {
    return t.key;
  });
  return res;
};

var getTreeItem = exports.getTreeItem = function getTreeItem(data) {
  var arr = [];
  data.forEach(function (item) {});
  return;
};