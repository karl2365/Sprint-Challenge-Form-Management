import React, { useEffect, useState } from "react";
import axios from "axios";
import './component.css';



function Friends({ history }) {
const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const url =
      "http://localhost:5000/api/restricted/data";

    if (token) {
      axios
        .get(url, {
          headers: {
            Authorization: `${token}` 
          }
        })
        .then(response => {
            console.log('list', response)
            setData(response.data);
        })
        .catch(e => {
          console.log('error', e.response);
          localStorage.removeItem("token");
          history.push("/");
        });
    }
  }, [history]);
  if (!data) return <div>Loading</div>
  return (
    <>
      <div className="friendHeader">
          <p>My Favorite Dishes</p>
      </div>
   
      {data.map(data => 
      <div className="friendList">
        <p className="friendName">Course: {data.course}</p>
        <p className="friendAge">Title: {data.name}</p>
        <p className="friendEmail">technique: {data.technique}</p>
      </div>)}

      <button
        className="btn logoutButton"
        onClick={() => {
          localStorage.removeItem("token");
          history.push("/");
        }}
      >
        Logout
      </button>

    </>
  );
}

export default Friends;
