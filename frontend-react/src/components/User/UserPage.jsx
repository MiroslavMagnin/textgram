import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./UserPage.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import Button from "../Button/Button";
import Post from "../Feed/Post/Post.jsx";
import Loading from "../Loading/Loading.jsx";
import { getUserDataById, getAllUserPosts } from "../../servicesFunctions.js";

export default function UserPage() {
  const params = useParams();
  const authUser = JSON.parse(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const [userPostsLoaded, setUserPostsLoaded] = useState(false);
  const [havePosts, setHavePosts] = useState(true);

  const [isAuth, setAuth] = useState();
  useEffect(() => {
    // Check authorized
    let token = localStorage.getItem("token");
    setAuth(token !== null);

    // Get current user info
    const fetchCurrentUserInfo = async () => {
      try {
        const user = await getUserDataById(params.userId);
        setCurrentUser(JSON.parse(user));
        setLoaded(true);
      } catch (error) {
        console.log("Get current user info failed: " + error.message);
        setLoaded(false);
      }
    };

    fetchCurrentUserInfo();

    // Get user posts
    const fetchUserPosts = async () => {
      let posts = null;
      try {
        posts = await getAllUserPosts(params.userId);
        setUserPosts(JSON.parse(posts));
        setHavePosts(true);
        console.log("Received posts: " + userPosts);
      } catch (error) {
        console.error("Get user posts failed: ", error.message);
        setHavePosts(false);
      } finally {
        setUserPostsLoaded(true);
        if (setHavePosts == null) {
          havePosts(false);
        }
      }
    };

    fetchUserPosts();
  }, [loaded, params.userId]);

  const navigate = useNavigate();

  const userPostsOutput = userPosts.map((post) => (
    <Post post={post} key={post.postId} />
  ));

  return (
    <>
      <Header />

      <div className="page-layout">
        <SideBar />

        <main>
          <div className="user">
            {loaded ? (
              <>
                <div className="user-header">
                  <div className="user-header__header">
                    <div className="user-header__name">
                      <h3>{currentUser.name}</h3>
                    </div>

                    <div className="post-header__actions">
                      <Button>Unfollow</Button>
                    </div>
                  </div>

                  <hr />

                  <div className="user-header__info">
                    <h3>{"Birth date: " + currentUser.birthDate}</h3>
                  </div>
                </div>
                <div className="user-container">
                  <div className="user-container__posts">
                    {isAuth ? (
                      !userPostsLoaded ? (
                        <Loading />
                      ) : havePosts ? (
                        userPostsOutput
                      ) : (
                        <div className="user-container__no-posts">
                          <NoPosts />
                        </div>
                      )
                    ) : (
                      <div>YOU AREN'T AUTHORIZED</div>
                    )}
                  </div>
                  <div className="user-container__right-bar">
                    <div className="right-bar__followers">
                      <div className="follow-label">Followers: </div>
                      {currentUser.followers.length != 0 ? (
                        currentUser.followers.map((follower) => (
                          <div
                            className="followers__follower-item"
                            key={follower.followId}
                          >
                            <Link
                              className="follower-item__user-link"
                              to={"/user/" + follower.from.userId}
                            >
                              {follower.from.name}
                            </Link>
                          </div>
                        ))
                      ) : (
                        <div className="no-follow">No followers</div>
                      )}
                    </div>

                    <div className="right-bar__following">
                      <div className="follow-label">Following: </div>
                      {currentUser.following.length != 0 ? (
                        currentUser.following.map((following) => (
                          <div
                            className="following__following-item"
                            key={following.followId}
                          >
                            <Link
                              className="following-item__user-link"
                              to={"/user/" + following.to.userId}
                            >
                              {following.to.name}
                            </Link>
                          </div>
                        ))
                      ) : (
                        <div className="no-follow">No following</div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Loading />
              </>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
