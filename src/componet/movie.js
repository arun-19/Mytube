import { useContext, useDeferredValue, useEffect, useMemo, useReducer } from "react"
import reducerfun from "./hookFunctions/reducerfun"
import UserContext from "./Context/UserContext";
import axios from "axios";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import movie from "./image/movie.png"

const init={movielist:[]}

export default function Movie(){

    const [state,dispatch]=useReducer(reducerfun,init);

    const {search}=useContext(UserContext);

    const searchval=useDeferredValue(search);

const getmovie=useMemo(()=>{

        axios.get("https://www.omdbapi.com/?i=tt3896198&apikey=c171af73&s="+searchval,{headers:{"Content-Type":"text/json"}}).then((e)=>{
console.log(e.data);
        dispatch({type:"otpchange",value:{movielist:e.data}})

        })

   // 

},[searchval]
)


    return(
       <>  

  <ImageList  variant="quilted" cols={4} gap={4} >   
    {


    state.movielist.Response=='True' && searchval!="" &&  state.movielist?.Search.map((value,index)=>(

        <div style={{border:"10px 5px 1px 1px inset gray",padding:"2px"}} >
        

        <ImageListItem  key={value.poster} >
            {
                value.Poster=="N/A"?<img
                src={movie}
                width={80}
       height={50}
                 alt={value.Title}
                 loading="lazy"
               />:
      <img
       src={value.Poster}
       width={80}
       height={50}
        alt={value.Title}
        loading="lazy"
      />
            }
      <ImageListItemBar
            title={value.Title}
            subtitle={<span>by: {value.Title}</span>}
            position="below"
          />
    </ImageListItem>
    

        
       
        </div>
    ))
}
</ImageList>

 
       
       </>
    )
}