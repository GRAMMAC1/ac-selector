"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetChecked = resetChecked;
exports.setChecked = setChecked;
exports.setLabel = setLabel;
exports.decodeMenukey = exports.getTreeItem = exports.getKeyId = exports.getWeId = exports.getRoleId = exports.getUserId = exports.deSelectType = exports.deSelect = exports.mapOtherList = exports.mapUserList = exports.transferToMenu = exports.multiSelectType = exports.setOtherReciving = exports.setUserReciving = exports.addFullAttr = void 0;

var _react = _interopRequireDefault(require("react"));

var _tinper = require("./components/tinper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var SubMenu = _tinper.Menu.SubMenu; // 重置_checked属性为false && 为表格添加key

function resetChecked(list, type) {
  if (!Array.isArray(list)) {
    throw new Error('the parameter must be `Array`');
  }

  var res = _toConsumableArray(list);

  for (var i = 0; i < res.length; i++) {
    res[i].key = res[i][type];
    res[i]._checked = false;
  }

  return res;
} // 设置_checked属性为true


function setChecked(source, ref, type) {
  var res = [],
      tempRes = _toConsumableArray(source);

  for (var i = 0; i < tempRes.length; i++) {
    for (var j = 0; j < ref.length; j++) {
      if (tempRes[i][type] === ref[j][type]) {
        tempRes[i]._checked = true;
      }
    }
  }

  res = _toConsumableArray(tempRes);
  return res;
} // 非正式环境数据不全,补全用户列表为空的问题


var addFullAttr = function addFullAttr() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = data.map(function (t, i) {
    return {
      key: t.key ? t.key : "userid-".concat(i),
      _checked: t._checked,
      userid: t.userid ? t.userid : "userid-".concat(i),
      username: t.username ? t.username : '未知姓名',
      email: t.email ? t.email : '未知邮箱',
      mobile: t.mobile ? t.mobile : '未知号码',
      orgName: t.orgName ? t.orgName : '未知部门'
    };
  });
  return res;
}; // 为传进来的数据设置key和reciving,可以在右侧展示


exports.addFullAttr = addFullAttr;

var setUserReciving = function setUserReciving(source) {
  var res = source.map(function (t) {
    return Object.assign({}, t, {
      key: t.userid,
      reciving: t.orgName ? "".concat(t.username, "(").concat(t.orgName, ")") : t.username
    });
  });
  return res;
};

exports.setUserReciving = setUserReciving;

var setOtherReciving = function setOtherReciving(source) {
  var res = source.map(function (t) {
    switch (t.typeCode) {
      case 1:
        return Object.assign({}, t, {
          reciving: t.roleName,
          key: t.roleId
        });

      case 2:
        return Object.assign({}, t, {
          reciving: t.orgName,
          key: t.orgId
        });

      case 3:
        return Object.assign({}, t, {
          reciving: t.ruleName,
          key: "".concat(t.ruleCode, "&").concat(t.ruleName)
        });

      default:
        return t;
    }
  });
  return res;
}; // 根据activeKey设置不同的标签


exports.setOtherReciving = setOtherReciving;

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

    case '0':
      return '微信';
  }
}

var multiSelectType = {
  type: 'checkbox'
};
exports.multiSelectType = multiSelectType;

var transferToMenu = function transferToMenu(treeData) {
  var subMenu = [],
      arr = [];

  if (!(treeData instanceof Array)) {
    arr.push(treeData);
    treeData = arr.concat();
  }

  treeData.forEach(function (value, key) {
    var k = "id=".concat(value.id, "&name=").concat(value.name);
    var v = value.name;

    if ('attrs' in value) {
      subMenu.push(_react["default"].createElement(SubMenu, {
        key: k,
        title: _react["default"].createElement("span", null, v)
      }, value.attrs ? transferToMenu(value.attrs) : null));
    } else {
      // 生成叶子节点时将所有对象的key处理成`key=value`这种形式
      var _k = '';

      for (var i in value) {
        _k += "".concat(i, "=").concat(value[i], "&");
      } // 处理掉最后一个&


      _k = _k.substring(0, _k.lastIndexOf('&'));
      subMenu.push(_react["default"].createElement(_tinper.Menu.Item, {
        key: _k
      }, v));
    }
  });
  return subMenu;
};

exports.transferToMenu = transferToMenu;

var mapUserList = function mapUserList() {
  var userList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = [];
  res = userList.map(function (t) {
    return _objectSpread({}, t, {
      type: t.type,
      typeCode: t.typeCode,
      userid: t.userid,
      username: t.username,
      mobile: t.mobile,
      email: t.email,
      orgName: t.orgName
    });
  });
  return res;
};

exports.mapUserList = mapUserList;

var mapOtherList = function mapOtherList() {
  var otherList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = [];
  res = otherList.map(function (t) {
    switch (t.typeCode) {
      case 1:
        return _objectSpread({}, t, {
          type: t.type,
          typeCode: t.typeCode,
          roleId: t.roleId,
          roleName: t.roleName,
          roleCode: t.roleCode
        });

      case 2:
        return _objectSpread({}, t, {
          type: t.type,
          typeCode: t.typeCode,
          orgId: t.orgId,
          orgName: t.orgName
        });

      case 3:
        return _objectSpread({}, t, {
          type: t.type,
          typeCode: t.typeCode,
          ruleCode: t.ruleCode,
          ruleName: t.ruleName,
          uri: t.uri
        });

      default:
        return t;
    }
  });
  return res;
};
/**
 * @description 选人逻辑统一处理,当前类型的人先清除，统一添加
 * @param data 数据源
 * @param typeCode 清除类型
 */


exports.mapOtherList = mapOtherList;

var deSelect = function deSelect() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var typeCode = arguments.length > 1 ? arguments[1] : undefined;
  var res = [];
  res = data.filter(function (t) {
    if (t.typeCode !== typeCode) {
      return t;
    }
  });
  return res;
};

exports.deSelect = deSelect;

var deSelectType = function deSelectType() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var type = arguments.length > 1 ? arguments[1] : undefined;
  var res = [];
  res = data.filter(function (t) {
    if (t.type !== type) {
      return t;
    }
  });
  return res;
};

exports.deSelectType = deSelectType;

var getUserId = function getUserId() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = data.map(function (t) {
    return t.userid;
  });
  return res;
};

exports.getUserId = getUserId;

var getRoleId = function getRoleId() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = data.map(function (t) {
    return t.roleId;
  });
  return res;
};

exports.getRoleId = getRoleId;

var getWeId = function getWeId() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = data.map(function (t) {
    return t.wxOpenId;
  });
  return res;
};

exports.getWeId = getWeId;

var getKeyId = function getKeyId() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = data.map(function (t) {
    return t.key;
  });
  return res;
};

exports.getKeyId = getKeyId;

var getTreeItem = function getTreeItem(data) {
  var arr = [];
  data.forEach(function (item) {});
  return;
}; // 为了支持用户自定义传入规则数据时返回用户自定义的key
// 将key的格式定义为url param的格式
// id=1&name=2的形式
// 对key进行解析，返回
// { id: 1, name: 2 }


exports.getTreeItem = getTreeItem;

var decodeMenukey = function decodeMenukey() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var paramList = value.split('&'),
      tempArr,
      res = {};
  paramList.forEach(function (t) {
    tempArr = t.split('=');
    res[tempArr[0]] = tempArr[1];
  });
  return res;
};

exports.decodeMenukey = decodeMenukey;