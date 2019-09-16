# ac-selector

[![Build Status](https://travis-ci.org/GRAMMAC1/ac-selector.svg?branch=master)](https://travis-ci.org/GRAMMAC1/ac-selector)

## 简介

用友中台选人组件，目前只有智能产品部-消息组和预警在用。目前只支持从服务端获取数据。

## 依赖

- react >= 15.3.0
- react-dom >= 15.3.0
- prop-types >= 15.6.0
- tinper-bee

## 使用方法

```js
  npm i ac-Selector
  import Selector from 'ac-Selector'
  import 'ac-Selector/build/Selector.css'
```



## API

|参数|说明|类型|是否必填|默认值|返回值|
|:--|:---:|:--:|:--|:--:|:--:|
|`show`|是否显示模态框|`boolean`|是|`false`|无|
|`local`|语言显示|`string`|是|`zh_CN`(可选`zh_TW`,`en_US`)|无|
|`onConfirm`|确认回调函数|`func`|是|`() => {}`|选中的用户|
|`onClose`|取消回调函数|`func`|是|`() => {}`|无|
|`selectedUser`|已选的用户列表|`array`|否|`[]`|无|
|`selectedOther`|`已选的其他列表`|`array`|否|`[]`|无|
|`mode`|环境区分|`string`|否|`daily`|
|`documentNo`|单据编号|`string`|否|`st_purchaseorder`|规则选人查询数据必传参数|
|`documentName`|单据名称|`string`|否|无|规则选人根节点展示的名称|
|`ruleList`|规则列表|`array`|否|无|自定义展示规则列表，不传的话需要传`documentNo`和`documentName`，否则规则没有数据

### `onConfirm`回调函数参数说明
* 参数一(userList)数据结构 选择的用户
```js
  {
    type:'用户',
    typeCode: 0,
    userid:'用户id',
    username:'用户名',
    mobile:'手机号',
    email:'用户邮箱',
    orgName:'用户部门',
  }
```
* 参数二(otherList)数据结构


```js
  角色
  {
    type: '角色',
    typeCode: 1,
    roleId: '角色id',
    roleCode: '角色code',
    roleName: '角色名称'
  }
```

```js
  组织
  {
    type: '组织',
    typeCode: 2,
    orgId: '组织ID',
    orgName: '组织名称'
  }
```

```js
  规则
  {
    type: '规则',
    typeCode: 3,
    ruleCode: '规则code',
    ruleName: '规则名称'
  }
```

## TODO
* 用户自定义展示标签