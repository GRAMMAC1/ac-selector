import React from 'react'

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

export const roleMultiCol = {
	zh_CN: [
		{ key: 'rolename', title: '角色名', dataIndex: 'roleName', width: 100 },
		{ key: 'rolecode', title: '角色编码', dataIndex: 'roleCode' }
	],
	zh_TW: [
		{ key: 'rolename', title: '角色名', dataIndex: 'roleName', width: 100 },
		{ key: 'rolecode', title: '角色編碼', dataIndex: 'roleCode' }
	],
	en_US: [
		{ key: 'rolename', title: 'Role Name', dataIndex: 'roleName', width: 100 },
		{ key: 'rolecode', title: 'Role Code', dataIndex: 'roleCode' }
	],
}
/*
username: "19904888888"
email: ""
phone: "19904888888"
wxAccountId: "gh_26b301786a30"
wxOpenId: "oQzPCwf9c64gKKHzo8y2lxR5C5fs"
weChatId: "wugqm"
*/
export const wechatMultiCol = {
	zh_CN: [
		{ key: 'username', title: '姓名', dataIndex: 'username',  },
		{ key: 'weChatId', title: '微信号', dataIndex: 'weChatId' },
		{ key: 'phone', title: '手机号', dataIndex: 'phone' },
		{ key: 'email', title: '邮箱', dataIndex: 'email' },

	],
	zh_TW: [
		{ key: 'username', title: '姓名', dataIndex: 'username', },
		{ key: 'weChatId', title: '微信号', dataIndex: 'weChatId' },
		{ key: 'phone', title: '手机号', dataIndex: 'phone' },
		{ key: 'email', title: '邮箱', dataIndex: 'email' },
	],
	en_US: [
		{ key: 'username', title: 'Name', dataIndex: 'username',  },
		{ key: 'weChatId', title: 'WeChat', dataIndex: 'weChatId' },
		{ key: 'phone', title: 'Cellphone Number', dataIndex: 'phone' },
		{ key: 'email', title: 'Email', dataIndex: 'email' },
	],
}

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
		orgId: '1249795575075072',
		orgName: 'zbl公司222',
		type: '组织',
		typeCode: 2
	},
	{
		orgId: '1249799305859328',
		orgName: 'zbl部门1',
		type: '组织',
		typeCode: 2
	},
	// {
	// 	orgId: '12497993059328',
	// 	orgName: 'zbl部门3',
	// 	type: '组织',
	// 	typeCode: 2
	// },
	// {
	// 	orgId: '12497993058598',
	// 	orgName: 'zbl部门4',
	// 	type: '组织',
	// 	typeCode: 2
	// },
	// {
	// 	ruleCode: '12',
	// 	ruleName: '修改人5',
	// 	type: '规则',
	// 	typeCode: 3
	// },
	// {
	// 	ruleCode: '123',
	// 	ruleName: '修改人6',
	// 	type: '规则',
	// 	typeCode: 3
	// }
]

export const selectedUser = [
	{
		orgName: '未知部门',
		email: 'zhaojian770627@163.com',
		username: 'zhaojianc',
		mobile: '18601913836',
		type: '用户',
		userid: 'a1e8075a-93c3-4552-9a06-e05128ee34b7',
		typeCode: 0
	},
	{
		orgName: '未知部门',
		email: 'zongtf3@yonyou.com',
		username: '18610018262',
		mobile: '18610018262',
		type: '用户',
		userid: '1b1123f0-5d62-41fe-b619-15922397f917',
		typeCode: 0
	},
	{
		orgName: '未知部门',
		email: 'YHT-105-5841559369734972@yht.com',
		username: 'aaa',
		mobile: '15810624300',
		type: '用户',
		userid: 'd1ba5a77-def1-4e65-9457-7bae09ebb67f',
		typeCode: 0
	},
	{
		orgName: 'FHR-022',
		email: 'YHT-693-2561560322273290@yht.com',
		username: 'zjc612',
		mobile: '138113111223',
		type: '用户',
		userid: '58cd6055-f8c0-4d51-a9d9-a733e4ef1872',
		typeCode: 0
	},
	{
		orgName: 'FHR-024',
		email: 'YHT-693-2561560322273290@yht.com',
		username: 'zjc612',
		mobile: '138111131223',
		type: '用户',
		userid: '58cd6055-f8c0-4d51-a9d9-a733e4ef1872',
		typeCode: 0
	},
	{
		orgName: 'FHR-025',
		email: 'YHT-693-2561560322273290@yht.com',
		username: 'zjc612',
		mobile: '138111311223',
		type: '用户',
		userid: '58cd6055-f8c0-4d51-a9d9-a733e4ef1872',
		typeCode: 0
	}
]

export const pageLocale = {
	
	en_US:{'lang':'en',
	'total': 'Total',
	'items': 'Items',
	'show': 'page',
	'goto':'goto',
	'page':'',
	'ok':'ok'},
	zh_TW:{'lang':'zh_TW',
	'total': '共',
	'items': '條',
	'show': 'page',
	'goto':'goto',
	'page':'',
	'ok':'ok'}
}
