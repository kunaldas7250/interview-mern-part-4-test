
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../Firebase setup/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth(app); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
      navigate("/MainPage");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleGuest = async () => {
    try {
      const guestEmail = "guest@gmail.com"; // static guest account
      const guestPassword = "guest123";     // static password
      await signInWithEmailAndPassword(auth, guestEmail, guestPassword);
      alert("Logged in as Guest");
      navigate("/MainPage");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome ${user.displayName || user.email || "Google User"}!`);
      navigate("/MainPage");
    } catch (error) {
      console.error("Google login error:", error.message);
      alert(`Google login failed: ${error.message}`);
    }
  };

  const handleGithub = async (e) => {
    e.preventDefault();
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome ${user.displayName || user.email || "GitHub User"}!`);
      navigate("/MainPage");
    } catch (error) {
      console.error("GitHub login error:", error.message);
      alert(`GitHub login failed: ${error.message}`);
    }
  };

  return (
    <div className="login-signup">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>{isSignup ? "Signup" : "Login"}</legend>

          {isSignup && (
            <>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
          )}

          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={{ marginTop: "10px" }}>
            <button type="submit">{isSignup ? "Signup" : "Login"}</button>
            <button type="button" onClick={() => setIsSignup((p) => !p)}>
              {isSignup ? "Switch to Login" : "Switch to Signup"}
            </button>
            <button type="button" onClick={handleGuest}>
              Login as Guest
            </button>
          </div>

          <hr />
          <button type="button" onClick={handleGoogle}>
            Login with Google
          </button>
          <hr />
          <button type="button" onClick={handleGithub}>
            Login with GitHub
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginSignup;
