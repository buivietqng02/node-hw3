import React, { useState, useEffect, useRef } from "react";
import { Context } from "../App";
import { FaSpinner } from "react-icons/fa";
import styled from "styled-components";
import axios from 'axios'
const ProfileStyle = styled.div`

  max-width: 680px;
  width: 80%;
  margin: 0 auto;
  p {
    margin: 5px;
  }
  input {
    padding: 5px;
    margin-bottom: 5px;
  }
  button {
    margin: 8px;
    padding: 5px;
  }
  .avatar {
    width: 200px;
    height: 200px;
    
    overflow: hidden
   
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;
const Profile = () => {
  const ref= useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [selectFile, setSelectFile] = useState(null);
  const [credential, setCredential] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleChange = (evt) => {
    setCredential({
      ...credential,
      [evt.target.name]: evt.target.value,
    });
    console.log(credential);
  };
  const fileUpload = () => {
    console.log("hello");
    console.log(selectFile);
    const fd = new FormData();
    fd.append("image", ref.current.files[0]);
    fd.append('username', 'abc123')
   fetch("/api/users/me/avatar", {
      method: "POST",
      headers: {
       
        authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
      body: fd
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    fetch("/api/users/me", {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.user);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setIsLoading(false);
      });
  }, []);
  const changePassword = () => {
    fetch("/api/users/me/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
      body: JSON.stringify(credential),
    })
      .then((response) => response.json())
      .then((data) => alert(data.message))
      .catch((err) => alert(err.toString()));
  };
  return (
    <ProfileStyle>
      {isLoading ? (
        <FaSpinner />
      ) : (
        <div>
          <h2>Your Profile</h2>
          <div>
            Your avatar
            <div className="avatar">
            <img src={data.avatar} alt="" />
            </div>
          </div>
          
          <p>Email: {data.email}</p>
          <p>Created date:{data.created_date} </p>
          <p>Your role: {data.role}</p>

          <label>Old password</label>
          <input
            type="password"
            name="oldPassword"
            value={credential.oldPassword}
            onChange={handleChange}
          />
          <br />
          <label>New password</label>
          <input
            type="password"
            name="newPassword"
            value={credential.newPassword}
            onChange={handleChange}
          />
          <br />
          <button onClick={changePassword}>Change Password</button>
          <hr/>
          <div>
            <p>Upload avatar</p>
            <input
              type="file" ref= {ref}
              onChange={(e) =>
                {
                  setSelectFile(e.target.files[0]);
                  console.log(e.target.files[0]);
                 console.log(typeof e.target.files[0])
                    
                }}
            />
            <button onClick={fileUpload}>Upload Avatar </button>
          </div>
        </div>
      )}
    </ProfileStyle>
  );
};
export default Profile;
