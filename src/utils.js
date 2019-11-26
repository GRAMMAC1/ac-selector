import React from 'react'
import { Menu } from 'tinper-bee'

const SubMenu = Menu.SubMenu

// 重置_checked属性为false && 为表格添加key
export function resetChecked (list, type) {
  if(!Array.isArray(list)) {
    throw new Error('the parameter must be `Array`')
  }
  let res = [...list]
  for(let i = 0; i < res.length; i ++) {
    res[i].key = res[i][type]
    res[i]._checked = false
  }
  return res
}

// 设置_checked属性为true
export function setChecked (source, ref, type) {
  let res = [], tempRes = [...source]
  for(let i = 0; i < tempRes.length; i ++) {
    for(let j = 0; j < ref.length; j ++) {
      if(tempRes[i][type] === ref[j][type]) {
        tempRes[i]._checked = true
      }
    }
  }
  res = [...tempRes]
  return res
}
// 非正式环境数据不全,补全用户列表为空的问题
export const addFullAttr = (data = []) => {
  let res = data.map((t, i) =>  ({
    key: t.key ? t.key : `userid-${i}`,
    _checked: t._checked,
    userid: t.userid ? t.userid : `userid-${i}`,
    username: t.username ? t.username : '未知姓名',
    email: t.email ? t.email : '未知邮箱',
    mobile: t.mobile ? t.mobile : '未知号码',
    orgName: t.orgName ? t.orgName : '未知部门',
  }))
  return res
}

// 为传进来的数据设置key和reciving,可以在右侧展示
export const setUserReciving = source => {
  let res = source.map(t => (
    Object.assign({}, t, {
      key: t.userid,
      reciving:  t.orgName ? `${t.username}(${t.orgName})` : t.username
    })
  ))
  return res
}

export const setOtherReciving = source => {
  let res = source.map(t => {
    switch (t.typeCode) {
      case 1:
        return Object.assign({}, t, {
          reciving: t.roleName,
          key: t.roleId
        })
      case 2: 
        return Object.assign({}, t, {
          reciving: t.orgName,
          key: t.orgId
        })
      case 3:
        return Object.assign({}, t, {
          reciving: t.ruleName,
          key: `${t.ruleCode}&${t.ruleName}`
        })
      default:
        return {}
    }
  })
  return res
}

// 根据activeKey设置不同的标签
export function setLabel (key) {
  switch (key) {
    case '1':
      return '用户'
    case '2': 
      return '角色'
    case '3':
      return '组织'
    case '4':
      return '规则'
  }
}

export const multiSelectType = {
  type: 'checkbox'
}

export const transferToMenu = (treeData) => {
  var subMenu = [], arr = []
  if(!(treeData instanceof Array)) {
    arr.push(treeData)
    treeData = arr.concat()
  }
  treeData.forEach((value,key) => {
    if('attrs' in value){
        var k = `${value.id}&${value.name}`;
        var v = value.name;
        subMenu.push(
            <SubMenu key={k} title={<span>{v}</span>}>
            {
              value.attrs ? transferToMenu(value.attrs):null
            }
            </SubMenu>
        )
    }else{
        var k = `${value.id}&${value.name}`;
        var v = value.name;
        subMenu.push(
            <Menu.Item key={k}>{v}</Menu.Item>
        )
    }
  })
  return subMenu;
}

export const mapUserList = (userList = []) => {
  let res = []
  res = userList.map(t => ({
    type: t.type,
    typeCode: t.typeCode,
    userid: t.userid,
    username: t.username,
    mobile: t.mobile,
    email: t.email,
    orgName: t.orgName,
  }))
  return res
}

export const mapOtherList = (otherList = []) => {
  let res = []
  res = otherList.map(t => {
    switch (t.typeCode) {
      case 1:
        return {
          type: t.type,
          typeCode: t.typeCode,
          roleId: t.roleId,
          roleName: t.roleName,
          roleCode: t.roleCode
        }
      case 2: 
        return {
          type: t.type,
          typeCode: t.typeCode,
          orgId: t.orgId,
          orgName: t.orgName
        }
      case 3:
        return {
          type: t.type,
          typeCode: t.typeCode,
          ruleCode: t.ruleCode,
          ruleName: t.ruleName,
          uri: t.uri
        }
      default:
        return []
    }
  })
  return res
}

/**
 * @description 选人逻辑统一处理,当前类型的人先清除，统一添加
 * @param data 数据源
 * @param typeCode 清除类型
 */
export const deSelect = (data = [], typeCode) => {
  let res = []
  res = data.filter(t => {
    if(t.typeCode !== typeCode) {
      return t
    }
  })
  return res
}
export const deSelectType = (data = [], type) => {
  let res = []
  res = data.filter(t => {
    if(t.type !== type) {
      return t
    }
  })
  return res
}

export const getUserId = (data = []) => {
  let res = data.map(t => t.userid)
  return res
}

export const getRoleId = (data = []) => {
  let res = data.map(t => t.roleId)
  return res
}
export const getKeyId = (data = []) => {
  let res = data.map(t => t.key)
  return res
}

export const getTreeItem = (data) =>{
  const arr = [];
  data.forEach(item=>{

  })
  return 
}