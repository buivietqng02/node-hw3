import React, {useState, useEffect, useContext} from 'react'
import {useNavigate } from 'react-router-dom'
import Shipper from './Shipper'
import Driver from './Driver'
import { Context } from '../App'
const User=()=> {
    const navigate= useNavigate()
    const {role, setRole}= useContext(Context)
    useEffect( ()=> {

        if (localStorage.getItem('jwt_token')) {
           fetch('/api/users/me', {
            headers: {
              authorization: 'Bearer '+ localStorage.getItem('jwt_token')
            }
          })
          .then(res=> {
            if (res.status==200) {
              return res
            } else {
              throw new Error('cannot get info')
            }
          })
          .then(res=> res.json())
          .then(json=> {
              if (json.user.role){
              setRole(json.user.role);
              } else {
                navigate('/signin')
              }
            })
          .catch(err=>{
            setRole('');
            console.log(err.toString())
          })
        } else {
            navigate('/signin')
        }
      }) 
      return (
          <>
            {role==='SHIPPER' ?<Shipper/>
            : role=='DRIVER'? <Driver/> : <></>}
          </>
      )
}
export default User