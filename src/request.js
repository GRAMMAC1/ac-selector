export function requestGet(url,option={}){
  var data = option
  var paramArr2 = {} 
  for(let k in data){
    paramArr2[k] = data[k];
  }
  var param = new URLSearchParams(paramArr2).toString();
  if(param.length>0){
      if(url.indexOf('?')>=0){
          url = url +'&' + param
      }else{
          url = url + '?' + param
      }
  }
  var option = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, same-origin, *omit
    // headers: {
    //   'content-type': 'application/json',
    //   'withCredentials': true
    // },
    mode: 'cors', // no-cors, cors, *same-origin
  }
  return fetch(url,option) 
          .then((response) => {
              if(response.ok){
                  return response.json()
              }else{
                  return Promise.reject('Get Network Response Was Wrong.')
              }
          })   
          .then(data => {
        // console.log(data);
              return data
          })
          .catch(error => {
              console.error(error)
              throw error
          })
}