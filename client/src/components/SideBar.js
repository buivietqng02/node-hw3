import React, {useContext, useState} from 'react'
import {FaUpload,FaTruckLoading} from 'react-icons/fa'
import styled from 'styled-components'
import { SelectCom } from './Shipper'
const SideBarStyled= styled.div`
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
const SideBar=()=> {
    const {setElem}= useContext(SelectCom)
    return (
        <SideBarStyled>
            <button
            onClick={()=> setElem('CreateNewLoad')}
            >
                <span><FaUpload/></span>create new load</button>
            <button
            onClick={()=>setElem('ListNewLoads')}
            >List new loads</button>
            <button>posted loads</button>
            <button><span><FaTruckLoading/></span>assigned loads</button>
            <button>history</button>
            <button onClick={()=> setElem('Profile')}>Profile</button>
        </SideBarStyled>
    )
}
export default SideBar