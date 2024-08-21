import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../../AuthContext";

interface RegisterFormProps {
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { login } = useContext(AuthContext);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: name,
          email: email,
          password: password,
        }
      );
      if (response.status == 201) {
        login(response.data)
        onClose(); 
      } else {
        console.error("Registration failed");
        setError(true);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(true);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
        required
      />
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@gmail.com"
        required
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="********"
        required
      />
      <button type="submit">Register</button>
      {error && <p className="error-message">Registration Failed</p>}
    </form>
  );
};

export default RegisterForm;
