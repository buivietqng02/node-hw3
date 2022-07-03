import React, { useEffect} from 'react'
import { useNavigate} from 'react-router-dom'

const ConfigRoute= ({children})=> {
    
    const navigate= useNavigate()
   
    useEffect(()=> {
        if (!localStorage.getItem('jwt_token')) {
            navigate('/signin')
        }
      
    })
    return (
      <>
        {children}
        </>
       
       
    )
}
export default ConfigRoute