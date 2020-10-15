import React,{useContext,useState} from "react";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../context-api/UserContext";
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import "./register.css";
import {ErrorNotice} from '../error/ErrorNotice';
import Axios from "axios";


export const Register=()=>{
    const history=useHistory();

    const main=useContext(UserContext);
    const [userData,setUserData]=main.Data;

    const[email,setEmail]=useState();
    const [password,setPassword]=useState();
const [passwordCheck,setPasswordCheck]=useState();
const [displayName,setDisplayName]=useState();
const [role,setRole]=useState();
const[error,setError]=useState();

const submit = async (e) => {
    e.preventDefault();
 
    try{
const newUser={email,password,passwordCheck,displayName,role};

  await Axios.post("http://localhost:5000/users/add",newUser);

  const loginRes=await Axios.post("http://localhost:5000/users/login",{
     email,
     password

      
  });
  console.log(loginRes);

   setUserData({
      token:loginRes.data.token,
      user:loginRes.data.user,
     // role:loginRes.data.role,
     // displayName:loginRes.data.displayName,
  });

  
    localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
}
catch(err){
  err.response.data.msg && setError(err.response.data.msg);
  //console.log(err);

}
    };



    


    return(
   <div>
   <Form onSubmit={submit}>
       <h1>Register form</h1><br></br>
       {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
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
      <FormGroup row>
        <Label for="examplePassword" sm={3}><h4>Re-password</h4></Label>
        <Col sm={7}>
        <Input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        /> </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleEmail" sm={3}><h4>Name</h4></Label>
        <Col sm={7}>
        <Input
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />    </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleSelect" sm={3}><h4>Role</h4></Label>
        <Col sm={7}>
        <Input
          id="register-display-name"
          type="text"
          onChange={(e) => setRole(e.target.value)}
        />
        </Col>
      </FormGroup>
      <Input type="submit" value="Register" className="btm btn-primary"></Input>
      </Form>
       </div>
    );
}

