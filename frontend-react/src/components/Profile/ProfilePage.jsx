import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Button from "../Button/Button";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isAuth, setAuth] = useState();
  useEffect(() => {
    let token = localStorage.getItem("token");
    setAuth(token !== null);
  });

  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="page-layout">
        <SideBar />

        <main>
          <h1>Profile</h1>

          <div className="profile-actions">
            <div className="action-line">
              <div className="action-line__label">Go to the settings: </div>
              <div className="action-line__action">
                <Button
                  onClick={() => {
                    navigate("/settings");
                  }}
                >
                  Settings
                </Button>
              </div>
            </div>
          </div>

          <div className="profile-data">
            <div className="profile-data__line">
              <label className="profile-data__label">Name:</label>
              <label className="profile-data__text">{user.name}</label>
            </div>

            <hr />

            <div className="profile-data__line">
              <label className="profile-data__label">BirthDate:</label>
              <label className="profile-data__text">{user.birthDate}</label>
            </div>

            <hr />

            <div className="profile-data__line">
              <label className="profile-data__label">Email:</label>
              <label className="profile-data__text">{user.email}</label>
            </div>

            <hr />

            <div className="profile-data__line">
              <label className="profile-data__label">User ID:</label>
              <label className="profile-data__text">{user.userId}</label>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
