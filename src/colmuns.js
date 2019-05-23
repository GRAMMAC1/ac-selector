import React from 'react'

export const selectedUserCol = [
  { key: 'serialNumber', title: '序号', dataIndex: 'number', width: 100, render: (text, record, index) => <span>{index+1}</span> },
  { key: 'type', title: '类型', dataIndex: 'type', width: 100 },
  { key: 'recivingObj', title: '接收对象', dataIndex: 'reciving', width: 250 }
]

export const roleMultiCol = [
  { key: 'rolename', title: '角色名', dataIndex: 'roleName', width: 100 },
  { key: 'rolecode', title: '角色编码', dataIndex: 'roleCode' }
]

export const orgCol = [
  { key: 'orgName', title: '姓名', dataIndex: 'orgName', width: 150 },
  { key: 'orgMail', title: '账号(邮箱)', dataIndex: 'orgMail', width: 150 },
  { key: 'orgPhone', title: '手机', dataIndex: 'orgPhone' }
]

export const multiColumns = [
  { key: 'name', title: '姓名', dataIndex: 'username', width: 100 },
  { key: 'dept', title: '部门', dataIndex: 'dept', width: 200 },
  { key: 'account', title: '账号(邮箱)', dataIndex: 'email', width: 200 },
  { key: 'phone', title: '手机号码', dataIndex: 'mobile', width: 150 }
]

export const filterCaptial = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
