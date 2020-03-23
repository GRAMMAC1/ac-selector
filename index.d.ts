import * as React from 'react'

export interface SelectorProps {
  locale?: 'zh_CN' | 'zh_TW' | 'en_US',
  show: Boolean,
  onConfirm(): void,
  onClose(): void,
  mode?: 'dev' | 'daily' | 'pre' | 'diwork' | 'diwork-prod',
  documentNo?: String,
  documentName?: String,
  emptyText?: React.ReactElement,
  pageSize?: Number,
  isWechat?: Boolean,
  tabConfig?: Array<T>,
  tableData?: Array<T>,
  treeConfig?: Array<T>,
  ruleList?: Array<T>,
  selectedOther?: Array<T>,
  selectedUser?: Array<T>
}

declare class Selector extends React.Component<SelectorProps> {

}

export default Selector

export { Selector }