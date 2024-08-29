import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Sign.css";
import Button from "../Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { getUserDataByEmail } from "../../servicesFunctions.js";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setHasEmailError(event.target.value.trim().length === 0);
    setHasEmailError(!event.target.value.trim().includes("@"));
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setHasPasswordError(event.target.value.trim().length === 0);
  }

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      // Check for empty fields
      if (!email || !password) {
        setError("Please fill in all fields");
        console.error("Not all fields are filled");
        return;
      }

      const response = await axios.post("/auth/signin", {
        email,
        password,
      });
      // Handle successful sign in
      const token = response.data.accessToken;

      const user = jwtDecode(token);
      localStorage.setItem("token", token);

      console.log(response.data);
      console.log(user);

      getUserDataByEmail(user.sub);

      navigate("/feed");
    } catch (error) {
      // Handle signin error
      console.error(
        "Signin failed:",
        error.response ? error.response.data.error : error.message
      );
      setError(error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <>
      <Header />

      <div className="page-layout">
        <main>
          <div className="sign">
            <h2>Sign In</h2>

            <hr />

            <div
              className="signErrors"
              style={{
                display: error === "" ? "none" : "block",
              }}
            >
              <label>Error: {error}</label>
            </div>

            <form>
              <label htmlFor="email">Email: </label>
              <label
                className="wrongField"
                style={{ display: hasEmailError ? "block" : "none" }}
              >
                The email shoudn't be empty and should be match the format
                (example: ivan_ivanov@gmail.com)"
              </label>
              <input
                type="email"
                id="email"
                className="control"
                value={email}
                style={{
                  border: hasEmailError ? "4px solid #b94d4d" : null,
                }}
                onChange={handleEmailChange}
              />

              <label htmlFor="password">Password: </label>
              <label
                className="wrongField"
                style={{ display: hasPasswordError ? "block" : "none" }}
              >
                The password shoudn't be empty
              </label>
              <input
                type="password"
                id="password"
                className="control"
                value={password}
                style={{
                  border: hasPasswordError ? "4px solid #b94d4d" : null,
                }}
                onChange={handlePasswordChange}
              />

              <hr />

              <Button
                disabled={hasEmailError || hasPasswordError}
                isActive={!(hasEmailError || hasPasswordError)}
                onClick={handleSignIn}
              >
                Sign In!
              </Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
