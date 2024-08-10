import React from "react";
import "./Sign.css";
import Button from "../Button/Button";
import { useState } from "react";
import Header from "../Header/Header";

export default function SignUp() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hasError, setHasError] = useState(false);

  function handleNameChange(event) {
    setName(event.target.value);
    setHasError(event.target.value.trim().length === 0);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setHasError(event.target.value.trim().length === 0);
  }

  return (
    <>
      <Header />

      <main>
        <div className="sign">
          <h2>Sign Up</h2>

          <hr />

          <form>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              className="control"
              value={name}
              style={{
                border: hasError ? "1px solid #b94d4d" : null,
              }}
              onChange={handleNameChange}
            />

            <label htmlFor="birthDate">Birth date: </label>
            <input
              type="date"
              id="birthDate"
              className="control"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
            />

            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              className="control"
              value={email}
              onChange={handleEmailChange}
            />

            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              className="control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <hr />

            <Button disabled={hasError} isActive={!hasError}>
              Sign Up!
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
