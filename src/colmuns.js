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
  { key: 'orgPhone', title: '手机', dataIndex: 'orgPhone', width: 131 }
]

export const multiColumns = [
  { key: 'name', title: '姓名', dataIndex: 'username', width: 100 },
  { key: 'orgName', title: '部门', dataIndex: 'orgName', width: 200 },
  { key: 'account', title: '账号(邮箱)', dataIndex: 'email', width: 200 },
  { key: 'phone', title: '手机号码', dataIndex: 'mobile', width: 150 }
]

export const filterCaptial = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']


export const selectData = [
  {key:'c5d88199-b714-4be4-9a41-f66f9001cfb1', type: "角色", roleName: "服务商", roleId: "c5d88199-b714-4be4-9a41-f66f9001cfb1", roleCode: "AMMAN_SERVER", typeCode: 1},
  {key:'f2a439f4-46fb-4fad-84ab-83068adb2b8b',type: "角色", roleName: "组织管理员", roleId: "f2a439f4-46fb-4fad-84ab-83068adb2b8b", roleCode: "OrgManager", typeCode: 1},
  {key:'0f9a6f2e-e7d2-42ba-86b1-25e4c9c1d4b7', type: "角色", roleName: "门户模板管理员", roleId: "0f9a6f2e-e7d2-42ba-86b1-25e4c9c1d4b7", roleCode: "XTPortalManager", typeCode: 1}
]

export const selectedUser = [
  {
    dept: "未知部门",
    email: "zhaojian770627@163.com",
    id: "a1e8075a-93c3-4552-9a06-e05128ee34b7",
    name: "zhaojianc",
    phone: "18601913836",
    type: "用户",
    typeCode: 0
  },
  {
    dept: "未知部门",
    email: "zongtf3@yonyou.com",
    id: "1b1123f0-5d62-41fe-b619-15922397f917",
    name: "18610018262",
    phone: "18610018262",
    type: "用户",
    typeCode: 0
  },
  {
    dept: "未知部门",
    email: "YHT-105-5841559369734972@yht.com",
    id: "d1ba5a77-def1-4e65-9457-7bae09ebb67f",
    name: "aaa",
    phone: "15810624300",
    type: "用户",
    typeCode: 0
  },
  {
    dept: "FHR-02",
    email: "YHT-693-2561560322273290@yht.com",
    id: "58cd6055-f8c0-4d51-a9d9-a733e4ef1872",
    name: "zjc612",
    phone: "13811111223",
    type: "用户",
    typeCode: 0
  }
]