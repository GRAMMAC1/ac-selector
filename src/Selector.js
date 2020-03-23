import React from 'react'
import PropTypes from 'prop-types'
import * as langs from './lang'
import {
  Modal,
  Button,
  Icon,
  Checkbox,
  Tabs,
  Tree,
  Table,
  Pagination,
  Menu
} from './components/tinper'
import './Selector.less'

// import 'bee-button/build/Button.css'
// import 'bee-modal/build/Modal.css'
// import 'bee-icon/build/Icon.css'
// import 'bee-tabs/build/Tabs.css'
// import 'bee-pagination/build/Pagination.css'
// import 'bee-menus/build/Menu.css'
// import 'bee-checkbox/build/Checkbox.css'
// import 'bee-tree/build/Checkbox.css'
// import 'bee-table/build/Table.css'
// import Table from 'bee-table'
import multiSelect from 'bee-table/build/lib/multiSelect'
import { selectedUserCol, roleMultiCol, orgCol, multiColumns,pageLocale, wechatMultiCol } from './colmuns'
import { requestGet } from './request'
import {
  resetChecked,
  setChecked,
  setLabel,
  multiSelectType,
  transferToMenu,
  mapUserList,
  mapOtherList,
  setUserReciving,
  setOtherReciving,
  deSelect,
  getUserId,
  getRoleId,
  getKeyId,
  addFullAttr,
  deSelectType,
  decodeMenukey,
  getWeId

} from './utils'

let MultiSelectTable = multiSelect(Table, Checkbox)

const { TabPane } = Tabs
const TreeNode = Tree.TreeNode
const i18n = { ...langs }

const noop = function() {}

/**
 * @dependencies 依赖的组件版本写死，升级可能会出现bug
 * @refact 类型声明 测试用例 webpack升级
 */

const propTypes = {
  locale:PropTypes.oneOf(['zh_CN', 'zh_TW', 'en_US']),
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.string,
  selectedUser: PropTypes.array,
  selectedOther: PropTypes.array,
  documentNo: PropTypes.string,
  documentName: PropTypes.string,
  ruleList: PropTypes.array,
  emptyText: PropTypes.node,
  tabConfig:PropTypes.array
}

const defaultProps = {
  locale: 'zh_CN',
  show: false,
  onConfirm: noop,
  onClose: noop,
  selectedUser: [],
  selectedOther: [],
  mode: 'daily',
  documentNo: '',
  documentName: '',
  emptyText: locale => <div>{locale}</div>,
  tabConfig:[],
  tableData:[],
  treeConfig:[],
  pageSize:40
}

class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.orgTreeList = [] // 备份完整的组织树
    this.state = {
      locale: props.locale,
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
      orgInputValue: '',
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
      orgSelectedKeys: [],
      orgExpandedKeys: [],
      autoExpandParent: true,
      exendTreeList:[],
      orgTreeExpandedKeys: [],
      autoTreeExpandParent: true,
      weList:[], //公众号
      weListDB:[],
      weArray:[], //对应数据
      weIndex:'',
      weLeftVal:'',
      weSearchVal:''
    }
  }

  componentWillReceiveProps(nextProps) {
    // let _newUserList = setUserReciving(nextProps.selectedUser)
    // let _newOtherList = setUserReciving(nextProps.selectedOther)
    // console.log('ssss',nextProps.tableData)
    // console.log('2222',_newUserList)
    let _newList = resetChecked(nextProps.tableData, 'roleId')
    let res = setChecked(_newList, this.state.selectedOtherList, 'roleId')
    // console.log('vvvvv',res)
    // if(_newOtherList[0]. === ){

    // }
    
    this.setState({
      roleShowList: res,
      // locale: nextProps.locale,
      show: nextProps.show,
      exendTreeList:nextProps.treeConfig
      // selectedOtherList: _newOtherList,
      // selectedOtherCount: _newOtherList.length,
      // selectedUserData: _newUserList,
      // selectedCount: _newUserList.length
    })
  }

  componentDidMount() {
    const { mode } = this.props
    switch (mode) {
      case 'dev':
        this.setState({
          prefixUrl:
            'http://iuap-message-platform-web.test.app.yyuap.com/message-platform-web'
        })
        break
      case 'daily':
        this.setState({
          prefixUrl: 'https://u8cmsg-daily.yyuap.com/message-platform-web'
        })
        break
      case 'pre':
        this.setState({
          prefixUrl: 'https://msg-y3me-pre.diwork.com/message-platform-web'
        })
        break
      case 'diwork':
        this.setState({
          prefixUrl: 'https://msg-y3me-daily.yyuap.com/message-platform-web'
        })
        break
      case 'diwork-prod':
        this.setState({
          prefixUrl: 'https://message-yonsuite.diwork.com/message-platform-web'
        })
        break
      default:
        this.setState({
          prefixUrl: 'https://u8cmsg-daily.yyuap.com/message-platform-web'
        })
        break
    }
  }

  // 进入modal首先加载用户列表
  didFinish = () => {
    let { selectedUser, selectedOther } = this.props
    this.setState({
      selectedUserData: setUserReciving(selectedUser),
      selectedOtherList: setOtherReciving(selectedOther)
    })
    const url = `${this.state.prefixUrl}/user/staff/search?pageSize=${this.props.pageSize}&pageNo=1&keyword=`
    requestGet(url)
      .then(response => {
        if (response.status === 1 && response.data !== null) {
          const { selectedUserData } = this.state
          let _newList = resetChecked(response.data.values, 'userid')
          let res = setChecked(_newList, selectedUserData, 'userid')
          let completeRes = addFullAttr(res)
          // console.log(completeRes)
          let obj = {
            activePage: response.data.currentPage,
            items: response.data.totalPages,
            total: response.data.pageSize
          }
          this.setState({
            multiShowList: completeRes,
            staffPage: obj
          })
        }
      })
      .catch(error => {
        throw new Error(error)
      })
  }
  // 搜索
  search = e => {
    const { activeKey } = this.state,
      _this = this
    let url = ''
    if (activeKey === '1') {
      url = `${_this.state.prefixUrl}/user/staff/search?pageSize=${this.props.pageSize}&pageNo=1&keyword=${e.target.value}`
    } else if (activeKey === '2') {
      url = `${_this.state.prefixUrl}/user/role/search?pageSize=${this.props.pageSize}&pageNo=1&keyword=${e.target.value}`
    }
    if (e.keyCode === 13 || e.keyCode === 108) {
      requestGet(url)
        .then(response => {
          if (response.status === 1 && response.data !== null) {
            if (activeKey === '1') {
              let _list = [],
                obj = {
                  activePage: response.data.currentPage,
                  items: response.data.totalPages,
                  total: response.data.pageSize
                }
              _list = resetChecked(response.data.values, 'userid')
              _list = setChecked(
                response.data.values,
                this.state.selectedUserData,
                'userid'
              )
              _list = addFullAttr(_list)
              this.setState({
                multiShowList: _list,
                staffPage: obj
              })
            } else if (activeKey === '2') {
              let _list = [],
                obj = {
                  activePage: response.data.currentPage,
                  items: response.data.totalPages,
                  total: response.data.pageSize
                }
              _list = resetChecked(response.data.values, 'roleId')
              _list = setChecked(
                response.data.values,
                this.state.selectedOtherList,
                'roleId'
              )
              this.setState({
                roleShowList: _list,
                rolePage: obj
              })
            }
          } else if (response.data === null) {
            if (activeKey === '1') {
              this.setState({
                staffPage: Object.assign(
                  {},
                  {
                    activePage: 1,
                    items: 1,
                    total: 0
                  }
                ),
                multiShowList: []
              })
            } else if (activeKey === '2') {
              this.setState({
                rolePage: Object.assign(
                  {},
                  {
                    activePage: 1,
                    items: 1,
                    total: 0
                  }
                ),
                roleShowList: []
              })
            }
          }
        })
        .catch(error => {
          throw new Error(error)
        })
    }
  }
  clickSearch = () => {
    const _this = this
    let searchUrl
    const { activeKey, staffInputValue, roleInputValue } = this.state
    if (activeKey === '1') {
      searchUrl = `${_this.state.prefixUrl}/user/staff/search?pageSize=${this.props.pageSize}&pageNo=1&keyword=${staffInputValue}`
    } else {
      searchUrl = `${_this.state.prefixUrl}/user/role/search?pageSize=${this.props.pageSize}&pageNo=1&keyword=${roleInputValue}`
    }
    requestGet(searchUrl)
      .then(response => {
        if (response.status === 1 && response.data !== null) {
          if (activeKey === '1') {
            let _list = [],
              obj = {
                activePage: response.data.currentPage,
                items: response.data.totalPages,
                total: response.data.pageSize
              }
            _list = resetChecked(response.data.values, 'userid')
            _list = setChecked(
              response.data.values,
              this.state.selectedUserData,
              'userid'
            )
            this.setState({
              multiShowList: _list,
              staffPage: obj
            })
          } else if (activeKey === '2') {
            let _list = [],
              obj = {
                activePage: response.data.currentPage,
                items: response.data.totalPages,
                total: response.data.pageSize
              }
            _list = resetChecked(response.data.values, 'roleId')
            _list = setChecked(
              response.data.values,
              this.state.selectedOtherList,
              'roleId'
            )
            this.setState({
              roleShowList: _list,
              rolePage: obj
            })
          }
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  // 扩展的输入框
  inputChange = (type,e) => {

      this.setState({
        [type]: e.target.value
      })
    
   
  }
  // 动态渲染删除图标
  hoverDelIcon = () => {
    return (
      <Icon onClick={this.delUser} className={'deleteIcon'} type={'uf-close'} />
    )
  }
  hoverDelOtherIcon = () => (
    <Icon onClick={this.delOther} className={'deleteIcon'} type={'uf-close'} />
  )
  delOther = () => {
    let { roleShowList, selectedOtherList, orgSelectedKeys } = this.state
    let _list = [...roleShowList]
    if (selectedOtherList[this.delOtherIndex].typeCode === 1) {
      _list = _list.map(t => {
        if (t.roleId === selectedOtherList[this.delOtherIndex].roleId) {
          t._checked = false
          return t
        }
        return t
      })
    } else if (selectedOtherList[this.delOtherIndex].typeCode === 2) {
      let index = -1
      orgSelectedKeys.forEach((t, i) => {
        if (t == selectedOtherList[this.delOtherIndex].orgId) {
          index = i
        }
      })
      if (index !== -1) {
        let tempList = [...orgSelectedKeys]
        tempList.splice(index, 1)
        this.setState({
          orgSelectedKeys: [...tempList]
        })
      }
    }
    let res = [...selectedOtherList]
    res.splice(this.delOtherIndex, 1)
    this.setState({
      selectedOtherList: [...res],
      selectedOtherCount: res.length,
      roleShowList: [..._list]
    })
  }
  // 删除某一项
  delUser = () => {
    let { multiShowList, selectedUserData } = this.state
    multiShowList = multiShowList.map(item => {
      if (item.userid === selectedUserData[this.delIndex].userid) {
        item._checked = false
        return item
      }
    })
    selectedUserData.splice(this.delIndex, 1)
    this.setState({
      selectedUserData: [...selectedUserData],
      selectedCount: selectedUserData.length
    })
  }
  onRowHover = index => {
    this.delIndex = index
  }
  onRowOtherHover = index => {
    this.delOtherIndex = index
  }
  // 获得选择的用户列表
  getUserList = (data, record) => {
    const typeCode = 0
    let { defaultLabel, multiShowList, selectedUserData } = this.state
    let delList = getUserId(data)
    let _list = [...selectedUserData]
    let res = resetChecked(multiShowList, 'userid')
    res = setChecked(multiShowList, data, 'userid')
    if (record === undefined) {
      if (data.length) {
        let useridList = getUserId(_list)
        data.forEach(t => {
          if (!useridList.includes(t.userid)) {
            _list.push(
              Object.assign({}, t, {
                type: defaultLabel,
                typeCode,
                key: t.userid,
                reciving: `${t.username}(${t.orgName})`
              })
            )
          }
        })
      } else {
        // 得到当前页数据的userid，遍历当前已选的用户列表，如果有当前页的userid就删除当前项
        let deleteUserList = getUserId(multiShowList),
          result = []
        _list.forEach(t => {
          if (!deleteUserList.includes(t.userid)) {
            result.push(t)
          }
        })
        _list = [...result]
      }
    } else {
      let currItem = Object.assign({}, record, {
        type: defaultLabel,
        typeCode,
        key: record.userid,
        reciving: record.orgName
          ? `${record.username}(${record.orgName})`
          : // : `${record.username}(未知部门)`
            `${record.username}(${langs[this.state.locale]})`
      })
      if (delList.includes(currItem.userid)) {
        _list.push(currItem)
      } else {
        _list = _list.filter(t => {
          if (t.userid !== currItem.userid) {
            return t
          }
        })
      }
    }
    this.setState({
      multiShowList: [...res],
      selectedUserData: [..._list],
      selectedCount: _list.length
    })
  }
  // 获取角色列表
  getRoleList = (data, record) => {
    const typeCode = 1
    let { roleShowList, defaultLabel, selectedOtherList, } = this.state
    let _list = [...selectedOtherList]
    let tempList = [...roleShowList]
    let delList = getRoleId(data)
    tempList = resetChecked(tempList, 'roleId')
    tempList = setChecked(tempList, data, 'roleId')
    if (record === undefined) {
      if (data.length) {
        let roleIdList = getRoleId(_list)
        data.forEach(t => {
          if (!roleIdList.includes(t.roleId)) {
            _list.push(
              Object.assign({}, t, {
                key: t.roleId,
                type: defaultLabel,
                typeCode,
                reciving: t.roleName
              })
            )
          }
        })
      } else {
        // 和用户页签取消全部选中逻辑相同
        let deleteRoleList = getRoleId(roleShowList),
          result = []
        _list.forEach(t => {
          if (!deleteRoleList.includes(t.roleId)) {
            result.push(t)
          }
        })
        _list = [...result]
      }
    } else {
      let currItem = Object.assign({}, record, {
        key: record.roleId,
        type: defaultLabel,
        typeCode,
        reciving: record.roleName
      })
      if (delList.includes(record.roleId)) {
        _list.push(currItem)
      } else {
        _list = _list.filter(t => {
          if (t.roleId !== record.roleId) {
            return t
          }
        })
      }
    }
    this.setState({
      selectedOtherList: [..._list],
      roleShowList: [...tempList],
      selectedOtherCount: _list.length
    })
  }
  // weixinliebiao
  getWeList = (data, record) => {
    const typeCode = 4 //
    let { weArray, defaultLabel, selectedOtherList, } = this.state
    // console.log(data,record)
    let delList = getWeId(data)
    let _list = [...selectedOtherList]
    let tempList = [...weArray]
    // let delList = getRoleId(data)
    tempList = resetChecked(weArray, 'wxOpenId')
    tempList = setChecked(weArray, data, 'wxOpenId')
  //  console.log(data,record)
    if (record === undefined) {
      if (data.length) {
        let weList = getWeId(_list)
        data.forEach(t => {
          if (!weList.includes(t.wxOpenId)) {
            _list.push(
              Object.assign({}, t, {
                key: t.wxOpenId,
                type: defaultLabel,
                typeCode,
                reciving: t.weChatId
              })
            )
          }
        })
      } else {
        // 和用户页签取消全部选中逻辑相同
        let deleteWeList = getWeId(weArray),
          result = []
        _list.forEach(t => {
          if (!deleteWeList.includes(t.wxOpenId)) {
            result.push(t)
          }
        })
        _list = [...result]
      }
    } else {
      let currItem = Object.assign({}, record, {
        key: record.wxOpenId,
        type: defaultLabel,
        typeCode,
        reciving: record.weChatId
      })
      if (delList.includes(record.wxOpenId)) {
        _list.push(currItem)
      } else {
        _list = _list.filter(t => {
          if (t.wxOpenId !== record.wxOpenId) {
            return t
          }
        })
      }
    }
    // console.log(_list,tempList,_list.length)
    this.setState({
      selectedOtherList: [..._list],
      weArray: [...tempList],
      selectedOtherCount: _list.length
    })
    return
  }
  //微信 左侧搜索
  weLeftSearch = (e) =>{
    this.setState({
      weLeftVal:e.target.value,
      weList:e.target.value 
      ? this.state.weList.filter(item=>{
        return item.accountName.indexOf(e.target.value) != -1
      } ) 
      : this.state.weListDB
    })
  }
  //获取角色列表
  getExtend = (data,record)=>{
    let { roleShowList, defaultLabel, selectedOtherList, } = this.state
    let _list = [...selectedOtherList]
    let tempList = [...roleShowList]
    let delList = getRoleId(data)
    tempList = resetChecked(tempList, 'roleId')
    tempList = setChecked(tempList, data, 'roleId')
    if (record === undefined) {
      if (data.length) {
        let roleIdList = getRoleId(_list)
        data.forEach(t => {
          if (!roleIdList.includes(t.type)) {
            _list.push(t)
          }
        })
      } else {
        // 和用户页签取消全部选中逻辑相同
        let deleteRoleList = getRoleId(roleShowList),
          result = []
        _list.forEach(t => {
          if (!deleteRoleList.includes(t.roleId)) {
            result.push(t)
          }
        })
        _list = [...result]
      }
    } else {
      let currItem = record
      if (delList.includes(record.roleId)) {
        _list.push(currItem)
      } else {
        _list = _list.filter(t => {
          if (t.roleId !== record.roleId) {
            return t
          }
        })
      }
    }
    this.setState({
      selectedOtherList: [..._list],
      roleShowList: [...tempList],
      selectedOtherCount: _list.length
    })
  }

  extendPageSelect=(tabMark,index)=>{
    this.props.extendPage(tabMark,index)
    this.setState({
      extendPageIndex:index
    })
  }

  // 数组根据属性去重
  uniqueByAttr = (arr, type) => {
    const res = new Map()
    return arr.filter(item => {
      if (item[type] !== 'undefined') {
        return !res.has(item[type]) && res.set(item[type], 1)
      }
    })
  }
  // 清空选择人
  deSelectAll = (code, e) => {
    e.stopPropagation()
    if (code) {
      let { multiShowList } = this.state
      multiShowList = multiShowList.map(item => {
        item._checked = false
        return item
      })
      this.setState({
        multiShowList,
        selectedCount: 0,
        selectedUserData: []
      })
    } else {
      let { roleShowList } = this.state
      // 清空左侧已勾选项
      roleShowList = roleShowList.map(item => {
        item._checked = false
        return item
      })
      this.setState({
        roleShowList,
        selectedOtherCount: 0,
        selectedOtherList: []
      })
    }
  }
  // 重置state
  reset = () => {
    this.setState({
      extends:'',
      activeKey: '1',
      multiShowList: [],
      roleShowList: [],
      selectedUserData: [],
      selectedOtherList: [],
      ruleMenuList: [], // 规则
      selectedCount: 0,
      selectedOtherCount: 0,
      staffInputValue: '',
      roleInputValue: '',
      orgSelectedKeys: [],
      defaultLabel: '用户'
    })
  }
  // 关闭模态框
  close = () => {
    // 清空上一次用户状态
    this.reset()
    this.props.onClose()
  }
  /**
   * @description 确认选人
   */
  confirm = () => {
    let { selectedUserData, selectedOtherList } = this.state
    let userList = mapUserList(selectedUserData)
    let otherList = mapOtherList(selectedOtherList)
    // console.log(userList, otherList)
    // console.log(selectedOtherList)
    this.props.onConfirm(userList, otherList)
    // this.props.onConfirm(selectedUserData, selectedOtherList)
    this.reset()
  }
  //
  tabHandleChange=(lab)=>{
    // console.log(lab)
    this.setState({
      defaultLabel:lab
    })
  }
  //wexin
  weIndexChange = id => {
    this.setState({
      weIndex:id
    })
    ////////
    this.weGetData(id)
  }
  //qiehuan tag
  onChange = (activeKey,node) => {
    // console.log(activeKey,node)
    const _this = this
    if(activeKey<=4) {
      this.setState({
        extends:'',
        activeKey,
        defaultLabel: setLabel(activeKey)
      })
    }
    this.setState({
      extends:'',
      activeKey,
      orgInputValue:""
      // defaultLabel: setLabel(activeKey)
    })
    if(activeKey === '1'){
      const url = `${this.state.prefixUrl}/user/staff/search?pageSize=${this.props.pageSize}&pageNo=1&keyword=`
    requestGet(url)
      .then(response => {
        if (response.status === 1 && response.data !== null) {
          const { selectedUserData } = this.state
          let _newList = resetChecked(response.data.values, 'userid')
          let res = setChecked(_newList, selectedUserData, 'userid')
          let completeRes = addFullAttr(res)
          // console.log(completeRes)
          let obj = {
            activePage: response.data.currentPage,
            items: response.data.totalPages,
            total: response.data.pageSize
          }
          this.setState({
            multiShowList: completeRes,
            staffPage: obj
          })
        }
      })
      .catch(error => {
        throw new Error(error)
      })
    }
    if (activeKey === '2') {
      const url = `${_this.state.prefixUrl}/user/role/search?pageSize=${this.props.pageSize}&pageNo=1&keyword=`
      // let { roleShowList } = this.state
      // if (!roleShowList.length) {
        requestGet(url)
          .then(response => {
            if (response.status === 1 ) {
              const { selectedOtherList } = this.state
              let _page = {
                activePage: response.data.currentPage,
                items: response.data.totalPages,
                total: response.data.pageSize
              }
              this.setState({
                rolePage: _page
              })
              let _newList = resetChecked(response.data.values, 'roleId')
              let res = setChecked(_newList, selectedOtherList, 'roleId')
              this.setState({
                roleShowList: res
              })
            }
          })
          .catch(error => {
            throw new Error(error)
          })
      // }
    } else if (activeKey === '3') {
      let { selectedOtherList } = this.state
      const url = `${_this.state.prefixUrl}/user/org/list?pageSize=40&pageNo=1&orgIds=`
      requestGet(url)
        .then(response => {
          if (response.status === 1) {
            this.setState({
              orgTreeList: response.data
            })
            this.orgTreeList = [...response.data]
            if (selectedOtherList.length) {
              let checkedKeys = []
              selectedOtherList.forEach(t => {
                if (t.typeCode === 2) {
                  checkedKeys.push(t.orgId)
                }
              })
              this.setState({
                orgSelectedKeys: [...checkedKeys]
              })
            } else {
              this.setState({
                orgSelectedKeys: []
              })
            }
          }
        })
        .catch(error => {
          throw new Error(error)
        })
    } else if (activeKey === '4') {
      if (this.props.ruleList) {
        this.setState({
          ruleMenuList: transferToMenu(this.props.ruleList)
        })
      } else {
        const url = `${_this.state.prefixUrl}/user/rules?documentNo=${this.props.documentNo}&documentName=${this.props.documentName}`
        requestGet(url)
          .then(response => {
            if (response.status === 1) {
              const menuList = [
                {
                  id: 'root-0',
                  name: this.props.documentName,
                  attrs: [...response.data.data]
                }
              ]
              this.setState({
                ruleMenuList: transferToMenu(menuList)
              })
            }
          })
          .catch(err => {
            throw new Error(err)
          })
      }
    } if(activeKey === '0'){
      const url = `${_this.state.prefixUrl}/user/wechat/accounts`
       requestGet(url).then(res=>{
         const id = res.data&&res.data[0]?res.data[0].accountId:''
         this.setState({
           weListDB:res.data,
           weList:res.data,
           weIndex:id
         })
         if(id){
           this.weGetData(id)
         }
       })
    }
    
  }

  // 搜索微信
  weGetData = (id,keyWords='')=>{
    const url = `${this.state.prefixUrl}/user/wechat/users?accountId=${id}&keyWords=${keyWords}`
    requestGet(url).then(res=>{
      // console.log(res)
      let _newList = resetChecked(res.data, 'wxOpenId')
      let list = setChecked(_newList, this.state.selectedOtherList, 'wxOpenId')
      // console.log(_newList)
      this.setState({
        weArray:list
      })
    })
         
  }
  // weixinyouce
  weSearchAc = (e) =>{
    this.setState({weSearchVal:e.target.value})
  }
  weSearchUp = e=>{
    if(e.keyCode==13){
      this.weGetData(this.state.weIndex,this.state.weSearchVal)
    }
  }



  // tree select
  treeOnSelect = info => {
    let url = `${this.state.prefixUrl}//user/org/user?pageSize=40&pageNo=1&orgIds=['${info}']`
    requestGet(url)
      .then(response => {
        if (response.status === 1) {
          let _newList = resetChecked(response.data, 'userid')
          this.setState({
            orgShowList: _newList
          })
        }
      })
      .catch(error => {
        throw new Error(error)
      })
  }
  // tree check
  treeOnCheck = (info, e) => {
    // console.log(info,e)
    const typeCode = 2
    const { defaultLabel } = this.state
    let { selectedOtherList } = this.state
    let checkedNodes = [...e.checkedNodes]
    let _list = [...selectedOtherList]
    let newList = deSelect(_list, typeCode)
    let tempRes = checkedNodes.map((t, i) => ({
      key: info[i],
      type: defaultLabel,
      typeCode,
      reciving: t.props.title.props.children[2].props.children,
      orgName: t.props.title.props.children[2].props.children,
      orgId: info[i]
    }))
    let res = newList.concat(tempRes)
    // console.log(res)
    this.setState({
      selectedOtherList: [...res],
      selectedOtherCount: res.length,
      orgSelectedKeys: [...info]
    })
  }
  // tree check
  ExpandedTreeOnCheck = (info, e) => {
    // console.log(info,e)
    const { defaultLabel } = this.state
    // console.log(this.state.defaultLabel)
    let { selectedOtherList } = this.state
    let checkedNodes = [...e.checkedNodes]
    let _list = [...selectedOtherList]
    let newList = deSelectType(_list, defaultLabel)
    let tempRes = checkedNodes.map((t, i) => {
      // console.log(info[i])
      return {
      key: info[i],
      type: defaultLabel,
      reciving: t.props.title.props.children[2].props.children,
      orgName: t.props.title.props.children[2].props.children,
      orgId: info[i],
    }})
    let res = newList.concat(tempRes)
    // console.log(tempRes)
    this.setState({
      selectedOtherList: [...res],
      selectedOtherCount: res.length,
    })
    return
  }
  // 角色分页
  roleSelect = e => {
    const _this = this
    let url = `${_this.state.prefixUrl}/user/role/search?pageSize=${this.props.pageSize}&pageNo=${e}&keyword=`
    let { selectedOtherList } = this.state
    requestGet(url)
      .then(response => {
        if (response.status === 1 && response.data !== null) {
          let obj = {
            activePage: e,
            items: response.data.totalPages,
            total: response.data.pageSize
          }
          let res = resetChecked(response.data.values, 'roleId')
          res = setChecked(response.data.values, selectedOtherList, 'roleId')
          this.setState({
            rolePage: obj,
            roleShowList: res
          })
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  // 用户分页
  staffSelect = e => {
    const _this = this
    let url = `${_this.state.prefixUrl}/user/staff/search?pageSize=${this.props.pageSize}&pageNo=${e}&keyword=`
    requestGet(url)
      .then(response => {
        if (response.status === 1 && response.data !== null) {
          let obj = {
            activePage: e,
            items: response.data.totalPages,
            total: response.data.pageSize
          }
          let res = resetChecked(response.data.values, 'userid')
          res = setChecked(res, this.state.selectedUserData, 'userid')
          let completeRes = addFullAttr(res)
          this.setState({
            staffPage: obj,
            multiShowList: completeRes
          })
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  menuClick = ({ key }) => {
    // debugger
    const parsedKey = decodeMenukey(key)
    let { selectedOtherList } = this.state
    let _list = [...selectedOtherList]
    let filterList = []
    _list.forEach(t => {
      if (t.typeCode === 3) {
        filterList.push(t.key)
      }
    })
    if (!filterList.includes(key)) {
      const menuItem = Object.assign({}, parsedKey, {
        key,
        type: this.state.defaultLabel,
        typeCode: 3,
        ruleCode: parsedKey.id,
        ruleName: parsedKey.name,
        reciving: parsedKey.name
      }) 
      _list.push(menuItem)
      this.setState({
        selectedOtherList: [..._list],
        selectedOtherCount: _list.length
      })
    }
  }
  searchOrg = e => {
    const value = e.target.value
    this.setState({
      orgInputValue: value
    })
    // if (!value.trim()) {
    //   return
    // }
    let res = []
    function deepTraversal(list, callback) {
      let stack = []
      while (list) {
        callback(list)
        if (list.childs) {
          for (let i = list.childs.length - 1; i >= 0; i--) {
            stack.push(list.childs[i])
          }
        }
        list = stack.pop()
      }
    }
    this.orgTreeList.forEach(t => {
      deepTraversal(t, node => {
        if (node.orgName.indexOf(value) > -1) {
          res.push(node.orgId)
        }
      })
    })
    this.setState({
      orgExpandedKeys: [...res],
      autoExpandParent: true
    })
  }
  searchOrgTree = e => {
    const value = e.target.value
    this.setState({
      orgInputValue: value
    })
    if (!value.trim()) {
      return
    }
    let res = []
    function deepTraversal(list, callback) {
      let stack = []
      while (list) {
        callback(list)
        if (list.childs) {
          for (let i = list.childs.length - 1; i >= 0; i--) {
            stack.push(list.childs[i])
          }
        }
        list = stack.pop()
      }
    }
    this.state.exendTreeList.forEach(t => {
      deepTraversal(t, node => {
        if (node.orgName.indexOf(value) > -1) {
          res.push(node.orgId)
        }
      })
    })
    // console.log(res)
    this.setState({
      orgTreeExpandedKeys: [...res],
      autoTreeExpandParent: true
    })
  }
  onExpand = keys => {
    // console.log(a,b,c)
    this.setState({
      orgExpandedKeys: [...keys],
      autoExpandParent: false
    })
  }
  onTreeExpand = keys => {
    // console.log(keys)
    this.setState({
      orgTreeExpandedKeys: [...keys],
      autoTreeExpandParent: false
    })
  }

  render() {
    const _this = this
    const { locale,weArray,weList,weIndex,weLeftVal,weSearchVal } = this.state
    const { tabConfig,isWechat } = this.props
    const loopData = data =>
      data.map(item => {
        const index = item.orgName.indexOf(_this.state.orgInputValue)
        const beforeName = item.orgName.substring(0, index)
        const afterName = item.orgName.substring(
          index + _this.state.orgInputValue.length,
          item.orgName.length
        )
        const title =
          index > -1 ? (
            <span>
              {beforeName}
              <span className="u-tree-searchable-filter">
                {_this.state.orgInputValue}
              </span>
              <span style={{ display: 'none' }}>{item.orgName}</span>
              {afterName}
            </span>
          ) : (
            <span>
              <span></span>
              <span>{item.orgName}</span>
              <span style={{ display: 'none' }}>{item.orgName}</span>
            </span>
          )
        if (item.childs) {
          return (
            <TreeNode
              title={title}
              key={item.orgId}
              icon={
                item.parentId ? (
                  <Icon type={'uf-users'} />
                ) : (
                  <Icon type={'uf-group-2'} />
                )
              }>
              {loopData(item.childs)}
            </TreeNode>
          )
        }
        return (
          <TreeNode
            title={title}
            key={item.orgId}
            icon={<Icon type={'uf-users'} />}
            isLeaf={true}></TreeNode>
        )
      })
    return (
      <Modal
        onEntered={_this.didFinish}
        onHide={_this.close}
        show={_this.state.show}
        width={1200}
        className={'selectModalContainer'}
        dialogClassName={'selectDialog'}
        backdrop={true}>
        <Modal.Header closeButton>
          {/* <span className={'headerTitle'}>添加消息接收人</span> */}
          <span className={'headerTitle'}>{i18n[locale].addMsgAcpt}</span>
        </Modal.Header>
        <Modal.Body className={'selectModalBody'}>
          <div className={'selectContainer clearfix'}>
            <div className={'left'} id={'user'}>
              <Tabs
                defaultActiveKey={'1'}
                activeKey={_this.state.activeKey}
                onChange={this.onChange}
                className={'deptTitle'}>
                {/* <TabPane tab={'用户'} key={1}> */}
                <TabPane tab={i18n[locale].user} key={1}>
                  <div className={'searchWrapper'}>
                    <input
                      value={_this.state.staffInputValue}
                      onChange={_this.inputChange.bind(this, 'staffInputValue')}
                      type="text"
                      onKeyUp={_this.search}
                      // placeholder={'请输入您要查找的用户'}
                      placeholder={i18n[locale].pleaseUser}
                      className={'search'}
                    />
                    <Icon
                      onClick={_this.clickSearch}
                      className={'searchIcon'}
                      type="uf-search"
                    />
                  </div>
                  <MultiSelectTable
                    scroll={{ y: 210 }}
                    // columns={multiColumns}
                    columns={multiColumns[locale]}
                    multiSelect={multiSelectType}
                    getSelectedDataFunc={_this.getUserList}
                    data={_this.state.multiShowList}
                    emptyText={() => _this.props.emptyText(i18n[locale].noData)}
                  />
                  <Pagination
                    className={'selector_pagination'}
                    first
                    last
                    prev
                    next
                    locale={pageLocale[this.props.locale]}
                    maxButtons={5}
                    boundaryLinks
                    total={_this.state.staffPage.total}
                    activePage={_this.state.staffPage.activePage}
                    items={_this.state.staffPage.items}
                    onSelect={_this.staffSelect}
                  />
                </TabPane>
                {/* <TabPane tab={'角色'} key={2}> */}
                <TabPane tab={i18n[locale].role} key={2}>
                  <div className={'searchWrapper'}>
                    <input
                      value={_this.state.roleInputValue}
                      onChange={_this.inputChange.bind(this, 'roleInputValue')}
                      type="text"
                      placeholder={i18n[locale].pleaseRole}
                      onKeyUp={_this.search}
                      className={'search'}
                    />
                    <Icon
                      onClick={_this.clickSearch}
                      className={'searchIcon'}
                      type="uf-search"
                    />
                  </div>
                  <MultiSelectTable
                    id={'role'}
                    scroll={{ y: 210 }}
                    columns={roleMultiCol[locale]}
                    multiSelect={multiSelectType}
                    getSelectedDataFunc={_this.getRoleList}
                    data={_this.state.roleShowList}
                    emptyText={()=>_this.props.emptyText(i18n[locale].noData)}
                  />
                  <Pagination
                    className={'selector_pagination'}
                    first
                    last
                    prev
                    next
                    locale={pageLocale[this.props.locale]}
                    maxButtons={5}
                    boundaryLinks
                    total={_this.state.rolePage.total}
                    activePage={_this.state.rolePage.activePage}
                    items={_this.state.rolePage.items}
                    onSelect={_this.roleSelect}
                  />
                </TabPane>
                {/* <TabPane tab={'组织'} key={3}> */}
                <TabPane tab={i18n[locale].org} key={3}>
                  <div className={'searchWrapper'}>
                    <input
                      onChange={_this.searchOrg}
                      // placeholder={'请输入您要查找的组织'}
                      placeholder={i18n[locale].pleaseOrg}
                      className={'search'}
                    />
                    <Icon
                      onClick={_this.clickSearch}
                      className={'searchIcon'}
                      type="uf-search"
                    />
                  </div>
                  <div className={'clearfix'}>
                    <div className={'myTree'}>
                      <Tree
                        showIcon
                        cancelUnSelect={true}
                        checkedKeys={_this.state.orgSelectedKeys}
                        checkable
                        checkStrictly
                        onExpand={_this.onExpand}
                        autoExpandParent={_this.state.autoExpandParent}
                        expandedKeys={_this.state.orgExpandedKeys}
                        onSelect={_this.treeOnSelect}
                        onCheck={_this.treeOnCheck}>
                        {loopData(_this.state.orgTreeList)}
                      </Tree>
                    </div>
                    <div className={'orgTable'}>
                      <Table
                        scroll={{ y: 440 }}
                        columns={orgCol[locale]}
                        data={_this.state.orgShowList}
                        emptyText={()=>_this.props.emptyText(i18n[locale].noData)}
                      />
                    </div>
                  </div>
                </TabPane>
                {/* <TabPane tab={'规则'} key={4}> */}
                <TabPane tab={i18n[locale].rule} key={4}>
                  <div className={'searchWrapper'}>
                    <input
                      // placeholder={'请输入您要查找的规则'}
                      placeholder={i18n[locale].pleaseRule}
                      className={'search'}
                    />
                    <Icon className={'searchIcon'} type="uf-search" />
                  </div>
                  <div className={'menuWrapper'}>
                    <Menu mode={'inline'} onClick={_this.menuClick}>
                      {_this.state.ruleMenuList}
                    </Menu>
                  </div>
                </TabPane>
                {/* <TabPane tab={'微信'} key={4}> */}
                {isWechat?<TabPane tab={i18n[locale].wechat} key={0}>
                  <div className={'we-box'}>
                    <div className={'we-left'}>
                      <div className={'we-searchWrapper'}>
                        <input value={weLeftVal} onChange={this.weLeftSearch} type="text" className={'search-sm'}/>
                        <Icon
                          onClick={_this.weLeftSearch}
                          className={'searchIcon-sm'}
                          type="uf-search"
                        />
                      </div>
                      <ul className={'we-list'}>
                        {weList.map(item=>{
                          return <li><span className={weIndex === item.accountId?'we-click':''}
                            onClick={()=>this.weIndexChange(item.accountId)}
                          >{item.accountName}</span></li>
                        })}
                        
                      </ul>
                    </div>
                    <div className={'we-r'}>
                      <div className={'we-searchWrapper'}>
                        <input type="text" value={weSearchVal} onChange={this.weSearchAc} onKeyUp={this.weSearchUp} className={'search'}/>
                          <Icon
                            onClick={()=>this.weGetData(weIndex,weSearchVal)}
                            className={'searchIcon'}
                            type="uf-search"
                          />
                      </div>
                      <div>
                        <MultiSelectTable
                          id={'wechat'}
                          className={'wechaTable'}
                          scroll={{ y: 210 }}
                          columns={wechatMultiCol[locale]}
                          multiSelect={multiSelectType}
                          getSelectedDataFunc={_this.getWeList}
                          data={_this.state.weArray}
                          emptyText={()=>_this.props.emptyText(i18n[locale].noData)}
                        />
                      </div>
                    </div>
                  </div>
                </TabPane>:null}
                {/* 新增 */}
                {
                  tabConfig.map((item,index)=>{
                    if(item.tabType ==='table'){
                      return (
                      <TabPane id={item.tabMark} 
                        tab={<div style={{height:'100%'}}
                        onClick={(e)=>{
                          this.props.tabHandleFunc(item.tabMark,index,e)
                          this.tabHandleChange(item.tabName)
                        }}
                        >{item.tabName}</div>} key={index+5}>
                          <div className={'searchWrapper'}>
                            <input
                              value={_this.state.extends}
                              onChange={_this.inputChange.bind(this, 'extends')}
                              type="text"
                              onKeyUp={(e)=>item.tableConfig.enterSearchFunc(item.tabMark,e)}
                              placeholder={item.tableConfig.searchPlaceholder}
                              className={'search'}
                            />
                            <Icon
                              onClick={(e)=>item.tableConfig.clickSearchFunc(item.tabMark,e)}
                              className={'searchIcon'}
                              type="uf-search"
                            />
                          </div>
                          <MultiSelectTable
                            scroll={{ y: 210 }}
                            // columns={multiColumns}
                            columns={item.tableConfig.tableColumns}
                            multiSelect={multiSelectType}
                            getSelectedDataFunc={_this.getExtend}
                            data={_this.state.roleShowList}
                            emptyText={() => _this.props.emptyText(i18n[locale].noData)}
                          />
                          <Pagination
                            className={'selector_pagination'}
                            first
                            last
                            prev
                            next
                            locale={pageLocale[this.props.locale]}
                            maxButtons={5}
                            boundaryLinks
                            total={_this.props.pageTotal}
                            activePage={_this.state.extendPageIndex}
                            items={_this.props.pageItems}
                            onSelect={(index)=>this.extendPageSelect(item.tabMark,index)}
                          />
                      </TabPane>
                    )
                    }
                    if(item.tabType === 'tree'){
                      return (
                        <TabPane tab={item.tabName}
                          // @ts-ignore
                          tab={<div style={{height:'100%'}} 
                          onClick={(e)=>{
                            this.props.tabHandleFunc(item.tabMark,index,e)
                            this.tabHandleChange(item.tabName)
                          }}
                          >{item.tabName}</div>} key={index+5}
                        >
                        <div className={'searchWrapper'}>
                          <input
                            onChange={_this.searchOrgTree}
                            // placeholder={'请输入您要查找的组织'}
                            placeholder={i18n[locale].pleaseOrg}
                            className={'search'}
                          />
                          <Icon
                            onClick={_this.clickSearch}
                            className={'searchIcon'}
                            type="uf-search"
                          />
                        </div>
                        <div className={'clearfix'}>
                          <div className={'myTree'}>
                            <Tree
                              showIcon
                              cancelUnSelect={true}
                              checkedKeys={_this.state.selectedOtherList.map(val=>{
                                if(val.type === item.tabName){
                                  return val.orgId
                                }
                              })}
                              checkable
                              checkStrictly
                              onExpand={_this.onTreeExpand}
                              autoExpandParent={_this.state.autoTreeExpandParent}
                              expandedKeys={_this.state.orgTreeExpandedKeys}
                              // onSelect={_this.treeOnSelect}
                              onCheck={_this.ExpandedTreeOnCheck}>
                              {loopData(_this.state.exendTreeList)}
                            </Tree>
                          </div>
                        </div>
                      </TabPane>
                      )
                    }
                  })
                }
              </Tabs>
            </div>
            <div className={'right'}>
              <div>
                <div className={`selectedUser clearfix`}>
                  {/* <p className={'fll mt12'}>用户</p> */}
                  <p className={'fll mt12'}>{i18n[locale].user}</p>
                  <p className={'flr mt12'}>
                    <span className={'color-selected'}>
                      {/* 已选：{_this.state.selectedCount} */}
                      {i18n[locale].choose}：{_this.state.selectedUserData.length}
                    </span>
                    <span
                      className={'clear'}
                      onClick={_this.deSelectAll.bind(this, 1)}>
                      {/* 清空 */}
                      {i18n[locale].clean}
                    </span>
                  </p>
                </div>
                <Table
                  scroll={{ y: 130 }}
                  columns={selectedUserCol[locale]}
                  data={_this.state.selectedUserData}
                  hoverContent={_this.hoverDelIcon}
                  onRowHover={_this.onRowHover}
                  emptyText={()=>_this.props.emptyText(i18n[locale].noData)}
                />
              </div>
              <div>
                <div className={`selectedUser clearfix`}>
                  {/* <p className={'fll mt12'}>其他</p> */}
                  <p className={'fll mt12'}>{i18n[locale].other}</p>
                  <p className={'flr mt12'}>
                    <span className={'color-selected'}>
                      {/* 已选：{_this.state.selectedOtherCount} */}
                      {i18n[locale].choose}：{_this.state.selectedOtherList.length}
                    </span>
                    <span
                      className={'clear'}
                      onClick={_this.deSelectAll.bind(this, 0)}>
                      {/* 清空 */}
                      {i18n[locale].clean}
                    </span>
                  </p>
                </div>
                <Table
                  scroll={{ y: 130 }}
                  columns={selectedUserCol[locale]}
                  data={_this.state.selectedOtherList}
                  hoverContent={_this.hoverDelOtherIcon}
                  onRowHover={_this.onRowOtherHover}
                  emptyText={()=>_this.props.emptyText(i18n[locale].noData)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={_this.close} className={'cancelBtn'}>
            {/* 取消 */}
            {i18n[locale].cacel}
          </Button>
          <Button onClick={_this.confirm} colors={'primary'}>
            {/* 确定 */}
            {i18n[locale].accept}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

Selector.defaultProps = defaultProps
Selector.propTypes = propTypes

export default Selector
