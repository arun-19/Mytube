
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Router.css';
import Home from './componet/Home';


function Routers() {
  const routedata=[
    {
     pn:1,title:"Home",component:<Home/>,path:"/Home"
    }
  ]
  return (
    
     <div className='bg-primary'>
     
     <BrowserRouter>
      <Routes>
        {
          routedata.map(data=>
            <Route key={data.pn} path={data.path} element={data.component} />

        )
        }
        <Route path='/Home' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
      </div>
    
  );
}

export default Routers;
