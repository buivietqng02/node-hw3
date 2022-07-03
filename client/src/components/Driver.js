import React, {useState} from 'react'
import Header from './Header'

import CreateNewTruck from './CreateNewTruck'
import ListTrucks from './ListTrucks'
import Profile from './Profile'
import ListAssignedLoads from './ListAssignedLoads'
import styled from 'styled-components'
import SideBarDriver from './SideBarDriver'
import History from './History'
const FlexDiv= styled.div`

display: flex;
flex-direction: row;

`
export const SelectCom1= React.createContext(null)
const Driver= ()=> {
   
   const [elem, setElem]= useState('');
   return (
    <SelectCom1.Provider value={{setElem}}>
   <Header/>
   <FlexDiv>
      <SideBarDriver/>
      {elem==='CreateNewTruck' ? <CreateNewTruck/>:
      elem==='ListTrucks' ? <ListTrucks/> :
      elem==='ListAssignedLoads' ? <ListAssignedLoads/> :
      elem==='Profile' ? <Profile/> :
      elem=='History' ? <History/> :<></>
      

      }
   </FlexDiv>
    </SelectCom1.Provider>
   )
}
export default Driver
