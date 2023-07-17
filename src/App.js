import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import CNN from './Components/CNN';
import CNNPrev from './Components/prevCNN';
import Yolo from './Components/Yolo';
import HE from './Components/HE';
import IHC from './Components/IHC';

export default function App(){
  const User = localStorage.getItem('jwt')!=null;
  return (<>
    <Router>
      {
        User?
        <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path='' element={<Home/>}/>
          <Route path='/prevcnn' element={<CNNPrev/>}/>
          <Route path='/hepatch' element={<HE/>}/>
          <Route path='/ihcpatch' element={<IHC/>}/>
          <Route path='/malaria' element={<Yolo/>}/>
          <Route path='/cnn' element={<CNN/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='*' element={<Login/>}/>
        </Route>
      </Routes>
      :
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path='' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='*' element={<Login/>}/>
        </Route>
      </Routes>
      }
      
    </Router>
  </>);
}
