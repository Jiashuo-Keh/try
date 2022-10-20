import {CHECK_FRIENDS} from "./types";
import {CHECK_POSTS} from "./types";
import {UPDATE_STATUS} from "./types";
import {ADD_FRIENDS} from "./types";
import {ADD_POST} from "./types"
import { LOGIN } from "./types";
import {REFRESH} from "./types"
import {DELETE_FRIENDS} from "./types"
import {SEARCH_POST} from "./types"

export const checkFriend=()=>async(dispatch)=>{

    // api for (name) to get friends
    dispatch({
        type:CHECK_FRIENDS,
        name:''
    })

    
  }

  export const searchPost=(search,posts)=>async(dispatch)=>{
    let data=[]
    let str = `\S*${search}\S*`;
    let reg = new RegExp(str,'i');
    posts.map(item=>{
      if(reg.test(item["id"])||reg.test(item["content"])){
        data.push(item)
      }
    })
    dispatch({
      type:SEARCH_POST,
      payload:data
    })

  }


  export const updateStatus=(status)=>async(dispatch)=>{

   dispatch({
    type:UPDATE_STATUS,
    payload:status
    
   })
    
  }

  export const addPost=(name,content)=>async(dispatch)=>{

    var tmp={id:name,content:content,img:"https://p.qqan.com/up/2021-2/16137992352635419.jpg" ,title:"",date:"2022-10-11"}

    dispatch({
     type:ADD_POST,
     payload:tmp
    })
   
   }

   export const deletefriends=(id,friends,posts)=>async(dispatch)=>{
    var tmp=[]
    console.log("deleted id:"+id)
    console.log("deteled friends id:")

    
    for(var i=0;i<friends.length;i++){
      if(id!=friends[i]["id"]){
        tmp.push(friends[i])
      }
    }

    var deletedPosts=[]
    for(var i=0;i<posts.length;i++){
      
      if(id!=posts[i]["key"]){
        deletedPosts.push(posts[i])
      }
    }


    console.log(deletedPosts.length)

    dispatch({
      type:DELETE_FRIENDS,
      payload:{friends:tmp,posts:deletedPosts}
    })
   }

  export const addFriends=(id,name,friends,posts)=>async(dispatch)=>{

    for(var i=0;i<friends.length;i++){
      if(friends[i]["name"]==name){
        window.alert("Has already followed!")
        return 
      }
    }

    fetch("https://jsonplaceholder.typicode.com/users").then(res=>res.json()).then(res=>{
    var friendId=0;
    var hasUser=false;
    for(var i=0;i<res.length;i++){
      if(name==res[i]["username"]){
        hasUser=true
        friendId=i+1
        break
      }
    }
    if(hasUser){
      var tmp={id:friendId,name:name,status:'I am a new friend'}
      friends.push(tmp)

      console.log("friends:")
      for(var i=0;i<friends.length;i++){
        console.log(friends[i])
      }


      var newPosts=[]
      fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()).then(res =>
      {
        for(var i=0;i<res.length;i++){
          if(res[i]["userId"]==friendId){
            var item={id:name,key:res[i]["userId"],content:res[i]["body"],title:res[i]["title"],img:'https://p.qqan.com/up/2021-2/16137992352635419.jpg',date:'2022-10-10'}
            newPosts.push(item)
          }
        }
        for(var i=0;i<posts.length;i++){
          newPosts.push(posts[i])
        }




        dispatch({
          type:ADD_FRIENDS,
          payload:{friends:friends,posts:newPosts}
         })


      })







    }else{
      window.alert("The user does not exist")
    }

    })
    // random add,assume name=11


   
   }

   



   export const refresh=(name)=>async(dispatch)=>{
    var id=-1;
    var friendList={}

    fetch("https://jsonplaceholder.typicode.com/users").then(res=>res.json()).then(res=>{
      for(var i=0;i<res.length;i++){
        if(name==res[i]["username"]){
          id=res[i]["id"]
        }
        friendList[(res[i]["id"])]=res[i]["username"]
      }
      fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()).then(res =>
      {

        var friends=[];
        if(id!=-1){
          for(var i=0;i<3;i++){
            var friendName=friendList[(id+i+1)%10]
            var tmp={id:(id+i+1)%10,name:friendName,status:'A fun status!'}
            
            friends.push(tmp)
          }
        }

  
        var posts=[]
        
        if(id!=-1){
          for(var i=0;i<res.length;i++){

            for(var j=0;j<friends.length;j++){
              if(res[i]["userId"]==friends[j]["id"]){
                var item={id:friendList[res[i]["userId"]],key:res[i]["userId"],content:res[i]["body"],title:res[i]["title"],img:'https://p.qqan.com/up/2021-2/16137992352635419.jpg',date:'2022-10-10'}
                posts.push(item)               
              }
            }

      
          }
        }
        var tmp={name:name,friends:friends,posts:posts,searchedposts:posts}


        
        dispatch({
         type:REFRESH,
         payload:tmp
        })
      })

    })
  }



   export const checkposts=(name)=>async(dispatch)=>{
    fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()).then(res =>
    {

        // 假设name:1
        var friends=[];
        for(var i=0;i<3;i++){
          var friendName=(Number(name)+i+1)%10
          var tmp={name:friendName,status:'A fun status!'}
          
          friends.push(tmp)
        }
  
        var posts=[]


          for(var i=0;i<res.length;i++){

            if(res[i]["userId"]==name){

              var item={id:res[i]["id"],content:res[i]["body"],title:res[i]["title"],img:'https://p.qqan.com/up/2021-2/16137992352635419.jpg'}
              posts.push(item)
            }
    
          }

          
        


        dispatch({
            type:LOGIN,
            payload:{friends:friends,posts:posts}
        })
  

  
    }
  );
  
  
      
    }
    

  