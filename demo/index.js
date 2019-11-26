import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo1 />,"title":" 这是标题","code":"/**\n*\n* @title 这是标题\n* @description 这是描述\n*\n*/\nimport React, { Component } from 'react';\nimport {  Button  } from 'tinper-bee';\n\nimport Selector from 'ac-selector'\nimport { selectData,selectedUser } from '../../src/colmuns'\n\nclass Demo1 extends Component {\n  constructor() {\n    super()\n    this.state = {\n      show: false\n    }\n  }\n  close = () => {\n    this.setState({\n      show: false\n    })\n  }\n  show = () => {\n    this.setState({\n      show: true\n    })\n  }\n  onConfirm = (userList, otherList) => {\n    // console.log(userList, otherList)\n    this.setState({\n      show: false\n    })\n  }\n  onCancel = () => {\n    this.setState({\n      show: false\n    })\n  }\n\nrender () {\n  const _this = this\nreturn (\n<div>\n  <Selector \n    show={_this.state.show}\n    onConfirm={_this.onConfirm}\n    onClose={_this.onCancel}\n    // mode={'diwork-prod'}\n    documentNo={'st_purchaseorder'}\n    documentName={'采购订单'}\n    selectedUser={selectedUser}\n    selectedOther={selectData}\n  />\n  <Button onClick={_this.show} colors={'primary'}>显示</Button>\n  <Button onClick={_this.close}>关闭</Button>\n</div>\n)\n}\n}\nexport default Demo1","desc":" 这是描述"},{"example":<Demo2 />,"title":" 这是标题","code":"/**\n*\n* @title 这是标题\n* @description 这是描述\n*\n*/\nimport React, { Component } from 'react'\nimport {  Button  } from 'tinper-bee';\n\nimport Selector from 'ac-selector'\nimport { selectData, selectedUser } from '../../src/colmuns'\n\nclass Demo2 extends Component {\n\tconstructor() {\n\t\tsuper()\n\t\tthis.state = {\n\t\t\tshow: false,\n\t\t\ttableData:  [] \n\t\t}\n\t}\n\tclose = () => {\n\t\tthis.setState({\n\t\t\tshow: false\n\t\t})\n\t}\n\tshow = () => {\n\t\tthis.setState({\n\t\t\tshow: true\n\t\t})\n\t}\n\tonConfirm = (userList, otherList) => {\n\t\tconsole.log(userList, otherList)\n\t\tthis.setState({\n\t\t\tshow: false\n\t\t})\n\t}\n\tonCancel = () => {\n\t\tthis.setState({\n\t\t\tshow: false\n\t\t})\n\t}\n\n\tenterSearchFunc = (type, e) => {\n\t\te && e.keyCode === 13 && console.log('enterSearchFunc', type, e)\n\t}\n\tclickSearchFunc = (type, e) => {\n\t\t// console.log('clickSearchFunc', type, e)\n\t}\n\ttabHandleFunc = (tabMark, index, e) => {\n\t\t// console.log(tabMark, index, e)\n\t\tif (tabMark === 'extend2') {\n\t\t\t// console.log('2222')\n\t\t\tthis.setState(\n\t\t\t\t{\n\t\t\t\t\ttableData: [...this.tableData]\n\t\t\t\t})\n\t\t}\n\t\tif (tabMark === 'extend') {\n\t\t\t// console.log('111111')\n\t\t\tthis.setState({\n\t\t\t\t\ttableData: [...this.tableData]\n\t\t\t\t})\n\t\t}\n\t}\n\textendPage = (tabMark, index) => {\n\t\tconsole.log(tabMark, index)\n\t}\n\n\ttabConfig = [\n\t\t{\n\t\t\t// 自定义标签名称\n\t\t\ttabName: '扩展名',\n\t\t\t// 自定义标签唯一标识，请不要使用特殊符号，以字母开头\n\t\t\ttabMark: 'extend',\n\t\t\t// 选项卡对应的类型，table/tree\n\t\t\ttabType: 'table',\n\t\t\t// table 对应的配置，若 tabType 非 table，可缺省\n\t\t\ttableConfig: {\n\t\t\t\t// 搜索框的laceholder\n\t\t\t\tsearchPlaceholder: '请输入您要查找的XX',\n\t\t\t\t// 回车搜索的回调\n\t\t\t\tenterSearchFunc: this.enterSearchFunc,\n\t\t\t\t// 点击搜索按钮时候的回调\n\t\t\t\tclickSearchFunc: this.clickSearchFunc,\n\t\t\t\t// tabHandleFunc: this.tabHandleFunc,\n\t\t\t\t// 列表表头配置，详情见 tinper-bee的 MultiSelectTable组件\n\t\t\t\ttableColumns: [\n\t\t\t\t\t{ key: 'username', title: '姓名', dataIndex: 'username', width: 100 },\n\t\t\t\t\t{ key: 'orgName', title: '部门', dataIndex: 'orgName', width: 200 },\n\t\t\t\t\t{ key: 'email', title: '账号(邮箱)', dataIndex: 'email', width: 200 },\n\t\t\t\t\t{ key: 'mobile', title: '手机号码', dataIndex: 'mobile', width: 150 }\n\t\t\t\t]\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\ttabName: '扩展2',\n\t\t\ttabMark: 'extend2',\n\t\t\ttabType: 'tree',\n\t\t\t// tree 对应的配置，若 tabType 非 tree，可缺省\n\t\t\ttreeConfig: [\n\t\t\t\t{\n\t\t\t\t\torgId: '1440500105089280',\n\t\t\t\t\torgName: '北京用友实业公司',\n\t\t\t\t\tparentId: '',\n\t\t\t\t\tchilds: [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\torgId: '1440592889499904',\n\t\t\t\t\t\t\torgName: '仓储中心-北京',\n\t\t\t\t\t\t\tparentId: '1440500105089280',\n\t\t\t\t\t\t\tchilds: [\n\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\torgId: '1492929388744960',\n\t\t\t\t\t\t\t\t\torgName: '新增',\n\t\t\t\t\t\t\t\t\tparentId: '1440592889499904'\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t]\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\torgId: '1440592918794496',\n\t\t\t\t\t\t\torgName: '仓储中心-南京',\n\t\t\t\t\t\t\tparentId: '1440500105089280'\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t]\n\n\t\t// 列表数据\n\t\ttableData= [\n\t\t\t{\n\t\t\t\t// 必要保留字段，与自定义标签相同，用来展示 其他列表 中的 '类型' 信息\n\t\t\t\ttype: '扩展名',\n\t\t\t\t// 必要保留字段，唯一标识\n\t\t\t\tkey: '1',\n\t\t\t\troleId: '1',\n\t\t\t\t// 必要保留字段，用来展示 其他列表 中的 '接受对象' 信息\n\t\t\t\treciving: 'name1',\n\t\t\t\tusername: 'name1',\n\t\t\t\torgName: 'orgName1',\n\t\t\t\temail: 'yonyou@yonyou.com',\n\t\t\t\tmobile: '123456'\n\t\t\t},\n\t\t\t{\n\t\t\t\ttype: '扩展名',\n\t\t\t\tkey: '2',\n\t\t\t\troleId: '2',\n\t\t\t\treciving: 'name2',\n\t\t\t\tusername: 'name2',\n\t\t\t\torgName: 'orgName2',\n\t\t\t\temail: 'yonyou@yonyou.com',\n\t\t\t\tmobile: '123456'\n\t\t\t}\n\t\t]\n\n  treeConfig= [\n    {\n\t\t\t// 与扩展的标签相同\n\t\t\ttype:'扩展2',\n\t\t\t// 与id相同，\n\t\t\torgId: '1440500105089280',\n\t\t\t// 显示名称\n      orgName: '北京用友实业公司',\n      parentId: '',\n      childs: [\n        {\n\t\t\t\t\ttype:'扩展2',\n          orgId: '1440592889499904',\n          orgName: '仓储中心-北京',\n          parentId: '1440500105089280',\n          childs: [\n            {\n\t\t\t\t\t\t\ttype:'扩展2',\n              orgId: '1492929388744960',\n              orgName: '新增',\n              parentId: '1440592889499904'\n            }\n          ]\n        },\n        {\n\t\t\t\t\ttype:'扩展2',\n          orgId: '1440592918794496',\n          orgName: '仓储中心-南京',\n          parentId: '1440500105089280'\n        }\n      ]\n    }\n  ]\n\n\trender() {\n\t\tconst _this = this\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t{/* {console.log('----', this.state.tableData)} */}\n\t\t\t\t<Selector\n        tabHandleFunc={this.tabHandleFunc}\n          tableData={this.state.tableData}\n\t\t\t\t\ttabConfig={this.tabConfig}\n\t\t\t\t\textendPage={this.extendPage}\n\t\t\t\t\t// 分页，总共条数\n\t\t\t\t\tpageTotal={5}\n\t\t\t\t\t// 分页，总页数\n\t\t\t\t\tpageItems={3}\n          treeConfig={this.treeConfig}\n\t\t\t\t\tshow={_this.state.show}\n\t\t\t\t\tonConfirm={_this.onConfirm}\n\t\t\t\t\tonClose={_this.onCancel}\n\t\t\t\t\t// mode={'diwork-prod'}\n\t\t\t\t\tdocumentNo={'st_purchaseorder'}\n\t\t\t\t\tdocumentName={'采购订单'}\n\t\t\t\t\t// selectedUser={selectedUser}\n\t\t\t\t\t// selectedOther={selectData}\n\t\t\t\t/>\n\t\t\t\t<Button onClick={_this.show} colors={'primary'}>\n\t\t\t\t\t显示\n\t\t\t\t</Button>\n\t\t\t\t<Button onClick={_this.close}>关闭</Button>\n\t\t\t</div>\n\t\t)\n\t}\n}\nexport default Demo2\n","desc":" 这是描述"}]


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
