import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AppLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <header>
        <h1>Project Manager</h1>

        <nav>
          <Link to="/projects" replace>
            Projects
          </Link>

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
