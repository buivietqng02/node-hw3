import React, {useState} from 'react'
import styled from 'styled-components'

const NewLoadStyled= styled.div`
margin: 0 auto;
width: 80%;
max-width: 800px;
padding: 100px;
padding-top: 10px;
background-color: green;
display: flex;
justify-content: center;
form {
    form  { display: table;      }
    p     { display: table-row;  }
    label { display: table-cell; }
    input { display: table-cell; }
}
input {
    padding: 5px;
    width: 400px;
    margin-top: 10px;
}
`
const CreateNewLoad=()=> {

const [name, setName]= useState('');
const [payload, setPayload]= useState(0)
const [pickupAddress, setPickupAddress]= useState('')
const [deliveryAddress, setDeliveryAddress]= useState('')
const [width, setWidth]= useState(0)
const [length, setLength]= useState(0)
const [height, setHeight]= useState(0)
const handleSubmit=(e)=> {
    e.preventDefault()
    const data= {
        name,
        payload,
        pickup_address: pickupAddress,
        delivery_address: deliveryAddress,
        dimensions: {
            width,
            length,
            height
        }
    }
    fetch('/api/loads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+ 
            localStorage.getItem('jwt_token')
        },
        body: JSON.stringify(data)
    })
    .then(response=> response.json())
    .then(data=> {
        alert(data.message);
        
    })
}

    return (
        <NewLoadStyled>
            <form  >
            <h2>Create new load</h2>
            <label>Name</label>
            <input type= "text" 
            value= {name}
           onChange={(e)=> setName(e.target.value)}
            name="name" />
            <br/>
            <label>Payload</label>
            <input type="number" 
            value= {payload}
            onChange={(e)=> setPayload(e.target.value)}
            name="payload" 
          />
            
            <br/>
            <label>pickup_address</label>
            <input type="text" 
            name="pickup_address" 
            value= {pickupAddress}
            onChange= {(e)=> {setPickupAddress(e.target.value)}}            />
            <br/>
            <label>delivery_address</label>
            <input type="text" 
            value= {deliveryAddress}
            onChange={(e)=> setDeliveryAddress(e.target.value)}
            name="delivery_address" 
            />
            <br/>
            <h3>Dimensions</h3>
            <label>width</label>
            <input type="number"
            value= {width} 
            name="width" 
            onChange= {(e)=> setWidth(e.target.value)}
         />
            <br/>
            <label>length</label>
            <input type="number" 
            value={length}
            name="length"
            onChange= {(e)=> setLength(e.target.value)}
            />
            <br/>
            <label>height</label>
            <input type="number" 
            value= {height}
            name="height" 
            onChange={(e)=> setHeight(e.target.value)}
           />
            <br/>
            <input type="submit" 
            onClick={handleSubmit}
            value= "Create"/>
            </form>
        </NewLoadStyled>
    )

}
export default CreateNewLoad