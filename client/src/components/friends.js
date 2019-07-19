import React, { useEffect, useState } from "react";
import axios from "axios";
import './component.css';



function Friends({ history }) {
const [friendsList, setFriendsList] = useState([]);
const [newFriend, setNewFriend] = useState({});

const handleChanges = e => {
    setNewFriend({...newFriend, [e.target.name]: e.target.value})
}

const handleSubmit = e => {
    e.preventDefault()
    // console.log('new friend', newFriend)
 
    const token = localStorage.getItem("token");
    const url =
      "http://localhost:5000/api/friends";

    if (token) {
      axios
        .post(url, newFriend,  {
          headers: {
            Authorization: `${token}` 
          }
        })
        .then(response => {
            console.log('response', response)
            history.push('/friends')
        })
        .catch(e => {
          console.log(e.response);
         
        });
        axios
        .get(url, {
          headers: {
            Authorization: `${token}` 
          }
        })
        .then(response => {
            console.log(response.data)
          setFriendsList(response.data);
        })
        .catch(e => {
          console.log(e.response);
          localStorage.removeItem("token");
          history.push("/");
        });
        setNewFriend({
            name: '',
            age: '',
            email: ''
        })
    }


}




  useEffect(() => {
    const token = localStorage.getItem("token");
    const url =
      "http://localhost:5000/api/friends";

    if (token) {
      axios
        .get(url, {
          headers: {
            Authorization: `${token}` 
          }
        })
        .then(response => {
            console.log(response.data)
          setFriendsList(response.data);
        })
        .catch(e => {
          console.log(e.response);
          localStorage.removeItem("token");
          history.push("/");
        });
    }
  }, [history]);
  if (!friendsList) return <div>Loading</div>
  return (
    <>
      <div className="friendHeader">
          <p>My Friends</p>
      </div>
   
      {friendsList.map(friend => 
      <div className="friendList">
        <p className="friendName">Name: {friend.name}</p>
        <p className="friendAge">Age: {friend.age}</p>
        <p className="friendEmail">Email: {friend.email}</p>
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
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <h2>Add New Friend</h2>
                <input className="input" type='text' name='name' placeholder='name' onChange={handleChanges} value={newFriend.name} />
                <input className="input" type='text' name='age' placeholder='age'  onChange={handleChanges} value={newFriend.age}  />
                <input className="input" type='email' name='email' placeholder='email'  onChange={handleChanges}  value={newFriend.email} />
                <button className="btn" type='submit'>submit</button>
            </div>
        </form>

    </>
  );
}

export default Friends;
