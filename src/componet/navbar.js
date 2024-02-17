import { Input, SvgIcon, TextField, Typography } from "@mui/material";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import home from "../icon/home.svg"
import short from "../icon/video.gif"
import create from "../icon/make.svg"
import logo from "../icon/logo.png"
import { NavLink } from "react-router-dom";
import "./navbar.css"
import { useCallback, useContext, useEffect, useReducer, useRef } from "react";
import reducerfun from "./hookFunctions/reducerfun";
import axios from "axios";
import userprofile from "./logo/userprofile";
import USErprofile from "./logo/userprofile";
import user from "./image/user.png"
import userupload from "./image/addimage.png"
import PopupOwn from "./popup/popup";
import apiurl from "./../api/apiurl.json"
import { Edit, ImageSearchOutlined, Login } from "@mui/icons-material";
import UserContext from "./Context/UserContext";


var init={ logo:"",innerpopup:"",openopopup:false,contentType:"" }
export default function Navbarap(){
  const {setsearch,refelement}=useContext(UserContext);

  const componentref=useRef();
const [state,dispatch]=useReducer(reducerfun,init);
const profiledata= USErprofile({table:"account",where:`username='${localStorage.getItem('user')}'`,feilds:"userprofile,contentType,username,email,number"});
const getprofile=useCallback(async ()=>{
    const data=await profiledata.then((data)=>data)
    if(data!=null){
   const [{userprofile,contentType}]=data;
   dispatch({type:"otpchange",value:{logo:userprofile,profilecontent:contentType}})
    }
},[state.openopopup,state.logo])

useEffect(()=>{
   getprofile();
     
},[])

const closedialog=()=>{
  
  dispatch({type:"otpchange",value:{openopopup:false}})
}

const handlefilechange=async (e)=>{

  const filereader=new FileReader();
  filereader.readAsDataURL(e.target.files[0]);
  const  promisereader=new Promise((resolve,reject)=>{
    filereader.onloadend=async function(event){
      await resolve(event.target.result);
    }
  })

 const filedata=await promisereader.then((data)=>data);
  
  const data=new FormData();
  data.append("update",true);
  data.append("table","account");
  data.append("feilds","userprofile='"+String(filedata)+"'");
  data.append('where'," username='"+localStorage.getItem('user')+"'");
 

  axios.post(apiurl.fun_quries,data).then((e)=>{
    const {data}=e;
    if(data==1){
      window.location.reload();
    }

  })
 

}

const Serachdata=(e)=>{
 setsearch(e.target.value);

}

const openprofileselect=()=>{
  componentref.current.focus()
  componentref.current.click();

}

const addimage=useCallback(async ()=>{

  
  const profile=await profiledata.then((data)=>data)
  if(profile!=null){
   const [{userprofile,contentType,username,email,number}]=profile;
  
  const innercomponent=(
<div className="text-center">
<input type="file" className="hide" ref={componentref} onChange={handlefilechange} />
<button className="btn"  onClick={openprofileselect} >{userprofile==null?<img className=" text-center img img-circle" width={100} height={100} src={userupload}/>:<div style={{position:"relative"}}> <img  style={{zIndex:"-1"}} className="img  img-rounded" width={100} height={100} src={userprofile}></img><p>Change Picture</p>  </div>}</button>

<div  className="row m-2">
  <Typography>User Id</Typography>
  <TextField  fullWidth label="userName" variant="standard" defaultValue={username}/>
  <TextField fullWidth label="email" variant="standard" defaultValue={email}/>
  <TextField fullWidth label="Number" variant="standard" defaultValue={number}/>

</div>
</div>

  )

  dispatch({type:"otpchange",value:{openopopup:true,innerpopup:innercomponent}})
  }else{
    localStorage.clear();
window.location.reload();    
  }
},[])



    return (

    <Navbar expand="lg" id="nav" className=" nav sticky top-0">
     
        <Container fluid >
    <Navbar.Brand href="/home" className="d-flex align-items-center m-0   p-0"><img src={logo} width={25} height={25}   className="d-inline-block img-rounded align-top"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse>
    <Nav className="me-auto  text-center">


        
   
        <Nav.Link className="link">
        <NavLink to={"/home"}  className={"text-muted link d-flex align-items-center m-0   p-0"}>
  <label> Home</label>
</NavLink>
</Nav.Link>


<Nav.Link className="link" >

<NavLink to={"/movie"} className={"text-muted link d-flex align-items-center m-0   p-0"}>

 <label>Movie</label>
</NavLink>

</Nav.Link>

<Nav.Link className="link">
        <NavLink to={"/create"} className={"text-muted link d-flex align-items-center m-0   p-0"}>

  <label> create</label>
</NavLink>
</Nav.Link>

<PopupOwn fullScreen={false}  open={state.openopopup}title="User Id" wrapcomponent={state.innerpopup} closedialog={closedialog}/>






    </Nav>
   
    </Navbar.Collapse>
    <div id="id">
    {state.logo==null? <div className="btn "> <img  src={user} alt="logo"  width={30} height={30} className="img img-rounded" onClick={addimage} /></div>
  :<div className="btn "> <img  src={state.logo} alt="logo"  width={30} height={30} className="img  img-rounded" onClick={addimage} /></div>}
    
    </div>
    <Form className="d-flex ">
       
   
    <Form.Control  
    type="search"
    placeholder="🔍search..."
    className="me-2"
    onChange={(e)=>{Serachdata(e)}}
    aria-label="search"    
    />
    
     <Button ref={refelement} className="btn btn-secendary">Search</Button>
    </Form>
    </Container>
    </Navbar>

    );

}