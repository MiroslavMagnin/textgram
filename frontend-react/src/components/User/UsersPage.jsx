import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkAuthorized, getUsersList } from "../../servicesFunctions.js";
import "./UserPage.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import Loading from "../Loading/Loading.jsx";
import NotAuthorized from "../NotAuthorized/NotAuthorized.jsx";
import UserItem from "./UserItem.jsx";

export default function UsersPage() {
  const authUser = JSON.parse(localStorage.getItem("user"));

  const [isAuth, setAuth] = useState();
  const [usersList, setUsersList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    // Check authorized
    let token = localStorage.getItem("token");
    let tokenLifeCycle = checkAuthorized();
    setAuth(token !== null && authUser !== null && tokenLifeCycle);

    // Get all users (nearly :))
    const fetchUserList = async () => {
      let getUsers = null;
      try {
        getUsers = await getUsersList();
        setUsersList(getUsers);
      } catch (error) {
        console.error("Fetch users list failed: ", error);
      } finally {
        if (getUsers != null) {
          setIsLoaded(true);
        }
      }
    };

    fetchUserList();
  }, []);

  const usersListOutput = usersList.map((user) => {
    return <UserItem authUser={authUser} user={user} key={user.userId} />;
  });

  return (
    <>
      <Header />

      <div className="page-layout">
        <SideBar />

        <main>
          {isAuth ? (
            <>
              <div className="users">
                {isLoaded ? (
                  usersListOutput
                ) : (
                  <>
                    <Loading />
                  </>
                )}
              </div>
            </>
          ) : (
            <NotAuthorized />
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}
