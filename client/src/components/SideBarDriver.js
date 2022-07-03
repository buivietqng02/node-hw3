import React, {useContext, useState} from 'react'
import {FaUpload,FaTruckLoading} from 'react-icons/fa'
import styled from 'styled-components'
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
    const {setElem}= useContext(SelectCom1)
    return (
        <SideBarDriverStyled>
            <button
            onClick={()=> setElem('CreateNewTruck')}
            >
                <span><FaUpload/></span>create new truck</button>
            <button
            onClick={()=>setElem('ListTrucks')}
            >List trucks</button>
            
            <button
            onClick={()=>setElem('ListAssignedLoads')}
            ><span><FaTruckLoading/></span>assigned loads</button>
            <button
            onClick={()=> setElem('History')}
            >history</button>
            <button onClick={()=> setElem('Profile')}>Profile</button>
        </SideBarDriverStyled>
    )
}
export default SideBarDriver