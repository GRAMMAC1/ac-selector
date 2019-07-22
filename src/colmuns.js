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
  { key: 'orgName', title: '姓名', dataIndex: 'username', width: 150 },
  { key: 'orgMail', title: '账号(邮箱)', dataIndex: 'email', width: 150 },
  { key: 'orgPhone', title: '手机', dataIndex: 'mobile', width: 131 }
]

export const multiColumns = [
  { key: 'name', title: '姓名', dataIndex: 'username', width: 100 },
  { key: 'orgName', title: '部门', dataIndex: 'orgName', width: 200 },
  { key: 'account', title: '账号(邮箱)', dataIndex: 'email', width: 200 },
  { key: 'phone', title: '手机号码', dataIndex: 'mobile', width: 150 }
]

export const filterCaptial = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']


export const selectData = [
  {
    orgId: "1249795575075072",
    orgName: "zbl公司",
    type: "组织",
    typeCode: 2
  },
  {
    orgId: "1249799305859328",
    orgName: "zbl部门",
    type: "组织",
    typeCode: 2
  },
  {
    ruleCode: "12",
    ruleName: "修改人",
    type: "规则",
    typeCode: 3
  }
]

export const selectedUser = [
  {
    orgName: "未知部门",
    email: "zhaojian770627@163.com",
    username: "zhaojianc",
    mobile: "18601913836",
    type: "用户",
    userid: "a1e8075a-93c3-4552-9a06-e05128ee34b7",
    typeCode: 0
  },
  {
    orgName: "未知部门",
    email: "zongtf3@yonyou.com",
    username: "18610018262",
    mobile: "18610018262",
    type: "用户",
    userid: "1b1123f0-5d62-41fe-b619-15922397f917",
    typeCode: 0
  },
  {
    orgName: "未知部门",
    email: "YHT-105-5841559369734972@yht.com",
    username: "aaa",
    mobile: "15810624300",
    type: "用户",
    userid: "d1ba5a77-def1-4e65-9457-7bae09ebb67f",
    typeCode: 0
  },
  {
    orgName: "FHR-02",
    email: "YHT-693-2561560322273290@yht.com",
    username: "zjc612",
    mobile: "13811111223",
    type: "用户",
    userid: "58cd6055-f8c0-4d51-a9d9-a733e4ef1872",
    typeCode: 0
  }
]