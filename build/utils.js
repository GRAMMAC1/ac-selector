'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapOtherList = exports.mapUserList = exports.transferToMenu = exports.multiSelectType = exports.setOtherReciving = exports.setUserReciving = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.resetChecked = resetChecked;
exports.setChecked = setChecked;
exports.setLabel = setLabel;

var _tinperBee = require('tinper-bee');

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
  var res = [];
  for (var i = 0; i < source.length; i++) {
    for (var j = 0; j < ref.length; j++) {
      if (source[i][type] === ref[j][type]) {
        source[i]._checked = true;
      }
    }
  }
  res = [].concat(_toConsumableArray(source));
  return res;
}

// 为传进来的数据设置key和reciving,可以在右侧展示
var setUserReciving = exports.setUserReciving = function setUserReciving(source) {
  var res = source.map(function (t) {
    return _extends({}, t, {
      key: t.userid,
      reciving: t.username + '(' + t.orgName + ')'
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
          key: t.ruleCode
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
      var k = value.code + '-menu-' + key + '&' + value.name;
      var v = value.displayName || value.name;
      subMenu.push(React.createElement(
        SubMenu,
        { key: k, title: React.createElement(
            'span',
            null,
            v
          ) },
        value.attrs ? transferToMenu(value.attrs) : null
      ));
    } else {
      var k = value.code + '-submenu-' + key + '&' + value.name;
      var v = value.displayName || value.name;
      subMenu.push(React.createElement(
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
          ruleName: t.ruleName
        };
      default:
        return [];
    }
  });
  return res;
};