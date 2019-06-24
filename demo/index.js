import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var DemoArray = [{"example":<Demo1 />,"title":" 这是标题","code":"/**\n*\n* @title 这是标题\n* @description 这是描述\n*\n*/\nimport React, { Component } from 'react';\nimport {  } from 'tinper-bee';\nimport { Button } from 'tinper-bee'\nimport Selector from \"ac-selector\"\nimport { selectData,selectedUser } from '../../src/colmuns'\n\nclass Demo1 extends Component {\n  constructor() {\n    super()\n    this.state = {\n      show: false\n    }\n  }\n  close = () => {\n    this.setState({\n      show: false\n    })\n  }\n  show = () => {\n    this.setState({\n      show: true\n    })\n  }\n  onConfirm = (userList, otherList) => {\n    // console.log(userList, otherList)\n    this.setState({\n      show: false\n    })\n  }\n  onCancel = () => {\n    this.setState({\n      show: false\n    })\n  }\n\nrender () {\n  const _this = this\nreturn (\n<div>\n  <Selector \n    show={_this.state.show}\n    onConfirm={_this.onConfirm}\n    onClose={_this.onCancel}\n    remoteUserUrl={'http://iuap-message-platform-web.test.app.yyuap.com/message-platform-web/user/staff/search?pageSize=40&pageNo=1&keyword='}\n    remoteRoleUrl={'http://iuap-message-platform-web.test.app.yyuap.com/message-platform-web/user/role/search?pageSize=40&pageNo=1&keyword='}\n    remoteOrgUrl={'http://iuap-message-platform-web.test.app.yyuap.com/message-platform-web/user/org/user?pageSize=40&pageNo=1&orgIds='}\n    // remoteUserUrl={'https://u8cmsg-daily.yyuap.com/message-platform-web/user/staff/search?pageSize=40&pageNo=1&keyword='}\n    // remoteRoleUrl={'https://u8cmsg-daily.yyuap.com/message-platform-web/user/role/search?pageSize=40&pageNo=1&keyword='}\n    // remoteOrgUrl={'https://u8cmsg-daily.yyuap.com/message-platform-web/user/org/user?pageSize=40&pageNo=1&orgIds='}\n    selectedUser={selectedUser}\n    selectedOther={selectData}\n  />\n  <Button onClick={_this.show} colors={'primary'}>显示</Button>\n  <Button onClick={_this.close}>关闭</Button>\n</div>\n)\n}\n}\n","desc":" 这是描述"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick=()=> {
        this.setState({ open: !this.state.open })
    }
    fCloseDrawer=()=>{
        this.setState({
            open: false
        })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;

        const header = (
            <div>
                <p className='component-title'>{ title }</p>
                <p>{ desc }</p>
                <span className='component-code' onClick={this.handleClick}> 查看源码 <i className='uf uf-arrow-right'/> </span>
            </div>
        );
        return (
            <Col md={12} id={title.trim()} className='component-demo'>
            <Panel header={header}>
                {example}
            </Panel>
           
            <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right' onClose={this.fCloseDrawer}>
            <div className='component-code-copy'> JS代码 
                <Clipboard action="copy" text={code}/>
            </div>
            <pre className="pre-js">
                <code className="hljs javascript">{ code }</code>
            </pre >
            {!!scss_code ?<div className='component-code-copy copy-css'> SCSS代码 
                <Clipboard action="copy" text={scss_code}/>
            </div>:null }
                { !!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{ scss_code }</code>
                 </pre> : null }
            </Drawer>
        </Col>
    )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <Row>
            {DemoArray.map((child,index) => {

                return (
            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
    )

    })}
    </Row>
    )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
