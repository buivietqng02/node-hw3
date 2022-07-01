import React, {useState} from 'react';
import { Link } from 'react-router-dom';
export default function Signup() {
    const [credential, setCredential]= useState({
        email: '', 
        password: '',
        role: 'DRIVER'
    });
   
    const onChangeHandle= (e)=> {
        const name= e.target.name
        console.log(name)
        const value= e.target.value
        console.log(value)
        setCredential({...credential, [name]: value})
        console.log(credential)
    }
    const onSubmitHandle= async (e)=> {
        e.preventDefault();
        const response= await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credential)
        })
        const json= await response.json()
        console.log(json);
        if (response.status==200) {
            setCredential({ email: '', 
            password: '',
            role: 'DRIVER'})
        }
        alert(json.message);
    }
    return (
        <div className= "register">
            <div className= "form">
            <form>
        
                <p>Register an account</p>
                <label>Email:</label>
                <input type= "text" 
                name="email"
                value= {credential.email}
                placeholder='EMAIL'
                onChange={onChangeHandle}/><br/>
                <label>Password:</label>
                <input type= "password" 
                name="password"
                value={credential.password}
                placeholder='PASSWORD'
                onChange={onChangeHandle}/>< br/>
                <label>Role</label>
                <select name="role" value={credential.role}
                onChange= {onChangeHandle}>
                    <option value="DRIVER" >DRIVER</option>
                    <option value="SHIPPER">SHIPPER</option>
                </select>
                <br/>
                <input type= "submit" 
                value= "Register" 
                onClick={onSubmitHandle}
                />
            </form>
            </div>
            <div className="signin-section">
                <p>Already have a account</p>
                <Link to='/signin'><button>Log in</button></Link>
            </div>
        </div>
    )
}