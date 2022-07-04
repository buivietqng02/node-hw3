import React, {useContext, useState} from 'react'
import {FaUpload,FaTruckLoading} from 'react-icons/fa'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { SelectCom1 } from './Driver'
const SideBarDriverStyled= styled.div`
display: flex;
flex-direction: column;
min-width: 200px;
button {
    border: none;
    padding: 10px 5px;
    text-transform: uppercase;
}
button:hover {  
    background: lightgrey;
}
span {
    float: left;
}
`
const SideBarDriver=()=> {
    const styleFn= ({isActive})=> {
        return {
            textDecoration: "none",
            display: "block",
            margin: "1rem 0",
            backgroundColor: isActive ? "lightgrey": ''
        }

        
    }
    const {setElem}= useContext(SelectCom1)
    return (
        <SideBarDriverStyled>
            <NavLink style={styleFn}
            to="/newtruck"
            >
                <span><FaUpload/></span>create new truck</NavLink>
            <NavLink style={styleFn}
            to="/listtrucks"
            >List trucks</NavLink>
            
            <NavLink style={styleFn}
            to="/assignedloads"
            ><span><FaTruckLoading/></span>assigned loads</NavLink>
            <NavLink style={styleFn}
            to="/history"
            >history</NavLink>
            <NavLink style={styleFn}
            to="/profile">Profile</NavLink>
        </SideBarDriverStyled>
    )
}
export default SideBarDriver