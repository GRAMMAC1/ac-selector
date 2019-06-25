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
    // console.log(userList, otherList)
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
    mode={'daily'}
    // selectedUser={selectedUser}
    // selectedOther={selectData}
  />
  <Button onClick={_this.show} colors={'primary'}>显示</Button>
  <Button onClick={_this.close}>关闭</Button>
</div>
)
}
}
export default Demo1