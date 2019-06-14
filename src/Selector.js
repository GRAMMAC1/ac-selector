import React from 'react'
import PropTypes from 'prop-types'

import { Modal,Button,Icon,Checkbox,Loading,Tabs,Tree } from 'tinper-bee'
import Table from 'bee-table';
import multiSelect from 'tinper-bee/lib/multiSelect'
import { selectedUserCol, roleMultiCol, orgCol, multiColumns } from './colmuns'
import { requestGet } from './request'

let MultiSelectTable = multiSelect(Table, Checkbox)

const { TabPane } = Tabs
const TreeNode = Tree.TreeNode

const noop = function () {}

const propTypes = {
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  remoteUserUrl: PropTypes.string.isRequired,
  remoteRoleUrl: PropTypes.string.isRequired,
  remoteOrgUrl: PropTypes.string
}

const defaultProps = {
  show: false,
  onConfirm: noop,
  onClose: noop,
  remoteUserUrl: '',
  remoteRoleUrl: '',
  remoteOrgUrl: ''
}

class Selector extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false,
      isLoading: true,
      filterIndex: '', // 根据首字母筛选用户
      selectedCount: 0, // 当前已选择的总数量
      selectedOtherCount: 0, //当前已选择的非用户数量
      selectedUserData: [], // 已选用户
      selectedOtherList: [], // 已选非用户List
      defaultLabel: '用户', // 默认显示的标签页
      multiShowList: [], // 用户列表
      roleShowList: [], // 角色列表
      orgShowList: [], // 规则列表
      orgTreeList: [], // 规则🌲
      activeKey: '1', // 当前激活的tab
      staffInputValue: '',
      roleInputValue: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    })
  }
  // 进入modal首先加载用户列表
  didFinish = () => {
    const {remoteUserUrl} = this.props
    requestGet(remoteUserUrl).then(response => {
      if(response.status === 1) {
        let _newList = response.data.map(item => {
          item.key = item.userid
          item._checked = false
          item.dept = '未知部门'
          return item
        })
        this.setState({
          multiShowList: _newList
        })
      }
      this.setState({
        isLoading: false
      })
    }).catch(error => {
      console.error(error)
    })
  }
  // 搜索
  search = (e) => {
    const { activeKey } = this.state
    let { remoteUserUrl, remoteRoleUrl } = this.props
    let url = ''
    if(activeKey == 1) {
      url = `${remoteUserUrl}${e.target.value}`
    } else if(activeKey == 2) {
      url = `${remoteRoleUrl}${e.target.value}`
    }
    if(e.keyCode === 13 || e.keyCode === 108) {
      requestGet(url).then(response => {
        if(response.status === 1) {
          if(activeKey == 1) {
            let _list = []
            _list = response.data.map(item => {
              item.key = item.userid
              item._checked =false
              return item
            })
            this.setState({
              multiShowList: _list
            })
          } else if(activeKey == 2) {
            let _list = []
            _list = response.data.map(item => {
              item.key = item.roleId
              item._checked = false
              return item
            })
            this.setState({
              roleShowList: _list
            })
          }
        }
      }).catch(error => {
        console.error(error)
      })
    }
    // if(e.target.keyCode)
  } 
  clickSearch = () => {
    let searchUrl
    const { remoteUserUrl, remoteRoleUrl } = this.props
    const { activeKey,staffInputValue,roleInputValue } = this.state
    if(activeKey == 1) {
      searchUrl = `${remoteUserUrl}${staffInputValue}`
    } else {
      searchUrl = `${remoteRoleUrl}${roleInputValue}`
    }
    requestGet(searchUrl).then(response => {
      let res = response.data
      res = res.map(item => {
        item._checked = false
        return item
      })
      if(activeKey == 1) {
        this.setState({
          multiShowList: res
        })
      } else {
        this.setState({
          roleShowList: res
        })
      }
    })
  }
  
  inputChange = (type,e) => {
    this.setState({
      [type]: e.target.value
    })
  }
  // 按首字母开头查找
  // searchUserByCapital = (index, e) => {
  //   e.stopPropagation()
  //   let { filterIndex } = this.state
  //   if(filterIndex === index) {
  //     this.setState({
  //       filterIndex: ''
  //     })
  //   } else {
  //     this.setState({
  //       filterIndex: index
  //     })
  //   }
  // }
  // 动态渲染删除图标
  hoverDelIcon = () => {
    return (
      <Icon onClick={this.delItem} className={'deleteIcon'} type={'uf-close'} />
    )
  }
  // 删除某一项
  delItem = () => {
    let { selectedUserData } = this.state
    selectedUserData.splice(this.delIndex, 1)
    this.setState({
      selectedUserData,
      selectedCount: selectedUserData.length
    })
  }
  onRowHover = (index) => {
    this.delIndex = index
  }
  // 获得选择的用户列表
  getUserList = (data) => {
    let { defaultLabel,multiShowList } = this.state
    let _tempList = []
    // 清空已选人
    multiShowList = multiShowList.map(item => {
      item._checked = false
      return item
    })
    for(let i = 0; i < multiShowList.length; i ++) {
      for(let j = 0; j < data.length; j ++) {
        if(multiShowList[i].userid === data[j].userid) {
          multiShowList[i]._checked = true
        }
      }
    }
    multiShowList.forEach(item => {
      if(item._checked) {
        let _item = {
          key: item.userid,
          number: item.userid,
          type: defaultLabel,
          reciving: `${item.username}(未知部门)`,
          userid: item.userid,
          username: item.username,
          email: item.email,
          dept: '未知部门',
          mobile: item.mobile
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
    let { roleShowList, defaultLabel } = this.state
    let _checkedList = []
    roleShowList = roleShowList.map(item => {
      item._checked = false
      return item
    })
    for(let i = 0; i < roleShowList.length; i ++) {
      for(let j = 0; j < data.length; j ++) {
        if(roleShowList[i].roleId === data[j].roleId) {
          roleShowList[i]._checked = true
        }
      }
    }
    // 将_checked为true的先保存一份
    roleShowList.forEach(item => {
      if(item._checked) {
        let _item = {
          key: item.roleId,
          number: item.roleId,
          type: defaultLabel,
          reciving: item.roleName,
          roleName: item.roleName,
          roleCode: item.roleCode,
          roleId: item.roleId,
        }
        _checkedList.push(_item)
    }})
    // selectedOtherList = [..._checkedList]
    // selectedOtherList = this.uniqueByRoleId(selectedOtherList)
    this.setState({
      selectedOtherList: [..._checkedList],
      roleShowList,
      selectedOtherCount: _checkedList.length
    })
  }
  // 角色->数组根据roleId属性去重
  uniqueByRoleId = (arr) => {
    const res = new Map()
    return arr.filter(item => {
      return !res.has(item.roleId) && res.set(item.roleId, 1)
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
  // 关闭模态框
  close = () => {
    // 清空上一次用户状态
    this.setState({
      activeKey: '1',
      multiShowList: [],
      roleShowList: [],
      selectedUserData: [],
      selectedOtherList: [],
      selectedCount: 0,
      selectedOtherCount: 0,
      isLoading: true
    })
    this.props.onClose()
  }
  /**
   * @description 确认选人
   */
  confirm = () => {
    let { selectedUserData,selectedOtherList } = this.state
    let userList = [], otherList = []
    if(selectedUserData.length) {
      userList = selectedUserData.map(item => {
        let _data = {
          id: item.userid,
          name: item.username,
          phone: item.mobile,
          email: item.email,
          dept: item.dept,
          type: item.type,
          typeCode: 0
        }
        return _data
      })
    }
    if(selectedOtherList.length) {
      otherList = selectedOtherList.map(item => {
        let typeCode = ''
        switch (item.type) {
          case '角色':
            typeCode = 1
            break;
          case '组织':
            typeCode = 2
            break
          case '规则':
            typeCode = 3
            break;
        }
        let _data = {
          type: item.type,
          roleName: item.roleName,
          roleId: item.roleId,
          roleCode: item.roleCode,
          typeCode
        }
        return _data
      })
    }
    this.setState({
      isLoading: true,
      activeKey: '1',
      multiShowList: [],
      roleShowList: [],
      selectedOtherList: [],
      selectedUserData: [],
      selectedCount: 0,
      selectedOtherCount: 0
    })
    console.log(userList, otherList)
    this.props.onConfirm(userList, otherList)
  }
  //
  onChange = (activeKey) => {
    this.setState({
      activeKey,
      isLoading: true
    })
    if(activeKey == 2) {
      const { remoteRoleUrl } = this.props
      let { roleShowList } = this.state
      if(!roleShowList.length) {
        requestGet(remoteRoleUrl).then(response => {
          if(response.status === 1) {
            let _newList = response.data.map(item => {
              item.key = item.roleId
              item._checked = false
              return item
            })
            this.setState({
              roleShowList: _newList
            })
          }
          this.setState({
            defaultLabel: '角色',
            isLoading: false
          })
        }).catch(error => {
        throw new Error(error)
      })
    } else {
        this.setState({
          defaultLabel: '角色',
          isLoading: false
        })
      }
    } else if(activeKey == 1) {
      const { remoteUserUrl } = this.props
      let { multiShowList } = this.state
      if(!multiShowList.length) {
        requestGet(remoteUserUrl).then(response => {
          if(response.status === 1) {
            let _newList = response.data.map(item => {
              item.key = item.userid
              item._checked = false
              return item
            })
            this.setState({
              multiShowList: _newList
            })
          } 
          this.setState({
            isLoading: false
          })
        }).catch(error => {
          console.error(error)
        })
      }
      this.setState({
        defaultLabel: '用户',
        isLoading: false
      })
    } else if(activeKey == 3) {
      const { remoteOrgUrl } = this.props
      this.setState({
        defaultLabel: '规则'
      })
      requestGet(remoteOrgUrl).then(response => {
        if(response.status === 1) {
          this.setState({
            orgTreeList: response.data
          })
        }
        this.setState({
          isLoading: false
        })
      }).catch(error => {
        console.error(error)
      })
    }
  }
  // tree select
  treeOnSelect = (info) => {
    const { remoteOrgUrl } = this.props
    requestGet(`http://iuap-message-platform-web.test.app.yyuap.com/message-platform-web/user/org/user?pageSize=40&pageNo=1&orgIds=[${info}]`).then(response => {
      if(response.status === 1) {
        let _newList = response.data.map(item => {
          return {
            key: item.userid,
            orgName: item.username,
            orgMail: item.email,
            orgPhone: item.mobile
          }
        })
        this.setState({
          orgShowList: _newList
        })
      }
    }).catch(error => {
      console.error(error)
    })
  }
  // tree check
  treeOnCheck = (info) => {
    let { selectedOtherList } = this.state
    console.log(info)
  }

  render() {
    const _this = this
    const multiSelect = {
      type: 'checkbox'
    }
    // const filterList = filterCaptial.map((item,index) => {
    //   return (
    //     <li 
    //       key={`alphabet-${index}`}
    //       className={_this.state.filterIndex === index ? 'choose' : null}
    //       onClick={_this.searchUserByCapital.bind(this, index)} 
    //     >
    //       {item}
    //     </li>
    //   ) 
    // })
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
                    {/* <ul className={`filterByCapital clearfix`}>
                      {filterList}
                    </ul> */}
                    <MultiSelectTable 
                      scroll={{y: 360}}
                      columns={multiColumns}
                      multiSelect={multiSelect}
                      getSelectedDataFunc={_this.getUserList}
                      data={_this.state.multiShowList}
                    />
                  </TabPane>
                  <TabPane tab={'角色'} key={2} >
                    <div className={'searchWrapper'}>
                      <input value={_this.state.roleInputValue} onChange={_this.inputChange.bind(this, 'roleInputValue')} type='text' placeholder={'请输入您要查找的角色'} onKeyUp={_this.search} className={'search'} />
                      <Icon onClick={_this.clickSearch} className={'searchIcon'} type='uf-search' />
                    </div>
                    <MultiSelectTable 
                      scroll={{y: 360}}
                      columns={roleMultiCol}
                      multiSelect={multiSelect}
                      getSelectedDataFunc={_this.getRoleList}
                      data={_this.state.roleShowList}
                    />
                  </TabPane>
                  {
                    // <TabPane tab={'组织'} key={3}>
                    //   <div className={'searchWrapper'}>
                    //     <input type='text' placeholder={'请输入您要查找的组织'} className={'search'} />
                    //     <Icon onClick={_this.clickSearch} className={'searchIcon'} type='uf-search' />
                    //   </div>
                    //   <div className={'clearfix'}>
                    //     <div className={'myTree'}>
                    //       <Tree
                    //         showIcon
                    //         cancelUnSelect={true}
                    //         checkable
                    //         onSelect={_this.treeOnSelect}
                    //         onCheck={_this.treeOnCheck}
                    //       >
                    //         {loopData(_this.state.orgTreeList)}
                    //       </Tree>
                    //     </div>
                    //     <div className={'orgTable'}>
                    //       <Table 
                    //         scroll={{y: 440}}
                    //         columns={orgCol}
                    //         data={_this.state.orgShowList}
                    //       />
                    //     </div>
                    //   </div>
                    // </TabPane>
                  }
                </Tabs>
                <Loading 
                  show={_this.state.isLoading}
                  container={() => document.getElementById('user')}
                  size={'sm'}
                />
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
                    // hoverContent={_this.hoverDelIcon}
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