'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

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
  remoteUserUrl: _propTypes2["default"].string.isRequired,
  remoteRoleUrl: _propTypes2["default"].string.isRequired,
  remoteOrgUrl: _propTypes2["default"].string
};

var defaultProps = {
  show: false,
  onConfirm: noop,
  onClose: noop,
  remoteUserUrl: '',
  remoteRoleUrl: '',
  remoteOrgUrl: ''
};

var Selector = function (_React$Component) {
  _inherits(Selector, _React$Component);

  function Selector() {
    _classCallCheck(this, Selector);

    var _this2 = _possibleConstructorReturn(this, _React$Component.call(this));

    _this2.didFinish = function () {
      var remoteUserUrl = _this2.props.remoteUserUrl;

      (0, _request.requestGet)(remoteUserUrl).then(function (response) {
        if (response.status === 1) {
          var _newList = response.data.map(function (item) {
            item.key = item.userid;
            item._checked = false;
            item.dept = '未知部门';
            return item;
          });
          _this2.setState({
            multiShowList: _newList
          });
        }
        _this2.setState({
          isLoading: false
        });
      })["catch"](function (error) {
        console.error(error);
      });
    };

    _this2.search = function (e) {
      var activeKey = _this2.state.activeKey;
      var _this2$props = _this2.props,
          remoteUserUrl = _this2$props.remoteUserUrl,
          remoteRoleUrl = _this2$props.remoteRoleUrl;

      var url = '';
      if (activeKey == 1) {
        url = '' + remoteUserUrl + e.target.value;
      } else if (activeKey == 2) {
        url = '' + remoteRoleUrl + e.target.value;
      }
      if (e.keyCode === 13 || e.keyCode === 108) {
        (0, _request.requestGet)(url).then(function (response) {
          if (response.status === 1) {
            if (activeKey == 1) {
              var _list = [];
              _list = response.data.map(function (item) {
                item.key = item.userid;
                item._checked = false;
                return item;
              });
              _this2.setState({
                multiShowList: _list
              });
            } else if (activeKey == 2) {
              var _list2 = [];
              _list2 = response.data.map(function (item) {
                item.key = item.roleId;
                item._checked = false;
                return item;
              });
              _this2.setState({
                roleShowList: _list2
              });
            }
          }
        })["catch"](function (error) {
          console.error(error);
        });
      }
      // if(e.target.keyCode)
    };

    _this2.handleClickSwitchLable = function (index, e) {
      if (!e.target.innerText) {
        return;
      }
      e.stopPropagation();
      _this2.setState({
        currentIndex: index
      });
    };

    _this2.searchUserByCapital = function (index, e) {
      e.stopPropagation();
      var filterIndex = _this2.state.filterIndex;

      if (filterIndex === index) {
        _this2.setState({
          filterIndex: ''
        });
      } else {
        _this2.setState({
          filterIndex: index
        });
      }
    };

    _this2.hoverDelIcon = function () {
      return _react2["default"].createElement(_tinperBee.Icon, { onClick: _this2.delItem, className: 'deleteIcon', type: 'uf-close' });
    };

    _this2.delItem = function () {
      var selectedUserData = _this2.state.selectedUserData;

      selectedUserData.splice(_this2.delIndex, 1);
      _this2.setState({
        selectedUserData: selectedUserData,
        selectedCount: selectedUserData.length
      });
    };

    _this2.onRowHover = function (index) {
      _this2.delIndex = index;
    };

    _this2.getUserList = function (data) {
      var _this2$state = _this2.state,
          selectedUserData = _this2$state.selectedUserData,
          defaultLabel = _this2$state.defaultLabel,
          multiShowList = _this2$state.multiShowList;

      var _tempList = [];
      // 清空已选人
      multiShowList = multiShowList.map(function (item) {
        item._checked = false;
        return item;
      });
      for (var i = 0; i < multiShowList.length; i++) {
        for (var j = 0; j < data.length; j++) {
          if (multiShowList[i].userid === data[j].userid) {
            multiShowList[i]._checked = true;
            continue;
          }
        }
      }
      multiShowList.forEach(function (item) {
        if (item._checked) {
          var _item = {
            key: item.userid,
            number: item.userid,
            type: defaultLabel,
            reciving: item.username + '(\u672A\u77E5\u90E8\u95E8)',
            userid: item.userid,
            username: item.username,
            email: item.email,
            dept: '未知部门',
            mobile: item.mobile
          };
          _tempList.push(_item);
        }
      });
      selectedUserData = selectedUserData.concat(_tempList);
      var res = new Map();
      selectedUserData = selectedUserData.filter(function (item) {
        return !res.has(item.userid) && res.set(item.userid, 1);
      });
      _this2.setState({
        multiShowList: multiShowList,
        selectedUserData: selectedUserData,
        currentUserList: data,
        selectedCount: selectedUserData.length
      });
    };

    _this2.getRoleList = function (data) {
      var _this2$state2 = _this2.state,
          selectedOtherList = _this2$state2.selectedOtherList,
          roleShowList = _this2$state2.roleShowList,
          defaultLabel = _this2$state2.defaultLabel;

      var _checkedList = [];
      roleShowList = roleShowList.map(function (item) {
        item._checked = false;
        return item;
      });
      for (var i = 0; i < roleShowList.length; i++) {
        for (var j = 0; j < data.length; j++) {
          if (roleShowList[i].roleId === data[j].roleId) {
            roleShowList[i]._checked = true;
            continue;
          }
        }
      }
      // 将_checked为true的先保存一份
      roleShowList.forEach(function (item) {
        if (item._checked) {
          var _item = {
            key: item.roleId,
            number: item.roleId,
            type: defaultLabel,
            reciving: item.roleName,
            roleName: item.roleName,
            roleCode: item.roleCode,
            roleId: item.roleId
          };
          _checkedList.push(_item);
        }
      });
      selectedOtherList = selectedOtherList.concat(_checkedList);
      selectedOtherList = _this2.uniqueByRoleId(selectedOtherList);
      _this2.setState({
        selectedOtherList: selectedOtherList,
        roleShowList: roleShowList,
        selectedOtherCount: selectedOtherList.length
      });
    };

    _this2.uniqueByRoleId = function (arr) {
      var res = new Map();
      return arr.filter(function (item) {
        return !res.has(item.roleId) && res.set(item.roleId, 1);
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

    _this2.close = function () {
      _this2.props.onClose();
    };

    _this2.confirm = function () {
      var _this2$state3 = _this2.state,
          selectedUserData = _this2$state3.selectedUserData,
          selectedOtherList = _this2$state3.selectedOtherList,
          multiShowList = _this2$state3.multiShowList,
          roleShowList = _this2$state3.roleShowList;

      var userList = [],
          otherList = [];
      if (selectedUserData.length) {
        userList = selectedUserData.map(function (item) {
          var _data = {
            id: item.userid,
            name: item.username,
            phone: item.mobile,
            email: item.email,
            dept: item.dept,
            type: item.type
          };
          return _data;
        });
      }
      if (selectedOtherList.length) {
        otherList = selectedOtherList.map(function (item) {
          var _data = {
            type: item.type,
            roleName: item.roleName,
            roleId: item.roleId,
            roleCode: item.roleCode
          };
          return _data;
        });
      }
      // 重置_checked属性
      multiShowList = multiShowList.map(function (item) {
        item._checked = false;
        return item;
      });
      roleShowList = roleShowList.map(function (item) {
        item._checked = false;
        return item;
      });
      _this2.setState({
        selectedOtherList: [],
        selectedUserData: [],
        multiShowList: multiShowList,
        roleShowList: roleShowList,
        selectedCount: 0,
        selectedOtherCount: 0
      });
      console.log(userList, otherList);
      _this2.props.onConfirm(userList, otherList);
    };

    _this2.onChange = function (activeKey) {
      _this2.setState({
        activeKey: activeKey,
        isLoading: true
      });
      if (activeKey == 2) {
        var remoteRoleUrl = _this2.props.remoteRoleUrl;
        var roleShowList = _this2.state.roleShowList;

        if (!roleShowList.length) {
          (0, _request.requestGet)(remoteRoleUrl).then(function (response) {
            if (response.status === 1) {
              var _newList = response.data.map(function (item) {
                item.key = item.roleId;
                item._checked = false;
                return item;
              });
              _this2.setState({
                roleShowList: _newList
              });
            }
            _this2.setState({
              defaultLabel: '角色',
              isLoading: false
            });
          })["catch"](function (error) {
            console.error(error);
          });
        } else {
          _this2.setState({
            defaultLabel: '角色',
            isLoading: false
          });
        }
      } else if (activeKey == 1) {
        var remoteUserUrl = _this2.props.remoteUserUrl;
        var multiShowList = _this2.state.multiShowList;

        if (!multiShowList.length) {
          (0, _request.requestGet)(remoteUserUrl).then(function (response) {
            if (response.status === 1) {
              var _newList = response.data.map(function (item) {
                item.key = item.userid;
                item._checked = false;
                return item;
              });
              _this2.setState({
                multiShowList: _newList
              });
            }
            _this2.setState({
              isLoading: false
            });
          })["catch"](function (error) {
            console.error(error);
          });
        }
        _this2.setState({
          defaultLabel: '用户',
          isLoading: false
        });
      } else if (activeKey == 3) {
        var remoteOrgUrl = _this2.props.remoteOrgUrl;

        _this2.setState({
          defaultLabel: '规则'
        });
        (0, _request.requestGet)(remoteOrgUrl).then(function (response) {
          if (response.status === 1) {
            _this2.setState({
              orgTreeList: response.data
            });
          }
          _this2.setState({
            isLoading: false
          });
        })["catch"](function (error) {
          console.error(error);
        });
      }
    };

    _this2.treeOnSelect = function (info) {
      (0, _request.requestGet)('/message-platform-web/user/org/user?pageSize=40&pageNo=1&orgIds=[' + info + ']').then(function (response) {
        if (response.status === 1) {
          var _newList = response.data.map(function (item) {
            return {
              key: item.userid,
              orgName: item.username,
              orgMail: item.email,
              orgPhone: item.mobile
            };
          });
          _this2.setState({
            orgShowList: _newList
          });
        }
      })["catch"](function (error) {
        console.error(error);
      });
    };

    _this2.treeOnCheck = function (info) {
      var selectedOtherList = _this2.state.selectedOtherList;

      console.log(info);
    };

    _this2.state = {
      show: false,
      isLoading: true,
      currentIndex: 0, // 默认类型
      filterIndex: '', // 根据首字母筛选用户
      selectedCount: 0, // 当前已选择的总数量
      selectedOtherCount: 0, //当前已选择的非用户数量
      selectedUserData: [], // 已选用户
      selectedOtherList: [], // 已选非用户List
      defaultLabel: '用户', // 默认显示的标签页
      currentUserList: [], // 当前选中的用户
      multiShowList: [], // 用户列表
      roleShowList: [], // 角色列表
      orgShowList: [], // 规则列表
      orgTreeList: [], // 规则🌲
      activeKey: '1' // 当前激活的tab
    };
    return _this2;
  }

  Selector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    });
  };
  // 进入modal首先加载用户列表

  // 搜索

  // 切换标签

  // 按首字母开头查找

  // 动态渲染删除图标

  // 删除某一项

  // 获得选择的用户列表

  // 获取角色列表

  // 角色->数组根据roleId属性去重

  // 清空选择人

  // 关闭模态框

  /**
   * @description 确认选人
   */

  //

  // tree select

  // tree check


  Selector.prototype.render = function render() {
    var _this3 = this;

    var _this = this;
    var multiSelect = {
      type: 'checkbox'
    };
    var filterList = _colmuns.filterCaptial.map(function (item, index) {
      return _react2["default"].createElement(
        'li',
        {
          key: 'alphabet-' + index,
          className: _this.state.filterIndex === index ? 'choose' : null,
          onClick: _this.searchUserByCapital.bind(_this3, index)
        },
        item
      );
    });
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
        show: _this.state.show,
        width: 1200
        // containerClassName={'selectModalBody'}
        , className: 'selectModalContainer',
        backdrop: true
      },
      _react2["default"].createElement(
        _tinperBee.Modal.Header,
        null,
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
                  _react2["default"].createElement('input', { type: 'text', onKeyUp: _this.search, placeholder: '请输入您要查找的用户', className: 'search' }),
                  _react2["default"].createElement(_tinperBee.Icon, { className: 'searchIcon', type: 'uf-search' })
                ),
                _react2["default"].createElement(
                  'ul',
                  { className: 'filterByCapital clearfix' },
                  filterList
                ),
                _react2["default"].createElement(MultiSelectTable, {
                  scroll: { y: 400 },
                  columns: _colmuns.multiColumns,
                  multiSelect: multiSelect,
                  getSelectedDataFunc: _this.getUserList,
                  data: _this.state.multiShowList
                })
              ),
              _react2["default"].createElement(
                TabPane,
                { tab: '角色', key: 2 },
                _react2["default"].createElement(
                  'div',
                  { className: 'searchWrapper' },
                  _react2["default"].createElement('input', { type: 'text', placeholder: '请输入您要查找的角色', onKeyUp: _this.search, className: 'search' }),
                  _react2["default"].createElement(_tinperBee.Icon, { className: 'searchIcon', type: 'uf-search' })
                ),
                _react2["default"].createElement(MultiSelectTable, {
                  scroll: { y: 400 },
                  columns: _colmuns.roleMultiCol,
                  multiSelect: multiSelect,
                  getSelectedDataFunc: _this.getRoleList,
                  data: _this.state.roleShowList
                })
              )
            ),
            _react2["default"].createElement(_tinperBee.Loading, {
              show: _this.state.isLoading,
              container: function container() {
                return document.getElementById('user');
              },
              size: 'sm'
            })
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
                  { className: 'fll' },
                  '\u7528\u6237'
                ),
                _react2["default"].createElement(
                  'p',
                  { className: 'flr' },
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
                data: _this.state.selectedUserData
                // hoverContent={_this.hoverDelIcon}
                , onRowHover: _this.onRowHover
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
                  { className: 'fll' },
                  '\u5176\u4ED6'
                ),
                _react2["default"].createElement(
                  'p',
                  { className: 'flr' },
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
                data: _this.state.selectedOtherList
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