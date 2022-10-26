import Navigation from "./components/Navigation/Navigation";
import Register from "./pages/Register/Register";
import Settings from "./settings/Settings";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import {BrowserRouter, Routes, Route } from "react-router-dom"
import { useContext } from "react";

import { Context } from "./components/context/Context";



function App() {

const {user} = useContext(Context);

  return (
    <>
   <BrowserRouter>  
   
    <Navigation />
   
    <Routes>
     <Route path='/' element={<Home />} />
     <Route path='/register' element=
     {user ? <Home/> : <Register />} />
     <Route path='/login' element={user ? <Home/> :<Login/>} />
     <Route path='/write' element={<Write/>} />
     <Route path='/settings' element={<Settings />} />
     <Route path='post/:postId' element={<Single />} />

    
    </Routes>
    </BrowserRouter>
    </>
  
  )
}

export default App;
