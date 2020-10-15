import React,{useContext} from "react";
import {Link,useHistory} from "react-router-dom";
import {Nav,Navbar,NavLink,NavItem,Button} from "reactstrap";
import {UserContext} from "../../context-api/UserContext";



export const AuthOption=()=>{

    const history=useHistory();

    const main=useContext(UserContext);
   // console.log(main);
  
    const [userData,setUserData]=main.Data;
  
    const registerbtn=()=>{
      history.push("/register");
  }
  
  const loginbtn=()=>{
      history.push("/login");
  }
  
  
  const logout=()=>{
      setUserData({
          token:undefined,
          user:undefined,
         // role:undefined,
          //displayName:undefined,
      });
      localStorage.setItem("auth-token", "");
      history.push("/");
  }
    
    return(
        <div>
          <div>
        
                <Nav>
                    <NavItem>
                    {userData.user ?(
                <div>
                    <NavItem>
                    <Button color="primary" onClick={logout}>logout</Button>
                    </NavItem>
                
        
                </div>
               
            ):(
                <>
                <Button color="primary"  onClick={registerbtn}>Register</Button>&nbsp;
                <Button color="primary" onClick={loginbtn}>Login</Button>
               </>
            )};
                    </NavItem>
                </Nav>
        
        
    </div>
        </div>
    );
}