import React,{useContext,useState} from "react";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../context-api/UserContext";
import { Col,Form, FormGroup, Label, Input } from 'reactstrap';
import "../Register/register.css";
//import {ErrorNotice} from '../error/ErrorNotice';
import Axios from "axios";


export const Login=()=>{
     
    const history=useHistory();

    const main=useContext(UserContext);
    const [userData,setUserData]=main.Data;

    const[email,setEmail]=useState();
    const [password,setPassword]=useState();

//const[error,setError]=useState();

const submit = async (e) => {
    e.preventDefault();
 
    try{
const loginUser={email,password};

 

  const loginRes=await Axios.post("http://localhost:5000/users/login",loginUser);
  console.log(loginRes);

   setUserData({
      token:loginRes.data.token,
      user:loginRes.data.user,
     // role:loginRes.data.role,
     // displayName:loginRes.data.displayName
  });

  
    localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/main");
}
catch(err){
  //err.response.data.msg && setError(err.response.data.msg);
  console.log(err);

}
    };



    


    return(
        <div>
             <Form onSubmit={submit}>
       <h1>Register form</h1><br></br>
      
      <FormGroup row>
        <Label for="exampleEmail" sm={3}><h4>Email</h4></Label>
        <Col sm={7}>
        <Input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />  </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleEmail" sm={3}><h4>password</h4></Label>
        <Col sm={7}>
        <Input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />   </Col>
      </FormGroup>
     
      <Input type="submit" value="Register" className="btm btn-primary"></Input>
      </Form>

        </div>
    );
}

