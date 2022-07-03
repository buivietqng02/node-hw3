import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../App'

import { FaSpinner } from 'react-icons/fa'
import styled from 'styled-components'
const AssignedLoadsStyled= styled.div`
th, td {
    padding: 15px;
    text-align: left;
  }
tr:nth-child(even) {
    background-color: lightgrey
}
tr:nth-child(odd) {
    background-color: rgba(0,0,0,.3)
}

`

const ListAssignedLoads=()=> {
    const {role}= useContext(Context)
   const [loading, setIsLoading]= useState(true);
   const [data, setData]= useState([]);
   const [ids, setIds]= useState([])
   const openChat=()=> {
    const newwindow=window.open('','viet','height=200,width=150');
   newwindow.document.body.innerHTML=<p>hello</p>
   }
   useEffect(()=> {
       fetch('/api/loads?status=ASSIGNED', {
           headers: {
               'authorization': 'Bearer '+ 
               localStorage.getItem('jwt_token')
           }
       })
       .then(response=> response.json())
       .then(json=>{
           setData(json) ;
           setIsLoading(false);
           console.log(json)
          /*  let promiseList=[]
           json.loads.forEach(load=>promiseList.push(
               getDeliveryInfo(load._id)
           ) )
           return Promise.all(promiseList); */
       })
      /*  .then(values=>{ setIds(values);
        setIsLoading(false);
       }) */
       .catch(err=> {
           alert(err.toString());
           setIsLoading(false);
    })

       
   },[loading])
   const getDeliveryInfo= async (id)=> {
   
       const info=await fetch(`/api/loads/${id}/shipping_info`, {
          headers: {
              authorization: 'Bearer '+ localStorage.getItem('jwt_token')
          } 
       })
       const data=await info.json()
       return data.truck._id;

   }
  
   const iterateLoadState= (id)=> {
       fetch(`/api/loads/active/state`, {
           method: 'PATCH',
           headers: {
               authorization: 'Bearer '+ localStorage.getItem('jwt_token')
           }

       })
       .then(response=> response.json())
       .then(data=> {alert(data.message)
         setIsLoading(true)})
       .catch(err=> alert(err.toString()))
       
   }
    return (
        <AssignedLoadsStyled>
           {loading ? <FaSpinner/>:
           <>
           <h2>List Assigned Loads</h2>
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
                   <th>Shipper ID</th>
                   <th>Driver ID</th>
                   <th>State</th>
                   <th>Status</th>
                   <th>load id</th>
                  
               </tr>
               </thead>
               <tbody>
                  
                {data.loads.length >0 ?
                data.loads.map((load, index)=> 
                    <tr key= {index}>
                        <td>{load.name}</td>
                        <td>{load.created_date}</td>
                        <td>{load.pickup_address}</td>
                        <td>{load.delivery_address}</td>
                        <td>{load.payload}</td>
                        <td>{load.dimensions.width}</td>
                        <td>{load.dimensions.length}</td>
                        <td>{load.dimensions.height}</td>
                        <td>{load.created_by.slice(load.created_by.length-4)}</td>
                        <td>{load.assigned_to.slice(load.assigned_to.length-4)}</td>
                        <th>{load.state}</th>
                        <th>{load.status}</th>
                        <th>{load._id.slice(load._id.length-4)}</th>
                        {(role==="DRIVER") ?<td><button onClick={iterateLoadState}>Next State</button></td>: ''}
                        <th><button onClick={openChat}>Chat with{role=='DRIVER' ? 'SHIPPER'
                        : 'DRIVER'} </button></th>
                     
                    </tr>
                ): <>no data</>
                }
               </tbody>
           </table>
           </>
           }
           
        </AssignedLoadsStyled>
    )
}
export default ListAssignedLoads