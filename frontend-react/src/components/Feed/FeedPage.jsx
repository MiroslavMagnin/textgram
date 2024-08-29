import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import Button from "../Button/Button";
import "./FeedPage.css";
import Loading from "../Loading/Loading.jsx";
import Post from "./Post/Post.jsx";
import NoPosts from "./Post/NoPosts.jsx";
import {
  getAllFollowingPosts,
  getUserDataById,
} from "../../servicesFunctions.js";

export default function FeedPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  // const [user, setUser] = useState(null);

  const [isAuth, setAuth] = useState();
  const [followingPosts, setFollowingPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [havePosts, setHavePosts] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Check authorized
    let token = localStorage.getItem("token");
    setAuth(token !== null);

    // Get following posts
    const fetchFollowingPosts = async () => {
      let posts = null;
      try {
        posts = await getAllFollowingPosts(user.userId);
        setFollowingPosts(posts);
        setHavePosts(posts.length > 0);
      } catch (error) {
        console.error("Fetch following posts failed: ", error);
        setHavePosts(false);
      } finally {
        if (posts != null) {
          setIsLoaded(true);
        }
      }
    };

    fetchFollowingPosts();
  }, [user.userId]); // user.userId

  const followingPostsOutput = followingPosts.map((post) => (
    <Post post={post} key={post.postId} />
  ));

  return (
    <>
      <Header />

      <div className="page-layout">
        <SideBar />

        <main>
          <h1>Feed</h1>

          <div className="feed">
            <div className="feed__posts">
              {isAuth ? (
                !isLoaded ? (
                  <Loading />
                ) : havePosts ? (
                  followingPostsOutput
                ) : (
                  <div className="feed__no-posts">
                    <NoPosts />
                  </div>
                )
              ) : (
                <div>YOU AREN'T AUTHORIZED</div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
