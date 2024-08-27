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
import {
  getAllFollowingPosts,
  getUserDataById,
} from "../../servicesFunctions.js";

export default function FeedPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isAuth, setAuth] = useState();
  const [followingPosts, setFollowingPosts] = useState([]);

  useEffect(() => {
    // Check authorized
    let token = localStorage.getItem("token");
    setAuth(token !== null);

    // Get following posts
    const fetchFollowingPosts = async () => {
      const posts = await getAllFollowingPosts(user.userId);
      setFollowingPosts(posts);
    };

    fetchFollowingPosts();
  }, [user.userId]);

  const followingPostsOutput = followingPosts.map((item) => <div>{item}</div>);

  return (
    <>
      <Header />

      <div className="page-layout">
        <SideBar />

        <main>
          <h1>Feed</h1>

          <div className="feed">
            <div className="feed__posts">
              {followingPosts.length > 0 ? (
                // Posts
                followingPosts.map((post, index) => (
                  <div className="feed__post" key={index}>
                    <div className="post-header">
                      <div className="post-header__author">
                        <a
                          classname="post-header__author-link"
                          href={"/user/" + post.authorId}
                        >
                          {post.authorName !== null
                            ? post.authorName
                            : post.authorId}
                        </a>
                      </div>

                      <div className="post-header__actions">
                        <Button>Unfollow</Button>
                      </div>
                    </div>

                    <hr />

                    <div className="post-content">
                      <div className="post-content__text">{post.text}</div>
                    </div>
                  </div>
                ))
              ) : (
                // Loading message
                <Loading />
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
