import { useContext, useState } from "react";
import "./App.css";
import AuthModal from "./component/authModal";
import Post from "./pages/post/Post";
import LoginForm from "./component/Auth/Login/Login";
import RegisterForm from "./component/Auth/Registration/Registration";
import AuthContext from "./AuthContext";

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {!isAuthenticated ? (
        <>
          <button onClick={() => setLoginOpen(true)}>Login</button>
          <button onClick={() => setRegisterOpen(true)}>Register</button>
        </>
      ) : (
        <>
          <h4>Welcome {user.data.user.username}</h4>
          <button onClick={() => logout()}>logout</button>
        </>
      )}
      <AuthModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
        <LoginForm onClose={() => setLoginOpen(false)} />
      </AuthModal>
      <AuthModal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)}>
        <RegisterForm onClose={() => setRegisterOpen(false)} />
      </AuthModal>
      <Post />
    </>
  );
}

export default App;
