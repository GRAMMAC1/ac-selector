import React from 'react'
import nodata from '../assets/nodata.svg'

export const NotFound = () => {
  return (
    <div>
      <img src={nodata} alt={'暂无数据'} />
      <p>暂无数据</p>
    </div>
  )
}