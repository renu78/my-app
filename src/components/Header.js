import React, { useState } from  "react";
import { AppBar, Button, Toolbar, Typography, Box, Tabs,Tab } from "@mui/material";
import {Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
const Header =() =>{
    const isLoggedIn=useSelector(state => state.isLoggedIn)
    const[value,setValue] =useState();
    return(
        <AppBar 
        position="sticky"
        sx={{background :'green'}}>
            <Toolbar>
                <Typography variant="h4">WriteHub</Typography>
              { isLoggedIn &&  <Box display="flex" marginLeft={"auto"}  marginRight={"auto"}>
                    <Tabs
                    textColor="inherit"
                     value={value} onChange={(e,value)=> setValue(value)}>
                        <Tab LinkComponent={Link} to ='/blogs' label="All Blogs"/>
                        <Tab LinkComponent={ Link} to ="/myBlogs" label="My Blogs"/>
                    </Tabs>
                </Box>
                }
               <Box display="flex"marginLeft ="auto">
 {!isLoggedIn && <><Button LinkComponent={Link} to="/auth" variant="contained" sx={{margin: 1, borderRadius:10}} color="warning">Login</Button>
<Button LinkComponent={Link} to="/auth" variant ="contained" sx={{margin:1,borderRadius:10}} color="warning">SignUP</Button></>}
        

{isLoggedIn && <Button LinkComponent={Link} to="/auth" variant ="contained" sx={{margin:1,borderRadius:10}} color="warning">LogOut</Button>
}
             </Box>
            </Toolbar>
        </AppBar>
    )
}
export default Header;