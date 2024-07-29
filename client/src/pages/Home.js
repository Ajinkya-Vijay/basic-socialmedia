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

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } 
            else {
              return post;
            }
          })
        );
      });
  };

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div className="post"
           key={key}
          >
            <div className="title"> {value.title} </div>
            <div className="body"
              onClick={()=>{
              handleNavigation(value.id)
              }}
            >{value.postText}</div>
            <div className="footer">{value.username}
            <button
                onClick={(e) => {
                  e.stopPropagation();
                  likeAPost(value.id);
                }}
              >
                Like
              </button>
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;