import React, {useEffect, useState} from 'react';

import './App.css';
import Signin from './components/Signin'
import Signup from './components/Signup';
import History from './components/History';
import Profile from './components/Profile';
import CreateNewTruck from './components/CreateNewTruck';
import CreateNewLoad from './components/CreateNewLoad';
import ListNewLoads from './components/ListNewLoads';
import ListTrucks from './components/ListTrucks';
import ListAssignedLoads from './components/ListAssignedLoads';
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
    <Route path='/' element= {<User/>} >
      <Route path="history" element={<History/>} />
      <Route path="profile" element={<Profile/>} />
      <Route path="assignedloads" element={<ListAssignedLoads/>} />
      <Route path="newload" element={<CreateNewLoad/>} />
      <Route path="listnewloads" element={<ListNewLoads/>} />
      <Route path="newtruck" element={<CreateNewTruck/>} />
      <Route path="listtrucks" element={<ListTrucks/>} />
    </Route>
   
    </Routes>
  </Router>
  </Context.Provider>
  );
}

export default App;
