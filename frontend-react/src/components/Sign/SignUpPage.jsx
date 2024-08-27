import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css";
import Button from "../Button/Button";
import { useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getUserDataByEmail } from "../../servicesFunctions.js";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hasNameError, setHasNameError] = useState(false);
  const [hasBirthDateError, setHasBirthDateError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleNameChange(event) {
    setName(event.target.value);
    setHasNameError(event.target.value.trim().length === 0);
  }

  function handleBirthDateChange(event) {
    setBirthDate(event.target.value);
    setHasBirthDateError(event.target.value === "");
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setHasEmailError(event.target.value.trim().length === 0);
    setHasEmailError(!event.target.value.trim().includes("@"));
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setHasPasswordError(event.target.value.trim().length === 0);
  }

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      // Check for empty fields
      if (!name || !email || !birthDate || !password) {
        setError("Please fill in all fields.");
        console.error("Not all fields are filled");
        return;
      }

      const response = await axios.post("/auth/signup", {
        name,
        birthDate,
        email,
        password,
      });

      // Handle successful signup
      const token = response.data.accessToken;

      const user = jwtDecode(token);
      localStorage.setItem("token", token);

      console.log(response.data);
      console.log(user);

      getUserDataByEmail(user.sub);

      navigate("/feed");
    } catch (error) {
      // Handle signup error
      console.error(
        "Signup failed:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <Header />

      <div className="page-layout">
        <main>
          <div className="sign">
            <h2>Sign Up</h2>

            <hr />

            <form>
              <div
                className="signErrors"
                style={{
                  display: error === "" ? "none" : "block",
                }}
              >
                <label>Error: {error}</label>
              </div>

              <label htmlFor="name">Name: </label>
              <label
                className={`wrongField ${hasNameError ? "show" : "hide"}`}
                style={{ display: hasNameError ? "block" : "none" }}
              >
                The name shoudn't be empty
              </label>
              <input
                type="text"
                id="name"
                className="control"
                value={name}
                style={{
                  border: hasNameError ? "4px solid #b94d4d" : null,
                }}
                onChange={handleNameChange}
              />

              <label htmlFor="birthDate">Birth date: </label>
              <label
                className={`wrongField ${hasBirthDateError ? "show" : "hide"}`}
                style={{ display: hasBirthDateError ? "block" : "none" }}
              >
                The birth date shoudn't be empty
              </label>
              <input
                type="date"
                id="birthDate"
                className="control"
                value={birthDate}
                style={{
                  border: hasBirthDateError ? "4px solid #b94d4d" : null,
                }}
                onChange={handleBirthDateChange}
              />

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
                disabled={hasNameError || hasNameError}
                isActive={!(hasNameError || hasNameError)}
                onClick={handleSignUp}
              >
                Sign Up!
              </Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
