import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { authed, setAuthed } = useAuth();

  const handleLogin = () => {
      setAuthed(true);
      navigate(state?.path || '/dashboard')
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

export default Login;