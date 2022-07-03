import React, {useState, useRef, useEffect} from 'react'
import styled from 'styled-components'
const NewTruckStyled= styled.div`
margin: 0 auto;
max-width: 500px;
width: 80%;
select {
    padding: 5px;
}
input[type="submit"] {
    padding: 5px;
    position: relative;
    margin-top: 20px;

}
input[type="submit"]:hover {
    background-color: lightblue
}
`
const CreateNewTruck=()=> {
   const ref= useRef(null)
const [name, setName]= useState('');
const handleSubmit=(e)=> {
e.preventDefault()
    fetch('/api/trucks', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            authorization: 'Bearer '+ localStorage.getItem('jwt_token')
        },
        body: JSON.stringify({type: name})
    })
    .then(response=> response.json())
    .then(json=> alert(json.message))
    .catch(err=> alert(err.toString()))
}
useEffect(()=> setName(ref.current.value),[name])
    return (
        <NewTruckStyled>
            <form  >
            <h2>Create new Truck</h2>
            <label htmlFor="truck">Truck Type</label>
            <select
           ref= {ref}
            id="truck"
            onChange={(e)=> {setName(e.target.value)
            console.log(name)}}
            name="type" >
                <option value="" >Select type</option>
                <option value="SMALL STRAIGHT">SMALL STRAIGHT</option>
                <option value="LARGE STRAIGHT">LARGE STRAIGHT</option>
                <option value="SPRINTER">SPRINTER</option>
                </select>
          
            
           <br/>
            <input type="submit" value= "Create"
            onClick={handleSubmit}/>
            </form>
        </NewTruckStyled>
    )

}
export default CreateNewTruck