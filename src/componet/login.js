import { AccountBox, AccountCircle, Key, Login } from '@mui/icons-material'
import { Button, CardActions, CardContent, CardHeader, CardMedia, InputAdornment, Snackbar, TextField, Typography } from '@mui/material'
import React, { Component, useEffect, useReducer } from 'react'
import { Card, Container, Form, Toast } from 'react-bootstrap'
import accurl from"../api/apiurl.json"
import axios from 'axios'
import reducerfun from './hookFunctions/reducerfun'
import $ from "jquery"
export function LoginPage() {
    const initval={user:"",password:""};



    const [state,dispatch]=useReducer(reducerfun,initval)
    const Loginuser=async()=>{
        const data=new FormData();
        data.append("login",true);
        data.append("user",state.user)
        data.append("password",state.password)
       await  axios.post(accurl.accurl,data,{headers:{"Content-Type":"text/plain"}}).then(async (data)=>{
        const result=data.data.result;
        if(result=="1"){
            localStorage.setItem("token",data.data.token);
            localStorage.setItem("token",data.data.token);
            localStorage.setItem("user",state.user)
            window.location.replace("/home")
        }else{
            
            dispatch({type:"otpchange",value:{message:result=="unf"?"Wrong username!":"Check the user Account!",snackbar:true}});
            setInterval(()=>{  dispatch({type:"otpchange",value:{snackbar:false}});},2000)

        }


       })

    }
  
    return (
     <Container className='bg-light'>
     
<Snackbar severity="success"  open={state.snackbar}  message={state.message} autoHideDuration={4000} />

        <Card>
        <CardMedia><AccountBox/> Login</CardMedia>
 
            <CardContent>


                <div>
             
            <TextField  onChange={(e)=>{  dispatch({type:"otpchange",value:{user:e.target.value}})}} sx={{margin:2}} InputProps={{startAdornment:<InputAdornment><AccountCircle/></InputAdornment>}} label="username" ></TextField>
            </div>
         <div>
                <TextField sx={{margin:2}} onChange={(e)=>{  dispatch({type:"otpchange",value:{password:e.target.value}});}} type='password' InputProps={{startAdornment:<InputAdornment ><Key/></InputAdornment>}} label="password"></TextField> 
                </div>
                <a className='float-right' href='/register'>don't have Account? </a>
            </CardContent>
           
            <Button variant={"contained"} onClick={Loginuser} fullWidth ><Login/> Login</Button>
        </Card>
      
     </Container>
    )
  
}

export default LoginPage