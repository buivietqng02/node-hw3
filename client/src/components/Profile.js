import React, { useState, useEffect } from "react";
import { Context } from "../App";
import { FaSpinner } from "react-icons/fa";
const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
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
        "authorization": "Bearer " + localStorage.getItem("jwt_token"),
      },
      body: JSON.stringify(credential)
    })
      .then((response) => response.json())
      .then((data) => alert(data.message))
      .catch((err) => alert(err.toString()));
  };
  return (
    <>
      {isLoading ? (
        <FaSpinner />
      ) : (
        <div>
          <h3>Your Profile</h3>
          <p>
            Your avatar
            <img src={data.avatar} alt="" />
          </p>
          <img src="" alt="your logo" />
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
        </div>
      )}
    </>
  );
};
export default Profile;
