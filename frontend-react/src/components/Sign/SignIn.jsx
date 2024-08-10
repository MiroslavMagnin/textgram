import React from "react";
import "./Sign.css";
import Button from "../Button/Button";
import { useState } from "react";
import Header from "../Header/Header";

export default function SignUp() {
  const [name, setName] = useState("");

  const [hasError, setHasError] = useState(false);

  function handleNameChange(event) {
    setName(event.target.value);
    setHasError(event.target.value.trim().length === 0);
  }

  return (
    <>
      <Header />

      <main>
        <div className="sign">
          <h2>Sign In</h2>

          <hr/>

          <form>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" className="control" />

            <label htmlFor="password">Password: </label>
            <input type="password" id="password" className="control" />
            
            <hr/>

            <Button disabled={hasError} isActive={!hasError}>
              Sign Up!
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
