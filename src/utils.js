// 重置_checked属性为false && 为表格添加key
export function resetChecked (list, type) {
  if(!Array.isArray(list)) {
    throw new Error('the parameter must be `Array`')
  }
  let res = [...list]
  for(let i = 0; i < res.length; i ++) {
    res[i].key = res[i][type]
    res[i]._checked = false
  }
  return res
}

// 设置_checked属性为true
export function setChecked (source, ref, type) {
  let res = []
  for(let i = 0; i < source.length; i ++) {
    for(let j = 0; j < ref.length; j ++) {
      if(source[i][type] === ref[j][type]) {
        source[i]._checked = true
      }
    }
  }
  res = [...source]
  return res
}