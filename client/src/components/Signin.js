import React, {useContext, useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { Context } from '../App'

export default function Signin() {
    const navigate= useNavigate();
    const {setIsAuthenticated,
        credential,
    setCredential} = useContext(Context)
    
    const onChangeHandle=(e) => {
        
        setCredential({
            ...credential, 
            [e.target.name]: e.target.value
        })
    }
    const onSubmitHandle=async (e)=> {
        console.log(credential)
        e.preventDefault();
        const response=await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credential)
        })
        const json= await response.json();
        alert(json.message)
        if (response.status===200) {
       
        
        setIsAuthenticated(true);
        localStorage.clear();
        localStorage.setItem('jwt_token',json.jwt_token )
        localStorage.setItem('email', credential.email)
        
        navigate('/');
        
        }

       
    }
    return (
        <div className= "login">
            <form>
            <h1>Sign in</h1>
            <label>Email</label>
            <input type= "text" 
            name= "email"
            value= {credential.email}
            onChange={onChangeHandle}/>
            <br/>
            <label>Password</label>
            <input type= "password" 
            name="password"
            value= {credential.password}
            onChange={onChangeHandle}
            />
            <br/>
            <input type= "submit" 
            onClick={onSubmitHandle}
            value= "Log in" />
            </form>
           
            <p>Dont have a account</p>
            <Link to='/register'><button>Register</button></Link>
        </div>
    )
}