import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./UserPage.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import Button from "../Button/Button";
import Loading from "../Loading/Loading.jsx";
import { getUserDataById } from "../../servicesFunctions.js";

export default function UserPage() {
  const params = useParams();
  const authUser = JSON.parse(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(null);

  const [loaded, setLoaded] = useState(false);

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
  }, [loaded]);

  const navigate = useNavigate();

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
                  <div className="user-header__name">
                    <h3>{currentUser.name}</h3>
                  </div>

                  <div className="post-header__actions">
                    <Button>Unfollow</Button>
                  </div>
                </div>
                <div className="user-container">
                  <div className="user-container__posts"></div>
                  <div className="user-container__followers"></div>
                  <div className="user-container__following"></div>
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
