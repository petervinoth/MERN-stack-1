import React,{useContext,createContext, useState} from "react";

export const UserContext=createContext()

export const Camp=(props)=>{
    
   const [userData,setUserData]=useState({
       token:undefined,
       user:undefined,
      // displayName:undefined,
   });
  

    return(
   <UserContext.Provider value={
       {
           Data:[userData,setUserData],
          
          
       }
   }>
    {props.children}
   </UserContext.Provider>
    );

}