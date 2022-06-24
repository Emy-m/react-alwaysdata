import React from "react";
import { environment } from "../../environment";
import Auth from "../../services/Auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    const auth = new Auth(environment.API_URL);
    auth
      .login(username, password)
      .then((token) => {
        return navigate("/", { replace: true });
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} />
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
}

export default Login;
