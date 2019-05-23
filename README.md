# ac-selector

[![npm version](https://img.shields.io/npm/v/ac-selector.svg)](https://www.npmjs.com/package/ac-selector)
[![Build Status](https://img.shields.io/travis/tinper-bee/ac-selector/master.svg)](https://www.travis-ci.org/GRAMMAC1/ac-selector.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/ac-selector/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/ac-selector?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/ac-selector.svg)](https://david-dm.org/tinper-bee/ac-selector#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/ac-selector.svg?style=flat)](https://npmjs.org/package/ac-selector)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/ac-selector.svg)](http://isitmaintained.com/project/tinper-bee/ac-selector "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/ac-selector.svg)](http://isitmaintained.com/project/tinper-bee/ac-selector "Percentage of issues still open")

## 简介

用友中台选人组件，目前只有智能产品部-消息组和预警在用。目前只支持从服务端获取数据。

## 依赖

- react >= 15.3.0
- react-dom >= 15.3.0
- prop-types >= 15.6.0

## 使用方法

```js
  npm i ac-Selector
  import Selector from 'ac-Selector'
  import 'ac-Selector/build/Selector.css'
```



## API

|参数|说明|类型|是否必填|默认值|返回值|
|:--|:---:|:--:|:--|:--:|:--:|
|show|是否显示模态框|`boolean`|是|`false`|无|
|onConfirm|确认回调函数|`func`|是|`() => {}`|选中的用户|
|onClose|取消回调函数|`func`|是|`() => {}`|无|
|remoteUserUrl|获取用户列表`url`|`string`|是|空|无|
|remoteRoleUrl|获取角色列表`url`|`string`|是|空|无|

### `onConfirm`回调函数参数说明
* 参数一(userList)数据结构
```js
  {
    id:'用户id',
    name:'用户名',
    dept:'用户部门',
    email:'用户邮箱',
    phone:'手机号',
    type:'所属类型(用户、角色、组织或规则)'
  }
```
* 参数二(otherList)数据结构
```js
  {
    roleId: '角色id',
    roleCode: '角色code',
    roleName: '角色名称',
    type: '所属类型(用户、角色、组织或规则)'
  }
```

## TODO
* 组织
* 规则