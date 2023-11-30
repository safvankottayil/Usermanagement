export function FormValidation({username,name,password},validate){
    let err={username:true,name:true,password:true}
    let flag=true
    const usernameregex=/^[\w.@+-]+$/
  if(validate[0]==1){
    if(username==''){
        err.username='This field is required'
        flag=false
    }else if(!usernameregex.test(username)){
        err.username='Not include space and special charecters'
        flag=false
    }
  }
  if(validate[1]==2){
    if(name==''){
        err.name='this filed is required'
        flag=false
    }
  }
  if(validate[2]==3){
    if(password==''){
        err.password='this filed is required'
        flag=false
    }else if(password.length<6){
        err.password='password must have 6 charecter'
        flag=false
    }
  }
  return {valid:flag,err}
}