/**
*
* @title 这是标题
* @description 这是描述
*
*/
import React, { Component } from 'react';
import { Button } from 'tinper-bee'
import Selector from '../../src'

import { selectData,selectedUser } from '../../src/colmuns'

class Demo1 extends Component {
  constructor() {
    super()
    this.state = {
      show: false
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

render () {
  const _this = this
return (
<div>
  <Selector 
    show={_this.state.show}
    onConfirm={_this.onConfirm}
    onClose={_this.onCancel}
      mode={ 'daily' }
      locale={'en_US'}
    documentNo={'st_purchaseorder'}
    documentName={'采购订单'}
    ruleList={[{name:'1',id:'2',a:'d'}]}
    isWechat={true}
    pageSize={3}
    // selectedUser={selectedUser}
    // selectedOther={selectData}
    // tabHandleFunc={(tabMark, index, e) => {
    //   if (tabMark === 'test') {
    //     this.setState({
    //       tableData: [{"refcode":"code001","refpk":"code001","refname":"test001"},{"refcode":"code002","refpk":"code002","refname":"test002"},{"refcode":"code003","refpk":"code003","refname":"test003"},{"refcode":"code004","refpk":"code004","refname":"test004"},{"refcode":"code005","refpk":"code005","refname":"test005"},{"refcode":"code006","refpk":"code006","refname":"test006"},{"refcode":"code007","refpk":"code007","refname":"test007"},{"refcode":"code008","refpk":"code008","refname":"test008"},{"refcode":"code009","refpk":"code009","refname":"test009"},{"refcode":"code010","refpk":"code010","refname":"test010"}]
    //     })
    //   }
    // }}
    // tableData={}
    // tabConfig={[
    //   {
    //     tabName: 'name',
    //     tabMark: 'test',
    //     tabType: 'table',
    //     tableData: [{"key": "code001","refcode":"code001","refpk":"code001","refname":"test001"},{"key":"code002","refcode":"code002","refpk":"code002","refname":"test002"},{"key":"code003","refcode":"code003","refpk":"code003","refname":"test003"},{"key":"code004","refcode":"code004","refpk":"code004","refname":"test004"},{"key":"code005","refcode":"code005","refpk":"code005","refname":"test005"},{"key":"code006","refcode":"code006","refpk":"code006","refname":"test006"},{"key":"code007","refcode":"code007","refpk":"code007","refname":"test007"},{"key":"code008","refcode":"code008","refpk":"code008","refname":"test008"},{"key":"code009","refcode":"code009","refpk":"code009","refname":"test009"},{"key":"code010","refcode":"code010","refpk":"code010","refname":"test010"}],
    //     tableConfig: {
    //       searchPlaceholder: 'nnnn',
    //       enterSearchFunc: () => {},
    //       clickSearchFunc: () => {},
    //       tableColumns: [
    //         { key: 'username', title: 'refcode', dataIndex: 'refcode', width: 100 },
    //         { key: 'orgName', title: 'refpk', dataIndex: 'refpk', width: 200 },
    //         { key: 'email', title: 'refname', dataIndex: 'refname', width: 200 }
    //       ]
    //     }
    //   }
    // ]}
  >
  </Selector>
  <Button onClick={_this.show} colors={'primary'}>显示</Button>
  <Button onClick={_this.close}>关闭</Button>
</div>
)
}
}
export default Demo1