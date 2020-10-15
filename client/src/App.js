import {BrowserRouter,Switch,Route} from "react-router-dom";
import React,{useState,useEffect, useContext} from 'react';

import {UserContext} from "./context-api/UserContext";
import {Register} from "./components/Register/register";
import {Home} from "./components/Home/home";
import {Headers} from "./components/Header/header";
import {Login} from "./components/login/login";
import {Main} from "./components/Main/main";


import './App.css';
import Axios from "axios";


function App() {
  const main=useContext(UserContext);
  const[userData,setUserData]=main.Data;
  
  useEffect(()=>{
    const checkLogedIn=async()=>{
      let token=localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes=await Axios.post("http://localhost:5000/users/tokenIsValid",null,{headers:{"x-auth-token": token}});
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
         user: userRes.data,
        // displayName:userRes.data,
        });
      }
  
    }
    checkLogedIn();
  },[]);
  
  
    return (
      <div>
     <BrowserRouter>
    <Headers/>
   
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/main" component={Main}/>
                  
      </Switch>
  
    </BrowserRouter>
      </div>
    );
  }


  

export default App;
