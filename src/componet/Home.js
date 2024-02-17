import React, { useContext } from 'react';

import "./home.css"
import { Button, Col, Row } from 'react-bootstrap';
import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Chip, CircularProgress, Grid, Paper, Skeleton, Stack, Typography, styled } from '@mui/material';
import $ from "jquery";
import PopupOwn from "./popup/popup"
import video from "../icon/download.mp4"
import { AllInbox, BabyChangingStation, Class, FitScreen, Fullscreen, Movie, MusicNote } from '@mui/icons-material';
import axios from 'axios';
import accpng from "../icon/acc.png"
import empty from "./image/empty.gif"
import  urlapi from "../api/apiurl.json"
import VideoPlayer from 'react-video-js-player';
import USErprofile from './logo/userprofile';
import UserContext from './Context/UserContext';


export default class Home extends React.Component{ 



static contextType=UserContext

constructor(props){
    super(props);
    
    this.state={searching:true,color:"green",vichle:"bike",data:[],loaded:false,variant:"",Fullscreen:true,style:{}}  
    
}


 changestate=()=>{
   

    this.setState((pre)=>{
        
       return{ ...pre,color:"yello"} })
    
}
componentWillMount(){
  if(this.state.variant!="all"){
    this.setState({variant:"all"})
this.getdata("home","all");
  }

}
closedialog=()=>{
  this.setState({openopopup:false})
 
}
onPlayerReady(data){
  console.log(data);

}





getdata=(type,value)=>{
  this.setState({loaded:true})
    var filedata=new FormData();
  filedata.append("mode",type)
  filedata.append("contentType", value)
 axios.post(urlapi.url,filedata).then(async (data)=>

await JSON.stringify(data.data)).then(async (data)=>{
  await  this.setState({data:JSON.parse(data)});
  this.setState({loaded:false})
}).catch((e)=>{console.log(e)}).finally(()=>{
   
})
  
}

componentDidMount(){
 

}

componentDidUpdate(previousprops,previoustate){
    if(previoustate.variant!==this.state.variant){
        this.getdata("home",this.state.variant);
    }

}

openvideo=async (e)=>{

  const data=new FormData();
data.append("getuser",true); 
data.append("table","videos t,account acc"); 
data.append("username",localStorage.getItem("user"));
data.append("where",`t.pk=${e} and acc.username=t.username`);
data.append("feilds","t.date,t.discription,t.username,t.contentType,t.time,t.file,t.type,acc.userprofile");
await axios.post(urlapi.profileurl,data,{headers:{' Content-Type ': 'multipart/form-data'},maxBodyLength: 10000000,
    maxContentLength: 10000000,

    emulateJSON: true
}).then(async (data)=>

{

  const [{type,file,poster}]=data.data;
  
  const innercomponent=await(
    <>
       <video
                     controls={true}
                     autoPlay
                     style={{minHeight:"100%",minWidth:"100%"}}
                      
                     src={`data:${type};base64,${file}`}
                     poster={poster}
                     width="720"
                     height="420"
                    
                 />
    </>
   )
   this.setState({openopopup:true,innerpopup:innercomponent});
}



).catch((e)=>{
console.log(e);
    })



}    
    render(){
   
     
      const {search}=this.context;



        const getvideostype=(data)=>{
        this.setState({variant:data})

     }  

        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
          }));

  
        
   
        return (
       
         <>
   

             <Box justifyContent={
        "center"
             } padding={0} margin={0} >

             
               <Stack padding={0} spacing={5} direction={"row" }>

               <Chip
  avatar={<AllInbox alt="Natacha" src="/static/images/avatar/1.jpg" />}
  label="  All "
  id="all"
variant={this.state.variant=="all"?"filled":"outlined"}
  onClick={()=>{getvideostype("all")}}

/>
<Chip
  avatar={<Movie alt="Natacha" src="/static/images/avatar/1.jpg" />}
  label="Movie"
  onClick={()=>{getvideostype("movie")}}
  id="movie"
  variant={this.state.variant=="movie"?"filled":"outlined"}
/>
<Chip
  avatar={<MusicNote alt="Natacha" src="/static/images/avatar/1.jpg" />}
  label="music"
  id="music"
  onClick={()=>{getvideostype("music")}}
  variant={this.state.variant=="music"?"filled":"outlined"}
/>
<Chip
  avatar={<BabyChangingStation alt="Natacha" src="/static/images/avatar/1.jpg" />}
  label="kids"
  onClick={()=>{getvideostype("kids")}}
  id="kids"
  variant={this.state.variant=="kids"?"filled":"outlined"}
/>
{this.search}

               </Stack>

               {
                
               }
            
                  {
    this.state.loaded&& <> <Skeleton variant="rectangular" sx={{width:'100%'}} height={250} />
        <Skeleton variant="rectangular" sx={{width:'50%',marginTop:'10px'}}height={40} />
    <Skeleton variant="rectangular" sx={{width:'50%',marginTop:'10px'}}height={40} />
    <br></br>
    <Skeleton variant="rectangular" sx={{width:'100%'}} height={250} />
    <Skeleton variant="rectangular" sx={{width:'50%',marginTop:'10px'}}height={40} />
    <Skeleton variant="rectangular" sx={{width:'50%',marginTop:'10px'}}height={40} />
    <br></br>
    <Skeleton variant="rectangular" sx={{width:'100%'}} height={250} />
    <Skeleton variant="rectangular" sx={{width:'50%',marginTop:'10px'}} height={40} />
    <Skeleton variant="rectangular"sx={{width:'50%',marginTop:'10px'}}height={40} />
    </>
  }
         <Grid spacing={2} rowGap={1} sx={{marginTop:2}} container justifyContent={"center"}  >


  {this.state.data.length>0 ? this.state.data?.map((data,index)=>(
         <Grid item={true}   key={index+1}   xs={12} md={4}  >

            <Card     elevation={2} classes={Class.root} raised={true}>
        

                <CardActionArea 
                 
                onClick={()=>{this.openvideo(data.pk)}} 
                         >
              < CardMedia image={`data:${data.postertype};base64,${data.poster}`} component="img" controls width={100} height={200}  />
                
                </CardActionArea>
            
              
              <CardContent sx={{marginTop:1}}>

                <Row className='row'>

                    <Col className='col-2'>
                    <img src={data.userprofile!=null?data.userprofile:accpng}   width={30} height={30} className="img img-rounded" alt='logo'/>
                    </Col>
                    <Col className='col-10'>
                    <Row>
                        
<Typography variant="body2" color="textSecondary" component="p">
    {data.name}
</Typography>

                    </Row>
                    <Row>
                    <Typography variant="body2" color="textSecondary" component="p">
    {data.discription}
</Typography>
<Col>
{
    data.time
}
</Col>
                    </Row>
                    </Col>
                </Row>



</CardContent>


            </Card>
<UserContext.Consumer>{({refelement})=>{
 refelement.current.onclick=()=>{
this.getdata("search",search)
 }
}}</UserContext.Consumer>
        
        </Grid>
        ))

        :<>
<div className='d-flex' style={{display:"flex",flexDirection:"column",padding:"10px",alignContent:"center"}}>

     
        <img src={empty} className='img img-rounded opacity-0.1' width={170} height={170}/>
        
        <p>No Videos Founded</p>
        </div>

</>
  }
        </Grid>
        


        <PopupOwn style={this.state.style}  Fullscreen={this.state.Fullscreen} open={this.state.openopopup}title="User Id" wrapcomponent={this.state.innerpopup} closedialog={this.closedialog}/>

    
</Box>
         </>
        ); 
        
    }
}