import React, {useState, useEffect} from 'react'
import { FaSpinner } from 'react-icons/fa'
import {ImCheckmark} from 'react-icons/im'
import styled from 'styled-components'
const TrucksStyled= styled.div`
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
const ListTrucks=()=> {
    const [loading, setLoading]= useState(false);
    const [lists, setLists]= useState([])
    useEffect(()=> {
        
        fetch('/api/trucks', {
            headers: {
                authorization: 'Bearer '+ localStorage.getItem('jwt_token')

            }
        })
        .then(response=> {
            if (response.status==200) {
                return response;
            } else {
                throw new Error('cannot fetch data')
            }

        })
        .then(response=> response.json())
        .then(json=> {
            setLoading(false)
            console.log(json)
            setLists(json.trucks);
           
        })
        .catch(err=> {
            setLoading(false)
            alert(err.toString())
        })
    }, [loading])
    const handleAssign= (id)=> {
        fetch(`/api/trucks/${id}/assign`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                authorization: 'Bearer '+ localStorage.getItem('jwt_token')
            }
        })
        .then(response=> {
            return response.json();
            
            
        })
        .then(json=>{
            alert(json.message)
            setLoading(true)
           })
        .catch((err)=> alert(err.toString()))
    }
    const handleDelete=(id)=> {
        fetch(`/api/trucks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                authorization: 'Bearer '+ localStorage.getItem('jwt_token')
            }
        })
        .then(response=> {
            return response.json();
            
            
        })
        .then(json=>{
            alert(json.message)
            setLoading(true)
           })
        .catch((err)=> alert(err.toString()))
    }
    return (
      <TrucksStyled>
          <h2>List of Trucks</h2>
        <table>
            <thead>
                <tr>
                <th>Number</th>
                <th>Type</th>
                <th>id</th>
                
                <th>Assigned</th>
                <th>Status</th>
                <th>Created Date</th>
                </tr>
            </thead>
            <tbody>
                {(lists.length > 0)?
            lists.map((list, ind)=> (
                <tr key={ind}>
                    <td>{ind+1}</td>
                    <td>{list.type}</td>
                    <td>{list._id}</td>
                   
                    <td>{list.assigned_to ?<ImCheckmark/> : ''}</td>
                    <td>{list.status}</td>
                    <td>{list.created_date}</td>
                    <td><button
                    onClick={()=>handleAssign(list._id)}
                    style={{padding: '5pxcv'}}
                    >Assign</button></td>
                    <td><button
                    onClick={()=>handleDelete(list._id)}
                    style={{padding: '5pxcv'}}
                    >Delete</button></td>
                </tr>
            ))
             : <></>   }
            </tbody>
        </table>
        </TrucksStyled>
    
       
    )
}
export default ListTrucks