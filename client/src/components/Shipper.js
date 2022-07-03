import React, {useState} from 'react'
import Header from './Header'
import SideBar from './SideBar'
import CreateNewLoad from './CreateNewLoad'
import ListNewLoads from './ListNewLoads'
import Profile from './Profile'
import History from './History'
import ListAssignedLoads from './ListAssignedLoads'
import styled from 'styled-components'
const FlexDiv= styled.div`

display: flex;
flex-direction: row;

`
export const SelectCom= React.createContext(null)
const Shipper= ()=> {
   
   const [elem, setElem]= useState('');
   return (
    <SelectCom.Provider value={{setElem}}>
   <Header/>
   <FlexDiv>
      <SideBar/>
      {elem==='CreateNewLoad' ? <CreateNewLoad/>:
      elem==='ListAssignedLoads' ? <ListAssignedLoads/> :
      elem==='Profile' ? <Profile/> :
      elem==='History' ? <History/> :
      <ListNewLoads/>

      }
   </FlexDiv>
    </SelectCom.Provider>
   )
}
export default Shipper
