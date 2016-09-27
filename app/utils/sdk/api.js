import fetch from 'utils/request'

 function respond(res){
  let resShape = {
    msg: '',
    data: {}
  }
  if(!!!res.data){
    resShape.msg = 'error on the api'
    resShape.data = res;
    console.log(res);
    return resShape
  }
  if(!res.data.errors){
    resShape.msg = res.data.res.msg
    res.data.errors > 0 ? null : resShape.data = res.data.res.data
  }else{
    if(res.data.errors >= 1 ){
      resShape.msg = res.data.res.msg
      res.data.errors > 0 ? null : resShape.data = res.data.res.data
    }
  }
  console.log(resShape);
  return resShape
}

function* post(url, data){
  console.log(url);
  console.log(data);
  let res = yield fetch(url,{
    method: 'post',
    headers:  {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  return respond(res)
}
export default {
  respond,
  post
}
