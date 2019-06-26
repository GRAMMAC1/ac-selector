'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetChecked = resetChecked;
exports.setChecked = setChecked;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// 重置_checked属性为false && 为表格添加key
function resetChecked(list, type) {
  if (!Array.isArray(list)) {
    throw new Error('the parameter must be `Array`');
  }
  var res = [].concat(_toConsumableArray(list));
  for (var i = 0; i < res.length; i++) {
    res[i].key = res[i][type];
    res[i]._checked = false;
  }
  return res;
}

// 设置_checked属性为true
function setChecked(source, ref, type) {
  var res = [];
  for (var i = 0; i < source.length; i++) {
    for (var j = 0; j < ref.length; j++) {
      if (source[i][type] === ref[j][type]) {
        source[i]._checked = true;
      }
    }
  }
  res = [].concat(_toConsumableArray(source));
  return res;
}