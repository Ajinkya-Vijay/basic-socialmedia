import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();

  const handleNavigation = (id) =>{
    navigate(`post/${id}`)
  }

  useEffect(() => {
    axios.get("http://localhost:3001/feed").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div className="post" onClick={()=>{
            handleNavigation(value.id)
            // console.log(value.id)
          }}>
            <div className="title"> {value.title} </div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;