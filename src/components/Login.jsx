import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log(`Attempting to sign up as ${username} ${password}`)
      const response = await axios({
        method: "post",
        url: process.env.BACKEND_URI + "/auth/login",
        data: {
          username: username,
          password: password
        }
      });
      localStorage.setItem("user", username);
      localStorage.setItem("auth_headers", {
        Authorization: `Bearer ${response.data.token}`,
        // application/json probably isn't appropriate for every request but iirc its appropriate for most
        // which, at this point, is good enough for me :)
        "Content-Type": "application/json",
      })
      alert("Login successful!");
    } catch (error) {
      alert("Login failed. Reason: " + error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout successful!");
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Login;
