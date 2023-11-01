import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Nav = () => {
  const { authed, setAuthed } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthed(false);
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
        <li>
          <Link to="/settings">settings</Link>
        </li>
        <li>
          <Link to="/dashboard">dashoard</Link>
        </li>
      </ul>
      {authed && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Nav;

