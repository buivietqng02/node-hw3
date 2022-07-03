import React, { useContext, useEffect , useState} from 'react'
import { Context } from '../App'
import { useNavigate } from 'react-router-dom'
import styled, { ThemeConsumer } from 'styled-components'
const HeaderStyled= styled.div`
height: 100px;
padding: 5px;
border: 1px solid;
button {
    color: red;
   
    margin-right: 50px;
    padding: 10px;
    background-color: green;
    border: none;
    border-radius: 5px;
}
button:hover {
    background-color: lightblue;
}
span {
    float: right;
}
img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
`
const Header=({})=> {
    const [avatar,setAvatar]= useState('');
    const {isAuthenticated, credential,
    setIsAuthenticated} = useContext(Context)
    const navigate= useNavigate()
    
    const handleLogout=()=> {
        localStorage.clear();
        setIsAuthenticated(false);
        navigate('/signin')
      

    }
    useEffect(()=> {
        fetch('/api/users/me', {
            headers: {
                authorization: 'Bearer '+ localStorage.getItem('jwt_token')
            }
        })

    
    .then(res=> res.json())
    .then(json=>{
        const avatar= json.user && 
        json.user.avatar;
        setAvatar(avatar)
    })
})
    return (
        <HeaderStyled>
            <img src={avatar} alt='Your avatar' />
            <span>Wellcome {localStorage.getItem('email')}  <button onClick={handleLogout}>Log out</button></span>
           
        </HeaderStyled>
    )
}
export default Header