import React, {useState} from 'react'
import styled from 'styled-components'
const NewTruckStyled= styled.div`

`
const CreateNewTruck=()=> {
const [name, setName]= useState('');
const [payload, setPayload]= useState(0)
    return (
        <NewTruckStyled>
            <form  >
            <h2>Create new Truck</h2>
            <label>Truck Type</label>
            <select type= "text" 
            onChange={(e)=> setName(e.target.value)}
            name="type" >
                </select>
          
            
           
            <input type="submit" value= "Create"/>
            </form>
        </NewTruckStyled>
    )

}
export default CreateNewTruck