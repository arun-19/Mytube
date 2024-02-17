import axios from "axios"
import { Button, Form } from "react-bootstrap"
import $ from "jquery"
import { useEffect, useState } from "react"
import { Container, MenuItem, Select, TextField, colors } from "@mui/material"

import  urlapi from "../api/apiurl.json"
import "./css/create.css";

export default function Create (){

    useEffect(()=>{
        console.log( $("#poster"));
          },[])

    const [name,setname]=useState()
    const [discription,setdiscription]=useState()
    const [videotype,setvideotype]=useState("")
  
const uploadfile=async ()=>{
const uploadfiledata=$("#files")[0].files[0];
const uploadposter=$("#poster")[0].files[0];



if(uploadfiledata?.size<=85705150){
  /*  const upload=new FileReader();
    upload.readAsDataURL(uploadfiledata);
    const uploadpromise=new Promise(function(resolve,reject){

        upload.onloadend=async function(event){
           
        await  resolve( event.target.result )
     
     }
          })
       const uploadbase64=await uploadpromise.then(data=>data)
   
          */
     const gettime=new Date();
     const time=gettime.getHours()+":"+gettime.getMinutes();
     const date=gettime.getFullYear()+"/"+(gettime.getMonth()+1)+"/"+gettime.getDate();
      const formdata=new FormData();
     
    if(  uploadposter?.size<=85705150){
      formdata.append("files", uploadfiledata)
      formdata.append("poster", uploadposter)
      formdata.append("postertype", uploadposter.type)
      formdata.append("name",name )
      formdata.append("disc",discription )
      formdata.append("type",uploadfiledata.type )
      formdata.append("contentType",videotype)
      formdata.append("time",time)
      formdata.append("username",localStorage.getItem("user"))
      formdata.append("date",date)
      formdata.append("mode","create" )
     
        axios.post(urlapi.url, formdata,{headers:{' Content-Type ': 'multipart/form-data'},maxBodyLength: 10000000,
        maxContentLength: 10000000,

        emulateJSON: true
    }).then((data)=>{
        if(data.data=="1"){
        alert("successfuy uploaded")
        }

    })
  }else{
    alert("poster must be  10mb file");
  }
}else{

    alert("please upload less than 70Mb")
}
    
   
    
}
    
    return(
        <Container>

            <Form>
            <label>name</label>
        <TextField style={{border:"1px solid white",color:"white"}} placeholder="name" type="text" required fullWidth name="name" onChange={(e)=>{setname(e.target.value)}} value={name} />
         
            <label>discription</label>
            <TextField  style={{border:"1px solid white",color:"white"}} placeholder="discription" type="text" required fullWidth name="discription" onChange={(e)=>{setdiscription(e.target.value)}}  value={discription} />
          
          <label>type</label>
          <Select  style={{border:"1px solid white",color:"white"}}  value={videotype} onChange={(e)=>{setvideotype(e.target.value)}} fullWidth>
            <MenuItem id="nav" value={"comedy"} >comedy</MenuItem>
            <MenuItem id="nav" value={"music"}>music</MenuItem>
            <MenuItem id="nav"value={"short"}>short</MenuItem>
            <MenuItem id="nav" value={"kids"}>kids</MenuItem>
          </Select>
          
            <label>file</label>
            <br></br>
          <TextField style={{border:"1px solid white",color:"white"}} type="file" className="text-white"  id="files"  required accept="video/*" />

          <div>

          <label>poster</label>
            <br></br>
          <TextField style={{border:"1px solid white",color:"#fff0"}} type="file" id="poster"  required  accept="image/*" />
          </div>

          <footer style={{textAlign:"right",position:"fixed",bottom:0,left:0,width:"100%"}}>
           <button  variant="outlined"   className="btn text-white btn-success" onClick={uploadfile} >upload</button>
           </footer>
           </Form>
        </Container>
    )
}