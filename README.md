# ac-selector

[![Build Status](https://travis-ci.org/GRAMMAC1/ac-selector.svg?branch=master)](https://travis-ci.org/GRAMMAC1/ac-selector)

## 简介

用友中台选人组件，目前只有智能产品部-消息组和预警在用。目前只支持从服务端获取数据。

## peerDependencies

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
|:--:|:---:|:--:|:--:|:--:|:--:|
|`show`|是否显示模态框|`boolean`|是|`false`|无|
|`locale`|语言显示|`string`|是|`zh_CN`(可选`zh_TW`,`en_US`)|无|
|`onConfirm`|确认回调函数|`func`|是|`() => {}`|选中的用户|
|`onClose`|取消回调函数|`func`|是|`() => {}`|无|
|`selectedUser`|已选的用户列表|`array`|否|`[]`|无|
|`selectedOther`|`已选的其他列表`|`array`|否|`[]`|无|
|`mode`|环境区分|`string`|否|`daily`|
|`documentNo`|单据编号|`string`|否|`st_purchaseorder`|规则选人查询数据必传参数|
|`documentName`|单据名称|`string`|否|无|规则选人根节点展示的名称|
|`ruleList`|规则列表|`array`|否|无|自定义展示规则列表，不传的话需要传`documentNo`和`documentName`，否则规则没有数据|
|`tabHandleFunc`|扩展标签点击时候的回调，传参数（tabMark, index, e）|`func` | 否 |无|无|
|`tabConfig`|传入的扩展数据（字段在下面示例代码）|`array` | 否 |[]|无|
|`tableData`|传入的列表（字段在下面示例代码）|`array` | 否 |[]|无|
|`treeConfig`|传入的树（字段在下面示例代码）|`array` | 否 |[]|无|
|`pageTotal`|分页，总共条数|`number` | 否 |无|无|
|`pageItems`|分页，总页数|`number` | 否 |无|无|

### 关于扩展的详细可参考 demo2 
>
> [demo2](./demo/demolist/Demo2.js)
>


### 部分数据的格式

```javascript
tabConfig = [
		{
			// 自定义标签名称
			tabName: '扩展名',
			// 自定义标签唯一标识，请不要使用特殊符号，以字母开头
			tabMark: 'extend',
			// 选项卡对应的类型，table/tree
			tabType: 'table',
			// table 对应的配置，若 tabType 非 table，可缺省
			tableConfig: {
				// 搜索框的laceholder
				searchPlaceholder: '请输入您要查找的XX',
				// 回车搜索的回调
				enterSearchFunc: this.enterSearchFunc,
				// 点击搜索按钮时候的回调
				clickSearchFunc: this.clickSearchFunc,
				// tabHandleFunc: this.tabHandleFunc,
				// 列表表头配置，详情见 tinper-bee的 MultiSelectTable组件
				tableColumns: [
					{ key: 'username', title: '姓名', dataIndex: 'username', width: 100 },
					{ key: 'orgName', title: '部门', dataIndex: 'orgName', width: 200 },
					{ key: 'email', title: '账号(邮箱)', dataIndex: 'email', width: 200 },
					{ key: 'mobile', title: '手机号码', dataIndex: 'mobile', width: 150 }
				]
			}
		},
		{
			tabName: '扩展2',
			tabMark: 'extend2',
			tabType: 'tree',
			// tree 对应的配置，若 tabType 非 tree，可缺省
			treeConfig: [
				{
          // id
          orgId: '1440500105089280',
          // 显示名称
          orgName: '北京用友实业公司',
          // 父级id
					parentId: '',
					childs: [
						{
							orgId: '1440592889499904',
							orgName: '仓储中心-北京',
							parentId: '1440500105089280',
							childs: [
								{
									orgId: '1492929388744960',
									orgName: '新增',
									parentId: '1440592889499904'
								}
							]
						},
						{
							orgId: '1440592918794496',
							orgName: '仓储中心-南京',
							parentId: '1440500105089280'
						}
					]
				}
			]
		}
	]

```

```javascript
	tableData = {
		// 列表数据
		tableData: [
			{
				// 必要保留字段，与自定义标签相同，用来展示 其他列表 中的 '类型' 信息
				type: '扩展名',
				// 必要保留字段，唯一标识
				key: '1',
				roleId: '1',
				// 必要保留字段，用来展示 其他列表 中的 '接受对象' 信息
				reciving: 'name1',
				username: 'name1',
				orgName: 'orgName1',
				email: 'yonyou@yonyou.com',
				mobile: '123456'
			},
			{
				type: '扩展名',
				key: '2',
				roleId: '2',
				reciving: 'name2',
				username: 'name2',
				orgName: 'orgName2',
				email: 'yonyou@yonyou.com',
				mobile: '123456'
			}
		]
  }
```

```javascript

treeConfig= [
    {
			// 与扩展的标签相同
			type:'扩展2',
			// 与id相同，
			orgId: '1440500105089280',
			// 显示名称
      orgName: '北京用友实业公司',
      parentId: '',
      childs: [
        {
					type:'扩展2',
          orgId: '1440592889499904',
          orgName: '仓储中心-北京',
          parentId: '1440500105089280',
          childs: [
            {
							type:'扩展2',
              orgId: '1492929388744960',
              orgName: '新增',
              parentId: '1440592889499904'
            }
          ]
        },
        {
					type:'扩展2',
          orgId: '1440592918794496',
          orgName: '仓储中心-南京',
          parentId: '1440500105089280'
        }
      ]
    }
  ]

```


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