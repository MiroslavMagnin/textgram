import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";

export default function SettingsPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isAuth, setAuth] = useState();
  useEffect(() => {
    let token = localStorage.getItem("token");
    setAuth(token !== null);
  });

  const navigate = useNavigate();
  function handleLogout(event) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/home");
  }

  return (
    <>
      <Header />

      <div className="page-layout">
        <SideBar />

        <main>
          <h1>Settings</h1>

          <div className="settings-actions">
            <div className="action-line">
              <div className="action-line__label">
                Log out of your account:{" "}
              </div>
              <div className="action-line__action">
                <Button onClick={handleLogout}>logout</Button>
              </div>
            </div>
          </div>

          <div className="profile-data">
            <div className="profile-data__line">
              <div className="profile-data__label">Name:</div>
              <div className="profile-data__text">{user.name}</div>
              <Button>Change</Button>
            </div>

            <hr />

            <div className="profile-data__line">
              <div className="profile-data__label">BirthDate:</div>
              <div className="profile-data__text">{user.birthDate}</div>
              <Button>Change</Button>
            </div>

            <hr />

            <div className="profile-data__line">
              <div className="profile-data__label">Email:</div>
              <div className="profile-data__text">{user.email}</div>
              <Button>Change</Button>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
