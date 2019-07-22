'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tinperBee = require('tinper-bee');

var _beeTable = require('bee-table');

var _beeTable2 = _interopRequireDefault(_beeTable);

var _multiSelect = require('tinper-bee/lib/multiSelect');

var _multiSelect2 = _interopRequireDefault(_multiSelect);

var _colmuns = require('./colmuns');

var _request = require('./request');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var MultiSelectTable = (0, _multiSelect2["default"])(_beeTable2["default"], _tinperBee.Checkbox);

var TabPane = _tinperBee.Tabs.TabPane;

var TreeNode = _tinperBee.Tree.TreeNode;

var noop = function noop() {};

var propTypes = {
  show: _propTypes2["default"].bool.isRequired,
  onConfirm: _propTypes2["default"].func.isRequired,
  onClose: _propTypes2["default"].func.isRequired,
  mode: _propTypes2["default"].string,
  selectedUser: _propTypes2["default"].array,
  selectedOther: _propTypes2["default"].array,
  documentNo: _propTypes2["default"].string,
  documentName: _propTypes2["default"].string,
  ruleList: _propTypes2["default"].array
};

var defaultProps = {
  show: false,
  onConfirm: noop,
  onClose: noop,
  selectedUser: [],
  selectedOther: [],
  mode: 'daily',
  documentNo: '',
  documentName: ''
};

var Selector = function (_React$Component) {
  _inherits(Selector, _React$Component);

  function Selector() {
    _classCallCheck(this, Selector);

    var _this2 = _possibleConstructorReturn(this, _React$Component.call(this));

    _this2.didFinish = function () {
      var _this2$props = _this2.props,
          selectedUser = _this2$props.selectedUser,
          selectedOther = _this2$props.selectedOther;

      _this2.setState({
        selectedUserData: (0, _utils.setUserReciving)(selectedUser),
        selectedOtherList: (0, _utils.setOtherReciving)(selectedOther)
      });
      var url = _this2.state.prefixUrl + '/user/staff/search?pageSize=40&pageNo=1&keyword=';
      (0, _request.requestGet)(url).then(function (response) {
        if (response.status === 1 && response.data !== null) {
          var _selectedUser = _this2.props.selectedUser;

          var _newList = (0, _utils.resetChecked)(response.data.values, 'userid');
          var res = (0, _utils.setChecked)(_newList, _selectedUser, 'userid');
          var completeRes = (0, _utils.addFullAttr)(res);
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
    };

    _this2.search = function (e) {
      var activeKey = _this2.state.activeKey,
          _this = _this2;

      var url = '';
      if (activeKey === '1') {
        url = _this.state.prefixUrl + '/user/staff/search?pageSize=40&pageNo=1&keyword=' + e.target.value;
      } else if (activeKey === '2') {
        url = _this.state.prefixUrl + '/user/role/search?pageSize=40&pageNo=1&keyword=' + e.target.value;
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
                staffPage: _extends({}, {
                  activePage: 1,
                  items: 1,
                  total: 0
                }),
                multiShowList: []
              });
            } else if (activeKey === '2') {
              _this2.setState({
                rolePage: _extends({}, {
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
    };

    _this2.clickSearch = function () {
      var _this = _this2;
      var searchUrl = void 0;
      var _this2$state = _this2.state,
          activeKey = _this2$state.activeKey,
          staffInputValue = _this2$state.staffInputValue,
          roleInputValue = _this2$state.roleInputValue;

      if (activeKey === '1') {
        searchUrl = _this.state.prefixUrl + '/user/staff/search?pageSize=40&pageNo=1&keyword=' + staffInputValue;
      } else {
        searchUrl = _this.state.prefixUrl + '/user/role/search?pageSize=40&pageNo=1&keyword=' + roleInputValue;
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
    };

    _this2.inputChange = function (type, e) {
      _this2.setState(_defineProperty({}, type, e.target.value));
    };

    _this2.hoverDelIcon = function () {
      return _react2["default"].createElement(_tinperBee.Icon, { onClick: _this2.delUser, className: 'deleteIcon', type: 'uf-close' });
    };

    _this2.hoverDelOtherIcon = function () {
      return _react2["default"].createElement(_tinperBee.Icon, { onClick: _this2.delOther, className: 'deleteIcon', type: 'uf-close' });
    };

    _this2.delOther = function () {
      var _this2$state2 = _this2.state,
          roleShowList = _this2$state2.roleShowList,
          selectedOtherList = _this2$state2.selectedOtherList;

      var _list = [].concat(_toConsumableArray(roleShowList));
      if (selectedOtherList[_this2.delOtherIndex].typeCode === 1) {
        _list = _list.map(function (t) {
          if (t.roleId === selectedOtherList[_this2.delOtherIndex].roleId) {
            t._checked = false;
            return t;
          }
          return t;
        });
      }
      var res = [].concat(_toConsumableArray(selectedOtherList));
      res.splice(_this2.delOtherIndex, 1);
      _this2.setState({
        selectedOtherList: [].concat(_toConsumableArray(res)),
        selectedOtherCount: res.length,
        roleShowList: [].concat(_toConsumableArray(_list))
      });
    };

    _this2.delUser = function () {
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
        selectedUserData: [].concat(_toConsumableArray(selectedUserData)),
        selectedCount: selectedUserData.length
      });
    };

    _this2.onRowHover = function (index) {
      _this2.delIndex = index;
    };

    _this2.onRowOtherHover = function (index) {
      _this2.delOtherIndex = index;
    };

    _this2.getUserList = function (data, record) {
      var typeCode = 0;
      var _this2$state4 = _this2.state,
          defaultLabel = _this2$state4.defaultLabel,
          multiShowList = _this2$state4.multiShowList,
          selectedUserData = _this2$state4.selectedUserData;

      var delList = (0, _utils.getUserId)(data);
      var _list = [].concat(_toConsumableArray(selectedUserData));
      var res = (0, _utils.resetChecked)(multiShowList, 'userid');
      res = (0, _utils.setChecked)(multiShowList, data, 'userid');
      if (record === undefined) {
        if (data.length) {
          var useridList = (0, _utils.getUserId)(_list);
          data.forEach(function (t) {
            if (!useridList.includes(t.userid)) {
              _list.push(_extends({}, t, {
                type: defaultLabel,
                typeCode: typeCode,
                key: t.userid,
                reciving: t.username + '(' + t.orgName + ')'
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
        var currItem = _extends({}, record, {
          type: defaultLabel,
          typeCode: typeCode,
          key: record.userid,
          reciving: record.orgName ? record.username + '(' + record.orgName + ')' : record.username + '(\u672A\u77E5\u90E8\u95E8)'
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
        multiShowList: [].concat(_toConsumableArray(res)),
        selectedUserData: [].concat(_toConsumableArray(_list)),
        selectedCount: _list.length
      });
    };

    _this2.getRoleList = function (data, record) {
      var typeCode = 1;
      var _this2$state5 = _this2.state,
          roleShowList = _this2$state5.roleShowList,
          defaultLabel = _this2$state5.defaultLabel,
          selectedOtherList = _this2$state5.selectedOtherList;

      var _list = [].concat(_toConsumableArray(selectedOtherList));
      var tempList = [].concat(_toConsumableArray(roleShowList));
      var delList = (0, _utils.getRoleId)(data);
      tempList = (0, _utils.resetChecked)(tempList, 'roleId');
      tempList = (0, _utils.setChecked)(tempList, data, 'roleId');
      if (record === undefined) {
        if (data.length) {
          var roleIdList = (0, _utils.getRoleId)(_list);
          data.forEach(function (t) {
            if (!roleIdList.includes(t.roleId)) {
              _list.push(_extends({}, t, {
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
        var currItem = _extends({}, record, {
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
        selectedOtherList: [].concat(_toConsumableArray(_list)),
        roleShowList: [].concat(_toConsumableArray(tempList)),
        selectedOtherCount: _list.length
      });
    };

    _this2.uniqueByAttr = function (arr, type) {
      var res = new Map();
      return arr.filter(function (item) {
        if (item[type] !== 'undefined') {
          return !res.has(item[type]) && res.set(item[type], 1);
        }
      });
    };

    _this2.deSelectAll = function (code, e) {
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
        var roleShowList = _this2.state.roleShowList;
        // 清空左侧已勾选项

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
    };

    _this2.reset = function () {
      _this2.setState({
        activeKey: '1',
        multiShowList: [],
        roleShowList: [],
        selectedUserData: [],
        selectedOtherList: [],
        selectedCount: 0,
        selectedOtherCount: 0,
        staffInputValue: '',
        roleInputValue: '',
        orgSelectedKeys: [],
        defaultLabel: '用户'
      });
    };

    _this2.close = function () {
      // 清空上一次用户状态
      _this2.reset();
      _this2.props.onClose();
    };

    _this2.confirm = function () {
      var _this2$state6 = _this2.state,
          selectedUserData = _this2$state6.selectedUserData,
          selectedOtherList = _this2$state6.selectedOtherList;

      var userList = (0, _utils.mapUserList)(selectedUserData);
      var otherList = (0, _utils.mapOtherList)(selectedOtherList);
      _this2.reset();
      console.log(userList, otherList);
      _this2.props.onConfirm(userList, otherList);
    };

    _this2.onChange = function (activeKey) {
      var _this = _this2;
      _this2.setState({
        activeKey: activeKey,
        defaultLabel: (0, _utils.setLabel)(activeKey)
      });
      if (activeKey === '2') {
        var url = _this.state.prefixUrl + '/user/role/search?pageSize=40&pageNo=1&keyword=';
        var roleShowList = _this2.state.roleShowList;

        if (!roleShowList.length) {
          (0, _request.requestGet)(url).then(function (response) {
            if (response.status === 1 && response.data !== null) {
              var selectedOther = _this2.props.selectedOther;

              var _page = {
                activePage: response.data.currentPage,
                items: response.data.totalPages,
                total: response.data.pageSize
              };
              _this2.setState({
                rolePage: _page
              });
              var _newList = (0, _utils.resetChecked)(response.data.values, 'roleId');
              var res = (0, _utils.setChecked)(_newList, selectedOther, 'roleId');
              _this2.setState({
                roleShowList: res
              });
            }
          })["catch"](function (error) {
            throw new Error(error);
          });
        }
      } else if (activeKey === '3') {
        var selectedOtherList = _this2.state.selectedOtherList;

        var _url = _this.state.prefixUrl + '/user/org/list?pageSize=40&pageNo=1&orgIds=';
        (0, _request.requestGet)(_url).then(function (response) {
          if (response.status === 1) {
            _this2.setState({
              orgTreeList: response.data
            });
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
          var _url2 = _this.state.prefixUrl + '/user/rules?documentNo=' + _this2.props.documentNo + '&documentName=' + _this2.props.documentName;
          (0, _request.requestGet)(_url2).then(function (response) {
            if (response.status === 1) {
              var menuList = [{
                id: 'root-0',
                name: _this2.props.documentName,
                attrs: [].concat(_toConsumableArray(response.data.data))
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
    };

    _this2.treeOnSelect = function (info) {
      var url = _this2.state.prefixUrl + '//user/org/user?pageSize=40&pageNo=1&orgIds=[\'' + info + '\']';
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
    };

    _this2.treeOnCheck = function (info, e) {
      var typeCode = 2;
      var defaultLabel = _this2.state.defaultLabel;
      var selectedOtherList = _this2.state.selectedOtherList;

      var checkedNodes = [].concat(_toConsumableArray(e.checkedNodes));
      var _list = [].concat(_toConsumableArray(selectedOtherList));
      var newList = (0, _utils.deSelect)(_list, typeCode);
      var tempRes = checkedNodes.map(function (t, i) {
        return {
          key: info[i],
          type: defaultLabel,
          typeCode: typeCode,
          reciving: t.props.title,
          orgName: t.props.title,
          orgId: info[i]
        };
      });
      var res = newList.concat(tempRes);
      _this2.setState({
        selectedOtherList: [].concat(_toConsumableArray(res)),
        selectedOtherCount: res.length,
        orgSelectedKeys: [].concat(_toConsumableArray(info))
      });
    };

    _this2.roleSelect = function (e) {
      var _this = _this2;
      var url = _this.state.prefixUrl + '/user/role/search?pageSize=40&pageNo=' + e + '&keyword=';
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
    };

    _this2.staffSelect = function (e) {
      var _this = _this2;
      var url = _this.state.prefixUrl + '/user/staff/search?pageSize=40&pageNo=' + e + '&keyword=';
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
    };

    _this2.menuClick = function (_ref) {
      var key = _ref.key;
      var selectedOtherList = _this2.state.selectedOtherList;

      var _list = [].concat(_toConsumableArray(selectedOtherList));
      var ruleName = key.substring(key.indexOf('&') + 1);
      var ruleCode = key.substring(0, key.indexOf('&'));
      // const uri = key.substring(key.indexOf('^') + 1)
      var filterList = [];
      _list.forEach(function (t) {
        if (t.typeCode === 3) {
          filterList.push(t.key);
        }
      });
      if (filterList.includes(key)) {
        return;
      } else {
        var menuItem = {
          key: key,
          type: _this2.state.defaultLabel,
          typeCode: 3,
          ruleCode: ruleCode,
          ruleName: ruleName,
          reciving: ruleName
        };
        _list.push(menuItem);
        _this2.setState({
          selectedOtherList: [].concat(_toConsumableArray(_list)),
          selectedOtherCount: _list.length
        });
      }
    };

    _this2.state = {
      show: false,
      filterIndex: '', // 根据首字母筛选用户
      selectedCount: 0, // 当前已选择的总数量
      selectedOtherCount: 0, //当前已选择的非用户数量
      selectedUserData: [], // 已选用户
      selectedOtherList: [], // 已选非用户List
      defaultLabel: '用户', // 默认显示的标签页
      multiShowList: [], // 用户列表
      roleShowList: [], // 角色列表
      orgShowList: [], // 组织列表
      orgTreeList: [], // 组织🌲
      ruleMenuList: [], // 规则
      activeKey: '1', // 当前激活的tab
      prefixUrl: '',
      staffInputValue: '',
      roleInputValue: '',
      staffPage: {
        activePage: 1,
        items: 1,
        total: 0
      },
      rolePage: {
        activePage: 1, // 当前第几页
        items: 1, // 总页数
        total: 0 // 总数
      },
      orgSelectedKeys: []
    };
    return _this2;
  }

  Selector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _newUserList = (0, _utils.setUserReciving)(nextProps.selectedUser);
    var _newOtherList = (0, _utils.setUserReciving)(nextProps.selectedOther);
    this.setState({
      show: nextProps.show,
      selectedOtherList: _newOtherList,
      selectedOtherCount: _newOtherList.length,
      selectedUserData: _newUserList,
      selectedCount: _newUserList.length
    });
  };

  Selector.prototype.componentDidMount = function componentDidMount() {
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
      default:
        this.setState({
          prefixUrl: 'https://u8cmsg-daily.yyuap.com/message-platform-web'
        });
        break;
    }
  };

  // 进入modal首先加载用户列表

  // 搜索

  // 动态渲染删除图标

  // 删除某一项

  // 获得选择的用户列表

  // 获取角色列表

  // 数组根据属性去重

  // 清空选择人

  // 重置state

  // 关闭模态框

  /**
   * @description 确认选人
   */

  //

  // tree select

  // tree check

  // 角色分页

  // 用户分页


  Selector.prototype.render = function render() {
    var _this = this;
    var loopData = function loopData(data) {
      return data.map(function (item) {
        if (item.childs) {
          return _react2["default"].createElement(
            TreeNode,
            { title: item.orgName, key: item.orgId, icon: item.parentId ? _react2["default"].createElement(_tinperBee.Icon, { type: 'uf-users' }) : _react2["default"].createElement(_tinperBee.Icon, { type: 'uf-group-2' }) },
            loopData(item.childs)
          );
        }
        return _react2["default"].createElement(TreeNode, { title: item.orgName, key: item.orgId, icon: _react2["default"].createElement(_tinperBee.Icon, { type: 'uf-users' }), isLeaf: true });
      });
    };
    return _react2["default"].createElement(
      _tinperBee.Modal,
      {
        onEntered: _this.didFinish,
        onHide: _this.close,
        show: _this.state.show,
        width: 1200,
        className: 'selectModalContainer',
        dialogClassName: 'selectDialog',
        backdrop: true
      },
      _react2["default"].createElement(
        _tinperBee.Modal.Header,
        {
          closeButton: true
        },
        _react2["default"].createElement(
          'span',
          { className: 'headerTitle' },
          '\u6DFB\u52A0\u6D88\u606F\u63A5\u6536\u4EBA'
        )
      ),
      _react2["default"].createElement(
        _tinperBee.Modal.Body,
        {
          className: 'selectModalBody'
        },
        _react2["default"].createElement(
          'div',
          { className: 'selectContainer clearfix' },
          _react2["default"].createElement(
            'div',
            { className: 'left', id: 'user' },
            _react2["default"].createElement(
              _tinperBee.Tabs,
              {
                defaultActiveKey: "1",
                activeKey: _this.state.activeKey,
                onChange: this.onChange,
                className: 'deptTitle'
              },
              _react2["default"].createElement(
                TabPane,
                {
                  tab: '用户',
                  key: 1
                },
                _react2["default"].createElement(
                  'div',
                  { className: 'searchWrapper' },
                  _react2["default"].createElement('input', { value: _this.state.staffInputValue, onChange: _this.inputChange.bind(this, 'staffInputValue'), type: 'text', onKeyUp: _this.search, placeholder: '请输入您要查找的用户', className: 'search' }),
                  _react2["default"].createElement(_tinperBee.Icon, { onClick: _this.clickSearch, className: 'searchIcon', type: 'uf-search' })
                ),
                _react2["default"].createElement(MultiSelectTable, {
                  scroll: { y: 360 },
                  columns: _colmuns.multiColumns,
                  multiSelect: _utils.multiSelectType,
                  getSelectedDataFunc: _this.getUserList,
                  data: _this.state.multiShowList
                }),
                _react2["default"].createElement(_tinperBee.Pagination, {
                  className: 'selector_pagination',
                  first: true,
                  last: true,
                  prev: true,
                  next: true,
                  maxButtons: 5,
                  boundaryLinks: true,
                  total: _this.state.staffPage.total,
                  activePage: _this.state.staffPage.activePage,
                  items: _this.state.staffPage.items,
                  onSelect: _this.staffSelect
                })
              ),
              _react2["default"].createElement(
                TabPane,
                { tab: '角色', key: 2 },
                _react2["default"].createElement(
                  'div',
                  { className: 'searchWrapper' },
                  _react2["default"].createElement('input', { value: _this.state.roleInputValue, onChange: _this.inputChange.bind(this, 'roleInputValue'), type: 'text', placeholder: '请输入您要查找的角色', onKeyUp: _this.search, className: 'search' }),
                  _react2["default"].createElement(_tinperBee.Icon, { onClick: _this.clickSearch, className: 'searchIcon', type: 'uf-search' })
                ),
                _react2["default"].createElement(MultiSelectTable, {
                  id: 'role',
                  scroll: { y: 360 },
                  columns: _colmuns.roleMultiCol,
                  multiSelect: _utils.multiSelectType,
                  getSelectedDataFunc: _this.getRoleList,
                  data: _this.state.roleShowList
                }),
                _react2["default"].createElement(_tinperBee.Pagination, {
                  className: 'selector_pagination',
                  first: true,
                  last: true,
                  prev: true,
                  next: true,
                  maxButtons: 5,
                  boundaryLinks: true,
                  total: _this.state.rolePage.total,
                  activePage: _this.state.rolePage.activePage,
                  items: _this.state.rolePage.items,
                  onSelect: _this.roleSelect
                })
              ),
              _react2["default"].createElement(
                TabPane,
                { tab: '组织', key: 3 },
                _react2["default"].createElement(
                  'div',
                  { className: 'searchWrapper' },
                  _react2["default"].createElement('input', { placeholder: '请输入您要查找的组织', className: 'search' }),
                  _react2["default"].createElement(_tinperBee.Icon, { onClick: _this.clickSearch, className: 'searchIcon', type: 'uf-search' })
                ),
                _react2["default"].createElement(
                  'div',
                  { className: 'clearfix' },
                  _react2["default"].createElement(
                    'div',
                    { className: 'myTree' },
                    _react2["default"].createElement(
                      _tinperBee.Tree,
                      {
                        showIcon: true,
                        cancelUnSelect: true,
                        checkedKeys: _this.state.orgSelectedKeys,
                        checkable: true,
                        onSelect: _this.treeOnSelect,
                        onCheck: _this.treeOnCheck
                      },
                      loopData(_this.state.orgTreeList)
                    )
                  ),
                  _react2["default"].createElement(
                    'div',
                    { className: 'orgTable' },
                    _react2["default"].createElement(_beeTable2["default"], {
                      scroll: { y: 440 },
                      columns: _colmuns.orgCol,
                      data: _this.state.orgShowList
                    })
                  )
                )
              ),
              _react2["default"].createElement(
                TabPane,
                { tab: '规则', key: 4 },
                _react2["default"].createElement(
                  'div',
                  { className: 'searchWrapper' },
                  _react2["default"].createElement('input', { placeholder: '请输入您要查找的规则', className: 'search' }),
                  _react2["default"].createElement(_tinperBee.Icon, { className: 'searchIcon', type: 'uf-search' })
                ),
                _react2["default"].createElement(
                  'div',
                  { className: 'menuWrapper' },
                  _react2["default"].createElement(
                    _tinperBee.Menu,
                    {
                      mode: 'inline',
                      onClick: _this.menuClick
                    },
                    _this.state.ruleMenuList
                  )
                )
              )
            )
          ),
          _react2["default"].createElement(
            'div',
            { className: 'right' },
            _react2["default"].createElement(
              'div',
              null,
              _react2["default"].createElement(
                'div',
                { className: 'selectedUser clearfix' },
                _react2["default"].createElement(
                  'p',
                  { className: 'fll mt12' },
                  '\u7528\u6237'
                ),
                _react2["default"].createElement(
                  'p',
                  { className: 'flr mt12' },
                  '\u5DF2\u9009\uFF1A',
                  _this.state.selectedCount,
                  _react2["default"].createElement(
                    'span',
                    { onClick: _this.deSelectAll.bind(this, 1) },
                    '\u6E05\u7A7A'
                  )
                )
              ),
              _react2["default"].createElement(_beeTable2["default"], {
                scroll: { y: 200 },
                columns: _colmuns.selectedUserCol,
                data: _this.state.selectedUserData,
                hoverContent: _this.hoverDelIcon,
                onRowHover: _this.onRowHover
              })
            ),
            _react2["default"].createElement(
              'div',
              null,
              _react2["default"].createElement(
                'div',
                { className: 'selectedUser clearfix' },
                _react2["default"].createElement(
                  'p',
                  { className: 'fll mt12' },
                  '\u5176\u4ED6'
                ),
                _react2["default"].createElement(
                  'p',
                  { className: 'flr mt12' },
                  '\u5DF2\u9009\uFF1A',
                  _this.state.selectedOtherCount,
                  _react2["default"].createElement(
                    'span',
                    { onClick: _this.deSelectAll.bind(this, 0) },
                    '\u6E05\u7A7A'
                  )
                )
              ),
              _react2["default"].createElement(_beeTable2["default"], {
                scroll: { y: 200 },
                columns: _colmuns.selectedUserCol,
                data: _this.state.selectedOtherList,
                hoverContent: _this.hoverDelOtherIcon,
                onRowHover: _this.onRowOtherHover
              })
            )
          )
        )
      ),
      _react2["default"].createElement(
        _tinperBee.Modal.Footer,
        null,
        _react2["default"].createElement(
          _tinperBee.Button,
          { onClick: _this.close, className: 'cancelBtn' },
          '\u53D6\u6D88'
        ),
        _react2["default"].createElement(
          _tinperBee.Button,
          { onClick: _this.confirm, colors: 'primary' },
          '\u786E\u5B9A'
        )
      )
    );
  };

  return Selector;
}(_react2["default"].Component);

Selector.defaultProps = defaultProps;
Selector.propTypes = propTypes;

exports["default"] = Selector;
module.exports = exports['default'];