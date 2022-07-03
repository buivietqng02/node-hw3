import React, { useEffect, useState } from "react";
const History = () => {
  const [lists, setLists] = useState([]);
  useEffect( () => {
    fetch("/api/loads?status=SHIPPED", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((res) => res.json())
      .then((json) => setLists(json.loads));
  }, []);
  return (
    <>
    <h3>History of shipped items</h3>
      {
          (lists.length > 0) ? 
          <ul>
          {lists.map((load,ind)=> 
            <li key= {ind}>
                
                <p>Name: {load.name}</p>
                {load.logs.map((log,ind)=> <p key= {ind}>{log.time}:{log.message}</p>)}
                <hr/>
            </li>
          
          )}
          </ul> :
          <>
          <p>there is no history</p>
          </>
      }
    </>
  );
};
export default History;
