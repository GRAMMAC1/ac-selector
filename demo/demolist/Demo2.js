/**
*
* @title 这是标题
* @description 这是描述
*
*/
import React, { Component } from 'react'
import { Button } from 'tinper-bee'
import Selector from '../../src'
import { selectData, selectedUser } from '../../src/colmuns'

class Demo2 extends Component {
	constructor() {
		super()
		this.state = {
			show: false,
			tableData:  [] 
		}
	}
	close = () => {
		this.setState({
			show: false
		})
	}
	show = () => {
		this.setState({
			show: true
		})
	}
	onConfirm = (userList, otherList) => {
		console.log(userList, otherList)
		this.setState({
			show: false
		})
	}
	onCancel = () => {
		this.setState({
			show: false
		})
	}

	enterSearchFunc = (type, e) => {
		e && e.keyCode === 13 && console.log('enterSearchFunc', type, e)
	}
	clickSearchFunc = (type, e) => {
		// console.log('clickSearchFunc', type, e)
	}
	tabHandleFunc = (tabMark, index, e) => {
		// console.log(tabMark, index, e)
		if (tabMark === 'extend2') {
			// console.log('2222')
			this.setState(
				{
					tableData: [...this.tableData]
				})
		}
		if (tabMark === 'extend') {
			// console.log('111111')
			this.setState({
					tableData: [...this.tableData]
				})
		}
	}
	extendPage = (tabMark, index) => {
		console.log(tabMark, index)
	}

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
					orgId: '1440500105089280',
					orgName: '北京用友实业公司',
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

		// 列表数据
		tableData= [
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

	render() {
		const _this = this
		return (
			<div>
				{/* {console.log('----', this.state.tableData)} */}
				<Selector
        tabHandleFunc={this.tabHandleFunc}
          tableData={this.state.tableData}
					tabConfig={this.tabConfig}
					extendPage={this.extendPage}
					// 分页，总共条数
					pageTotal={5}
					// 分页，总页数
					pageItems={3}
          treeConfig={this.treeConfig}
					show={_this.state.show}
					onConfirm={_this.onConfirm}
					onClose={_this.onCancel}
					// mode={'diwork-prod'}
					documentNo={'st_purchaseorder'}
					documentName={'采购订单'}
					// selectedUser={selectedUser}
					// selectedOther={selectData}
				/>
				<Button onClick={_this.show} colors={'primary'}>
					显示
				</Button>
				<Button onClick={_this.close}>关闭</Button>
			</div>
		)
	}
}
export default Demo2
