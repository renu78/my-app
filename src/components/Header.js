import { AppBar, Box, Toolbar, Typography ,Button, Tab, Tabs} from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../store';
//import { useDispatch } from 'react';
//import { authActions } from '../store';

const Header = () => {
  const dispath = useDispatch();
  const[value,setValue]=useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  
  return (
    <AppBar
    position='sticky' sx={{background:"green"}}>
      <Toolbar>
        <Typography varinpant="h4">Writehub</Typography>
        {isLoggedIn &&(
        <Box display="flex" marginLeft={"auto"} marginRight={"auto"} >
          <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
            <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
<Tab LinkComponent={Link} to="/myblogs" label="My Blogs "> </Tab>            
          </Tabs>
        </Box>
        )}
        <Box display="flex" marginLeft='auto' >
          
    {!isLoggedIn &&(<> <Button LinkComponent={Link} to="/auth"  variant='contained' sx={{margin:'1', borderRadius:10}} color='warning'>Login</Button>
          <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin:'1',borderRadius:10}} color="warning">Signup</Button></>)}
        {isLoggedIn &&(<> <Button 
        onClick={()=> dispath(authActions.logout)}
        LinkComponent={Link} 
        to="/auth" 
        variant='contained' 
        sx={{margin:'1',borderRadius:10}} 
        color="warning">LogOut</Button></>)}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
