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
  let res = []
  for(let i = 0; i < source.length; i ++) {
    for(let j = 0; j < ref.length; j ++) {
      if(source[i][type] === ref[j][type]) {
        source[i]._checked = true
      }
    }
  }
  res = [...source]
  return res
}

// 为传进来的数据设置key和reciving,可以在右侧展示
export const setUserReciving = source => {
  let res = source.map(t => (
    Object.assign({}, t, {
      key: t.userid,
      reciving: `${t.username}(${t.orgName})`
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
          key: t.ruleCode
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
        var k = `${value.code}-menu-${key}&${value.name}`;
        var v = value.displayName || value.name;
        subMenu.push(
            <SubMenu key={k} title={<span>{v}</span>}>
            {
              value.attrs ? transferToMenu(value.attrs):null
            }
            </SubMenu>
        )
    }else{
        var k = `${value.code}-submenu-${key}&${value.name}`;
        var v = value.displayName || value.name;
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
          ruleName: t.ruleName
        }
      default:
        return []
    }
  })
  return res
}