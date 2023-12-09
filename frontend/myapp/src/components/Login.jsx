import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errblank, setErrblank] = useState("");
  const navigate = useNavigate();

  const getToken = async () => {
    const login_url = "http://localhost:5000/api/login";

    let body = {
      username: username,
      password: password,
    };

    try {
      await axios
        .post(login_url, body)
        .then((res) => {
          const token = res.data.access_token;
          localStorage.setItem("access_token", token);
          navigate("/table");

        });
    } catch (err) {
      setErrblank("Invalid Username or Password");
    }
  };

  const handleLogin = () => {
    if (username && password) {
      getToken();
    } else {
      setErrblank("please fill all fields below");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <p style={styles.error}>{errblank}</p>
      <form style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="button" onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  error: {
    textAlign: "center",
    color: "red",
  },
  container: {
    maxWidth: "400px",
    margin: "auto",
    marginTop: "150px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "inline-block",
    marginBottom: "5px",
    paddingRight: "20px",
    color: "#555",
    width: "100px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Login;
