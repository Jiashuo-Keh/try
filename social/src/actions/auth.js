import { LOGIN } from "./types";
import {REGISTER} from "./types";


export const login=(name,password)=>async(dispatch)=>{
  fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(res =>
  {

      var hasUser=false
      for(var i=0;i<res.length;i++){
        if(res[i]["username"]==name){
          if(res[i]["address"]["street"]==password){
            dispatch({
              type:LOGIN
          })
          localStorage.setItem("name",name)
          }else{
            window.alert("Name or password is wrong")

          }
          hasUser=true;
        }

      }
      if(!hasUser){
        window.alert("User does not exist")
      }
  }
);    
  }

export const register=(name,zip,phone,email,password,justReg)=>async(dispatch)=>{

  fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(res =>
  {
    var hasRegistered=false;
    for(var i=0;i<res.length;i++){
      if(name==res[i]["username"]){
        hasRegistered=true;
        break;
      }
    }
    if(hasRegistered){
      window.alert("Username already exists")
    }
    else{
      var tmp={name:name,zip:zip,phone:phone,email:email,password:password,justReg:true}
      dispatch({
          type:REGISTER,
          payload:{name:name,zip:zip,phone:phone,email:email,password:password,justReg:true}
  
      })
      localStorage.setItem("name",name)
      window.location.href="/main"
    }
  })
  }


