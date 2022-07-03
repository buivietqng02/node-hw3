import React, {useEffect, useState} from 'react';

import './App.css';
import Signin from './components/Signin'
import Signup from './components/Signup';

import User from './components/User';

import {BrowserRouter as Router, Route,Routes,
}  from 'react-router-dom'
export const Context= React.createContext()
function App() {
  
  //ability to login
  const [isAuthenticated, setIsAuthenticated]=useState(false)
  const [credential, setCredential]= useState({
    email: '',
    password: ''
  })
  const [role, setRole]= useState('');
    
  return (
    <Context.Provider value={{isAuthenticated,
    credential,
    setCredential,
    setIsAuthenticated,
    role,
    setRole
    }}>
  <Router>
    <Routes>
    <Route path='/signin' element= {<Signin/>} />
    <Route path='/register' element= {<Signup/>} />
    <Route path='/' element= {<User/>} />
   
    </Routes>
  </Router>
  </Context.Provider>
  );
}

export default App;
