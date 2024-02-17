import axios from "axios"

import accurl from "../../api/apiurl.json"
import { useState } from "react";

async function USErprofile({table,where,feilds}) {
    const [profile,setprofile]=useState();
    
    
const data=new FormData();
data.append("getuser",true); 
data.append("table","account"); 
data.append("username",localStorage.getItem("user"));
data.append("where",`username='${localStorage.getItem('user')}'`);
data.append("feilds","userprofile,contentType,username,email,number");
const prodata=await axios.post(accurl.profileurl,data,{headers:{' Content-Type ': 'multipart/form-data'},maxBodyLength: 10000000,
    maxContentLength: 10000000,

    emulateJSON: true
}).then((data)=>data.data).catch((e)=>{
console.log(e);
    })
   
   

    
    return prodata;  
}

export default USErprofile