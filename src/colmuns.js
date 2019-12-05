import React from 'react'
import * as lang from './lang'

export const selectedUserCol = {
  zh_CN: [
    {
      key: 'serialNumber',
      title: '序号',
      dataIndex: 'number',
      width: 100,
      render: (text, record, index) => <span>{index + 1}</span>
    },
    { key: 'type', title: '类型', dataIndex: 'type', width: 100 },
    { key: 'recivingObj', title: '接收对象', dataIndex: 'reciving', width: 250 }
  ],
  zh_TW: [
    {
      key: 'serialNumber',
      title: '序號',
      dataIndex: 'number',
      width: 100,
      render: (text, record, index) => <span>{index + 1}</span>
    },
    { key: 'type', title: '類型', dataIndex: 'type', width: 100 },
    { key: 'recivingObj', title: '接收對象', dataIndex: 'reciving', width: 250 }
  ],
  en_US: [
    {
      key: 'serialNumber',
      title: 'SN',
      dataIndex: 'number',
      width: 100,
      render: (text, record, index) => <span>{index + 1}</span>
    },
    { key: 'type', title: 'Type', dataIndex: 'type', width: 100 },
    {
      key: 'recivingObj',
      title: 'Receiving Object',
      dataIndex: 'reciving',
      width: 250
    }
  ]
}

export const roleMultiCol = locale => (
  [
    { key: 'rolename', title: lang[locale].roleId, dataIndex: 'roleName', width: 100 },
    { key: 'rolecode', title: lang[locale].roleName, dataIndex: 'roleCode' }
  ]
) 

export const orgCol = {
  zh_CN: [
    { key: 'orgName', title: '姓名', dataIndex: 'username', width: 150 },
    { key: 'orgMail', title: '账号(邮箱)', dataIndex: 'email', width: 150 },
    { key: 'orgPhone', title: '手机', dataIndex: 'mobile', width: 131 }
  ],
  zh_TW: [
    { key: 'orgName', title: '姓名', dataIndex: 'username', width: 150 },
    { key: 'orgMail', title: '賬號(郵箱)', dataIndex: 'email', width: 150 },
    { key: 'orgPhone', title: '手機', dataIndex: 'mobile', width: 131 }
  ],
  en_US: [
    { key: 'orgName', title: 'Name', dataIndex: 'username', width: 150 },
    { key: 'orgMail', title: 'Account(Email)', dataIndex: 'email', width: 150 },
    {
      key: 'orgPhone',
      title: 'Cellphone Number',
      dataIndex: 'mobile',
      width: 131
    }
  ]
}

// export const multiColumns = [
//   { key: 'name', title: '姓名', dataIndex: 'username', width: 100 },
//   { key: 'orgName', title: '部门', dataIndex: 'orgName', width: 200 },
//   { key: 'account', title: '账号(邮箱)', dataIndex: 'email', width: 200 },
//   { key: 'phone', title: '手机号码', dataIndex: 'mobile', width: 150 }
// ]
export const multiColumns = {
  zh_CN: [
    { key: 'name', title: '姓名', dataIndex: 'username', width: 100 },
    { key: 'orgName', title: '部门', dataIndex: 'orgName', width: 200 },
    { key: 'account', title: '账号(邮箱)', dataIndex: 'email', width: 200 },
    { key: 'phone', title: '手机号码', dataIndex: 'mobile', width: 150 }
  ],
  zh_TW: [
    { key: 'name', title: '姓名', dataIndex: 'username', width: 100 },
    { key: 'orgName', title: '部門', dataIndex: 'orgName', width: 200 },
    { key: 'account', title: '賬號(郵箱)', dataIndex: 'email', width: 200 },
    { key: 'phone', title: '手機號碼', dataIndex: 'mobile', width: 150 }
  ],
  en_US: [
    { key: 'name', title: 'Name', dataIndex: 'username', width: 100 },
    { key: 'orgName', title: 'Department', dataIndex: 'orgName', width: 200 },
    { key: 'account', title: 'Account(Email)', dataIndex: 'email', width: 200 },
    { key: 'phone', title: 'Cellphone Number', dataIndex: 'mobile', width: 150 }
  ]
}

export const filterCaptial = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]

export const selectData = [
  {
    key: '1249795575075072',
    orgId: '1249795575075072',
    orgName: 'zbl公司222',
    type: '组织',
    typeCode: 2,
    reciving: 'zbl公司222'
  },
  {
    key: '1249799305859328',
    orgId: '1249799305859328',
    orgName: 'zbl部门1',
    type: '组织',
    typeCode: 2,
    reciving: 'zbl部门1'
  },
  {
    key: '12',
    ruleCode: '12',
    ruleName: '修改人5',
    type: '规则',
    typeCode: 3,
    reciving: 'zbl部门1'
  }
]

export const selectedUser = [
  {
    key: 'a1e8075a-93c3-4552-9a06-e05128ee34b7',
    orgName: '未知部门',
    email: 'zhaojian770627@163.com',
    username: 'zhaojianc',
    mobile: '18601913836',
    type: '用户',
    userid: 'a1e8075a-93c3-4552-9a06-e05128ee34b7',
    typeCode: 0,
    reciving: 'zhaojianc'
  }
]
