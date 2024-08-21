import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../../../AuthContext";

interface loginFormProps {
  onClose: () => void;
}
const LoginForm: React.FC<loginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.status == 200) {
        login(response.data);
        onClose();
      } else {
        console.error("Login failed");
        setError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(true);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        placeholder="**********"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p className="error-message">Signup Failed</p>}
    </form>
  );
};

export default LoginForm;
