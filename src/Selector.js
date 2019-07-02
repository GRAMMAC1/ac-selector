import React from 'react'
import PropTypes from 'prop-types'

import { Modal,Button,Icon,Checkbox,Tabs,Tree,Pagination,Menu } from 'tinper-bee'
import Table from 'bee-table';
import multiSelect from 'tinper-bee/lib/multiSelect'
import { selectedUserCol,roleMultiCol,orgCol,multiColumns } from './colmuns'
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
  setOtherReciving 
} from './utils'

let MultiSelectTable = multiSelect(Table, Checkbox)

const { TabPane } = Tabs
const TreeNode = Tree.TreeNode

const noop = function () {}

const propTypes = {
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.string,
  selectedUser: PropTypes.array,
  selectedOther: PropTypes.array,
  documentNo: PropTypes.string
}

const defaultProps = {
  show: false,
  onConfirm: noop,
  onClose: noop,
  selectedUser: [],
  selectedOther: [],
  mode: 'daily',
  documentNo: ''
}

class Selector extends React.Component {
  constructor() {
    super()
    this.state = {
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
        total: 40
      },
      rolePage: {
        activePage: 1, // 当前第几页
        items: 1, // 总页数
        total: 40, // 总数
      },
      orgSelectedKeys: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    let _newOtherList = nextProps.selectedOther.map(item => {
      switch (item.typeCode) {
        case 1:
          item.key = item.roleId
          item.reciving = item.roleName
          return item
        default:
          break;
      }
    })
    let _newUserList = nextProps.selectedUser.map(item => {
      item.key = item.id
      item.reciving = `${item.name}(${item.dept})`
      return item
    })
    this.setState({
      show: nextProps.show,
      selectedOtherList: _newOtherList,
      selectedOtherCount: _newOtherList.length,
      selectedUserData: _newUserList,
      selectedCount: _newUserList.length
    })
  }

  componentDidMount() {
    const { mode } = this.props
    switch (mode) {
      case 'dev':
        this.setState({
          prefixUrl: 'http://iuap-message-platform-web.test.app.yyuap.com/message-platform-web'
        })
        break;
      case 'daily':
        this.setState({
          prefixUrl: 'https://u8cmsg-daily.yyuap.com/message-platform-web'
        })
      default:
        this.setState({
          prefixUrl: 'https://u8cmsg-daily.yyuap.com/message-platform-web'
        })
        break;
    }
  }

  // 进入modal首先加载用户列表
  didFinish = () => {
    let { selectedUser,selectedOther } = this.props
    this.setState({
      selectedUserData: setUserReciving(selectedUser),
      selectedOtherList: setOtherReciving(selectedOther)
    })
    const url = `${this.state.prefixUrl}/user/staff/search?pageSize=40&pageNo=1&keyword=`
    requestGet(url).then(response => {
      if(response.status === 1 && response.data !== null) {
        const { selectedUser } = this.props
        let _newList = resetChecked(response.data.values, 'userid')
        let res = setChecked(_newList, selectedUser, 'userid')
        let obj = {
          activePage: response.data.currentPage,
          items: response.data.totalPages,
          total: response.data.pageSize
        }
        this.setState({
          multiShowList: res,
          staffPage: obj
        })
      }
    }).catch(error => {
      throw new Error(error)
    })
  }
  // 搜索
  search = (e) => {
    const { activeKey } = this.state,
          _this = this
    let url = ''
    if(activeKey === '1') {
      url = `${_this.state.prefixUrl}/user/staff/search?pageSize=40&pageNo=1&keyword=${e.target.value}`
    } else if(activeKey === '2') {
      url = `${_this.state.prefixUrl}/user/role/search?pageSize=40&pageNo=1&keyword=${e.target.value}`
    }
    if(e.keyCode === 13 || e.keyCode === 108) {
      requestGet(url).then(response => {
        if(response.status === 1 && response.data !== null) {
          if(activeKey === '1') {
            let _list = [],
                obj = {
                  activePage: response.data.currentPage,
                  items: response.data.totalPages,
                  total: response.data.pageSize
                }
            _list = response.data.values.map(item => {
              item.key = item.userid
              item._checked =false
              return item
            })
            this.setState({
              multiShowList: _list,
              staffPage: obj
            })
          } else if(activeKey === '2') {
            let _list = [],
                obj = {
                  activePage: response.data.currentPage,
                  items: response.data.totalPages,
                  total: response.data.pageSize
                }
            _list = response.data.values.map(item => {
              item.key = item.roleId
              item._checked = false
              return item
            })
            this.setState({
              roleShowList: _list,
              rolePage: obj
            })
          }
        }
      }).catch(error => {
        throw new Error(error)
      })
    }
  } 
  clickSearch = () => {
    const _this = this
    let searchUrl
    const { activeKey,staffInputValue,roleInputValue } = this.state
    if(activeKey === '1') {
      searchUrl = `${_this.state.prefixUrl}/user/staff/search?pageSize=40&pageNo=1&keyword=${staffInputValue}`
    } else {
      searchUrl = `${_this.state.prefixUrl}/user/role/search?pageSize=40&pageNo=1&keyword=${roleInputValue}`
    }
    requestGet(searchUrl).then(response => {
      if(response.status === 1 && response.data !== null) {
        if(activeKey === '1') {
          let _list = [],
              obj = {
                activePage: response.data.currentPage,
                items: response.data.totalPages,
                total: response.data.pageSize
              }
          _list = response.data.values.map(item => {
            item.key = item.userid
            item._checked =false
            return item
          })
          this.setState({
            multiShowList: _list,
            staffPage: obj
          })
        } else if(activeKey === '2') {
          let _list = [],
              obj = {
                activePage: response.data.currentPage,
                items: response.data.totalPages,
                total: response.data.pageSize
              }
          _list = response.data.values.map(item => {
            item.key = item.roleId
            item._checked = false
            return item
          })
          this.setState({
            roleShowList: _list,
            rolePage: obj
          })
        }
      }
    }).catch(err => { throw new Error(err) })
  }
  
  inputChange = (type,e) => {
    this.setState({
      [type]: e.target.value
    })
  }
  // 动态渲染删除图标
  hoverDelIcon = () => {
    return (
      <Icon onClick={this.delItem} className={'deleteIcon'} type={'uf-close'} />
    )
  }
  // 删除某一项
  delItem = () => {
    let { activeKey } = this.state
    if(activeKey === '1') {
      let { multiShowList,selectedUserData } = this.state
      multiShowList = multiShowList.map(item => {
        if(item.userid === selectedUserData[this.delIndex].userid) {
          item._checked = false
          return item
        }
      })
      selectedUserData.splice(this.delIndex, 1)
      this.setState({
        selectedUserData: [...selectedUserData],
        selectedCount: selectedUserData.length
      })
    } else if(activeKey === '2') {
      let { roleShowList,selectedOtherList } = this.state
      roleShowList = roleShowList.map(item => {
        if(item.roleId === selectedOtherList[this.delIndex].roleId) {
          item._checked = false
          return item
        }
      })
      selectedOtherList.splice(this.delIndex, 1)
      this.setState({
        selectedOtherList: [...selectedOtherList],
        selectedOtherCount: selectedOtherList.length,
      })
    } else {
      let { selectedOtherList } = this.state
      let res = [...selectedOtherList]
      res.splice(this.delIndex, 1)
      this.setState({
        selectedOtherList: [...res]
      })
    }
  }
  onRowHover = (index) => {
    this.delIndex = index
  }
  // 获得选择的用户列表
  getUserList = (data) => {
    let { defaultLabel,multiShowList } = this.state
    let _tempList = []
    let res = resetChecked(multiShowList, 'userid')
    res = setChecked(multiShowList, data, 'userid')
    res.forEach(item => {
      if(item._checked) {
        let _item = {
          key: item.userid,
          type: defaultLabel,
          reciving: item.orgName ? `${item.username}(${item.orgName})` : `${item.username}(未知部门)`,
          userid: item.userid,
          username: item.username,
          email: item.email,
          typeCode: 0,
          mobile: item.mobile,
          orgName: item.orgName ? item.orgName : '未知部门'
        }
        _tempList.push(_item)
      }
    })
    this.setState({
      multiShowList: [...multiShowList],
      selectedUserData: [..._tempList],
      selectedCount: _tempList.length
    })
  }
  // 获取角色列表
  getRoleList = (data) => {
    let { roleShowList,defaultLabel,selectedOtherList } = this.state
    let _checkedList = []
    roleShowList = resetChecked(roleShowList, 'roleId')
    let res = setChecked(roleShowList, data, 'roleId')
    res.forEach(item => {
      if(item._checked) {
        let _item = {
          key: item.roleId,
          type: defaultLabel,
          typeCode: 1,
          reciving: item.roleName,
          roleName: item.roleName,
          roleCode: item.roleCode,
          roleId: item.roleId,
        }
        _checkedList.push(_item)
    }})
    let newOtherList = selectedOtherList.concat(_checkedList)
    newOtherList = this.uniqueByAttr(newOtherList, 'roleId')
    this.setState({
      selectedOtherList: [...newOtherList],
      roleShowList,
      selectedOtherCount: _checkedList.length
    })
  }
  // 数组根据属性去重
  uniqueByAttr = (arr, type) => {
    const res = new Map()
    return arr.filter(item => {
      if(item[type] !== 'undefined') {
        return !res.has(item[type]) && res.set(item[type], 1)
      }
    })
  }
  // 清空选择人
  deSelectAll = (code,e) => {
    e.stopPropagation()
    if(code) {
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
    }else {
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
      activeKey: '1',
      multiShowList: [],
      roleShowList: [],
      selectedUserData: [],
      selectedOtherList: [],
      selectedCount: 0,
      selectedOtherCount: 0,
      staffInputValue: '',
      roleInputValue: '',
      orgSelectedKeys: []
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
    let { selectedUserData,selectedOtherList } = this.state
    let userList = mapUserList(selectedUserData)
    let otherList = mapOtherList(selectedOtherList)
    this.reset()
    console.log(userList, otherList)
    this.props.onConfirm(userList, otherList)
  }
  //
  onChange = (activeKey) => {
    const _this = this
    this.setState({
      activeKey,
      defaultLabel: setLabel(activeKey),
    })
    if(activeKey === '2') {
      const url = `${_this.state.prefixUrl}/user/role/search?pageSize=40&pageNo=1&keyword=`
      let { roleShowList } = this.state
      if(!roleShowList.length) {
        requestGet(url).then(response => {
          if(response.status === 1 && response.data !== null) {
            const { selectedOther } = this.props
            let _page = {
              activePage: response.data.currentPage,
              items: response.data.totalPages,
              total: response.data.pageSize
            }
            this.setState({
              rolePage: _page
            })
            let _newList = resetChecked(response.data.values, 'roleId')
            let res = setChecked(_newList, selectedOther, 'roleId')
            this.setState({
              roleShowList: res
            })
          }
        }).catch(error => {
        throw new Error(error)
        })
      }
    }else if(activeKey === '3') {
      let { selectedOtherList } = this.state
      const url = `${_this.state.prefixUrl}/user/org/list?pageSize=40&pageNo=1&orgIds=`
      requestGet(url).then(response => {
        if(response.status === 1) {
          this.setState({
            orgTreeList: response.data
          })
          if(selectedOtherList.length) {
            let checkedKeys = []
            checkedKeys = selectedOtherList.filter(t => {
              if(t.typeCode === 2) {
                return t.checkedKey
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
      }).catch(error => { throw new Error(error) })
    } else if(activeKey === '4') {
      const url = `${_this.state.prefixUrl}/user/rules?documentNo=${this.props.documentNo}`
      requestGet(url).then(response => {
        if(response.status === 1) {
          this.setState({
            ruleMenuList: transferToMenu(response.data)
          })
        }
      }).catch(err => { throw new Error(err) })
    }
  }
  // tree select
  treeOnSelect = (info) => {
    let url = `${this.state.prefixUrl}//user/org/user?pageSize=40&pageNo=1&orgIds=['${info}']`
    requestGet(url).then(response => {
      if(response.status === 1) {
        let _newList = resetChecked(response.data, 'userid')
        this.setState({
          orgShowList: _newList
        })
      }
    }).catch(error => { throw new Error(error) })
  }
  // tree check
  treeOnCheck = (info, e) => {
    const { defaultLabel } = this.state
    let { selectedOtherList } = this.state
    let checkedNodes = [...e.checkedNodes]
    selectedOtherList.forEach((t, i) => {
      if(t.typeCode === 2) {
        selectedOtherList.splice(i, 1)
      }
    })
    let tempRes = checkedNodes.map((t, i) => ({
      key: info[i],
      type: defaultLabel,
      typeCode: 2,
      reciving: t.props.title,
      orgName: t.props.title,
      orgId: info[i]
    }))
    let res = selectedOtherList.concat(tempRes)
    this.setState({
      selectedOtherList: [...res],
      selectedOtherCount: res.length,
      orgSelectedKeys: [...info]
    })
  }
  // 角色分页
  roleSelect = (e) => {
    const _this = this
    let url = `${_this.state.prefixUrl}/user/role/search?pageSize=40&pageNo=${e}&keyword=`
    let { selectedOtherList } = this.state
    requestGet(url).then(response => {
      if(response.status === 1 && response.data !== null) {
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
    }).catch(err => { throw new Error(err) })
  }
  // 用户分页
  staffSelect = (e) => {
    const _this = this
    let url = `${_this.state.prefixUrl}/user/staff/search?pageSize=40&pageNo=${e}&keyword=`
    requestGet(url).then(response => {
      if(response.status === 1 && response.data !== null) {
        let obj = {
          activePage: e,
          items: response.data.totalPages,
          total: response.data.pageSize
        }
        let res = resetChecked(response.data.values, 'userid')
        this.setState({
          staffPage: obj,
          multiShowList: res
        })
      }
    }).catch(err => { throw new Error(err) })
  }
  menuClick = ({ key }) => {
    let { selectedOtherList } = this.state
    const ruleName = key.substring(key.indexOf('&') + 1)
    const ruleCode = key.substring(1, key.lastIndexOf('-'))
    const menuItem = {
      key,
      type: this.state.defaultLabel,
      typeCode: 3,
      ruleCode,
      ruleName,
      reciving: ruleName
    }
    let res = [...selectedOtherList.concat(menuItem)]
    this.setState({
      selectedOtherList: res,
      selectedOtherCount: res.length
    })
  } 

  render() {
    const _this = this
    const loopData = data => data.map(item => {
      if(item.childs) {
        return (
          <TreeNode title={item.orgName} key={item.orgId} icon={ item.parentId ? <Icon type={'uf-users'} /> : <Icon type={'uf-group-2'} />}>
            {loopData(item.childs)}
          </TreeNode>
        )
      }
      return <TreeNode title={item.orgName} key={item.orgId} icon={<Icon type={'uf-users'} />} isLeaf={true}></TreeNode>
    })
    return (
        <Modal
          onEntered={_this.didFinish}
          onHide={_this.close}
          show={_this.state.show}
          width={1200}
          className={'selectModalContainer'}
          dialogClassName={'selectDialog'}
          backdrop={true}
        >
          <Modal.Header
            closeButton
          >
            <span className={'headerTitle'}>添加消息接收人</span>
          </Modal.Header>
          <Modal.Body
            className={'selectModalBody'}
          >
            <div className={'selectContainer clearfix'}>
              <div className={'left'}  id={'user'}>
                <Tabs
                  defaultActiveKey={"1"}
                  activeKey={_this.state.activeKey}
                  onChange={this.onChange}
                  className={'deptTitle'}
                >
                  <TabPane 
                    tab={'用户'} 
                    key={1} 
                  >
                    <div className={'searchWrapper'}>
                      <input value={_this.state.staffInputValue} onChange={_this.inputChange.bind(this, 'staffInputValue')} type='text' onKeyUp={_this.search} placeholder={'请输入您要查找的用户'} className={'search'} />
                      <Icon onClick={_this.clickSearch} className={'searchIcon'} type='uf-search' />
                    </div>
                    <MultiSelectTable 
                      scroll={{y: 360}}
                      columns={multiColumns}
                      multiSelect={multiSelectType}
                      getSelectedDataFunc={_this.getUserList}
                      data={_this.state.multiShowList}
                    />
                    <Pagination 
                      className={'selector_pagination'}
                      first
                      last
                      prev
                      next
                      maxButtons={5}
                      boundaryLinks
                      total={_this.state.staffPage.total}
                      activePage={_this.state.staffPage.activePage}
                      items={_this.state.staffPage.items}
                      onSelect={_this.staffSelect}
                    />
                  </TabPane>
                  <TabPane tab={'角色'} key={2} >
                    <div className={'searchWrapper'}>
                      <input value={_this.state.roleInputValue} onChange={_this.inputChange.bind(this, 'roleInputValue')} type='text' placeholder={'请输入您要查找的角色'} onKeyUp={_this.search} className={'search'} />
                      <Icon onClick={_this.clickSearch} className={'searchIcon'} type='uf-search' />
                    </div>
                    <MultiSelectTable 
                      id={'role'}
                      scroll={{y: 360}}
                      columns={roleMultiCol}
                      multiSelect={multiSelectType}
                      getSelectedDataFunc={_this.getRoleList}
                      data={_this.state.roleShowList}
                    />
                    <Pagination 
                      className={'selector_pagination'}
                      first
                      last
                      prev
                      next
                      maxButtons={5}
                      boundaryLinks
                      total={_this.state.rolePage.total}
                      activePage={_this.state.rolePage.activePage}
                      items={_this.state.rolePage.items}
                      onSelect={_this.roleSelect}
                    />
                  </TabPane>
                  <TabPane tab={'组织'} key={3}>
                    <div className={'searchWrapper'}>
                      <input placeholder={'请输入您要查找的组织'} className={'search'} />
                      <Icon onClick={_this.clickSearch} className={'searchIcon'} type='uf-search' />
                    </div>
                    <div className={'clearfix'}>
                      <div className={'myTree'}>
                        <Tree
                          showIcon
                          cancelUnSelect={true}
                          checkedKeys={_this.state.orgSelectedKeys}
                          checkable
                          onSelect={_this.treeOnSelect}
                          onCheck={_this.treeOnCheck}
                        >
                          {loopData(_this.state.orgTreeList)}
                        </Tree>
                      </div>
                      <div className={'orgTable'}>
                        <Table 
                          scroll={{y: 440}}
                          columns={orgCol}
                          data={_this.state.orgShowList}
                        />
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab={'规则'} key={4}>
                    <div className={'searchWrapper'}>
                      <input placeholder={'请输入您要查找的规则'} className={'search'} />
                      <Icon className={'searchIcon'} type='uf-search' />
                    </div>
                    <div className={'menuWrapper'}>
                      <Menu
                        mode={'inline'}
                        onClick={_this.menuClick}
                      >
                        {_this.state.ruleMenuList}
                      </Menu>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
              <div className={'right'}>
                <div>
                  <div className={`selectedUser clearfix`}>
                    <p className={'fll mt12'}>用户</p>
                    <p className={'flr mt12'}>
                      已选：{_this.state.selectedCount}
                      <span onClick={_this.deSelectAll.bind(this, 1)}>清空</span>
                    </p>
                  </div>
                  <Table 
                    scroll={{y: 200}}
                    columns={selectedUserCol}
                    data={_this.state.selectedUserData}
                    hoverContent={_this.hoverDelIcon}
                    onRowHover={_this.onRowHover}
                  />
                </div>
                <div>
                  <div className={`selectedUser clearfix`}>
                    <p className={'fll mt12'}>其他</p>
                    <p className={'flr mt12'}>
                      已选：{_this.state.selectedOtherCount}
                      <span onClick={_this.deSelectAll.bind(this, 0)}>清空</span>
                    </p>
                  </div>
                  <Table 
                    scroll={{y: 200}}
                    columns={selectedUserCol}
                    data={_this.state.selectedOtherList}
                    hoverContent={_this.hoverDelIcon}
                    onRowHover={_this.onRowHover}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={_this.close} className={'cancelBtn'}>取消</Button>
            <Button onClick={_this.confirm} colors={'primary'}>确定</Button>
          </Modal.Footer>
        </Modal>
    )
  }
}

Selector.defaultProps = defaultProps
Selector.propTypes = propTypes

export default Selector