import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import axios from 'axios'

const Auth = () => {
  const [inputs,setInputs]=useState({
    name:"",email:"",password:""
  })
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest= async (type="login") =>{
    const res =await axios.post(`http://localhost:5000/api/user/login`,{
      name:inputs.name,
    email:inputs.email,
    password:inputs.password
    }).catch(err=>console.log(err));
    const data =await res.data;
    return data;
  }
  const handleSubmit =(e) =>{
    e.preventDefault();
    console.log(inputs);
    sendRequest();
  }
  const [isSingup ,setIsSignup]=useState(false) 
  return (
  
    <div>
      <form onSubmit={handleSubmit}>
        <Box
        maxWidth={400}
        display="Flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"centre"}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin='auto'
        marginTop={5}
        borderRadius={5} 
        >
          <Typography padding={3} textAlign="centre">
            {isSingup? "SignUp":"Login"}
            Login
          </Typography>
          {isSingup && <  TextField  name="name"onChange={handleChange} value ={inputs.name} placeholder="name" margin='normal'/>}{" "}
          
          <TextField name="email" onChange={handleChange} value={inputs.email} type={"email"} placeholder='email'  margin='normal'/>
          <TextField name="password"onChange={handleChange} value={inputs.password}  type = {"password"}placeholder='password' margin='normal'/>
          <Button>Submit</Button>
          <Button onClick={()=>setIsSignup(!isSingup)}>Change To {isSingup ? "Login":"SignUp"} </Button>
        </Box>
      </form>
    
    </div>
  )
  }
export default Auth;
