"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var langs = _interopRequireWildcard(require("./lang"));

var _tinper = require("./components/tinper");

require("./Selector.css");

var _multiSelect = _interopRequireDefault(require("bee-table/build/lib/multiSelect"));

var _colmuns = require("./colmuns");

var _request = require("./request");

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MultiSelectTable = (0, _multiSelect["default"])(_tinper.Table, _tinper.Checkbox);
var TabPane = _tinper.Tabs.TabPane;
var TreeNode = _tinper.Tree.TreeNode;

var i18n = _objectSpread({}, langs);

var noop = function noop() {};
/**
 * @dependencies 依赖的组件版本写死，升级可能会出现bug
 * @refact 类型声明 测试用例 webpack升级
 */


var propTypes = {
  locale: _propTypes["default"].oneOf(['zh_CN', 'zh_TW', 'en_US']),
  show: _propTypes["default"].bool.isRequired,
  onConfirm: _propTypes["default"].func.isRequired,
  onClose: _propTypes["default"].func.isRequired,
  mode: _propTypes["default"].string,
  selectedUser: _propTypes["default"].array,
  selectedOther: _propTypes["default"].array,
  documentNo: _propTypes["default"].string,
  documentName: _propTypes["default"].string,
  ruleList: _propTypes["default"].array,
  emptyText: _propTypes["default"].node,
  tabConfig: _propTypes["default"].array
};
var defaultProps = {
  locale: 'zh_CN',
  show: false,
  onConfirm: noop,
  onClose: noop,
  selectedUser: [],
  selectedOther: [],
  mode: 'daily',
  documentNo: '',
  documentName: '',
  emptyText: function emptyText(locale) {
    return _react["default"].createElement("div", null, locale);
  },
  tabConfig: [],
  tableData: [],
  treeConfig: [],
  pageSize: 40
};

var Selector =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Selector, _React$Component);

  function Selector(props) {
    var _this2;

    _classCallCheck(this, Selector);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Selector).call(this, props));

    _defineProperty(_assertThisInitialized(_this2), "didFinish", function () {
      var _this2$props = _this2.props,
          selectedUser = _this2$props.selectedUser,
          selectedOther = _this2$props.selectedOther;

      _this2.setState({
        selectedUserData: (0, _utils.setUserReciving)(selectedUser),
        selectedOtherList: (0, _utils.setOtherReciving)(selectedOther)
      });

      var url = "".concat(_this2.state.prefixUrl, "/user/staff/search?pageSize=").concat(_this2.props.pageSize, "&pageNo=1&keyword=");
      (0, _request.requestGet)(url).then(function (response) {
        if (response.status === 1 && response.data !== null) {
          var selectedUserData = _this2.state.selectedUserData;

          var _newList = (0, _utils.resetChecked)(response.data.values, 'userid');

          var res = (0, _utils.setChecked)(_newList, selectedUserData, 'userid');
          var completeRes = (0, _utils.addFullAttr)(res, _this2.props.locale); // console.log(completeRes)

          var obj = {
            activePage: response.data.currentPage,
            items: response.data.totalPages,
            total: response.data.pageSize
          };

          _this2.setState({
            multiShowList: completeRes,
            staffPage: obj
          });
        }
      })["catch"](function (error) {
        throw new Error(error);
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "search", function (e) {
      var activeKey = _this2.state.activeKey,
          _this = _assertThisInitialized(_this2);

      var url = '';

      if (activeKey === '1') {
        url = "".concat(_this.state.prefixUrl, "/user/staff/search?pageSize=").concat(_this2.props.pageSize, "&pageNo=1&keyword=").concat(e.target.value);
      } else if (activeKey === '2') {
        url = "".concat(_this.state.prefixUrl, "/user/role/search?pageSize=").concat(_this2.props.pageSize, "&pageNo=1&keyword=").concat(e.target.value);
      }

      if (e.keyCode === 13 || e.keyCode === 108) {
        (0, _request.requestGet)(url).then(function (response) {
          if (response.status === 1 && response.data !== null) {
            if (activeKey === '1') {
              var _list = [],
                  obj = {
                activePage: response.data.currentPage,
                items: response.data.totalPages,
                total: response.data.pageSize
              };
              _list = (0, _utils.resetChecked)(response.data.values, 'userid');
              _list = (0, _utils.setChecked)(response.data.values, _this2.state.selectedUserData, 'userid');
              _list = (0, _utils.addFullAttr)(_list);

              _this2.setState({
                multiShowList: _list,
                staffPage: obj
              });
            } else if (activeKey === '2') {
              var _list2 = [],
                  _obj = {
                activePage: response.data.currentPage,
                items: response.data.totalPages,
                total: response.data.pageSize
              };
              _list2 = (0, _utils.resetChecked)(response.data.values, 'roleId');
              _list2 = (0, _utils.setChecked)(response.data.values, _this2.state.selectedOtherList, 'roleId');

              _this2.setState({
                roleShowList: _list2,
                rolePage: _obj
              });
            }
          } else if (response.data === null) {
            if (activeKey === '1') {
              _this2.setState({
                staffPage: Object.assign({}, {
                  activePage: 1,
                  items: 1,
                  total: 0
                }),
                multiShowList: []
              });
            } else if (activeKey === '2') {
              _this2.setState({
                rolePage: Object.assign({}, {
                  activePage: 1,
                  items: 1,
                  total: 0
                }),
                roleShowList: []
              });
            }
          }
        })["catch"](function (error) {
          throw new Error(error);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "clickSearch", function () {
      var _this = _assertThisInitialized(_this2);

      var searchUrl;
      var _this2$state = _this2.state,
          activeKey = _this2$state.activeKey,
          staffInputValue = _this2$state.staffInputValue,
          roleInputValue = _this2$state.roleInputValue;

      if (activeKey === '1') {
        searchUrl = "".concat(_this.state.prefixUrl, "/user/staff/search?pageSize=").concat(_this2.props.pageSize, "&pageNo=1&keyword=").concat(staffInputValue);
      } else {
        searchUrl = "".concat(_this.state.prefixUrl, "/user/role/search?pageSize=").concat(_this2.props.pageSize, "&pageNo=1&keyword=").concat(roleInputValue);
      }

      (0, _request.requestGet)(searchUrl).then(function (response) {
        if (response.status === 1 && response.data !== null) {
          if (activeKey === '1') {
            var _list = [],
                obj = {
              activePage: response.data.currentPage,
              items: response.data.totalPages,
              total: response.data.pageSize
            };
            _list = (0, _utils.resetChecked)(response.data.values, 'userid');
            _list = (0, _utils.setChecked)(response.data.values, _this2.state.selectedUserData, 'userid');

            _this2.setState({
              multiShowList: _list,
              staffPage: obj
            });
          } else if (activeKey === '2') {
            var _list3 = [],
                _obj2 = {
              activePage: response.data.currentPage,
              items: response.data.totalPages,
              total: response.data.pageSize
            };
            _list3 = (0, _utils.resetChecked)(response.data.values, 'roleId');
            _list3 = (0, _utils.setChecked)(response.data.values, _this2.state.selectedOtherList, 'roleId');

            _this2.setState({
              roleShowList: _list3,
              rolePage: _obj2
            });
          }
        }
      })["catch"](function (err) {
        throw new Error(err);
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "inputChange", function (type, e) {
      _this2.setState(_defineProperty({}, type, e.target.value));
    });

    _defineProperty(_assertThisInitialized(_this2), "hoverDelIcon", function () {
      return _react["default"].createElement(_tinper.Icon, {
        onClick: _this2.delUser,
        className: 'deleteIcon',
        type: 'uf-close'
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "hoverDelOtherIcon", function () {
      return _react["default"].createElement(_tinper.Icon, {
        onClick: _this2.delOther,
        className: 'deleteIcon',
        type: 'uf-close'
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "delOther", function () {
      var _this2$state2 = _this2.state,
          roleShowList = _this2$state2.roleShowList,
          selectedOtherList = _this2$state2.selectedOtherList,
          orgSelectedKeys = _this2$state2.orgSelectedKeys;

      var _list = _toConsumableArray(roleShowList);

      if (selectedOtherList[_this2.delOtherIndex].typeCode === 1) {
        _list = _list.map(function (t) {
          if (t.roleId === selectedOtherList[_this2.delOtherIndex].roleId) {
            t._checked = false;
            return t;
          }

          return t;
        });
      } else if (selectedOtherList[_this2.delOtherIndex].typeCode === 2) {
        var index = -1;
        orgSelectedKeys.forEach(function (t, i) {
          if (t == selectedOtherList[_this2.delOtherIndex].orgId) {
            index = i;
          }
        });

        if (index !== -1) {
          var tempList = _toConsumableArray(orgSelectedKeys);

          tempList.splice(index, 1);

          _this2.setState({
            orgSelectedKeys: _toConsumableArray(tempList)
          });
        }
      }

      var res = _toConsumableArray(selectedOtherList);

      res.splice(_this2.delOtherIndex, 1);

      _this2.setState({
        selectedOtherList: _toConsumableArray(res),
        selectedOtherCount: res.length,
        roleShowList: _toConsumableArray(_list)
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "delUser", function () {
      var _this2$state3 = _this2.state,
          multiShowList = _this2$state3.multiShowList,
          selectedUserData = _this2$state3.selectedUserData;
      multiShowList = multiShowList.map(function (item) {
        if (item.userid === selectedUserData[_this2.delIndex].userid) {
          item._checked = false;
          return item;
        }
      });
      selectedUserData.splice(_this2.delIndex, 1);

      _this2.setState({
        selectedUserData: _toConsumableArray(selectedUserData),
        selectedCount: selectedUserData.length
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "onRowHover", function (index) {
      _this2.delIndex = index;
    });

    _defineProperty(_assertThisInitialized(_this2), "onRowOtherHover", function (index) {
      _this2.delOtherIndex = index;
    });

    _defineProperty(_assertThisInitialized(_this2), "getUserList", function (data, record) {
      var typeCode = 0;
      var _this2$state4 = _this2.state,
          defaultLabel = _this2$state4.defaultLabel,
          multiShowList = _this2$state4.multiShowList,
          selectedUserData = _this2$state4.selectedUserData;
      var delList = (0, _utils.getUserId)(data);

      var _list = _toConsumableArray(selectedUserData);

      var res = (0, _utils.resetChecked)(multiShowList, 'userid');
      res = (0, _utils.setChecked)(multiShowList, data, 'userid');

      if (record === undefined) {
        if (data.length) {
          var useridList = (0, _utils.getUserId)(_list);
          data.forEach(function (t) {
            if (!useridList.includes(t.userid)) {
              _list.push(Object.assign({}, t, {
                type: defaultLabel,
                typeCode: typeCode,
                key: t.userid,
                reciving: "".concat(t.username, "(").concat(t.orgName, ")")
              }));
            }
          });
        } else {
          // 得到当前页数据的userid，遍历当前已选的用户列表，如果有当前页的userid就删除当前项
          var deleteUserList = (0, _utils.getUserId)(multiShowList),
              result = [];

          _list.forEach(function (t) {
            if (!deleteUserList.includes(t.userid)) {
              result.push(t);
            }
          });

          _list = [].concat(result);
        }
      } else {
        var currItem = Object.assign({}, record, {
          type: defaultLabel,
          typeCode: typeCode,
          key: record.userid,
          reciving: record.orgName ? "".concat(record.username, "(").concat(record.orgName, ")") : // : `${record.username}(未知部门)`
          "".concat(record.username, "(").concat(langs[_this2.state.locale], ")")
        });

        if (delList.includes(currItem.userid)) {
          _list.push(currItem);
        } else {
          _list = _list.filter(function (t) {
            if (t.userid !== currItem.userid) {
              return t;
            }
          });
        }
      }

      _this2.setState({
        multiShowList: _toConsumableArray(res),
        selectedUserData: _toConsumableArray(_list),
        selectedCount: _list.length
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "getRoleList", function (data, record) {
      var typeCode = 1;
      var _this2$state5 = _this2.state,
          roleShowList = _this2$state5.roleShowList,
          defaultLabel = _this2$state5.defaultLabel,
          selectedOtherList = _this2$state5.selectedOtherList;

      var _list = _toConsumableArray(selectedOtherList);

      var tempList = _toConsumableArray(roleShowList);

      var delList = (0, _utils.getRoleId)(data);
      tempList = (0, _utils.resetChecked)(tempList, 'roleId');
      tempList = (0, _utils.setChecked)(tempList, data, 'roleId');

      if (record === undefined) {
        if (data.length) {
          var roleIdList = (0, _utils.getRoleId)(_list);
          data.forEach(function (t) {
            if (!roleIdList.includes(t.roleId)) {
              _list.push(Object.assign({}, t, {
                key: t.roleId,
                type: defaultLabel,
                typeCode: typeCode,
                reciving: t.roleName
              }));
            }
          });
        } else {
          // 和用户页签取消全部选中逻辑相同
          var deleteRoleList = (0, _utils.getRoleId)(roleShowList),
              result = [];

          _list.forEach(function (t) {
            if (!deleteRoleList.includes(t.roleId)) {
              result.push(t);
            }
          });

          _list = [].concat(result);
        }
      } else {
        var currItem = Object.assign({}, record, {
          key: record.roleId,
          type: defaultLabel,
          typeCode: typeCode,
          reciving: record.roleName
        });

        if (delList.includes(record.roleId)) {
          _list.push(currItem);
        } else {
          _list = _list.filter(function (t) {
            if (t.roleId !== record.roleId) {
              return t;
            }
          });
        }
      }

      _this2.setState({
        selectedOtherList: _toConsumableArray(_list),
        roleShowList: _toConsumableArray(tempList),
        selectedOtherCount: _list.length
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "getWeList", function (data, record) {
      var typeCode = 4; //

      var _this2$state6 = _this2.state,
          weArray = _this2$state6.weArray,
          defaultLabel = _this2$state6.defaultLabel,
          selectedOtherList = _this2$state6.selectedOtherList; // console.log(data,record)

      var delList = (0, _utils.getWeId)(data);

      var _list = _toConsumableArray(selectedOtherList);

      var tempList = _toConsumableArray(weArray); // let delList = getRoleId(data)


      tempList = (0, _utils.resetChecked)(weArray, 'wxOpenId');
      tempList = (0, _utils.setChecked)(weArray, data, 'wxOpenId'); //  console.log(data,record)

      if (record === undefined) {
        if (data.length) {
          var weList = (0, _utils.getWeId)(_list);
          data.forEach(function (t) {
            if (!weList.includes(t.wxOpenId)) {
              _list.push(Object.assign({}, t, {
                key: t.wxOpenId,
                type: defaultLabel,
                typeCode: typeCode,
                reciving: t.weChatId
              }));
            }
          });
        } else {
          // 和用户页签取消全部选中逻辑相同
          var deleteWeList = (0, _utils.getWeId)(weArray),
              result = [];

          _list.forEach(function (t) {
            if (!deleteWeList.includes(t.wxOpenId)) {
              result.push(t);
            }
          });

          _list = [].concat(result);
        }
      } else {
        var currItem = Object.assign({}, record, {
          key: record.wxOpenId,
          type: defaultLabel,
          typeCode: typeCode,
          reciving: record.weChatId
        });

        if (delList.includes(record.wxOpenId)) {
          _list.push(currItem);
        } else {
          _list = _list.filter(function (t) {
            if (t.wxOpenId !== record.wxOpenId) {
              return t;
            }
          });
        }
      } // console.log(_list,tempList,_list.length)


      _this2.setState({
        selectedOtherList: _toConsumableArray(_list),
        weArray: _toConsumableArray(tempList),
        selectedOtherCount: _list.length
      });

      return;
    });

    _defineProperty(_assertThisInitialized(_this2), "weLeftSearch", function (e) {
      _this2.setState({
        weLeftVal: e.target.value,
        weList: e.target.value ? _this2.state.weList.filter(function (item) {
          return item.accountName.indexOf(e.target.value) != -1;
        }) : _this2.state.weListDB
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "getExtend", function (data, record) {
      var _this2$state7 = _this2.state,
          roleShowList = _this2$state7.roleShowList,
          defaultLabel = _this2$state7.defaultLabel,
          selectedOtherList = _this2$state7.selectedOtherList;

      var _list = _toConsumableArray(selectedOtherList);

      var tempList = _toConsumableArray(roleShowList);

      var delList = (0, _utils.getRoleId)(data);
      tempList = (0, _utils.resetChecked)(tempList, 'roleId');
      tempList = (0, _utils.setChecked)(tempList, data, 'roleId');

      if (record === undefined) {
        if (data.length) {
          var roleIdList = (0, _utils.getRoleId)(_list);
          data.forEach(function (t) {
            if (!roleIdList.includes(t.type)) {
              _list.push(t);
            }
          });
        } else {
          // 和用户页签取消全部选中逻辑相同
          var deleteRoleList = (0, _utils.getRoleId)(roleShowList),
              result = [];

          _list.forEach(function (t) {
            if (!deleteRoleList.includes(t.roleId)) {
              result.push(t);
            }
          });

          _list = [].concat(result);
        }
      } else {
        var currItem = record;

        if (delList.includes(record.roleId)) {
          _list.push(currItem);
        } else {
          _list = _list.filter(function (t) {
            if (t.roleId !== record.roleId) {
              return t;
            }
          });
        }
      }

      _this2.setState({
        selectedOtherList: _toConsumableArray(_list),
        roleShowList: _toConsumableArray(tempList),
        selectedOtherCount: _list.length
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "extendPageSelect", function (tabMark, index) {
      _this2.props.extendPage(tabMark, index);

      _this2.setState({
        extendPageIndex: index
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "uniqueByAttr", function (arr, type) {
      var res = new Map();
      return arr.filter(function (item) {
        if (item[type] !== 'undefined') {
          return !res.has(item[type]) && res.set(item[type], 1);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "deSelectAll", function (code, e) {
      e.stopPropagation();

      if (code) {
        var multiShowList = _this2.state.multiShowList;
        multiShowList = multiShowList.map(function (item) {
          item._checked = false;
          return item;
        });

        _this2.setState({
          multiShowList: multiShowList,
          selectedCount: 0,
          selectedUserData: []
        });
      } else {
        var roleShowList = _this2.state.roleShowList; // 清空左侧已勾选项

        roleShowList = roleShowList.map(function (item) {
          item._checked = false;
          return item;
        });

        _this2.setState({
          roleShowList: roleShowList,
          selectedOtherCount: 0,
          selectedOtherList: []
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "reset", function () {
      _this2.setState({
        "extends": '',
        activeKey: '1',
        multiShowList: [],
        roleShowList: [],
        selectedUserData: [],
        selectedOtherList: [],
        ruleMenuList: [],
        // 规则
        selectedCount: 0,
        selectedOtherCount: 0,
        staffInputValue: '',
        roleInputValue: '',
        orgSelectedKeys: [],
        defaultLabel: i18n[_this2.props.locale].user
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "close", function () {
      // 清空上一次用户状态
      _this2.reset();

      _this2.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this2), "confirm", function () {
      var _this2$state8 = _this2.state,
          selectedUserData = _this2$state8.selectedUserData,
          selectedOtherList = _this2$state8.selectedOtherList;
      var userList = (0, _utils.mapUserList)(selectedUserData);
      var otherList = (0, _utils.mapOtherList)(selectedOtherList); // console.log(userList, otherList)
      // console.log(selectedOtherList)

      _this2.props.onConfirm(userList, otherList); // this.props.onConfirm(selectedUserData, selectedOtherList)


      _this2.reset();
    });

    _defineProperty(_assertThisInitialized(_this2), "tabHandleChange", function (lab) {
      // console.log(lab)
      _this2.setState({
        defaultLabel: lab
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "weIndexChange", function (id) {
      _this2.setState({
        weIndex: id
      }); ////////


      _this2.weGetData(id);
    });

    _defineProperty(_assertThisInitialized(_this2), "onChange", function (activeKey, node) {
      // console.log(activeKey,node)
      var _this = _assertThisInitialized(_this2);

      if (activeKey <= 4) {
        _this2.setState({
          "extends": '',
          activeKey: activeKey,
          defaultLabel: (0, _utils.setLabel)(activeKey)
        });
      }

      _this2.setState({
        "extends": '',
        activeKey: activeKey,
        orgInputValue: "" // defaultLabel: setLabel(activeKey)

      });

      if (activeKey === '1') {
        var url = "".concat(_this2.state.prefixUrl, "/user/staff/search?pageSize=").concat(_this2.props.pageSize, "&pageNo=1&keyword=");
        (0, _request.requestGet)(url).then(function (response) {
          if (response.status === 1 && response.data !== null) {
            var selectedUserData = _this2.state.selectedUserData;

            var _newList = (0, _utils.resetChecked)(response.data.values, 'userid');

            var res = (0, _utils.setChecked)(_newList, selectedUserData, 'userid');
            var completeRes = (0, _utils.addFullAttr)(res); // console.log(completeRes)

            var obj = {
              activePage: response.data.currentPage,
              items: response.data.totalPages,
              total: response.data.pageSize
            };

            _this2.setState({
              multiShowList: completeRes,
              staffPage: obj
            });
          }
        })["catch"](function (error) {
          throw new Error(error);
        });
      }

      if (activeKey === '2') {
        var _url = "".concat(_this.state.prefixUrl, "/user/role/search?pageSize=").concat(_this2.props.pageSize, "&pageNo=1&keyword="); // let { roleShowList } = this.state
        // if (!roleShowList.length) {


        (0, _request.requestGet)(_url).then(function (response) {
          if (response.status === 1) {
            var selectedOtherList = _this2.state.selectedOtherList;
            var _page = {
              activePage: response.data.currentPage,
              items: response.data.totalPages,
              total: response.data.pageSize
            };

            _this2.setState({
              rolePage: _page
            });

            var _newList = (0, _utils.resetChecked)(response.data.values, 'roleId');

            var res = (0, _utils.setChecked)(_newList, selectedOtherList, 'roleId');

            _this2.setState({
              roleShowList: res
            });
          }
        })["catch"](function (error) {
          throw new Error(error);
        }); // }
      } else if (activeKey === '3') {
        var selectedOtherList = _this2.state.selectedOtherList;

        var _url2 = "".concat(_this.state.prefixUrl, "/user/org/list?pageSize=40&pageNo=1&orgIds=");

        (0, _request.requestGet)(_url2).then(function (response) {
          if (response.status === 1) {
            _this2.setState({
              orgTreeList: response.data
            });

            _this2.orgTreeList = _toConsumableArray(response.data);

            if (selectedOtherList.length) {
              var checkedKeys = [];
              selectedOtherList.forEach(function (t) {
                if (t.typeCode === 2) {
                  checkedKeys.push(t.orgId);
                }
              });

              _this2.setState({
                orgSelectedKeys: [].concat(checkedKeys)
              });
            } else {
              _this2.setState({
                orgSelectedKeys: []
              });
            }
          }
        })["catch"](function (error) {
          throw new Error(error);
        });
      } else if (activeKey === '4') {
        if (_this2.props.ruleList) {
          _this2.setState({
            ruleMenuList: (0, _utils.transferToMenu)(_this2.props.ruleList)
          });
        } else {
          var _url3 = "".concat(_this.state.prefixUrl, "/user/rules?documentNo=").concat(_this2.props.documentNo, "&documentName=").concat(_this2.props.documentName);

          (0, _request.requestGet)(_url3).then(function (response) {
            if (response.status === 1) {
              var menuList = [{
                id: 'root-0',
                name: _this2.props.documentName,
                attrs: _toConsumableArray(response.data.data)
              }];

              _this2.setState({
                ruleMenuList: (0, _utils.transferToMenu)(menuList)
              });
            }
          })["catch"](function (err) {
            throw new Error(err);
          });
        }
      }

      if (activeKey === '0') {
        var _url4 = "".concat(_this.state.prefixUrl, "/user/wechat/accounts");

        (0, _request.requestGet)(_url4).then(function (res) {
          var id = res.data && res.data[0] ? res.data[0].accountId : '';

          _this2.setState({
            weListDB: res.data,
            weList: res.data,
            weIndex: id
          });

          if (id) {
            _this2.weGetData(id);
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "weGetData", function (id) {
      var keyWords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var url = "".concat(_this2.state.prefixUrl, "/user/wechat/users?accountId=").concat(id, "&keyWords=").concat(keyWords);
      (0, _request.requestGet)(url).then(function (res) {
        // console.log(res)
        var _newList = (0, _utils.resetChecked)(res.data, 'wxOpenId');

        var list = (0, _utils.setChecked)(_newList, _this2.state.selectedOtherList, 'wxOpenId'); // console.log(_newList)

        _this2.setState({
          weArray: list
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "weSearchAc", function (e) {
      _this2.setState({
        weSearchVal: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "weSearchUp", function (e) {
      if (e.keyCode == 13) {
        _this2.weGetData(_this2.state.weIndex, _this2.state.weSearchVal);
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "treeOnSelect", function (info) {
      var url = "".concat(_this2.state.prefixUrl, "//user/org/user?pageSize=40&pageNo=1&orgIds=['").concat(info, "']");
      (0, _request.requestGet)(url).then(function (response) {
        if (response.status === 1) {
          var _newList = (0, _utils.resetChecked)(response.data, 'userid');

          _this2.setState({
            orgShowList: _newList
          });
        }
      })["catch"](function (error) {
        throw new Error(error);
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "treeOnCheck", function (info, e) {
      // console.log(info,e)
      var typeCode = 2;
      var defaultLabel = _this2.state.defaultLabel;
      var selectedOtherList = _this2.state.selectedOtherList;

      var checkedNodes = _toConsumableArray(e.checkedNodes);

      var _list = _toConsumableArray(selectedOtherList);

      var newList = (0, _utils.deSelect)(_list, typeCode);
      var tempRes = checkedNodes.map(function (t, i) {
        return {
          key: info[i],
          type: defaultLabel,
          typeCode: typeCode,
          reciving: t.props.title.props.children[2].props.children,
          orgName: t.props.title.props.children[2].props.children,
          orgId: info[i]
        };
      });
      var res = newList.concat(tempRes); // console.log(res)

      _this2.setState({
        selectedOtherList: _toConsumableArray(res),
        selectedOtherCount: res.length,
        orgSelectedKeys: _toConsumableArray(info)
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "ExpandedTreeOnCheck", function (info, e) {
      // console.log(info,e)
      var defaultLabel = _this2.state.defaultLabel; // console.log(this.state.defaultLabel)

      var selectedOtherList = _this2.state.selectedOtherList;

      var checkedNodes = _toConsumableArray(e.checkedNodes);

      var _list = _toConsumableArray(selectedOtherList);

      var newList = (0, _utils.deSelectType)(_list, defaultLabel);
      var tempRes = checkedNodes.map(function (t, i) {
        // console.log(info[i])
        return {
          key: info[i],
          type: defaultLabel,
          reciving: t.props.title.props.children[2].props.children,
          orgName: t.props.title.props.children[2].props.children,
          orgId: info[i]
        };
      });
      var res = newList.concat(tempRes); // console.log(tempRes)

      _this2.setState({
        selectedOtherList: _toConsumableArray(res),
        selectedOtherCount: res.length
      });

      return;
    });

    _defineProperty(_assertThisInitialized(_this2), "roleSelect", function (e) {
      var _this = _assertThisInitialized(_this2);

      var url = "".concat(_this.state.prefixUrl, "/user/role/search?pageSize=").concat(_this2.props.pageSize, "&pageNo=").concat(e, "&keyword=");
      var selectedOtherList = _this2.state.selectedOtherList;
      (0, _request.requestGet)(url).then(function (response) {
        if (response.status === 1 && response.data !== null) {
          var obj = {
            activePage: e,
            items: response.data.totalPages,
            total: response.data.pageSize
          };
          var res = (0, _utils.resetChecked)(response.data.values, 'roleId');
          res = (0, _utils.setChecked)(response.data.values, selectedOtherList, 'roleId');

          _this2.setState({
            rolePage: obj,
            roleShowList: res
          });
        }
      })["catch"](function (err) {
        throw new Error(err);
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "staffSelect", function (e) {
      var _this = _assertThisInitialized(_this2);

      var url = "".concat(_this.state.prefixUrl, "/user/staff/search?pageSize=").concat(_this2.props.pageSize, "&pageNo=").concat(e, "&keyword=");
      (0, _request.requestGet)(url).then(function (response) {
        if (response.status === 1 && response.data !== null) {
          var obj = {
            activePage: e,
            items: response.data.totalPages,
            total: response.data.pageSize
          };
          var res = (0, _utils.resetChecked)(response.data.values, 'userid');
          res = (0, _utils.setChecked)(res, _this2.state.selectedUserData, 'userid');
          var completeRes = (0, _utils.addFullAttr)(res);

          _this2.setState({
            staffPage: obj,
            multiShowList: completeRes
          });
        }
      })["catch"](function (err) {
        throw new Error(err);
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "menuClick", function (_ref) {
      var key = _ref.key;
      // debugger
      var parsedKey = (0, _utils.decodeMenukey)(key);
      var selectedOtherList = _this2.state.selectedOtherList;

      var _list = _toConsumableArray(selectedOtherList);

      var filterList = [];

      _list.forEach(function (t) {
        if (t.typeCode === 3) {
          filterList.push(t.key);
        }
      });

      if (!filterList.includes(key)) {
        var menuItem = Object.assign({}, parsedKey, {
          key: key,
          type: _this2.state.defaultLabel,
          typeCode: 3,
          ruleCode: parsedKey.id,
          ruleName: parsedKey.name,
          reciving: parsedKey.name
        });

        _list.push(menuItem);

        _this2.setState({
          selectedOtherList: _toConsumableArray(_list),
          selectedOtherCount: _list.length
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "searchOrg", function (e) {
      var value = e.target.value;

      _this2.setState({
        orgInputValue: value
      }); // if (!value.trim()) {
      //   return
      // }


      var res = [];

      function deepTraversal(list, callback) {
        var stack = [];

        while (list) {
          callback(list);

          if (list.childs) {
            for (var i = list.childs.length - 1; i >= 0; i--) {
              stack.push(list.childs[i]);
            }
          }

          list = stack.pop();
        }
      }

      _this2.orgTreeList.forEach(function (t) {
        deepTraversal(t, function (node) {
          if (node.orgName.indexOf(value) > -1) {
            res.push(node.orgId);
          }
        });
      });

      _this2.setState({
        orgExpandedKeys: [].concat(res),
        autoExpandParent: true
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "searchOrgTree", function (e) {
      var value = e.target.value;

      _this2.setState({
        orgInputValue: value
      });

      if (!value.trim()) {
        return;
      }

      var res = [];

      function deepTraversal(list, callback) {
        var stack = [];

        while (list) {
          callback(list);

          if (list.childs) {
            for (var i = list.childs.length - 1; i >= 0; i--) {
              stack.push(list.childs[i]);
            }
          }

          list = stack.pop();
        }
      }

      _this2.state.exendTreeList.forEach(function (t) {
        deepTraversal(t, function (node) {
          if (node.orgName.indexOf(value) > -1) {
            res.push(node.orgId);
          }
        });
      }); // console.log(res)


      _this2.setState({
        orgTreeExpandedKeys: [].concat(res),
        autoTreeExpandParent: true
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "onExpand", function (keys) {
      // console.log(a,b,c)
      _this2.setState({
        orgExpandedKeys: _toConsumableArray(keys),
        autoExpandParent: false
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "onTreeExpand", function (keys) {
      // console.log(keys)
      _this2.setState({
        orgTreeExpandedKeys: _toConsumableArray(keys),
        autoTreeExpandParent: false
      });
    });

    _this2.orgTreeList = []; // 备份完整的组织树

    _this2.state = {
      locale: props.locale,
      show: false,
      filterIndex: '',
      // 根据首字母筛选用户
      selectedCount: 0,
      // 当前已选择的总数量
      selectedOtherCount: 0,
      //当前已选择的非用户数量
      selectedUserData: [],
      // 已选用户
      selectedOtherList: [],
      // 已选非用户List
      defaultLabel: i18n[props.locale].user,
      // 默认显示的标签页
      multiShowList: [],
      // 用户列表
      roleShowList: [],
      // 角色列表
      orgShowList: [],
      // 组织列表
      orgTreeList: [],
      // 组织🌲
      ruleMenuList: [],
      // 规则
      activeKey: '1',
      // 当前激活的tab
      prefixUrl: '',
      staffInputValue: '',
      roleInputValue: '',
      orgInputValue: '',
      staffPage: {
        activePage: 1,
        items: 1,
        total: 0
      },
      rolePage: {
        activePage: 1,
        // 当前第几页
        items: 1,
        // 总页数
        total: 0 // 总数

      },
      orgSelectedKeys: [],
      orgExpandedKeys: [],
      autoExpandParent: true,
      exendTreeList: [],
      orgTreeExpandedKeys: [],
      autoTreeExpandParent: true,
      weList: [],
      //公众号
      weListDB: [],
      weArray: [],
      //对应数据
      weIndex: '',
      weLeftVal: '',
      weSearchVal: ''
    };
    return _this2;
  }

  _createClass(Selector, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // let _newUserList = setUserReciving(nextProps.selectedUser)
      // let _newOtherList = setUserReciving(nextProps.selectedOther)
      // console.log('ssss',nextProps.tableData)
      // console.log('2222',_newUserList)
      var _newList = (0, _utils.resetChecked)(nextProps.tableData, 'roleId');

      var res = (0, _utils.setChecked)(_newList, this.state.selectedOtherList, 'roleId'); // console.log('vvvvv',res)
      // if(_newOtherList[0]. === ){
      // }

      this.setState({
        roleShowList: res,
        // locale: nextProps.locale,
        show: nextProps.show,
        exendTreeList: nextProps.treeConfig // selectedOtherList: _newOtherList,
        // selectedOtherCount: _newOtherList.length,
        // selectedUserData: _newUserList,
        // selectedCount: _newUserList.length

      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var mode = this.props.mode;

      switch (mode) {
        case 'dev':
          this.setState({
            prefixUrl: 'http://iuap-message-platform-web.test.app.yyuap.com/message-platform-web'
          });
          break;

        case 'daily':
          this.setState({
            prefixUrl: 'https://u8cmsg-daily.yyuap.com/message-platform-web'
          });
          break;

        case 'pre':
          this.setState({
            prefixUrl: 'https://msg-y3me-pre.diwork.com/message-platform-web'
          });
          break;

        case 'diwork':
          this.setState({
            prefixUrl: 'https://msg-y3me-daily.yyuap.com/message-platform-web'
          });
          break;

        case 'diwork-prod':
          this.setState({
            prefixUrl: 'https://message-yonsuite.diwork.com/message-platform-web'
          });
          break;

        default:
          this.setState({
            prefixUrl: 'https://u8cmsg-daily.yyuap.com/message-platform-web'
          });
          break;
      }
    } // 进入modal首先加载用户列表

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this = this;

      var _this$state = this.state,
          locale = _this$state.locale,
          weArray = _this$state.weArray,
          weList = _this$state.weList,
          weIndex = _this$state.weIndex,
          weLeftVal = _this$state.weLeftVal,
          weSearchVal = _this$state.weSearchVal;
      var _this$props = this.props,
          tabConfig = _this$props.tabConfig,
          isWechat = _this$props.isWechat;

      var loopData = function loopData(data) {
        return data.map(function (item) {
          var index = item.orgName.indexOf(_this.state.orgInputValue);
          var beforeName = item.orgName.substring(0, index);
          var afterName = item.orgName.substring(index + _this.state.orgInputValue.length, item.orgName.length);
          var title = index > -1 ? _react["default"].createElement("span", null, beforeName, _react["default"].createElement("span", {
            className: "u-tree-searchable-filter"
          }, _this.state.orgInputValue), _react["default"].createElement("span", {
            style: {
              display: 'none'
            }
          }, item.orgName), afterName) : _react["default"].createElement("span", null, _react["default"].createElement("span", null), _react["default"].createElement("span", null, item.orgName), _react["default"].createElement("span", {
            style: {
              display: 'none'
            }
          }, item.orgName));

          if (item.childs) {
            return _react["default"].createElement(TreeNode, {
              title: title,
              key: item.orgId,
              icon: item.parentId ? _react["default"].createElement(_tinper.Icon, {
                type: 'uf-users'
              }) : _react["default"].createElement(_tinper.Icon, {
                type: 'uf-group-2'
              })
            }, loopData(item.childs));
          }

          return _react["default"].createElement(TreeNode, {
            title: title,
            key: item.orgId,
            icon: _react["default"].createElement(_tinper.Icon, {
              type: 'uf-users'
            }),
            isLeaf: true
          });
        });
      };

      return _react["default"].createElement(_tinper.Modal, {
        onEntered: _this.didFinish,
        onHide: _this.close,
        show: _this.state.show,
        width: 1200,
        className: 'selectModalContainer',
        dialogClassName: 'selectDialog',
        backdrop: true
      }, _react["default"].createElement(_tinper.Modal.Header, {
        closeButton: true
      }, _react["default"].createElement("span", {
        className: 'headerTitle'
      }, i18n[locale].addMsgAcpt)), _react["default"].createElement(_tinper.Modal.Body, {
        className: 'selectModalBody'
      }, _react["default"].createElement("div", {
        className: 'selectContainer clearfix'
      }, _react["default"].createElement("div", {
        className: 'left',
        id: 'user'
      }, _react["default"].createElement(_tinper.Tabs, {
        defaultActiveKey: '1',
        activeKey: _this.state.activeKey,
        onChange: this.onChange,
        className: 'deptTitle'
      }, _react["default"].createElement(TabPane, {
        tab: i18n[locale].user,
        key: 1
      }, _react["default"].createElement("div", {
        className: 'searchWrapper'
      }, _react["default"].createElement("input", {
        value: _this.state.staffInputValue,
        onChange: _this.inputChange.bind(this, 'staffInputValue'),
        type: "text",
        onKeyUp: _this.search // placeholder={'请输入您要查找的用户'}
        ,
        placeholder: i18n[locale].pleaseUser,
        className: 'search'
      }), _react["default"].createElement(_tinper.Icon, {
        onClick: _this.clickSearch,
        className: 'searchIcon',
        type: "uf-search"
      })), _react["default"].createElement(MultiSelectTable, {
        scroll: {
          y: 210
        } // columns={multiColumns}
        ,
        columns: _colmuns.multiColumns[locale],
        multiSelect: _utils.multiSelectType,
        getSelectedDataFunc: _this.getUserList,
        data: _this.state.multiShowList,
        emptyText: function emptyText() {
          return _this.props.emptyText(i18n[locale].noData);
        }
      }), _react["default"].createElement(_tinper.Pagination, {
        className: 'selector_pagination',
        first: true,
        last: true,
        prev: true,
        next: true,
        locale: _colmuns.pageLocale[this.props.locale],
        maxButtons: 5,
        boundaryLinks: true,
        total: _this.state.staffPage.total,
        activePage: _this.state.staffPage.activePage,
        items: _this.state.staffPage.items,
        onSelect: _this.staffSelect
      })), _react["default"].createElement(TabPane, {
        tab: i18n[locale].role,
        key: 2
      }, _react["default"].createElement("div", {
        className: 'searchWrapper'
      }, _react["default"].createElement("input", {
        value: _this.state.roleInputValue,
        onChange: _this.inputChange.bind(this, 'roleInputValue'),
        type: "text",
        placeholder: i18n[locale].pleaseRole,
        onKeyUp: _this.search,
        className: 'search'
      }), _react["default"].createElement(_tinper.Icon, {
        onClick: _this.clickSearch,
        className: 'searchIcon',
        type: "uf-search"
      })), _react["default"].createElement(MultiSelectTable, {
        id: 'role',
        scroll: {
          y: 210
        },
        columns: _colmuns.roleMultiCol[locale],
        multiSelect: _utils.multiSelectType,
        getSelectedDataFunc: _this.getRoleList,
        data: _this.state.roleShowList,
        emptyText: function emptyText() {
          return _this.props.emptyText(i18n[locale].noData);
        }
      }), _react["default"].createElement(_tinper.Pagination, {
        className: 'selector_pagination',
        first: true,
        last: true,
        prev: true,
        next: true,
        locale: _colmuns.pageLocale[this.props.locale],
        maxButtons: 5,
        boundaryLinks: true,
        total: _this.state.rolePage.total,
        activePage: _this.state.rolePage.activePage,
        items: _this.state.rolePage.items,
        onSelect: _this.roleSelect
      })), _react["default"].createElement(TabPane, {
        tab: i18n[locale].org,
        key: 3
      }, _react["default"].createElement("div", {
        className: 'searchWrapper'
      }, _react["default"].createElement("input", {
        onChange: _this.searchOrg // placeholder={'请输入您要查找的组织'}
        ,
        placeholder: i18n[locale].pleaseOrg,
        className: 'search'
      }), _react["default"].createElement(_tinper.Icon, {
        onClick: _this.clickSearch,
        className: 'searchIcon',
        type: "uf-search"
      })), _react["default"].createElement("div", {
        className: 'clearfix'
      }, _react["default"].createElement("div", {
        className: 'myTree'
      }, _react["default"].createElement(_tinper.Tree, {
        showIcon: true,
        cancelUnSelect: true,
        checkedKeys: _this.state.orgSelectedKeys,
        checkable: true,
        checkStrictly: true,
        onExpand: _this.onExpand,
        autoExpandParent: _this.state.autoExpandParent,
        expandedKeys: _this.state.orgExpandedKeys,
        onSelect: _this.treeOnSelect,
        onCheck: _this.treeOnCheck
      }, loopData(_this.state.orgTreeList))), _react["default"].createElement("div", {
        className: 'orgTable'
      }, _react["default"].createElement(_tinper.Table, {
        scroll: {
          y: 440
        },
        columns: _colmuns.orgCol[locale],
        data: _this.state.orgShowList,
        emptyText: function emptyText() {
          return _this.props.emptyText(i18n[locale].noData);
        }
      })))), _react["default"].createElement(TabPane, {
        tab: i18n[locale].rule,
        key: 4
      }, _react["default"].createElement("div", {
        className: 'searchWrapper'
      }, _react["default"].createElement("input", {
        // placeholder={'请输入您要查找的规则'}
        placeholder: i18n[locale].pleaseRule,
        className: 'search'
      }), _react["default"].createElement(_tinper.Icon, {
        className: 'searchIcon',
        type: "uf-search"
      })), _react["default"].createElement("div", {
        className: 'menuWrapper'
      }, _react["default"].createElement(_tinper.Menu, {
        mode: 'inline',
        onClick: _this.menuClick
      }, _this.state.ruleMenuList))), isWechat ? _react["default"].createElement(TabPane, {
        tab: i18n[locale].wechat,
        key: 0
      }, _react["default"].createElement("div", {
        className: 'we-box'
      }, _react["default"].createElement("div", {
        className: 'we-left'
      }, _react["default"].createElement("div", {
        className: 'we-searchWrapper'
      }, _react["default"].createElement("input", {
        value: weLeftVal,
        onChange: this.weLeftSearch,
        type: "text",
        className: 'search-sm'
      }), _react["default"].createElement(_tinper.Icon, {
        onClick: _this.weLeftSearch,
        className: 'searchIcon-sm',
        type: "uf-search"
      })), _react["default"].createElement("ul", {
        className: 'we-list'
      }, weList.map(function (item) {
        return _react["default"].createElement("li", null, _react["default"].createElement("span", {
          className: weIndex === item.accountId ? 'we-click' : '',
          onClick: function onClick() {
            return _this3.weIndexChange(item.accountId);
          }
        }, item.accountName));
      }))), _react["default"].createElement("div", {
        className: 'we-r'
      }, _react["default"].createElement("div", {
        className: 'we-searchWrapper'
      }, _react["default"].createElement("input", {
        type: "text",
        value: weSearchVal,
        onChange: this.weSearchAc,
        onKeyUp: this.weSearchUp,
        className: 'search'
      }), _react["default"].createElement(_tinper.Icon, {
        onClick: function onClick() {
          return _this3.weGetData(weIndex, weSearchVal);
        },
        className: 'searchIcon',
        type: "uf-search"
      })), _react["default"].createElement("div", null, _react["default"].createElement(MultiSelectTable, {
        id: 'wechat',
        className: 'wechaTable',
        scroll: {
          y: 210
        },
        columns: _colmuns.wechatMultiCol[locale],
        multiSelect: _utils.multiSelectType,
        getSelectedDataFunc: _this.getWeList,
        data: _this.state.weArray,
        emptyText: function emptyText() {
          return _this.props.emptyText(i18n[locale].noData);
        }
      }))))) : null, tabConfig.map(function (item, index) {
        if (item.tabType === 'table') {
          return _react["default"].createElement(TabPane, {
            id: item.tabMark,
            tab: _react["default"].createElement("div", {
              style: {
                height: '100%'
              },
              onClick: function onClick(e) {
                _this3.props.tabHandleFunc(item.tabMark, index, e);

                _this3.tabHandleChange(item.tabName);
              }
            }, item.tabName),
            key: index + 5
          }, _react["default"].createElement("div", {
            className: 'searchWrapper'
          }, _react["default"].createElement("input", {
            value: _this.state["extends"],
            onChange: _this.inputChange.bind(_this3, 'extends'),
            type: "text",
            onKeyUp: function onKeyUp(e) {
              return item.tableConfig.enterSearchFunc(item.tabMark, e);
            },
            placeholder: item.tableConfig.searchPlaceholder,
            className: 'search'
          }), _react["default"].createElement(_tinper.Icon, {
            onClick: function onClick(e) {
              return item.tableConfig.clickSearchFunc(item.tabMark, e);
            },
            className: 'searchIcon',
            type: "uf-search"
          })), _react["default"].createElement(MultiSelectTable, {
            scroll: {
              y: 210
            } // columns={multiColumns}
            ,
            columns: item.tableConfig.tableColumns,
            multiSelect: _utils.multiSelectType,
            getSelectedDataFunc: _this.getExtend,
            data: _this.state.roleShowList,
            emptyText: function emptyText() {
              return _this.props.emptyText(i18n[locale].noData);
            }
          }), _react["default"].createElement(_tinper.Pagination, {
            className: 'selector_pagination',
            first: true,
            last: true,
            prev: true,
            next: true,
            locale: _colmuns.pageLocale[_this3.props.locale],
            maxButtons: 5,
            boundaryLinks: true,
            total: _this.props.pageTotal,
            activePage: _this.state.extendPageIndex,
            items: _this.props.pageItems,
            onSelect: function onSelect(index) {
              return _this3.extendPageSelect(item.tabMark, index);
            }
          }));
        }

        if (item.tabType === 'tree') {
          var _React$createElement;

          return _react["default"].createElement(TabPane, (_React$createElement = {
            tab: item.tabName // @ts-ignore

          }, _defineProperty(_React$createElement, "tab", _react["default"].createElement("div", {
            style: {
              height: '100%'
            },
            onClick: function onClick(e) {
              _this3.props.tabHandleFunc(item.tabMark, index, e);

              _this3.tabHandleChange(item.tabName);
            }
          }, item.tabName)), _defineProperty(_React$createElement, "key", index + 5), _React$createElement), _react["default"].createElement("div", {
            className: 'searchWrapper'
          }, _react["default"].createElement("input", {
            onChange: _this.searchOrgTree // placeholder={'请输入您要查找的组织'}
            ,
            placeholder: i18n[locale].pleaseOrg,
            className: 'search'
          }), _react["default"].createElement(_tinper.Icon, {
            onClick: _this.clickSearch,
            className: 'searchIcon',
            type: "uf-search"
          })), _react["default"].createElement("div", {
            className: 'clearfix'
          }, _react["default"].createElement("div", {
            className: 'myTree'
          }, _react["default"].createElement(_tinper.Tree, {
            showIcon: true,
            cancelUnSelect: true,
            checkedKeys: _this.state.selectedOtherList.map(function (val) {
              if (val.type === item.tabName) {
                return val.orgId;
              }
            }),
            checkable: true,
            checkStrictly: true,
            onExpand: _this.onTreeExpand,
            autoExpandParent: _this.state.autoTreeExpandParent,
            expandedKeys: _this.state.orgTreeExpandedKeys // onSelect={_this.treeOnSelect}
            ,
            onCheck: _this.ExpandedTreeOnCheck
          }, loopData(_this.state.exendTreeList)))));
        }
      }))), _react["default"].createElement("div", {
        className: 'right'
      }, _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "selectedUser clearfix"
      }, _react["default"].createElement("p", {
        className: 'fll mt12'
      }, i18n[locale].user), _react["default"].createElement("p", {
        className: 'flr mt12'
      }, _react["default"].createElement("span", {
        className: 'color-selected'
      }, i18n[locale].choose, "\uFF1A", _this.state.selectedUserData.length), _react["default"].createElement("span", {
        className: 'clear',
        onClick: _this.deSelectAll.bind(this, 1)
      }, i18n[locale].clean))), _react["default"].createElement(_tinper.Table, {
        scroll: {
          y: 130
        },
        columns: _colmuns.selectedUserCol[locale],
        data: _this.state.selectedUserData,
        hoverContent: _this.hoverDelIcon,
        onRowHover: _this.onRowHover,
        emptyText: function emptyText() {
          return _this.props.emptyText(i18n[locale].noData);
        }
      })), _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "selectedUser clearfix"
      }, _react["default"].createElement("p", {
        className: 'fll mt12'
      }, i18n[locale].other), _react["default"].createElement("p", {
        className: 'flr mt12'
      }, _react["default"].createElement("span", {
        className: 'color-selected'
      }, i18n[locale].choose, "\uFF1A", _this.state.selectedOtherList.length), _react["default"].createElement("span", {
        className: 'clear',
        onClick: _this.deSelectAll.bind(this, 0)
      }, i18n[locale].clean))), _react["default"].createElement(_tinper.Table, {
        scroll: {
          y: 130
        },
        columns: _colmuns.selectedUserCol[locale],
        data: _this.state.selectedOtherList,
        hoverContent: _this.hoverDelOtherIcon,
        onRowHover: _this.onRowOtherHover,
        emptyText: function emptyText() {
          return _this.props.emptyText(i18n[locale].noData);
        }
      }))))), _react["default"].createElement(_tinper.Modal.Footer, null, _react["default"].createElement(_tinper.Button, {
        onClick: _this.close,
        className: 'cancelBtn'
      }, i18n[locale].cacel), _react["default"].createElement(_tinper.Button, {
        onClick: _this.confirm,
        colors: 'primary'
      }, i18n[locale].accept)));
    }
  }]);

  return Selector;
}(_react["default"].Component);

Selector.defaultProps = defaultProps;
Selector.propTypes = propTypes;
var _default = Selector;
exports["default"] = _default;