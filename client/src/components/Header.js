import React, { useContext } from 'react'
import { Context } from '../App'
import styled from 'styled-components'
const HeaderStyled= styled.div`

padding: 30px;
border: 1px solid;
button {
    color: red;
   
    margin-right: 50px;
    padding: 10px;
    background-color: green;
}
span {
    float: right;
}
`
const Header=({})=> {
    const {isAuthenticated, credential,
    setIsAuthenticated} = useContext(Context)
    console.log(credential)
    const handleLogout=()=> {
        localStorage.clear();
        setIsAuthenticated(false);

    }
    return (
        <HeaderStyled>
            <img src='' alt='Your avatar'/>
            <span>Wellcome {localStorage.getItem('email')}  <button>Log out</button></span>
           
        </HeaderStyled>
    )
}
export default Header