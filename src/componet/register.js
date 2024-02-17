import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Container, Input, Snackbar, TextField, Typography } from '@mui/material'
import React, { useReducer, useRef, useState } from 'react'
import "./css/login.css"
import { AccountBox, Mail, Pending } from '@mui/icons-material'
import accurl from"../api/apiurl.json"
import axios from 'axios'
import $ from "jquery"
import acclogo from "../icon/acc.png"
import aptube from "../icon/logo.png"
import reducerfun from './hookFunctions/reducerfun'
import { json } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import sucess from "../icon/sucess.png"



const Register=()=> {


   var initval={f1number:"",snumber:"",tnumber:"",fnumber:"",ftnumber:"",stnumber:"",gmail:"",nickname:"",user:"",password:"",modal:false,title:"",content:"",snackbar:false,message:""}
    const [checkmail,setcheckmail]=useState(false)
    const [Loading,setLoading]=useState(false)

    const [state,dispatch]=useReducer(reducerfun,initval)
  
 
const  resister=async (e)=>{
    e.preventDefault();

    await axios.post(accurl.accurl,data,{headers:{"Content-Type":"text/plain"}}).then(async (data)=>{
    })

    const date=new Date();
    var data=new FormData()
    data.append("submit","true");
    data.append("user",state.user);
     data.append("gmail",e.target[2].value);
     setLoading(true)
await axios.post(accurl.accurl,data,{headers:{"Content-Type":"text/plain"}}).then(async (data)=>{
    
    if(data.data=="1"){
     await  setcheckmail(true)
     dispatch({type:"otpchange",value:{gmail:e.target[2].value}})

    }else{
       setLoading(false)

       if(data.data==state.user){
        dispatch({type:"otpchange",value:{message:" user name already have.",snackbar:true}});
        $("#user").select().focus();
       
       

       }
       if(data.data==state.gmail){
        dispatch({type:"otpchange",value:{message:" already have gmail .",snackbar:true}});
        $("#email").select().focus();
       
      
     
       
        
       }
    }
    setTimeout(() => {
        
    dispatch({type:"otpchange",value:{message:" user name already have.",snackbar:false}});

        
    }, 1000);

}).catch(()=>{
    $('#submit').html("Register").prop('disabled', true);
})

}
const changeotp=(feild,e)=>{
    const re = /[0-9]+/g;
   if( re.test(e.target.value) || e.target.value=='' ){
   if( e.target.value.length<=1  ){
    
         dispatch({type:"otpchange",value:feild})
   }}
    
}

const verifyotp=()=>{
 
    
    const datas=new FormData();
    const {f1number,snumber,tnumber,fnumber,ftnumber,stnumber}=state;
    var otp=Number(f1number+""+snumber+""+tnumber+""+fnumber+""+ftnumber+""+stnumber)
    datas.append("verify",'otp');
    datas.append("otp",otp);
    datas.append("gmail",state.gmail);
    datas.append("nick",state.nickname);
    datas.append("user",state.user);
    datas.append("password",state.password);
axios.post(accurl.accurl,datas, { headers: {
        'Content-Type': 'text/pain',
      }}).then((data)=>{
       if(data.data>0){
       
       $("#otpfeilds").html('<div> ✅   <div>verified success fully</di><div>')
        setInterval(()=>{
          window.location.replace("/login")
        },2000)
        
      
       }else{
        dispatch({type:"otpchange",value:{message:" your entered is wrong Otp .",snackbar:true}});
        setInterval(()=>{
            dispatch({type:"otpchange",value:{snackbar:false}});
          },2500)
       }

    })
}


  return (
   <Container className='container'>

<Snackbar  severity="success"  open={state.snackbar}  message={state.message} autoHideDuration={4000} />

    <Card className='card' xs={12} sm={6}>
      
        <CardContent>
        
       {
        checkmail ==true?(
            <div id='main-otp' className='form p-2 text-center'>
           
            <h4>  <Mail fontSize='10'/> Otp Verfication</h4>
            <h5>verifiy your details</h5>
            <div><span>
                
                one time password send to</span> <p>{state.gmail}</p> </div>
            <div id="otpfeilds" className=' form m-2'>
           
        <TextField  value={state.f1number}   pattern="^[0-9]*$"  className='p-0' onChange={(e)=>{changeotp({f1number:e.target.value},e)}}  style={{width:35,margin:2}}   />
        <TextField value={state.snumber}   pattern="^[0-9]*$" onChange={(e)=>{changeotp({snumber:e.target.value},e)}} style={{width:35,margin:2}}  />
        <TextField  value={state.tnumber}  pattern="^[0-9]*$" onChange={(e)=>{changeotp({tnumber:e.target.value},e)}} style={{width:35,margin:2}}  />
        <TextField  value={state.fnumber}   pattern="^[0-9]*$" onChange={(e)=>{changeotp({fnumber:e.target.value},e)}} style={{width:35,margin:2}}  />
        <TextField  value={state.ftnumber}  pattern="^[0-9]*$" onChange={(e)=>{changeotp({ftnumber:e.target.value},e)}} style={{width:35,margin:2}}  />
        <TextField  value={state.stnumber}  pattern="^[0-9]*$" onChange={(e)=>{changeotp({stnumber:e.target.value},e)}} style={{width:35,margin:2}}  />
        </div>
     
        <Button type='button' onClick={verifyotp} variant={"outlined"} className='btn  btn-primary text-primary'>verifiy</Button>
     
    
        </div>
        )
        
        :
       
            <form onSubmit={resister} className='form'>
           
         
           <div id='logodiv' style={{textAlign:"center"}}>
                <img id='logo1' src={aptube} className='img img-circle' width={40} height={40} />
                <img id='logo2' src={acclogo} width={40} height={40} />
                </div>
            <label className='form-label'>name</label>
            <TextField fullWidth onChange={(e)=>{dispatch({type:"otpchange",value:{nickname:e.target.value}})}}  label="nick name"  name='name'/>
            <label className='form-label' >email</label>
            <TextField fullWidth id='email' type='email' label="email" onChange={(e)=>{dispatch({type:"otpchange",value:{gmail:e.target.value}})}}  name='gmail'/>
            <label className='form-label'>username</label>
            <TextField fullWidth onChange={(e)=>{dispatch({type:"otpchange",value:{user:e.target.value}})}}  label='user' name='user'/>
            <label className='form-label'>password</label>
            <TextField type='password' onChange={(e)=>{dispatch({type:"otpchange",value:{password:e.target.value}})}}   label='password' fullWidth name='passwrod'/>
            
     <a className='float-right' href='/login'>do you have acoount? </a>
    { Loading==true?(<><div style={{float:"right",marginTop:2} } className="loader "> </div></>): <Button  variant={"contained"} sx={{float:"right",marginTop:2}}   id="submit"  type='submit'   >Register</Button>
    }
    
   
         
            </form>
}
       </CardContent>

    </Card>
   </Container>
  )
}

export default Register