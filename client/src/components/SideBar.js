import React, {useContext, useState} from 'react'
import {FaUpload,FaTruckLoading,FaHistory} from 'react-icons/fa'
import {ImProfile} from 'react-icons/im'
import { NavLink, Link } from 'react-router-dom'
import {BsListStars} from 'react-icons/bs'
import styled from 'styled-components'
import { SelectCom } from './Shipper'
const SideBarStyled= styled.div`
display: flex;
flex-direction: column;
min-width: 200px;


span {
    float: left;
    font-size: 1.5em;
    margin-right: 1em;
}
`
const SideBar=()=> {
    const {setElem}= useContext(SelectCom)
    const styleFn= ({isActive})=> {
        return {
            textDecoration: "none",
            display: "block",
            margin: "1rem 0",
            backgroundColor: isActive ? "lightgrey": ''
        }

        
    }
    return (
        <SideBarStyled>
            <NavLink style={styleFn}
            to= "/newload"
            >
                <span><FaUpload/></span>create new load</NavLink>
            <NavLink style={styleFn}
            to='/listnewloads'
            ><span><BsListStars/></span>List new loads</NavLink>
            
            <NavLink  style={styleFn}
            to="/assignedloads"
            ><span><FaTruckLoading/></span>assigned loads</NavLink>
            <NavLink style={styleFn}
            to="/history"><span><FaHistory/></span>history</NavLink>
            <NavLink style={styleFn}
            to="/profile"><span><ImProfile/></span> Profile</NavLink>
        </SideBarStyled>
    )
}
export default SideBar