import React,{useContext,useState} from "react";
import {Link,useHistory} from "react-router-dom";
import {UserContext} from "../../context-api/UserContext";
import Axios from "axios";
import "./main.css";


import { Col, Button, Form, FormGroup, Input } from 'reactstrap';



export const Main=()=>{

    const history=useHistory();

    const main=useContext(UserContext);
    const[userData,setUserData]=main.Data;
    const [todos, setTodos] = useState([]); //empty array
    const[title,setTodo]=useState();
 


    const submit = async (e) => {
      e.preventDefault();

      try{
        const todos={title};
        
        const val=  await Axios.post("http://localhost:5000/users/todo",todos);

       const ans= await fetch("http://localhost:5000/users/gettodo")
      
       //console.log(ans);
     const vini= await ans.json()
        setTodos(vini.data);
        
    
      
    }
    catch(err){
      console.log(err);
    }
    }

    async function deleteTodo(id) {
      try {
       const ans= await fetch(`http://localhost:5000/users/cancel/${id}`,{
         method:"DELETE"
       })
      // console.log(ans);
      
  
        setTodos(todos.filter(todo => todo._id !== id));
      } catch (err) {
        console.error(err.message);
      }
    }
 
    return(
        <div>
        {userData.user ? (
       <div>
        <h4 className="headtag"><b>{userData.user.displayName}</b>Name:</h4>
       
        <h1>Todo App</h1><br></br>
        <Form onSubmit={submit}>
        <FormGroup className="demo" row>
        <Col sm={4}>
        <Input
          id="register-email"
          type="text"
          onChange={(e) => setTodo(e.target.value)}
        />  </Col>
      
      <Button className="btn-primary" value="submit">Go!</Button>
      </FormGroup>
        </Form><br></br>

       
       <div className="demo1">
       
    <center>  <table class="table">
  <thead class="thead-dark">
    <tr>
     
      <th>Title</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  
             
               {todos.map(user=>(
                 <tr key={user._id}>
                 <td>{user.title}</td>
                     <td>
                 <Button  onClick={() => deleteTodo(user._id)} className="btn btn-danger">Delete</Button>
             
               </td>
             </tr>
             
           ))}
           
      
        
       

        </tbody>
     
       </table>
       </center> 
      
       </div>
        

        </div>
      ) : (
        <>
          <h2>welcome User</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
        </div>
    )
}