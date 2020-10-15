import React,{useContext} from "react";

import {Navbar,NavbarBrand,Container} from "reactstrap";
import {AuthOption} from "./authOption";


export const Headers=()=>{

    return(
        <div>
        <Navbar color="dark">
            <Container>
                <NavbarBrand href="/"><h1>Developer</h1></NavbarBrand>
                <AuthOption/>
            </Container>
        </Navbar>
        
    </div>
    );
}


