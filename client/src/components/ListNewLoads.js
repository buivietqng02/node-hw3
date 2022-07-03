import React, { useState, useEffect } from 'react'
import { Context } from '../App'

import { FaSpinner } from 'react-icons/fa'
import styled from 'styled-components'
const NewLoadsStyled= styled.div`
th, td {
    padding: 15px;
    text-align: left;
  }
tr:nth-child(even) {
    background-color: lightgrey
}
tr:nth-child(odd) {
    background-color: rgba(0,0,0,.3);
}

`

const ListNewLoads=()=> {
   const [loading, setIsLoading]= useState(true);
   const [data, setData]= useState([]);
   useEffect(()=> {
       fetch('/api/loads?status=NEW', {
           headers: {
               'authorization': 'Bearer '+ 
               localStorage.getItem('jwt_token')
           }
       })
       .then(response=> response.json())
       .then(json=>{
           setData(json) ;
           setIsLoading(false)
           console.log(json)
       })
       .catch(err=> {
           alert(err.message);
           setIsLoading(false);
    })

       
   },[loading])
   const handlePost= (id)=> {
    fetch(`/api/loads/${id}/post`, {
        method: 'POST',
        headers: {
         'authorization': 'Bearer '+ 
         localStorage.getItem('jwt_token')
     }

    })
    .then(response=> response.json())
    .then(json=>{
        //setIsLoading(true)
         alert(json.message);
     })
    .catch(err=> alert(err.toString()))
   }
   const handleDelete= (id)=> {
       console.log(id)
       fetch(`/api/loads/${id}`, {
           method: 'DELETE',
           headers: {
            'authorization': 'Bearer '+ 
            localStorage.getItem('jwt_token')
        }

       })
       .then(response=> response.json())
       .then(json=>{
           setIsLoading(true)
            alert(json.message);
        })
       .catch(err=> alert(err.toString()))
}
    return (
        <NewLoadsStyled>
           {loading ? <FaSpinner/>:
           <>
           <table>
               <thead>
               <tr>
                   <th>Load Name</th>
                   <th>created date</th>
                   <th>pick up address</th>
                   <th>deleivery address</th>
                   <th>payload</th>
                   <th>width</th>
                   <th>length</th>
                   <th>height</th>
               </tr>
               </thead>
               <tbody>
                  
                {data.loads.map((load)=> 
                    <tr key= {load._id}>
                        <td>{load.name}</td>
                        <td>{load.created_date}</td>
                        <td>{load.pickup_address}</td>
                        <td>{load.delivery_address}</td>
                        <td>{load.payload}</td>
                        <td>{load.dimensions.width}</td>
                        <td>{load.dimensions.length}</td>
                        <td>{load.dimensions.height}</td>
                        
                        <td><button
                        onClick={()=>handlePost(load._id) }
                        >
                            POST
                        </button></td>
                        <td><button
                        onClick={()=>handleDelete(load._id) }
                        >
                            DELETE
                        </button></td>
                    </tr>
                )}
               </tbody>
           </table>
           </>
           }
           
        </NewLoadsStyled>
    )
}
export default ListNewLoads